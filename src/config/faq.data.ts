/**
 * FAQ Data
 * 
 * Comprehensive FAQ content for all 7 categories.
 * Each category contains 48 unique, Google-compliant Q&As.
 * 
 * Compliance Notes:
 * - No specific response time claims (SAB policy)
 * - No specific pricing claims
 * - Focus on service descriptions and general guidance
 */

import type { FAQItem } from '../components/ui/FAQCategorySection';
import { siteConfig } from './site.config';

export interface FAQCategory {
  title: string;
  icon: string;
  faqs: FAQItem[];
}

// General Questions - 48 FAQs
const generalQuestions: FAQItem[] = [
  { question: 'What locksmith services do you offer?', answer: `${siteConfig.name} provides comprehensive locksmith services including residential lock installation and repair, commercial security systems, automotive locksmith services, and emergency lockout assistance. Our licensed technicians are trained to handle all types of locks and security systems.` },
  { question: 'Are you licensed and insured?', answer: `Yes, ${siteConfig.name} is fully licensed, bonded, and insured. Our license number is ${siteConfig.trustSignals.licenseNumber}. All our technicians undergo background checks and continuous training to ensure the highest quality service.` },
  { question: 'What areas do you serve?', answer: `We proudly serve ${siteConfig.serviceArea.region} and surrounding communities. Visit our Service Areas page for a complete list of locations we cover.` },
  { question: 'Do you provide free estimates?', answer: 'Yes, we provide free on-site inspections and estimates for all our services. Our technician will assess your needs, explain the available options, and provide a detailed quote before any work begins. There is no obligation.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, cash, and business checks. Payment is typically collected after the service is completed to your satisfaction.' },
  { question: 'Do you offer warranties on your work?', answer: 'Yes, we stand behind our work with comprehensive warranties. Parts and labor are typically covered, and the specific warranty period varies by service type. Our technician will explain warranty details before beginning any work.' },
  { question: 'How do I know if a locksmith is legitimate?', answer: 'A legitimate locksmith should have a valid state license, arrive in a marked vehicle, provide identification, give a clear quote before starting work, and use professional-grade equipment. You can verify our license number with NJ state licensing authorities.' },
  { question: 'Can I schedule an appointment in advance?', answer: 'Absolutely! While we accommodate urgent requests, we also welcome scheduled appointments. Booking ahead ensures a technician is available at your preferred time. You can schedule online or call our office.' },
  { question: 'Do you offer senior citizen discounts?', answer: 'Yes, we offer discounts for senior citizens, military personnel, and first responders. Please mention your eligibility when scheduling your service, and have appropriate ID ready when the technician arrives.' },
  { question: 'What brands of locks do you work with?', answer: 'Our technicians are trained to work with all major lock brands including Schlage, Kwikset, Baldwin, Medeco, Mul-T-Lock, ASSA ABLOY, Yale, and many more. We can service, repair, or replace virtually any lock type.' },
  { question: 'Are your technicians background-checked?', answer: 'Yes, every technician undergoes a comprehensive background check before joining our team. We take security seriously and only hire trustworthy professionals you can feel confident allowing into your home or business.' },
  { question: 'Do you offer maintenance services for locks?', answer: 'Yes, regular lock maintenance can extend the life of your locks and prevent lockouts. We offer cleaning, lubrication, adjustment, and inspection services for all types of residential, commercial, and automotive locks.' },
  { question: 'Can you help with safe opening and repair?', answer: 'Yes, our technicians are trained in safe opening, repair, and combination changes. We can help with home safes, gun safes, commercial safes, and vault doors. Most safes can be opened without damage.' },
  { question: 'What should I do if my key breaks in the lock?', answer: 'Do not attempt to extract the broken key yourself, as this can push fragments deeper or damage the lock. Contact us for professional extraction. Our technicians have specialized tools to safely remove broken keys without damaging your lock.' },
  { question: 'Do you sell locks and security hardware?', answer: 'Yes, we carry a wide selection of high-quality locks and security hardware from leading manufacturers. Our technicians can help you select the right products for your specific security needs and install them professionally.' },
  { question: 'How do I maintain my locks to prevent issues?', answer: 'Regular maintenance includes lubricating the keyhole annually with graphite powder (not oil), checking screws for tightness, testing the lock mechanism, and inspecting weatherstripping around exterior doors. We offer professional maintenance services as well.' },
  { question: 'What is the difference between rekeying and replacing a lock?', answer: 'Rekeying changes the internal pins so old keys no longer work, while keeping the existing hardware. Replacing involves installing an entirely new lock. Rekeying is more cost-effective when your current locks are in good condition.' },
  { question: 'Do you provide security consultations?', answer: 'Yes, we offer comprehensive security assessments for homes and businesses. Our experts will evaluate your current security measures, identify vulnerabilities, and provide recommendations tailored to your specific needs and budget.' },
  { question: 'Can you install security cameras as well?', answer: 'While our primary focus is locks and access control, we work with trusted partners for comprehensive security solutions including cameras. We can coordinate integrated security systems that include video surveillance.' },
  { question: 'What qualifications do your locksmiths have?', answer: 'All our locksmiths are state-licensed, fully insured, and have completed extensive training programs. Many hold certifications from ALOA (Associated Locksmiths of America) and undergo continuous education to stay current with industry advances.' },
  { question: 'Do you handle locksmith services for property managers?', answer: 'Yes, we work extensively with property managers, landlords, and real estate companies. We offer rekeying services between tenants, master key systems, and can handle multiple properties efficiently. Ask about our property management programs.' },
  { question: 'What happens if a key is stuck in the lock?', answer: 'A stuck key often indicates worn keys, foreign objects in the lock, or mechanical issues. Our technicians can safely extract the key and diagnose the underlying problem. Avoid forcing the key, as this can cause more damage.' },
  { question: 'Can you help with antique or vintage locks?', answer: 'Yes, we have experience with antique and vintage locks. We can often repair, restore, or create keys for historic hardware while preserving its original character. We approach antique locks carefully to maintain their value.' },
  { question: 'Do you offer same-day service?', answer: 'Yes, we offer same-day service for most requests, subject to technician availability. For urgent needs, call us directly and we will do our best to accommodate your schedule. Planned services can be scheduled in advance.' },
  { question: 'What is a bump key and am I at risk?', answer: 'A bump key is a specially cut key that can open many pin tumbler locks. While concerning, high-security locks and bump-resistant cylinders provide excellent protection. We can assess your locks and recommend upgrades if needed.' },
  { question: 'Can you duplicate restricted keys?', answer: 'Restricted keys have manufacturer controls requiring authorization for duplication. If you have documentation proving ownership, we can often help. In some cases, we work directly with manufacturers to obtain proper authorization.' },
  { question: 'Do you work on weekends and holidays?', answer: 'Yes, our services are available seven days a week, including most holidays. While standard business hours offer the most flexibility, we understand that lock problems do not follow a schedule.' },
  { question: 'How can I improve the security of my front door?', answer: 'Key improvements include installing a deadbolt if you do not have one, using a reinforced strike plate with 3-inch screws, adding a door reinforcement kit, upgrading to a high-security lock, and ensuring proper door alignment.' },
  { question: 'What is a master key system?', answer: 'A master key system allows one master key to open multiple locks, while individual keys only open their specific lock. This is ideal for businesses, landlords, and homes with multiple entry points. We design custom systems to meet your needs.' },
  { question: 'Can you remove and reinstall locks during renovations?', answer: 'Yes, we can carefully remove locks before renovation work and reinstall them afterward, or install new locks to match your updated design. We coordinate with contractors to ensure proper timing and security throughout the project.' },
  { question: 'What should I look for in a high-security lock?', answer: 'Look for locks with anti-pick pins, anti-drill plates, reinforced strike plates, bump resistance, and restricted key blanks. UL listings and ANSI commercial grades (1 or 2) indicate higher security levels. We can recommend specific options.' },
  { question: 'Do you offer lock installation for new construction?', answer: 'Yes, we work with builders, contractors, and homeowners on new construction projects. We can help select appropriate hardware, install locks throughout the property, and set up master key systems during the building phase.' },
  { question: 'Can you help after a break-in?', answer: 'Absolutely. After a break-in, we can assess the damage, repair or replace compromised locks, rekey all locks, and recommend additional security measures. We also provide documentation for insurance claims.' },
  { question: 'What are bump-resistant locks?', answer: 'Bump-resistant locks have special pin configurations that prevent the bumping technique from working. Many modern high-security locks include this feature. We can assess your current locks and recommend bump-resistant upgrades.' },
  { question: 'How often should I change my locks?', answer: 'Consider changing or rekeying locks when moving to a new home, after a break-in, if keys are lost or stolen, after ending a relationship with someone who had keys, or if locks show signs of wear or damage.' },
  { question: 'Do you offer peephole installation?', answer: 'Yes, we install peepholes and door viewers in most door types. Options include standard peepholes, wide-angle viewers, and digital peepholes with screens. This adds a layer of security by letting you see who is at your door.' },
  { question: 'What is a security audit?', answer: 'A security audit is a comprehensive evaluation of all access points, locks, lighting, and potential vulnerabilities in your home or business. We provide a detailed report with prioritized recommendations to improve your security.' },
  { question: 'Can you install a mail slot lock?', answer: 'Yes, we can secure mail slots with locks or covers to prevent mail theft and intrusion attempts. We offer various options to match your door style while improving security.' },
  { question: 'Do you provide invoices for insurance purposes?', answer: 'Yes, we provide detailed invoices documenting all work performed, parts used, and costs. These can be used for insurance claims, tax records, or property management documentation.' },
  { question: 'What is the ANSI grading system for locks?', answer: 'ANSI grades rate lock durability and security. Grade 1 is the highest (commercial), Grade 2 is medium (heavy residential), and Grade 3 is standard residential. We can explain which grade is appropriate for your needs.' },
  { question: 'Can you install a door reinforcement kit?', answer: 'Yes, door reinforcement kits strengthen the door frame and add protection against kick-ins. We install complete kits that include frame reinforcement, hinges protection, and upgraded strike plates.' },
  { question: 'Do you work with HOAs and condo associations?', answer: 'Yes, we frequently work with HOAs and condo associations on common area locks, master key systems, and individual unit needs. We understand the unique requirements of multi-unit properties.' },
  { question: 'What brands do you recommend for home security?', answer: 'For residential security, we recommend brands like Schlage, Kwikset, and Baldwin for standard needs. For high-security applications, Medeco, Mul-T-Lock, and ASSA ABLOY offer excellent protection. We match recommendations to your specific situation.' },
  { question: 'Can you help secure sliding glass doors?', answer: 'Yes, we install auxiliary locks, Charlie bars, and security pins for sliding doors. These additions significantly improve security against forced entry through sliding glass doors.' },
  { question: 'What is a keyless entry system?', answer: 'Keyless entry systems allow access without traditional keys, using codes, fingerprints, smartphones, or key fobs. Benefits include no keys to lose, easy code changes, and access logging. We install various keyless options.' },
  { question: 'Do you offer lock services for storage units?', answer: 'Yes, we can open, replace, or repair locks on storage units and provide high-security padlocks. We work with both individual renters and storage facility managers.' },
  { question: 'How do I verify your company credentials?', answer: `You can verify our license (${siteConfig.trustSignals.licenseNumber}) with NJ state authorities, check our reviews on Google and Yelp, and confirm our insurance coverage. Our technicians carry ID and arrive in marked vehicles.` },
];

