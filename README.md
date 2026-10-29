# Hallo website

A static, mobile-first multi-page website built with HTML, CSS, JavaScript, and jQuery. It is dependency-free except for the jQuery CDN and optional Google Fonts import. Pages remain in the HTML for crawlability; JavaScript enhances navigation and forms.

## Brand assets

The shared visual system uses Hallo's specified navy and gold palette. The supplied logo is available as `assets/images/logo.png` and is used in the existing header, footer, and 404 wordmark positions. The image is cropped to its central logo artwork without stretching. The favicon remains a separate compact brand-colour icon.

## Local preview

Open `index.html` in a browser or use a local static-file server / VS Code Live Server. The jQuery CDN and Google Fonts require an internet connection. If the CDN is blocked or unavailable, the navigation enhancement will not run; the page content and ordinary links remain readable.

## Configure before publishing

Edit `assets/js/config.js`:

- `siteUrl`: verified production origin including `https://`, with no trailing slash. This enables canonical and Open Graph URL tags and the Open Graph image URL.
- `supportEmail`: confirm this remains the correct support/privacy contact address.
- `appUrl`: official Google Play URL; keep this consistent with the verified listing.
- `emailJs.serviceId`, `emailJs.templateId`, and `emailJs.publicKey`: configure the EmailJS browser service used by the contact form. The EmailJS public key is intended for browser use; never place an EmailJS private key in this site.

### Configure EmailJS contact delivery

1. In EmailJS, connect and verify the email service that should send contact messages.
2. Create a message template with `{{name}}`, `{{email}}`, `{{subject}}`, and `{{message}}` variables. Set the template's **To Email** to `krupalmehta8@gmail.com` in the EmailJS dashboard; do not make the destination a visitor-editable form field.
3. Set the template's **Reply To** to `{{email}}` so replies go to the person who submitted the form.
4. Copy the service ID, template ID, and account public key into `assets/js/config.js`. Do not use a private key.
5. Restrict allowed origins in the EmailJS account to the production website where supported. Set suitable provider limits and enable CAPTCHA/spam controls supported by your plan before publishing the form.
6. Submit a test enquiry from the deployed site and confirm delivery, reply-to, validation, failure feedback, and the EmailJS account's handling/retention terms. Update the privacy policy with verified provider and retention details.

Until all three EmailJS values are configured, the form intentionally does not send anything and displays a setup/fallback message. It does not silently open a mail app or claim a false success. EmailJS handles client-side delivery; browser validation and the honeypot are not server-side validation or complete spam protection.

The XML sitemap and `robots.txt` currently contain `YOUR_PRODUCTION_DOMAIN`. Replace it with the verified host in both files before launch. The site builds canonical URLs dynamically from `siteUrl`; until configured, no canonical URL is emitted. Add or convert the Open Graph SVG to PNG if the chosen social platform does not accept SVG preview images.

The privacy and terms pages are review drafts, not approved legal documents. Resolve every bracketed instruction, verify actual app and website data practices, and obtain business/legal approval before publication. Confirm whether the supplied email is an appropriate privacy/legal contact. The About page similarly has a business-information review notice.

## Hosting and 404

Deploy the static files and folders to a static HTTPS host. `vercel.json` configures clean trailing-slash routes matching `/about/`, `/how-it-works/`, and the other requested page paths, with rewrites to the HTML files. If using another host, configure equivalent trailing-slash rewrites/redirects and verify canonical paths. The Vercel `404.html` page should be served with HTTP 404; verify this behavior after deployment, since merely displaying a 404 design at HTTP 200 is not sufficient. No application server or database is included.

## Search and analytics launch checklist

1. Configure the production domain, HTTPS, `siteUrl`, sitemap, and robots sitemap URL.
2. Verify the domain in Google Search Console, submit `/sitemap.xml`, inspect key URLs, and resolve indexing/canonical issues.
3. Check each page title, description, canonical, Open Graph metadata, structured data needs, mobile layout, and response status in the deployed environment. No structured data is included because verified company/legal details and app ratings were not available.
4. Monitor Search Console impressions, clicks, queries, CTR, and indexing status. Do not claim indexing or rankings before Google reports them.
5. Analytics is not activated by this build. Add an approved consent UI and privacy disclosure before setting an analytics ID or enabling tracking. Do not invent measurement IDs.

## Backlink outreach

`backlink-tracker.csv` is a starter tracker populated only with real organization/publisher homepages checked on 2026-10-29. An entry is an outreach prospect, not a confirmed listing, relationship, backlink opportunity, or guarantee of publication. Verify eligibility and the current submission route before contacting anyone. Prioritize relevant editorial or legitimate startup ecosystem opportunities; avoid paid link schemes, spam directories, reciprocal-link demands, and fabricated metrics.

Linkable editorial ideas (publish only when genuinely useful and fact-checked): a Gujarat shared-travel guide; practical passenger and driver guides; an explainer on benefits and limitations of carpooling; and an original mobility report only if Hallo has real, permissioned data. Track the acquired page and date in the CSV; do not promise rankings or backlink counts.

## Final checks

- Check navigation and all internal links on desktop and mobile.
- Verify every app CTA opens the exact official Google Play listing.
- Test keyboard navigation, focus visibility, reduced-motion behavior, contact form validation, successful EmailJS submission, provider failure feedback, recipient, reply-to, and privacy handling.
- Verify the sitemap, robots, canonical host, HTTPS, social share preview, and real HTTP 404 response.
- Replace legal and business review notices only after the owner has confirmed the underlying details.
