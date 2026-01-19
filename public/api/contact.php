<?php
/**
 * Contact Form Handler
 * 
 * Handles form submissions with:
 * - reCAPTCHA v3 verification
 * - SMTP2GO transactional email delivery
 * - Emails to 3 company addresses + client autoresponder
 * 
 * Compatible with Hostinger PHP hosting
 * 
 * @requires PHP 7.4+
 * @requires cURL extension
 */

// Load configuration
require_once __DIR__ . '/config.php';

// Set headers for JSON response
header('Content-Type: application/json');

// CORS: Use defined ALLOWED_ORIGINS instead of wildcard for security
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (defined('ALLOWED_ORIGINS') && in_array($origin, ALLOWED_ORIGINS)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} elseif (defined('ALLOWED_ORIGINS') && count(ALLOWED_ORIGINS) > 0) {
    header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGINS[0]);
} else {
    header('Access-Control-Allow-Origin: https://royallocksmithnj.com');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', 405);
}

try {
    // Get form data
    $name = sanitizeInput($_POST['name'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $phone = sanitizeInput($_POST['phone'] ?? '');
    $address = sanitizeInput($_POST['address'] ?? '');
    $service = sanitizeInput($_POST['service'] ?? '');
    $message = sanitizeInput($_POST['message'] ?? '');
    $recaptchaToken = $_POST['recaptcha_token'] ?? '';
    $addressComponents = $_POST['address_components'] ?? '';

    // Get tracking parameters
    $trackingData = [
        'utm_source' => sanitizeInput($_POST['utm_source'] ?? ''),
        'utm_medium' => sanitizeInput($_POST['utm_medium'] ?? ''),
        'utm_campaign' => sanitizeInput($_POST['utm_campaign'] ?? ''),
        'utm_content' => sanitizeInput($_POST['utm_content'] ?? ''),
        'utm_term' => sanitizeInput($_POST['utm_term'] ?? ''),
        'gclid' => sanitizeInput($_POST['gclid'] ?? ''),
        'fbclid' => sanitizeInput($_POST['fbclid'] ?? ''),
    ];

    // Get scheduling preferences (from BookingForm)
    $preferredDate = sanitizeInput($_POST['preferredDate'] ?? '');
    $preferredTime = sanitizeInput($_POST['preferredTime'] ?? '');
    $urgency = sanitizeInput($_POST['urgency'] ?? '');

    // Validate required fields
    $errors = [];

    if (empty($name)) {
        $errors[] = 'Name is required';
    }

    // Email is optional - but validate format if provided
    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address';
    }

    if (empty($phone)) {
        $errors[] = 'Phone number is required';
    }

    // Message is optional - use default if not provided
    if (empty($message)) {
        $message = 'Quick booking request submitted via website form';
    }

    if (empty($recaptchaToken)) {
        $errors[] = 'reCAPTCHA verification required';
    }

    if (!empty($errors)) {
        sendResponse(false, implode(', ', $errors), 400);
    }

    // Verify reCAPTCHA
    $recaptchaResult = verifyRecaptcha($recaptchaToken);

    if (!$recaptchaResult['success']) {
        sendResponse(false, 'reCAPTCHA verification failed. Please try again.', 400);
    }

    // Check reCAPTCHA score (0.0 - 1.0, higher is more likely human)
    if ($recaptchaResult['score'] < RECAPTCHA_THRESHOLD) {
        // Log suspicious submission but don't block completely
        logSubmission('suspicious', [
            'score' => $recaptchaResult['score'],
            'email' => $email,
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
        ]);
    }

    // Prepare email data
    $formSource = sanitizeInput($_POST['form_source'] ?? 'contact_form');

    $submissionData = [
        'name' => $name,
        'email' => !empty($email) ? $email : 'Not provided',
        'phone' => $phone,
        'address' => !empty($address) ? $address : 'Not provided',
        'service' => !empty($service) ? $service : 'General Inquiry',
        'message' => $message,
        'submitted_at' => date('Y-m-d H:i:s T'),
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'recaptcha_score' => $recaptchaResult['score'] ?? 'N/A',
        'form_source' => $formSource,
        'scheduling' => [
            'preferred_date' => $preferredDate,
            'preferred_time' => $preferredTime,
            'urgency' => $urgency,
        ],
        'tracking' => $trackingData,
    ];

    // Send notification emails to company (3 addresses)
    $companyEmailResult = sendCompanyNotification($submissionData);

    if (!$companyEmailResult['success']) {
        // Log error but continue to send autoresponder
        logSubmission('email_error', [
            'type' => 'company_notification',
            'error' => $companyEmailResult['error']
        ]);
    }

    // Send autoresponder to client
    $autoresponderResult = sendClientAutoresponder($submissionData);

    if (!$autoresponderResult['success']) {
        logSubmission('email_error', [
            'type' => 'autoresponder',
            'error' => $autoresponderResult['error']
        ]);
    }

    // Log successful submission
    logSubmission('success', $submissionData);

    // Return success response
    sendResponse(true, 'Your message has been sent successfully. We will contact you shortly.');

} catch (Exception $e) {
    logSubmission('error', ['exception' => $e->getMessage()]);
    sendResponse(false, 'An error occurred. Please try again later.', 500);
}

/**
 * Verify reCAPTCHA v3 token
 */
function verifyRecaptcha(string $token): array
{
    $url = 'https://www.google.com/recaptcha/api/siteverify';

    $data = [
        'secret' => RECAPTCHA_SECRET_KEY,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($data),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200 || !$response) {
        return ['success' => false, 'score' => 0];
    }

    $result = json_decode($response, true);

    return [
        'success' => $result['success'] ?? false,
        'score' => $result['score'] ?? 0,
        'action' => $result['action'] ?? '',
        'hostname' => $result['hostname'] ?? ''
    ];
}

/**
 * Send notification email to company addresses via SMTP2GO
 */
function sendCompanyNotification(array $data): array
{
    $subject = "New Contact Form Submission - {$data['service']}";

    $htmlBody = getCompanyEmailTemplate($data);
    $textBody = getCompanyEmailTextVersion($data);

    $payload = [
        'api_key' => SMTP2GO_API_KEY,
        'to' => COMPANY_EMAIL_ADDRESSES,
        'sender' => SMTP2GO_SENDER_EMAIL,
        'subject' => $subject,
        'html_body' => $htmlBody,
        'text_body' => $textBody,
        'custom_headers' => [
            [
                'header' => 'Reply-To',
                'value' => $data['email']
            ]
        ]
    ];

    return sendSmtp2goEmail($payload);
}

/**
 * Send autoresponder email to client via SMTP2GO
 */
function sendClientAutoresponder(array $data): array
{
    $subject = "Thank you for contacting " . COMPANY_NAME;

    $htmlBody = getAutoresponderTemplate($data);
    $textBody = getAutoresponderTextVersion($data);

    $payload = [
        'api_key' => SMTP2GO_API_KEY,
        'to' => [$data['email']],
        'sender' => SMTP2GO_SENDER_EMAIL,
        'subject' => $subject,
        'html_body' => $htmlBody,
        'text_body' => $textBody
    ];

    return sendSmtp2goEmail($payload);
}

/**
 * Send email via SMTP2GO API
 */
function sendSmtp2goEmail(array $payload): array
{
    $url = 'https://api.smtp2go.com/v3/email/send';

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Accept: application/json'
        ]
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        return ['success' => false, 'error' => $curlError];
    }

    $result = json_decode($response, true);

    if ($httpCode === 200 && isset($result['data']['succeeded'])) {
        return ['success' => true];
    }

    return [
        'success' => false,
        'error' => $result['data']['error'] ?? 'Unknown SMTP2GO error'
    ];
}