// Residential Services - 48 FAQs
const residentialQuestions: FAQItem[] = [
  { question: 'Can you rekey my locks instead of replacing them?', answer: 'Absolutely! Rekeying is often a cost-effective alternative to full lock replacement. Our technicians can rekey your existing locks so that old keys no longer work, while your current hardware remains in place. This is ideal when moving into a new home or after losing keys.' },
  { question: 'Do you install smart locks?', answer: 'Yes, we install and service a wide variety of smart locks and electronic access systems. Our technicians are trained on all major brands and can help you choose the right smart lock solution for your home security needs.' },
  { question: 'Can you make keys for all types of residential locks?', answer: 'We can create keys for virtually all residential lock types, including standard pin tumbler locks, high-security locks, deadbolts, and more. We use professional-grade equipment to ensure precise key cutting.' },
  { question: 'What types of deadbolts do you recommend?', answer: 'We typically recommend Grade 1 or Grade 2 deadbolts with at least a 1-inch throw bolt. Single-cylinder deadbolts are standard, while double-cylinder options are available for doors with glass. High-security options from Medeco or Mul-T-Lock offer enhanced protection.' },
  { question: 'Can you install locks on interior doors?', answer: 'Yes, we install privacy locks for bathrooms and bedrooms, keyed entry locks for home offices, and passage sets for closets and hallways. We can also add key locks to interior doors for additional security.' },
  { question: 'Do you offer whole-house rekeying?', answer: 'Yes, we offer comprehensive whole-house rekeying services. We can rekey all your locks to work with a single key, making it convenient while improving security. This is an excellent choice when moving into a new home.' },
  { question: 'What smart lock features should I consider?', answer: 'Consider features like keypad entry, smartphone control, auto-lock, guest codes, activity logging, and integration with home automation systems. Battery backup is important, as is compatibility with your existing door and deadbolt hole.' },
  { question: 'Can you repair a stuck or hard-to-turn lock?', answer: 'Yes, locks can become stiff due to dirt, worn parts, or misalignment. We can clean, lubricate, adjust, or replace internal components to restore smooth operation. Sometimes, door frame adjustments are needed as well.' },
  { question: 'Do you install keypad entry systems for homes?', answer: 'Yes, keypad locks are increasingly popular for homes. They eliminate keys, allow temporary codes for guests or service providers, and many models integrate with smart home systems. We install both standalone and connected keypads.' },
  { question: 'What is a bump-proof lock?', answer: 'Bump-proof (or bump-resistant) locks use special anti-bump pins or sidebars that prevent the lock from opening when struck with a bump key. Many high-security locks include this feature, and we can recommend options for your home.' },
  { question: 'Can you change the locks on my new home?', answer: 'Absolutely. This is one of our most requested services. We can rekey your locks so previous keys no longer work, or install all new locks if you prefer. Many new homeowners choose this for peace of mind.' },
  { question: 'Do you repair or replace mailbox locks?', answer: 'Yes, we can open, repair, or replace locks on both wall-mounted and curbside mailboxes. We carry common mailbox lock types and can often match your existing key system.' },
  { question: 'Can you install a keyless entry lock on a rental property?', answer: 'Yes, keyless locks are excellent for rentals because you can easily change codes between tenants without rekeying. Check with your landlord or HOA for any restrictions on lock types before installation.' },
  { question: 'What is a Grade 1 lock?', answer: 'Grade 1 is the highest ANSI security rating, designed for heavy commercial use but increasingly popular in homes. These locks withstand more abuse, offer better protection against forced entry, and typically last longer than lower grades.' },
  { question: 'Do you install locks on garage service doors?', answer: 'Yes, we install and service locks on garage service doors (the walk-through door, not the main garage door). We can also add deadbolts for extra security, as these doors are often overlooked entry points.' },
  { question: 'Can you help with a door that does not latch properly?', answer: 'Often, latching issues are caused by misalignment between the door and frame. We can adjust strike plates, plane doors, or shim hinges to restore proper operation. Sometimes the latch mechanism itself needs adjustment or replacement.' },
  { question: 'What is a privacy lock?', answer: 'Privacy locks are designed for bathrooms and bedrooms. They have a push-button or turn-button lock on the inside but no keyed entry on the outside (just an emergency release slot). They provide privacy without high-security needs.' },
  { question: 'Do you install French door locks?', answer: 'Yes, French doors present unique security challenges. We install multi-point locking systems, flush bolts, and astragal locks to secure both active and passive doors properly.' },
  { question: 'Can you add a lock to my bedroom door?', answer: 'Yes, you can add either a privacy lock (no key, just inside lock) or a keyed entry lock to any bedroom door. We can match the finish and style of your existing hardware throughout the home.' },
  { question: 'What are decorative door locks?', answer: 'Decorative locks combine security with aesthetics, available in various finishes (brushed nickel, oil-rubbed bronze, brass) and styles (traditional, modern, rustic). We can help coordinate your security hardware with your home decor.' },
  { question: 'Do you install chain locks or door guards?', answer: 'Yes, we install surface-mounted chain locks, swing guards, and security latches that allow you to partially open the door while remaining secure. These are useful secondary security devices.' },
  { question: 'Can you install a biometric lock?', answer: 'Yes, we install fingerprint-reading biometric locks. These provide keyless convenience and are difficult to bypass. Most biometric locks also have backup entry methods like keypads or key overrides.' },
  { question: 'What is a passage lock?', answer: 'Passage (or hall/closet) locks have handles or knobs but no locking function. They are used for closets, pantries, and interior doors where privacy and security are not needed but a handle is required.' },
  { question: 'Do you offer lock matching services?', answer: 'Yes, if you need to match existing lock styles and finishes, we can source hardware that complements what you have. We work with multiple manufacturers to find the best matches.' },
  { question: 'Can you install a hotel-style lock?', answer: 'Hotel-style (or classroom function) locks are always locked from outside unless unlocked with a key. These are useful for home offices, studies, or any room you want secured by default.' },
  { question: 'What security upgrades do you recommend for older homes?', answer: 'Older homes often benefit from new deadbolts, reinforced strike plates with 3-inch screws, frame reinforcement, and upgraded door hinges. Window locks and secondary door security devices also help.' },
  { question: 'Do you install locks on pet doors?', answer: 'Yes, many pet doors have locking mechanisms. We can install pet doors with secure locks or add locking capability to existing pet doors to improve your home security when needed.' },
  { question: 'Can you help with door frame repair?', answer: 'We handle minor door frame repairs related to lock installation or damage from attempted break-ins. This includes reinforcing damaged jambs, adjusting misaligned frames, and installing frame reinforcement kits.' },
  { question: 'What is keyed alike?', answer: 'Keyed alike means multiple locks are set to open with the same key. This is convenient for homes with multiple entry points. We can set up new locks keyed alike or rekey existing locks to work together.' },
  { question: 'Do you install locks on storm doors?', answer: 'Yes, we install and service locks, deadbolts, and multi-point locking systems on storm doors. A secure storm door adds an extra layer of protection for your main entry.' },
  { question: 'Can you repair a broken door handle?', answer: 'Yes, we can repair or replace broken door handles, knobs, and lever sets. Often the internal mechanism can be repaired without replacing the entire lock set.' },
  { question: 'What is a double-cylinder deadbolt?', answer: 'A double-cylinder deadbolt requires a key to open from both inside and outside. These are used on doors with glass panels to prevent intruders from breaking the glass and reaching in to unlock. Note: they can be a fire safety concern if keys are not accessible.' },
  { question: 'Do you install locks on gates and fences?', answer: 'Yes, we install padlocks, gate latches, and keyed locks on gates and fences. From garden gates to driveway gates, we have solutions to secure perimeter access points.' },
  { question: 'Can you rekey locks if I lost all my keys?', answer: 'Yes, if all keys are lost, we can pick or decode the lock, then rekey it to new keys. No need to replace the entire lock. This is a common service we provide.' },
  { question: 'What are interchangeable core locks?', answer: 'Interchangeable core (IC) locks allow the core to be quickly swapped without disassembling the lock. This makes rekeying very fast. While more common in commercial settings, they can be used in homes for easy key changes.' },
  { question: 'Do you sell and install safes?', answer: 'Yes, we sell and install a variety of home safes including fire-resistant safes, gun safes, and wall/floor safes. We can recommend the right safe for your valuables and install it securely.' },
  { question: 'Can you change the locks on my apartment?', answer: 'If you own the apartment or have landlord permission, yes. Many landlords require approved locksmiths and may need to have a copy of the new key. Always check your lease terms first.' },
  { question: 'What is a mortise lock?', answer: 'Mortise locks fit into a pocket (mortise) cut into the door edge. They are common in older homes and high-end new construction. We service, repair, and install mortise locks of all types.' },
  { question: 'Do you install window locks?', answer: 'Yes, we install keyed window locks, window bars, and secondary security devices for all window types. Securing windows is an important part of overall home security.' },
  { question: 'Can you open a locked bedroom door?', answer: 'Yes, interior door locks are designed for privacy, not security. We can open most bedroom and bathroom doors quickly and without damage, then reset the lock if needed.' },
  { question: 'What is the best lock for a front door?', answer: 'We recommend a Grade 1 or Grade 2 deadbolt with at least a 1-inch throw, combined with a high-quality handleset. For maximum security, consider high-security cylinders from brands like Medeco or Mul-T-Lock.' },
  { question: 'Do you install door closers on residential doors?', answer: 'Yes, door closers ensure that doors close and latch automatically. While more common commercially, they are useful for garage-to-home doors and other residential applications requiring self-closing.' },
  { question: 'Can you secure a hollow-core door?', answer: 'Hollow-core doors have limited security due to their construction. If replacement is not an option, we can install surface-mounted locks, reinforce the area around the lock, and add secondary security devices.' },
  { question: 'What is a lever handle lock?', answer: 'Lever handle locks are easier to operate than knobs, especially for those with limited hand strength or mobility. They are ADA-compliant and available in privacy, passage, and keyed entry configurations.' },
  { question: 'Do you repair sliding door locks?', answer: 'Yes, we repair and replace locks on sliding glass doors. We also install auxiliary locks, Charlie bars, and foot locks for added sliding door security.' },
  { question: 'Can you install a lock on an existing door?', answer: 'Yes, whether you need to add a deadbolt above your door handle or install a knob lock, we have the tools to bore holes and retrofit locks onto existing doors.' },
  { question: 'What lock features help with home automation?', answer: 'Smart locks with Z-Wave, Zigbee, Wi-Fi, or Bluetooth connectivity integrate with home automation platforms like SmartThings, Apple HomeKit, Amazon Alexa, and Google Home for remote control and automation.' },
  { question: 'Do you offer a warranty on residential lock installation?', answer: 'Yes, we provide warranties on both parts and labor for residential lock installations. Warranty terms vary by product, and our technician will explain the specific coverage for your installation.' },
];

