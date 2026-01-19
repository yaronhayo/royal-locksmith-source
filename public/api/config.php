<?php
/**
 * API Configuration
 * 
 * This file is safe to commit to git - it contains no secrets.
 * 
 * API keys are loaded from .env.php which:
 * 1. MUST be uploaded separately via FTP
 * 2. MUST NOT be committed to git
 * 3. Should have permissions set to 640 or 600
 * 
 * For Hostinger FTP deployment:
 * 1. Deploy all files normally
 * 2. Upload .env.php separately to /public_html/api/
 * 3. Set restrictive permissions on .env.php
 */

// Set default timezone for lead processing
date_default_timezone_set('America/New_York');

// Load private environment variables (API keys)
$envFile = __DIR__ . '/.env.php';
if (file_exists($envFile)) {
    require_once $envFile;
} else {
    // Fallback for development or missing env file
    if (!defined('SMTP2GO_API_KEY')) {
        define('SMTP2GO_API_KEY', 'MISSING_ENV_FILE');
    }
    if (!defined('RECAPTCHA_SECRET_KEY')) {
        define('RECAPTCHA_SECRET_KEY', 'MISSING_ENV_FILE');
    }
}

// =============================================================================
// COMPANY INFORMATION
// =============================================================================

/** Company name for email templates */
define('COMPANY_NAME', 'Royal Locksmith');

/** Company phone number */
define('COMPANY_PHONE', '(551) 292-8090');

/** Company email for footer */
define('COMPANY_EMAIL', 'info@royallocksmithnj.com');

/** Website URL */
define('WEBSITE_URL', 'https://royallocksmithnj.com');

// =============================================================================
// EMAIL RECIPIENTS
// =============================================================================

/**
 * Company email addresses to receive contact form notifications
 * Add up to 3 email addresses
 */
define('COMPANY_EMAIL_ADDRESSES', [
    'yaron@gettmarketing.com',
    'sandrahmarketing@gmail.com',
    'eviatarmarketing@gmail.com',
]);

// =============================================================================
// SMTP2GO CONFIGURATION
// =============================================================================

/**
 * Sender email address (must be verified in SMTP2GO)
 * Format: "Company Name <email@domain.com>"
 */
define('SMTP2GO_SENDER_EMAIL', 'Royal Locksmith <noreply@royallocksmithnj.com>');

// =============================================================================
// RECAPTCHA CONFIGURATION
// =============================================================================

/**
 * reCAPTCHA score threshold (0.0 - 1.0)
 * Lower values are more lenient, higher values are stricter
 * Recommended: 0.5 for most sites
 */
define('RECAPTCHA_THRESHOLD', 0.5);

// =============================================================================
// LOGGING
// =============================================================================

/**
 * Enable submission logging
 * Set to false in production if not needed
 */
define('ENABLE_LOGGING', true);

// =============================================================================
// SECURITY
// =============================================================================

/**
 * Allowed origins for CORS
 * Update with your actual domain(s)
 */
define('ALLOWED_ORIGINS', [
    'https://royallocksmithnj.com',
    'https://www.royallocksmithnj.com',
]);