/**
 * Company notification email HTML template
 */
function getCompanyEmailTemplate(array $data): string
{
    $companyName = COMPANY_NAME;
    $companyPhone = COMPANY_PHONE;
    $websiteUrl = WEBSITE_URL;
    $formSource = isset($data['form_source']) ? $data['form_source'] : 'contact_form';

    // Determine urgency badge
    $urgencyBadge = '';
    $serviceLower = strtolower($data['service'] ?? '');
    if (strpos($serviceLower, 'emergency') !== false || strpos($serviceLower, 'lockout') !== false) {
        $urgencyBadge = '<span style="background-color: #dc2626; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-left: 10px;">🚨 URGENT</span>';
    }

    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f3f0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f3f0; padding: 30px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <!-- Header with Gold Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #eca413 0%, #c0850f 100%); padding: 35px 30px; text-align: center;">
                            <img src="{$websiteUrl}/images/logo.webp" alt="{$companyName}" style="height: 50px; margin-bottom: 15px;" />
                            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                📩 New Lead Received {$urgencyBadge}
                            </h1>
                            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">From: {$formSource}</p>
                        </td>
                    </tr>
                    
                    <!-- Quick Action Bar -->
                    <tr>
                        <td style="background-color: #181611; padding: 20px 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="tel:{$data['phone']}" style="display: inline-block; background-color: #eca413; color: #181611; padding: 14px 35px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; margin: 0 8px;">
                                            📞 Call {$data['phone']}
                                        </a>
                                        <a href="mailto:{$data['email']}" style="display: inline-block; background-color: transparent; color: #eca413; border: 2px solid #eca413; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; margin: 0 8px;">
                                            ✉️ Reply
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Contact Details -->
                    <tr>
                        <td style="padding: 35px 30px;">
                            <h2 style="color: #181611; margin: 0 0 20px 0; font-size: 20px; font-weight: 700; border-bottom: 3px solid #eca413; padding-bottom: 10px; display: inline-block;">Customer Details</h2>
                            
                            <table width="100%" cellpadding="12" cellspacing="0" style="border-collapse: collapse; background-color: #fafaf8; border-radius: 12px; overflow: hidden;">
                                <tr>
                                    <td style="border-bottom: 1px solid #e5e4e2; font-weight: 600; width: 130px; color: #666;">👤 Name</td>
                                    <td style="border-bottom: 1px solid #e5e4e2; color: #181611; font-weight: 600; font-size: 16px;">{$data['name']}</td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 1px solid #e5e4e2; font-weight: 600; color: #666;">📧 Email</td>
                                    <td style="border-bottom: 1px solid #e5e4e2;"><a href="mailto:{$data['email']}" style="color: #eca413; font-weight: 600;">{$data['email']}</a></td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 1px solid #e5e4e2; font-weight: 600; color: #666;">📱 Phone</td>
                                    <td style="border-bottom: 1px solid #e5e4e2;"><a href="tel:{$data['phone']}" style="color: #eca413; font-weight: 700; font-size: 18px;">{$data['phone']}</a></td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 1px solid #e5e4e2; font-weight: 600; color: #666;">🔧 Service</td>
                                    <td style="border-bottom: 1px solid #e5e4e2; color: #181611; font-weight: 600;">{$data['service']}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 600; color: #666;">📍 Address</td>
                                    <td style="color: #181611;">{$data['address']}</td>
                                </tr>
                            </table>
                            
HTML;

    // Add scheduling data if available
    if (!empty(array_filter($data['scheduling'] ?? []))) {
        $html .= '<h3 style="color: #181611; margin: 30px 0 15px 0; font-size: 18px; font-weight: 700;">⏱️ Scheduling Preferences</h3>';
        $html .= '<table width="100%" cellpadding="10" cellspacing="0" style="background-color: #fffbeb; border-radius: 12px; border: 1px solid #fef3c7;">';

        if (!empty($data['scheduling']['preferred_date'])) {
            $html .= "<tr><td style='width: 140px; color: #92400e; font-weight: 600;'>📅 Date</td><td style='color: #78350f; font-weight: 600;'>{$data['scheduling']['preferred_date']}</td></tr>";
        }
        if (!empty($data['scheduling']['preferred_time'])) {
            $html .= "<tr><td style='width: 140px; color: #92400e; font-weight: 600;'>🕒 Time Window</td><td style='color: #78350f; font-weight: 600;'>{$data['scheduling']['preferred_time']}</td></tr>";
        }
        if (!empty($data['scheduling']['urgency'])) {
            $urgencyLabel = ucfirst($data['scheduling']['urgency']);
            $html .= "<tr><td style='width: 140px; color: #92400e; font-weight: 600;'>⚡ Urgency</td><td style='color: #78350f; font-weight: 600;'>{$urgencyLabel}</td></tr>";
        }
        $html .= '</table>';
    }

    $html .= <<<HTML
                            <h3 style="color: #181611; margin: 30px 0 15px 0; font-size: 18px; font-weight: 700;">💬 Customer Message</h3>
                            <div style="background: linear-gradient(135deg, #fff8eb 0%, #fbeab9 100%); padding: 20px; border-radius: 12px; border-left: 5px solid #eca413; font-size: 15px; line-height: 1.7; color: #333;">
                                {$data['message']}
                            </div>
HTML;

    // Add tracking data if available
    if (!empty(array_filter($data['tracking']))) {
        $html .= '<h3 style="color: #181611; margin: 30px 0 15px 0; font-size: 18px; font-weight: 700;">📈 Marketing Attribution</h3>';
        $html .= '<table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f0f7ff; border-radius: 12px; border: 1px solid #d1e2f5;">';

        foreach ($data['tracking'] as $key => $value) {
            if (!empty($value)) {
                $label = strtoupper(str_replace('_', ' ', $key));
                $html .= "<tr><td style='width: 140px; color: #475569; font-weight: 600; font-size: 12px;'>{$label}</td><td style='color: #1e293b; font-weight: 500;'>{$value}</td></tr>";
            }
        }
        $html .= '</table>';
    }

    $html .= <<<HTML
                        </td>
                    </tr>
                    
                    <!-- Metadata -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f4f3f0; border-radius: 8px;">
                                <tr>
                                    <td style="font-size: 12px; color: #888;">
                                        <strong>Submitted:</strong> {$data['submitted_at']} &nbsp;|&nbsp;
                                        <strong>IP:</strong> {$data['ip_address']} &nbsp;|&nbsp;
                                        <strong>Security Score:</strong> {$data['recaptcha_score']}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #181611; padding: 25px 30px; text-align: center;">
                            <p style="color: #eca413; margin: 0 0 5px 0; font-size: 14px; font-weight: 600;">
                                {$companyName}
                            </p>
                            <p style="color: #888; margin: 0; font-size: 12px;">
                                Lead notification from website contact form
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
}