// Commercial Services - 48 FAQs
const commercialQuestions: FAQItem[] = [
  { question: 'Do you service commercial access control systems?', answer: 'Yes, we specialize in commercial access control systems including keypad entry, card readers, biometric systems, and master key systems. We can install new systems or service and upgrade existing ones to meet your business security requirements.' },
  { question: 'Can you create a master key system for my business?', answer: 'Absolutely. We design and implement master key systems that allow different levels of access for employees while giving management master access to all areas. This provides both security and convenience for your business operations.' },
  { question: 'Do you offer commercial security assessments?', answer: 'Yes, we provide comprehensive security assessments for businesses. Our experts will evaluate your current security measures, identify vulnerabilities, and recommend solutions to enhance your overall security posture.' },
  { question: 'What is a restricted keyway?', answer: 'A restricted keyway uses patented key blanks that cannot be duplicated at hardware stores. Only authorized locksmiths can cut these keys with proper documentation. This prevents unauthorized key copies and increases your security.' },
  { question: 'Do you install panic bars and exit devices?', answer: 'Yes, we install, repair, and maintain panic bars (push bars), rim exit devices, vertical rod devices, and other emergency exit hardware. We ensure compliance with fire codes while maintaining security.' },
  { question: 'Can you integrate locks with our alarm system?', answer: 'Many modern access control systems can integrate with alarm systems for comprehensive security. We work with various platforms and can coordinate with your alarm company for seamless integration.' },
  { question: 'What are high-security commercial locks?', answer: 'High-security commercial locks feature anti-pick, anti-drill, anti-bump, and anti-snap protection, plus restricted keyways. Brands like Medeco, Mul-T-Lock, and ASSA offer commercial-grade high-security options.' },
  { question: 'Do you offer 24/7 commercial locksmith services?', answer: 'Yes, we understand that businesses operate on various schedules. Our commercial locksmith services are available around the clock for lockouts, urgent repairs, and security concerns.' },
  { question: 'Can you rekey an entire office building?', answer: 'Yes, we regularly rekey entire office buildings, schools, and healthcare facilities. We can work during off-hours to minimize disruption and can set up master key systems as part of the rekeying project.' },
  { question: 'What is a maglok or magnetic lock?', answer: 'Electromagnetic locks (maglocks) use an electromagnet to secure doors. They require power to stay locked and fail safe (unlock) when power is lost. They are commonly used in access control systems with keypads or card readers.' },
  { question: 'Do you install card reader systems?', answer: 'Yes, we install proximity card, smart card, and swipe card systems for commercial access control. These systems provide easy access management, audit trails, and can be programmed for various access levels.' },
  { question: 'Can you set up key control programs for our business?', answer: 'Yes, key control programs help you track who has keys, when they were issued, and restrict unauthorized duplication. We sell key cabinets, tracking systems, and can set up restricted key programs.' },
  { question: 'What commercial locks are ADA compliant?', answer: 'ADA requires lever handles (not round knobs) on doors along accessible routes. The levers must operate with one hand, without tight grasping or twisting, and with no more than 5 pounds of force. We install compliant hardware.' },
  { question: 'Do you offer scheduled maintenance for commercial locks?', answer: 'Yes, we offer maintenance contracts for businesses that include regular inspections, cleaning, lubrication, and adjustment of all locks and access control equipment. This prevents problems and extends equipment life.' },
  { question: 'Can you install locks on commercial glass doors?', answer: 'Yes, we install various locks for commercial glass doors including storefront locks, electric strikes, magnetic locks, and access control systems. We select appropriate hardware based on the glass and frame type.' },
  { question: 'What is an electric strike?', answer: 'An electric strike replaces the standard strike plate and can be unlocked remotely (via button, keypad, or access system). The door can then be pushed open without a key. They are common for buzz-in systems.' },
  { question: 'Do you install keypad locks for businesses?', answer: 'Yes, commercial keypads are popular for high-traffic areas. They eliminate keys, allow easy code changes, and can be standalone or networked. Many offer audit trails showing who accessed which door and when.' },
  { question: 'Can you help after a commercial break-in?', answer: 'Yes, we provide emergency response for commercial break-ins to secure your premises immediately. We can board up damaged entry points, repair or replace compromised locks, and provide documentation for insurance.' },
  { question: 'What is a crash bar?', answer: 'Crash bars (panic bars or push bars) are horizontal bars across exit doors that unlock when pushed. They are required on many commercial doors by fire codes to ensure quick egress during emergencies.' },
  { question: 'Do you service fire-rated doors?', answer: 'Yes, fire-rated doors require specific hardware. We install and service fire-rated locks, closers, and panic devices. All hardware must be fire-rated to maintain the door assembly rating.' },
  { question: 'Can you install a buzzer entry system?', answer: 'Yes, we install intercom and buzzer systems that allow you to screen and admit visitors. These systems are common for office buildings, apartment buildings, and any business wanting to control entry.' },
  { question: 'What is grand master keying?', answer: 'Grand master keying creates multiple levels of access within a master key system. For example, janitors might have floor-level masters, department heads have building masters, and management has the grand master for all locks.' },
  { question: 'Do you install locks for file cabinets and desks?', answer: 'Yes, we can add locks to, rekey, or replace locks on file cabinets, desks, and office furniture. We can often key them to match your existing office key system.' },
  { question: 'Can you set up temporary access for contractors?', answer: 'Yes, with master key systems or electronic access control, we can provide temporary keys or codes that are easily deactivated when the project ends. This maintains security while allowing necessary access.' },
  { question: 'What security measures do you recommend for retail stores?', answer: 'For retail, we recommend high-security locks on all entries, crash bars for exits (compliant but secure), display case locks, cash room security, and after-hours access control. Security cameras complement these physical measures.' },
  { question: 'Do you work with property management companies?', answer: 'Yes, we have extensive experience working with property managers. We offer rekeying between tenants, master key systems for building-wide access, and can handle multiple properties efficiently.' },
  { question: 'Can you install a storm door for a commercial building?', answer: 'For commercial applications, we install and secure commercial-grade storm doors and vestibule doors. These provide weather protection and an additional layer of security for your main entry.' },
  { question: 'What is a mullion?', answer: 'A mullion is the vertical bar between a pair of double doors. Removable mullions allow both doors to open for large item passage but provide security when in place. We install and service mullion locks.' },
  { question: 'Do you provide locksmith services for schools?', answer: 'Yes, schools have unique security needs. We install and maintain classroom function locks, panic hardware, master key systems, and lockdown devices. We understand compliance requirements for educational facilities.' },
  { question: 'Can you help with lockbox installation?', answer: 'Yes, we install key lockboxes for secure key storage by doors or at centralized locations. These are useful for emergency access, building maintenance, and property management.' },
  { question: 'What are classroom function locks?', answer: 'Classroom function locks are normally locked from outside (requiring a key) but can always be opened from inside. They provide security against unauthorized entry while allowing free egress.' },
  { question: 'Do you service hotel locks?', answer: 'Yes, we service, upgrade, and replace hotel locks including magnetic stripe and RFID card systems. We can help hotels transition to modern keyless systems and maintain existing electronic locks.' },
  { question: 'Can you install locks on server room doors?', answer: 'Yes, server rooms require high security. We install high-security locks, biometric access controls, audit trail systems, and can integrate with existing building management systems.' },
  { question: 'What is a mortise lockset?', answer: 'Commercial mortise locksets are installed in a pocket (mortise) in the door edge. They are more durable than cylindrical locks and are standard in commercial construction for their strength and reliability.' },
  { question: 'Do you install door closers?', answer: 'Yes, door closers are essential for commercial doors to ensure they close and latch automatically. We install surface-mounted, concealed, and floor spring closers and can adjust closing speed and force.' },
  { question: 'Can you provide keying charts for our building?', answer: 'Yes, we create and maintain keying charts (key schedules) that document which keys open which doors. This is essential for managing master key systems and can be provided in various formats.' },
  { question: 'What is a key deposit locker?', answer: 'Key deposit lockers allow keys to be dropped off securely (like a night deposit box) without needing someone present. They are useful for after-hours key return in car rentals, property management, and similar applications.' },
  { question: 'Do you install deadbolts on commercial doors?', answer: 'Yes, when code allows, deadbolts add significant security to commercial doors. We install commercial-grade deadbolts with appropriate strike reinforcement and can integrate them with access control.' },
  { question: 'Can you create a building-wide access control system?', answer: 'Yes, we design and install networked access control systems that manage all entry points from a central system. These provide audit trails, time-based access, credential management, and integration capabilities.' },
  { question: 'What is a lever trim on a panic bar?', answer: 'Lever trim adds a lever handle to the outside of a panic bar door, providing keyed entry while still having push-bar egress. Various functions are available depending on your security needs.' },
  { question: 'Do you install automatic door openers?', answer: 'Yes, we install automatic door operators for ADA accessibility and convenience. These can be activated by push plates, motion sensors, or integrated with access control systems.' },
  { question: 'Can you help secure a warehouse?', answer: 'Warehouses have unique needs including large roll-up doors, pedestrian doors, and interior access points. We install high-security padlocks, electric locks for roll-up doors, and master key systems.' },
  { question: 'What is a delayed egress lock?', answer: 'Delayed egress locks prevent immediate exit but unlock after a delay (typically 15-30 seconds) during which an alarm sounds. They are used where security is needed but fire code still requires egress.' },
  { question: 'Do you offer emergency key service for businesses?', answer: 'Yes, if employees are locked out, we provide emergency lockout service for businesses. We also offer emergency rekeying if master keys are lost or an employee with access leaves suddenly.' },
  { question: 'Can you install locks on utility closets?', answer: 'Yes, utility closets housing electrical panels, water heaters, or mechanical equipment should be secured. We install appropriate locks that allow authorized access while preventing tampering.' },
  { question: 'What commercial lock brands do you carry?', answer: 'We work with leading commercial brands including Schlage, Yale, ASSA ABLOY, Corbin Russwin, Sargent, Best, Adams Rite, Kaba, and Von Duprin. We select products based on your specific security and budget requirements.' },
  { question: 'Do you provide commercial lock installation during construction?', answer: 'Yes, we work with builders and general contractors during commercial construction. We can provide pre-installation planning, keying schedules, phased installation, and final key turn coordination.' },
  { question: 'Can you help with ADA compliance for doors?', answer: 'Yes, we ensure door hardware meets ADA requirements including lever handles, appropriate operating force, and accessibility. We can assess your current doors and recommend necessary upgrades.' },
];

