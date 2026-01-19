<?php
/**
 * Email Template Test Script
 * 
 * Sends test emails to verify both company notification and client autoresponder
 * templates are working correctly with the Royal Locksmith design system.
 * 
 * DELETE THIS FILE AFTER TESTING!
 */

require_once __DIR__ . '/config.php';

// Set headers
header('Content-Type: application/json');

// Test data that mimics a real form submission
$testData = [
    'name' => 'Test Customer',
    'email' => 'yaron@gettmarketing.com',  // Send test to your email
    'phone' => '(551) 555-1234',
    'service' => 'Emergency Lockout',
    'address' => '123 Test Street, Jersey City, NJ 07302',
    'message' => 'This is a test submission to verify the email templates are styled correctly with the Royal Locksmith design system. It includes the gold gradient header, trust badges, and proper formatting.',
    'submitted_at' => date('F j, Y g:i A T'),
    'ip_address' => '127.0.0.1',
    'recaptcha_score' => '0.9',
    'form_source' => 'test_script'
];

echo "=== Royal Locksmith Email Template Test ===\n\n";

// Test 1: Company Notification
echo "1. Sending Company Notification Email...\n";
$companyResult = sendCompanyNotification($testData);
if ($companyResult['success']) {
    echo "   ✓ Company notification sent successfully!\n";
} else {
    echo "   ✗ Failed: " . htmlspecialchars($companyResult['error'] ?? 'Unknown error', ENT_QUOTES, 'UTF-8') . "\n";
}

// Test 2: Client Autoresponder
echo "\n2. Sending Client Autoresponder Email...\n";
$clientResult = sendClientAutoresponder($testData);
if ($clientResult['success']) {
    echo "   ✓ Client autoresponder sent successfully!\n";
} else {
    echo "   ✗ Failed: " . htmlspecialchars($clientResult['error'] ?? 'Unknown error', ENT_QUOTES, 'UTF-8') . "\n";
}

echo "\n=== Test Complete ===\n";
echo "Check your inbox at: " . $testData['email'] . "\n";
echo "\n⚠️ IMPORTANT: Delete this test file after testing!\n";

// Include the email functions from contact.php
// (They're already available since we required config.php and the functions are in contact.php)

/**
 * Send notification email to company addresses via SMTP2GO
 */
function sendCompanyNotification(array $data): array
{
    $subject = "🧪 TEST: New Contact Form Submission - {$data['service']}";

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
    $subject = "🧪 TEST: Thank you for contacting " . COMPANY_NAME;

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

// Include the template functions from contact.php
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
                            
                            <h3 style="color: #181611; margin: 30px 0 15px 0; font-size: 18px; font-weight: 700;">💬 Customer Message</h3>
                            <div style="background: linear-gradient(135deg, #fff8eb 0%, #fbeab9 100%); padding: 20px; border-radius: 12px; border-left: 5px solid #eca413; font-size: 15px; line-height: 1.7; color: #333;">
                                {$data['message']}
                            </div>
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
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #eca413 0%, #c0850f 100%); padding: 40px 30px; text-align: center;">
                            <img src="{$websiteUrl}/images/logo.webp" alt="{$companyName}" style="height: 55px; margin-bottom: 20px;" />
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                                Thank You, {$data['name']}! ✨
                            </h1>
                            <p style="color: rgba(255,255,255,0.95); margin: 12px 0 0 0; font-size: 16px;">
                                We've received your request for <strong>{$data['service']}</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 35px;">
                            <p style="color: #333333; font-size: 17px; line-height: 1.7; margin: 0 0 25px 0;">
                                Thank you for choosing <strong style="color: #eca413;">{$companyName}</strong>! We're committed to providing you with exceptional locksmith services.
                            </p>
                            
                            <!-- What Happens Next -->
                            <div style="background: linear-gradient(135deg, #fff8eb 0%, #fef3c7 100%); padding: 28px; border-radius: 16px; margin: 30px 0; border: 1px solid #fde68a;">
                                <h3 style="color: #92400e; margin: 0 0 18px 0; font-size: 20px; font-weight: 700;">⏱️ What Happens Next?</h3>
                                <p style="color: #78350f; font-size: 15px; margin: 8px 0;"><strong>1. Review</strong> — Our team will review your request shortly</p>
                                <p style="color: #78350f; font-size: 15px; margin: 8px 0;"><strong>2. Contact</strong> — We'll call or email to discuss your needs</p>
                                <p style="color: #78350f; font-size: 15px; margin: 8px 0;"><strong>3. Estimate</strong> — Receive a free, no-obligation quote</p>
                                <p style="color: #78350f; font-size: 15px; margin: 8px 0;"><strong>4. Service</strong> — Expert locksmith at your location</p>
                            </div>
                            
                            <!-- CTA -->
                            <div style="text-align: center; margin: 35px 0;">
                                <p style="color: #666; font-size: 15px; margin: 0 0 15px 0;">Need immediate assistance?</p>
                                <a href="tel:{$companyPhone}" style="display: inline-block; background: linear-gradient(135deg, #eca413 0%, #c0850f 100%); color: #ffffff; padding: 18px 40px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 20px; box-shadow: 0 4px 15px rgba(236, 164, 19, 0.4);">
                                    📞 Call {$companyPhone}
                                </a>
                            </div>
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