/**
 * Company notification email plain text version
 */
function getCompanyEmailTextVersion(array $data): string
{
    return <<<TEXT
NEW CONTACT FORM SUBMISSION
============================

CONTACT DETAILS
---------------
Name: {$data['name']}
Email: {$data['email']}
Phone: {$data['phone']}
Service: {$data['service']}
Address: {$data['address']}

MESSAGE
-------
{$data['message']}

SUBMISSION INFO
---------------
Submitted: {$data['submitted_at']}
IP Address: {$data['ip_address']}
reCAPTCHA Score: {$data['recaptcha_score']}
TEXT;
}

/**
 * Client autoresponder email HTML template
 */
function getAutoresponderTemplate(array $data): string
{
    $companyName = COMPANY_NAME;
    $companyPhone = COMPANY_PHONE;
    $companyEmail = COMPANY_EMAIL;
    $websiteUrl = WEBSITE_URL;

    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f3f0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f3f0; padding: 30px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <!-- Header with Gold Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #eca413 0%, #c0850f 100%); padding: 40px 30px; text-align: center;">
                            <img src="{$websiteUrl}/images/logo.webp" alt="{$companyName}" style="height: 55px; margin-bottom: 20px;" />
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                Thank You, {$data['name']}! ✨
                            </h1>
                            <p style="color: rgba(255,255,255,0.95); margin: 12px 0 0 0; font-size: 16px;">
                                We've received your request for <strong>{$data['service']}</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 35px;">
                            <p style="color: #333333; font-size: 17px; line-height: 1.7; margin: 0 0 25px 0;">
                                Thank you for choosing <strong style="color: #eca413;">{$companyName}</strong>! We're committed to providing you with exceptional locksmith services.
                            </p>
                            
                            <!-- What Happens Next Box -->
                            <div style="background: linear-gradient(135deg, #fff8eb 0%, #fef3c7 100%); padding: 28px; border-radius: 16px; margin: 30px 0; border: 1px solid #fde68a;">
                                <h3 style="color: #92400e; margin: 0 0 18px 0; font-size: 20px; font-weight: 700;">⏱️ What Happens Next?</h3>
                                <table cellpadding="0" cellspacing="0" style="width: 100%;">
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px dashed #fcd34d;">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="width: 40px; vertical-align: top;">
                                                        <span style="background: #eca413; color: white; width: 26px; height: 26px; border-radius: 50%; display: inline-block; text-align: center; line-height: 26px; font-weight: bold; font-size: 14px;">1</span>
                                                    </td>
                                                    <td style="color: #78350f; font-size: 15px;"><strong>Review</strong> — Our team will review your request shortly</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px dashed #fcd34d;">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="width: 40px; vertical-align: top;">
                                                        <span style="background: #eca413; color: white; width: 26px; height: 26px; border-radius: 50%; display: inline-block; text-align: center; line-height: 26px; font-weight: bold; font-size: 14px;">2</span>
                                                    </td>
                                                    <td style="color: #78350f; font-size: 15px;"><strong>Contact</strong> — We'll call or email to discuss your needs</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px dashed #fcd34d;">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="width: 40px; vertical-align: top;">
                                                        <span style="background: #eca413; color: white; width: 26px; height: 26px; border-radius: 50%; display: inline-block; text-align: center; line-height: 26px; font-weight: bold; font-size: 14px;">3</span>
                                                    </td>
                                                    <td style="color: #78350f; font-size: 15px;"><strong>Estimate</strong> — Receive a free, no-obligation quote</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0;">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="width: 40px; vertical-align: top;">
                                                        <span style="background: #eca413; color: white; width: 26px; height: 26px; border-radius: 50%; display: inline-block; text-align: center; line-height: 26px; font-weight: bold; font-size: 14px;">4</span>
                                                    </td>
                                                    <td style="color: #78350f; font-size: 15px;"><strong>Service</strong> — Expert locksmith at your location</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Urgency CTA -->
                            <div style="text-align: center; margin: 35px 0;">
                                <p style="color: #666; font-size: 15px; margin: 0 0 15px 0;">Need immediate assistance?</p>
                                <a href="tel:{$companyPhone}" style="display: inline-block; background: linear-gradient(135deg, #eca413 0%, #c0850f 100%); color: #ffffff; padding: 18px 40px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 20px; box-shadow: 0 4px 15px rgba(236, 164, 19, 0.4);">
                                    📞 Call {$companyPhone}
                                </a>
                            </div>
                            
                            <!-- Trust Badges -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="15" cellspacing="0">
                                            <tr>
                                                <td style="text-align: center; padding: 0 15px;">
                                                    <span style="font-size: 28px;">🛡️</span>
                                                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #666; font-weight: 600;">Licensed<br/>& Insured</p>
                                                </td>
                                                <td style="text-align: center; padding: 0 15px;">
                                                    <span style="font-size: 28px;">💰</span>
                                                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #666; font-weight: 600;">Free<br/>Estimates</p>
                                                </td>
                                                <td style="text-align: center; padding: 0 15px;">
                                                    <span style="font-size: 28px;">⭐</span>
                                                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #666; font-weight: 600;">5-Star<br/>Rated</p>
                                                </td>
                                                <td style="text-align: center; padding: 0 15px;">
                                                    <span style="font-size: 28px;">🔑</span>
                                                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #666; font-weight: 600;">15+ Years<br/>Experience</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #181611; padding: 30px; text-align: center;">
                            <p style="color: #eca413; margin: 0 0 8px 0; font-size: 18px; font-weight: 700;">
                                {$companyName}
                            </p>
                            <p style="color: #888; margin: 0 0 15px 0; font-size: 14px;">
                                Your Trusted Locksmith in Northern New Jersey
                            </p>
                            <p style="color: #666; margin: 0; font-size: 13px;">
                                <a href="tel:{$companyPhone}" style="color: #eca413; text-decoration: none; font-weight: 600;">{$companyPhone}</a>
                                &nbsp;•&nbsp;
                                <a href="mailto:{$companyEmail}" style="color: #eca413; text-decoration: none;">{$companyEmail}</a>
                            </p>
                            <p style="color: #666; margin: 12px 0 0 0; font-size: 13px;">
                                <a href="{$websiteUrl}" style="color: #eca413; text-decoration: none;">{$websiteUrl}</a>
                            </p>
                        </td>
                    </tr>
                </table>
                
                <!-- Unsubscribe/Legal -->
                <table width="600" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                    <tr>
                        <td style="text-align: center; font-size: 11px; color: #999; padding: 0 20px;">
                            You received this email because you submitted a contact form on our website.
                            <br/>© 2026 {$companyName}. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
}