// Automotive Services - 48 FAQs
const automotiveQuestions: FAQItem[] = [
  { question: 'Can you make keys for newer vehicles with transponders?', answer: 'Yes, we have the equipment and expertise to program transponder keys, smart keys, and key fobs for most vehicle makes and models. Our mobile units carry the necessary tools to provide this service on-site.' },
  { question: 'What should I do if I am locked out of my car?', answer: 'If you are locked out of your vehicle, contact us and our technician will come to your location. We use professional tools and techniques to safely unlock your vehicle without causing damage. Stay in a safe location while waiting.' },
  { question: 'Can you replace a lost car key if I do not have a spare?', answer: "Yes, we can create a new key for your vehicle even if you have lost all your keys. We can extract the key code from your vehicle and cut a new key, then program it to work with your car\'s immobilizer system." },
  { question: 'What is a transponder key?', answer: 'A transponder key contains a microchip that communicates with your vehicle immobilizer. The car will only start when it detects the correct chip signal. Most vehicles made after 1995 use transponder technology.' },
  { question: 'Can you program a new key fob?', answer: 'Yes, we program key fobs for most vehicle makes and models. This includes remote start fobs, proximity keys, and traditional remote keyless entry fobs. We can often do this faster and cheaper than the dealership.' },
  { question: 'Do you work on foreign and domestic vehicles?', answer: 'Yes, our technicians are trained and equipped to work on both domestic (Ford, GM, Chrysler) and foreign (Toyota, Honda, BMW, Mercedes, etc.) vehicles. We stay current on all makes and models.' },
  { question: 'What is a smart key or push-button start key?', answer: 'Smart keys (also called proximity keys) allow you to unlock and start your vehicle without removing the key from your pocket or purse. The car detects the key nearby and enables push-button start.' },
  { question: 'Can you unlock my trunk?', answer: 'Yes, whether your keys are locked in the trunk, the trunk release is not working, or you have lost the only key, we can safely open your trunk and resolve the underlying access issue.' },
  { question: 'Do you make motorcycle keys?', answer: 'Yes, we can cut and program keys for motorcycles, scooters, and ATVs. This includes standard and transponder-equipped bikes from major manufacturers.' },
  { question: 'What vehicles can you extract key codes from?', answer: 'We can extract key codes from most vehicles by reading the VIN, accessing the on-board computer, or decoding the lock. This allows us to create new keys even when all original keys are lost.' },
  { question: 'Can you clear my ignition if a broken key is stuck?', answer: 'Yes, we can extract broken key fragments from ignitions, door locks, and trunk locks. We use specialized tools to remove the broken piece without damaging the lock cylinder.' },
  { question: 'Do you repair car door locks?', answer: 'Yes, we repair car door locks including cylinders that do not turn, damaged latches, and locks that will not engage. Often we can repair rather than replace, saving you money.' },
  { question: 'Can you make a spare car key while I wait?', answer: 'Yes, we offer on-site key cutting and programming. Depending on your vehicle, we can usually provide a fully functional spare key quickly at your location.' },
  { question: 'What is the difference between a key fob and a transponder key?', answer: 'A transponder key is a physical key with a chip that must be inserted into the ignition. A key fob is typically a remote device (sometimes with an integrated emergency key) that communicates wirelessly for keyless entry and/or starting.' },
  { question: 'Can you program a key I bought online?', answer: 'Sometimes, but not always. Some aftermarket keys can be programmed, while others may not work with your vehicle. We recommend consulting us before purchasing to ensure compatibility.' },
  { question: 'Do you service RVs and trailers?', answer: 'Yes, we can create or replace keys for RVs, travel trailers, and fifth wheels. We also service compartment locks, entry doors, and generator locks on recreational vehicles.' },
  { question: 'Can you make a key from my VIN number?', answer: 'With proof of ownership, we can often obtain the key code from the manufacturer using your VIN. This allows us to cut a key that works, which we then program to your immobilizer.' },
  { question: 'What if my car key battery dies?', answer: 'Weak key fob batteries can prevent remote functions and sometimes prevent the car from recognizing the key for push-button start. We can replace batteries and test fob function. Most vehicles have backup start methods too.' },
  { question: 'Do you offer emergency car lockout services?', answer: 'Yes, car lockouts are one of our most common services. We respond to locked-out situations at your location, whether at home, work, or on the roadside.' },
  { question: 'Can you rekey my car ignition?', answer: 'Rekeying car ignitions is complex and often not cost-effective. In most cases, replacing the ignition lock cylinder with a new one and programming new keys is the better solution.' },
  { question: 'What is an ignition lock cylinder?', answer: 'The ignition lock cylinder is the part of the ignition where you insert your key. It can wear out, get stuck, or be damaged. We can repair or replace ignition cylinders for most vehicles.' },
  { question: 'Can you unlock a frozen car door lock?', answer: 'Yes, we can safely thaw and unlock frozen locks using proper techniques and de-icers. We can also lubricate locks to prevent future freezing and provide tips for prevention.' },
  { question: 'Do you work on classic and vintage cars?', answer: 'Yes, we can cut keys, repair locks, and address security needs for classic and vintage vehicles. Older vehicles often use simpler lock systems, but finding parts can require resourcefulness.' },
  { question: 'Can you replace a car lock cylinder?', answer: 'Yes, we can replace door lock and ignition cylinders if they are worn, damaged, or if you want them rekeyed to new keys. We source cylinders for most makes and models.' },
  { question: 'What is a valet key?', answer: 'A valet key is a limited-function key that typically unlocks the door and starts the car but cannot open the trunk or glove compartment. We can produce valet keys for many vehicles.' },
  { question: 'Do you provide locksmith services for fleet vehicles?', answer: 'Yes, we work with businesses that have vehicle fleets. We can provide key replacements, lockout services, and lock repairs for commercial vehicles, often with priority scheduling.' },
  { question: 'Can you reprogram my existing key if I replaced the battery?', answer: 'Usually, replacing the battery does not require reprogramming. If your key stops working after a battery change, there may be another issue. We can diagnose and resolve key and fob problems.' },
  { question: 'What is the difference between key cutting and key programming?', answer: 'Cutting creates the physical key blade to fit the lock. Programming tells the vehicle computer to accept the transponder chip. Most modern keys require both cutting AND programming to work.' },
  { question: 'Can you unlock a car with the keys inside without damaging it?', answer: 'Yes, we use professional tools and techniques specifically designed to unlock vehicles without damage. We never use methods that could harm your weatherstripping, paint, or lock mechanisms.' },
  { question: 'Do you make heavy equipment keys?', answer: 'Yes, we make and replace keys for construction and agricultural equipment including excavators, tractors, loaders, and skid steers. Many use standard cross-reference keys we stock.' },
  { question: 'Can you disable a lost key\'s transponder?', answer: 'Yes, if you still have one working key and lose another, we can reprogram the vehicle to only accept the remaining key(s), disabling the lost key\'s chip. This is important for security.' },
  { question: 'What should I bring for automotive locksmith service?', answer: 'Please have your driver\'s license and vehicle registration available to verify ownership. This is standard practice to ensure we are providing access to the vehicle\'s rightful owner.' },
  { question: 'Can you repair the lock on my truck camper shell?', answer: 'Yes, we can repair, rekey, or replace locks on camper shells and truck caps. We can often key them to match your vehicle\'s ignition key for convenience.' },
  { question: 'Do you offer roadside automotive locksmith service?', answer: 'Yes, all our automotive services are mobile. We come to your location whether you are at home, at work, in a parking lot, or on the roadside.' },
  { question: 'Can you make a key for a car with no working key?', answer: 'Yes, this is called key origination. We extract the key code from the vehicle, cut a new key, and program it to the immobilizer—all without needing any existing keys.' },
  { question: 'What makes dealer key replacement so expensive?', answer: 'Dealers often have higher overhead, must order parts, and may charge diagnostic fees. Locksmiths specialize in keys and carry programming equipment and blanks, allowing us to offer competitive rates.' },
  { question: 'Can you duplicate a car key without the original?', answer: 'With proof of ownership, yes. If you do not have the original key, we obtain the key code from the vehicle or manufacturer database and create a new key from scratch.' },
  { question: 'Do you service commercial trucks?', answer: 'Yes, we work on commercial trucks including semi-trucks, box trucks, and delivery vehicles. We can handle keys, ignitions, and lock systems for commercial vehicles.' },
  { question: 'Can you add a remote start to my vehicle?', answer: 'While our primary focus is locks and keys, some of our technicians can install remote start systems. Contact us to discuss your specific vehicle and remote start options.' },
  { question: 'What is an immobilizer bypass?', answer: 'Immobilizer bypass is a method to start a vehicle when the immobilizer system is faulty (not for theft). This is sometimes used diagnostically or when keys cannot be immediately programmed.' },
  { question: 'Can you make keys for boat trailers?', answer: 'Yes, we can make or replace keys for trailer hitch locks, tongue locks, and coupler locks. We can often key them alike for convenience.' },
  { question: 'Do you work on hybrid and electric vehicles?', answer: 'Yes, hybrid and electric vehicles use key systems similar to conventional cars. We can cut keys, program fobs, and handle lockouts for Tesla, Prius, Leaf, and other EVs.' },
  { question: 'Can you help if my car remote is not working?', answer: 'Yes, we troubleshoot remote issues including dead batteries, sync problems, and damaged remotes. We can replace batteries, reprogram remotes, or replace faulty units.' },
  { question: 'What is key programming by OBD?', answer: 'OBD (On-Board Diagnostics) programming uses your vehicle\'s diagnostic port to communicate with the immobilizer computer and add new key data. This is the standard method for most programming.' },
  { question: 'Do you service car locks damaged in break-in attempts?', answer: 'Yes, we repair and replace locks damaged by break-in attempts. We can restore your vehicle\'s security and provide locks that resist similar attacks in the future.' },
  { question: 'Can you provide emergency jump-starts too?', answer: 'Our primary expertise is locks and keys. For jump-starts and other roadside assistance, we recommend contacting a full roadside service provider, though we can sometimes assist.' },
  { question: 'What information do you need to make a car key remotely?', answer: 'To provide remote consultation, we need the year, make, model, and VIN of your vehicle. We can then advise on key options, pricing, and schedule an on-site visit.' },
  { question: 'Can you match a new door lock to my existing key?', answer: 'Yes, if we are replacing a door lock, we can often pin the new lock to match your existing ignition key. This gives you a single key for doors and ignition.' },
];

// Emergency Services - 48 FAQs
const emergencyQuestions: FAQItem[] = [
  { question: 'Do you offer emergency locksmith services?', answer: 'Yes, we provide emergency locksmith services for lockouts, break-ins, and other urgent security situations. Contact us when you need immediate assistance with your locks or security.' },
  { question: 'What should I do after a break-in?', answer: 'After a break-in, first ensure your safety and contact the police. Once cleared, contact us to assess your locks and security. We can repair or replace damaged locks, rekey existing locks, and recommend additional security measures to prevent future incidents.' },
  { question: 'Can you help if my key breaks in the lock?', answer: 'Yes, we can safely extract broken keys from locks without causing damage. After extraction, we can make a new key or rekey the lock if needed. Do not attempt to extract the key yourself as this may push it further in or damage the lock.' },
  { question: 'Do you respond to lockouts at any hour?', answer: 'Yes, we respond to lockout calls. Whether you are locked out of your home, car, or office, we provide assistance when you need it.' },
  { question: 'What should I do while waiting for emergency service?', answer: 'Stay in a safe, well-lit area. If locked out of your car, wait nearby but safely away from traffic. If locked out of your home at night, consider waiting in your car or at a neighbor\'s. Have identification and proof of ownership ready.' },
  { question: 'Can you secure a door after a break-in the same day?', answer: 'Yes, emergency security is a priority after break-ins. We can board up damaged doors, install temporary hardware, or replace locks immediately to restore your safety and peace of mind.' },
  { question: 'Do you replace locks during emergencies?', answer: 'Yes, if your locks are compromised or you urgently need new locks (after losing keys to a criminal, etc.), we carry a range of locks and can install replacements during our emergency visit.' },
  { question: 'What is an emergency lockout?', answer: 'An emergency lockout is when you are unexpectedly locked out of your property or vehicle. This can happen from lost keys, broken locks, keys left inside, or malfunctioning lock mechanisms.' },
  { question: 'Can you help if my lock was tampered with?', answer: 'Yes, if you notice signs of tampering (scratches, bent parts, lock does not work properly), contact us immediately. We can assess the damage, determine if entry was made, and repair or replace the lock.' },
  { question: 'Do you offer emergency safe opening?', answer: 'Yes, if you are locked out of a safe due to a forgotten combination, dead batteries, or malfunction, we can open most safes. We use non-destructive methods when possible.' },
  { question: 'What if I am locked out and have a baby or pet in the car?', answer: 'This is a life-threatening emergency. Call 911 immediately. Then contact us for expedited response. First responders may need to break the window if the situation is critical.' },
  { question: 'Can you respond to commercial lockouts after hours?', answer: 'Yes, we provide after-hours emergency service for businesses. Whether an employee is locked out, alarm issues have locked the doors, or access control failed, we can help.' },
  { question: 'Do you charge extra for emergency services?', answer: 'We provide transparent pricing. Our technician will provide a quote before beginning any work. While urgent situations may have different pricing than scheduled appointments, there are no hidden fees.' },
  { question: 'What if I am locked out of my apartment building?', answer: 'For apartment lockouts, we can often assist with your individual unit door (with proof of residency). For building-wide access issues, the property manager typically needs to be involved.' },
  { question: 'Can you help with a broken door lock at night?', answer: 'Yes, if your lock breaks and you cannot secure your property, we provide emergency repair or replacement. Securing your home overnight is a priority.' },
  { question: 'Do you respond to security emergencies at construction sites?', answer: 'Yes, we can help secure construction sites after break-ins, replace padlocks, and address access issues. We understand the unique security challenges of construction environments.' },
  { question: 'What if my smart lock stops working?', answer: 'Smart lock failures can leave you locked out if there is no backup key system. We can open the door, troubleshoot the smart lock, and restore access. Most smart locks have mechanical backup options.' },
  { question: 'Can you help after a home invasion while I am away?', answer: 'If you discover evidence of intrusion, do not enter—call police first. Once cleared, contact us to assess and repair any damaged locks, rekey all locks, and enhance security.' },
  { question: 'Do you provide emergency eviction lockout services?', answer: 'We do not assist with illegal lockouts or evictions. For legal evictions, we work with law enforcement or authorized representatives. Proper documentation is required.' },
  { question: 'What should I do if I smell gas and cannot get in to shut it off?', answer: 'If you smell gas, call 911 and the gas company immediately. Do not attempt to enter—evacuate the area. Emergency responders can grant access. We can assist with lock service afterward.' },
  { question: 'Can you help if my keypad is not working?', answer: 'Yes, electronic keypad failures can lock you out. We can bypass the electronic lock to grant access, then troubleshoot or replace the keypad mechanism.' },
  { question: 'Do you respond faster to certain types of emergencies?', answer: 'We prioritize based on safety—situations involving children, elderly, or medical needs receive priority attention. All calls are treated seriously and handled as quickly as possible.' },
  { question: 'What if my car key stopped working suddenly?', answer: 'Key failures can result from dead batteries, damaged chips, or vehicle computer issues. We can diagnose the problem, replace batteries, reprogram keys, or cut new ones on-site.' },
  { question: 'Can you help if someone tried to pick my lock?', answer: 'Yes, picking attempts can damage locks. We can assess whether the lock was compromised, repair or replace it, and recommend more pick-resistant hardware.' },
  { question: 'Do you assist with emergency access for medical emergencies?', answer: 'Yes, if someone is having a medical emergency inside a locked location, we can assist. For life-threatening situations, call 911 first—first responders have emergency access protocols.' },
  { question: 'What is emergency boarding up?', answer: 'If a door or frame is too damaged for immediate lock repair, we can install temporary boards or panels to secure the opening until permanent repairs can be made.' },
  { question: 'Can you replace glass in a door you are securing?', answer: 'Our specialty is locks and security hardware. For glass replacement, we recommend a glass company. We can secure the area temporarily until glass is replaced.' },
  { question: 'Do you provide emergency services for hotels and lodging?', answer: 'Yes, we work with hotels, motels, and short-term rentals for guest lockouts, lock malfunctions, and emergency rekeying when guests lose or fail to return keys.' },
  { question: 'What if my deadbolt will not extend?', answer: 'A deadbolt that will not extend leaves your door unsecured. This could be alignment issues, internal mechanism failure, or obstruction. We can diagnose and repair the issue urgently.' },
  { question: 'Can you help with emergency access to a storage unit?', answer: 'Yes, with proof of rental or ownership, we can open storage units with lost keys or broken locks. Storage facility authorization may be required.' },
  { question: 'Do you respond to emergency calls in severe weather?', answer: 'We do our best to respond in all conditions, though severe weather may affect response. Safety of our technicians and customers is paramount. We will communicate any delays.' },
  { question: 'What if I need locks changed immediately after a divorce or separation?', answer: 'Changing locks after a relationship ends is common. Check local laws regarding lock changes on shared property. We can perform same-day rekeying or lock replacement.' },
  { question: 'Can you help if a vandal glued my lock?', answer: 'Yes, lock vandalism including super glue is frustrating. We can extract the damaged cylinder and install a new one. The old cylinder usually cannot be saved.' },
  { question: 'Do you assist with window security emergencies?', answer: 'If a window is compromised, we can install temporary security bars or recommend boarding until proper repairs are made. For window lock issues, we can help with many types.' },
  { question: 'What if I need emergency lock service during a holiday?', answer: 'We are available on most holidays. While scheduling may be limited, emergency situations are still handled. Contact us to confirm availability.' },
  { question: 'Can you help with a jammed door that will not open?', answer: 'Doors can jam from swelling, lock misalignment, or broken mechanisms. We can often force open a jammed door safely, then repair the underlying issue.' },
  { question: 'Do you provide documentation for insurance claims?', answer: 'Yes, we provide detailed invoices and can document damage for break-in claims. This helps with insurance processing for lock replacement and related repairs.' },
  { question: 'What if my garage door opener stopped working and I need get in?', answer: 'Our focus is locks and keys, not garage door openers/motors. However, we can assist with the pedestrian door to the garage if you are locked out.' },
  { question: 'Can you rekey locks at midnight if necessary?', answer: 'Yes, if you have urgent security concerns that cannot wait until morning (lost keys, terminated employee with access, etc.), we can perform late-night rekeying.' },
  { question: 'Do you help with emergency master key issues?', answer: 'Yes, if a master key is lost or stolen and you need the entire system rekeyed urgently, we can prepare a plan and begin same-day. Large systems may require phased rekeying.' },
  { question: 'What if I locked my keys in my running car?', answer: 'Do not turn off the engine (some cars will lock steering). Contact us immediately and we will open the car quickly to retrieve your keys. Stay with the vehicle.' },
  { question: 'Can you open a locked door without damaging it?', answer: 'In most cases, yes. Our technicians are trained in non-destructive entry techniques. The method depends on the lock type. We always prioritize preserving your property.' },
  { question: 'Do you offer emergency service for government buildings?', answer: 'Yes, we work with government facilities following their security protocols. Emergency service may require coordination with facility security managers.' },
  { question: 'What counts as a locksmith emergency?', answer: 'Emergencies include lockouts, break-ins, lost or stolen keys requiring immediate rekeying, broken locks leaving property unsecured, and any situation where delayed service creates safety risks.' },
  { question: 'Can you provide emergency service for multi-tenant buildings?', answer: 'Yes, we work with building management to address emergencies in multi-tenant properties. This includes individual unit lockouts and building-wide security issues.' },
  { question: 'Do you dispatch from multiple locations?', answer: 'We have mobile technicians positioned throughout our service area. This allows us to respond to emergencies throughout the region efficiently.' },
  { question: 'What if I am locked out and have medication inside?', answer: 'If you need urgent access to medication, communicate this when calling. We treat situations involving medical needs with priority and respond accordingly.' },
  { question: 'Can you expedite service for vulnerable individuals?', answer: 'Yes, calls involving elderly, disabled, or vulnerable individuals receive priority attention. Please let us know about any special circumstances when calling.' },
];