/**
 * Client autoresponder email plain text version
 */
function getAutoresponderTextVersion(array $data): string
{
    $companyName = COMPANY_NAME;
    $companyPhone = COMPANY_PHONE;
    $companyEmail = COMPANY_EMAIL;
    $websiteUrl = WEBSITE_URL;

    return <<<TEXT
THANK YOU FOR CONTACTING US!
============================

Dear {$data['name']},

Thank you for reaching out to {$companyName}. We have received your inquiry regarding {$data['service']} and one of our team members will be in touch with you shortly.

WHAT HAPPENS NEXT?
------------------
- Our team will review your request
- We'll contact you to discuss your needs
- We'll schedule a free on-site assessment if needed
- You'll receive a detailed estimate before any work begins

If you need immediate assistance, please call us directly at {$companyPhone}.

Best regards,
The {$companyName} Team

---
{$companyName}
Phone: {$companyPhone}
Email: {$companyEmail}
Website: {$websiteUrl}
TEXT;
}

/**
 * Sanitize user input
 */
function sanitizeInput(string $input): string
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

/**
 * Log form submissions
 */
function logSubmission(string $type, array $data): void
{
    if (!ENABLE_LOGGING) {
        return;
    }

    $logFile = __DIR__ . '/logs/submissions.log';
    $logDir = dirname($logFile);

    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }

    $logEntry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'type' => $type,
        'data' => $data
    ];

    file_put_contents(
        $logFile,
        json_encode($logEntry) . PHP_EOL,
        FILE_APPEND | LOCK_EX
    );
}

/**
 * Send JSON response
 */
function sendResponse(bool $success, string $message, int $httpCode = 200): void
{
    http_response_code($httpCode);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit();
}