// Build the complete faqCategories array
export const faqCategories: FAQCategory[] = [
  {
    title: 'General Questions',
    icon: 'lucide:help-circle',
    faqs: generalQuestions,
  },
  {
    title: 'Residential Services',
    icon: 'lucide:home',
    faqs: residentialQuestions,
  },
  {
    title: 'Commercial Services',
    icon: 'lucide:building-2',
    faqs: commercialQuestions,
  },
  {
    title: 'Automotive Services',
    icon: 'lucide:car',
    faqs: automotiveQuestions,
  },
  {
    title: 'Emergency Services',
    icon: 'lucide:alert-triangle',
    faqs: emergencyQuestions,
  },
];

// Function to add dynamic location/service FAQs
export function getFullFAQCategories(locationFaqs: FAQItem[], serviceFaqs: FAQItem[]): FAQCategory[] {
  const categories = [...faqCategories];
  
  if (locationFaqs.length > 0) {
    categories.push({
      title: 'Location-Specific Questions',
      icon: 'lucide:map-pin',
      faqs: locationFaqs,
    });
  }
  
  if (serviceFaqs.length > 0) {
    categories.push({
      title: 'Service-Specific Questions',
      icon: 'lucide:wrench',
      faqs: serviceFaqs,
    });
  }
  
  return categories;
}

// Get all FAQs as flat array for schema
export function getAllFAQsFlat(): FAQItem[] {
  return faqCategories.flatMap(category => category.faqs);
}
