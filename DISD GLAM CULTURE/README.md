# GLAM CULTURE Website — Part 3

**Student number:** ST10520197  
**Project:** DISD1 — Glam Culture  
**Project type:** Responsive static website (HTML, CSS and JavaScript)

## Project overview
Glam Culture is a beauty-services website for a Johannesburg-based fictional/assignment business. The site keeps the Part 2 visual identity and adds JavaScript interaction, service enquiries, form validation, SEO files and deployment preparation.

## Pages
- `index.html` — default landing page for static hosting; mirrors `home.html`.
- `home.html` — homepage and service introduction.
- `about.html` — business overview and values.
- `services.html` — service cards with live search and sorting.
- `gallery.html` — image gallery with an accessible lightbox and an automatic slideshow with previous/next and pause controls.
- `enquiry.html` — validates a service enquiry and calculates an indicative starting-price estimate.
- `contact.html` — contact form and Johannesburg map.

## How to run locally
1. Extract the project folder.
2. Open the `DISD GLAM CULTURE` folder in Visual Studio Code.
3. Use the Live Server extension if available, or open `index.html` in a browser.
4. Keep the `images` and `js` folders alongside the HTML files. The stylesheet is `style.css`.

## Part 3 functionality
- Live date and time display on every page, refreshed every second using the visitor’s local time.
- Responsive mobile navigation with an updated `aria-expanded` state.
- Scroll-reveal animation with a fallback when `IntersectionObserver` is unavailable.
- Dynamic service search, result count and sorting by starting price or name.
- Responsive gallery lightbox with close button, backdrop close and keyboard support supplied by the native dialog element.
- Enquiry form with HTML constraints and JavaScript validation; shows indicative prices for hair styling (R250), nails (R180), makeup (R350), and facials (R300). Bridal and package services return a request-for-quote message. Estimates do not represent confirmed availability or bookings.
- Contact form with client-side validation and asynchronous FormSubmit integration. Before use, set CONTACT_EMAIL in js/script.js to the real receiving mailbox and activate FormSubmit; delivery is not configured until this is done.
- Responsive Google Maps embed showing Johannesburg at city level. The exact appointment location should be confirmed directly before travel.
- SEO-focused unique page titles, meta descriptions, relevant keywords, heading structure, descriptive image alt text, internal links, responsive image loading and lazy loading for non-hero images.
- `robots.txt` and `sitemap.xml` included for crawler discovery.

## Important setup before submission
1. **Contact form:** The contact form uses FormSubmit. Before deployment, replace `REPLACE_WITH_YOUR_REAL_EMAIL@example.com` in `js/script.js` with the actual receiving mailbox, then submit a test enquiry and complete FormSubmit mailbox activation. Do not claim that email delivery works until the test message is received.
2. **Deployment URL:** `robots.txt` and `sitemap.xml` currently use the expected GitHub Pages URL based on the repository name. Once deployment is enabled, open the live URL and update those files if the URL differs. Do not claim deployment until the live site has been tested.
3. **Canonical URLs:** Canonical tags are intentionally not hard-coded to a placeholder domain. Add canonical links only after the final public deployment URL is known.
4. **Privacy:** The enquiry estimate runs in the browser and does not store or send enquiry details. The contact form transmits the details to the external FormSubmit service.
5. **External services:** The map requires an internet connection. The website itself is static and does not include a booking database or live appointment availability.

## Testing checklist
- [ ] Open `index.html` and confirm all images, CSS and JavaScript load.
- [ ] Test the navigation at desktop and mobile widths (approximately 1440 px, 820 px and 390 px).
- [ ] On Services, search for `nails`, `makeup`, and a term with no match; test both sort options.
- [ ] On Gallery, open each image, close with the close button, backdrop and Escape key.
- [ ] On Enquiry, submit empty/invalid fields, then test each service estimate and optional date.
- [ ] On Contact, test required fields, invalid email and message length. After FormSubmit activation, send a real test and confirm delivery.
- [ ] Check the browser console for errors and verify the map loads.
- [ ] Validate HTML/CSS and test keyboard navigation and visible focus states.
- [ ] After deployment, open every page directly and test all internal links.
- [ ] Capture your own screenshots as evidence and add them to the repository if required by the lecturer.

## Changelog

### Part 3 — 1 November 2026
- Corrected JavaScript references across the site to load `js/script.js` with `defer`, fixing the mismatch between the HTML script path and the actual file location.
- Added `index.html` as a default landing page for static hosting while preserving the existing `home.html` page.
- Replaced generic page descriptions and titles with unique page-specific SEO metadata and relevant local beauty-service keywords.
- Added a search field, live result count, and sort options to the Services page. The service cards are filtered and reordered using JavaScript DOM manipulation.
- Added a gallery lightbox so users can select an image to view a larger version and close the view using the close control, backdrop or Escape key.
- Added an automatic slideshow to the Gallery with manual previous/next controls and pause/play functionality.
- Added a live local date/time display to the footer of every webpage.
- Changed the Contact page map embed to Google Maps at Johannesburg city level, without claiming an exact salon address.
- Added an automatic gallery slideshow with previous/next navigation, a pause/play control, slide captions and a position indicator.
- Added `enquiry.html` with required name, email, service and message fields, native constraints, JavaScript validation and a dynamic indicative price response. Bridal beauty and package enquiries direct users to request a quote instead of inventing a price.
- Improved the Contact form with autocomplete, input length constraints, a required service selection, accessible status feedback, and asynchronous FormSubmit submission handling. Delivery still depends on the mailbox owner's activation and must be tested after deployment.
- Added a city-level OpenStreetMap embed and an external map link on the Contact page. The map is not represented as an exact salon address.
- Added crawler files (`robots.txt` and `sitemap.xml`) and documented the need to verify their URLs against the final deployed address.
- Added lazy loading for non-hero images, synced the duplicate legacy stylesheet, updated navigation to include Enquiry, and expanded project documentation and testing steps.

### Part 2 — 11 September 2026
- Added and linked the external stylesheet.
- Replaced inline pink styling with a consistent Glam Culture theme.
- Improved typography, colour, spacing and layouts.
- Added Grid/Flexbox layouts and responsive breakpoints.
- Added interactive hover/focus states and a mobile menu.
- Added responsive image variants.
- Added subtle floating beauty images and scroll animation.
- Fixed Gallery navigation links.
- Replaced the invalid homepage video reference because no MP4 video file was included.
- Added README documentation and a responsive testing checklist.

## References
- The Independent Institute of Education. 2026. *WEDES020 POE, Part 3 — Enhancing Functionality and SEO*. Assignment brief supplied by the student.
- MDN Web Docs. n.d. *HTML forms and form validation*. https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation (accessed 29 October 2026).
- MDN Web Docs. n.d. *The HTML dialog element*. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog (accessed 29 October 2026).
- MDN Web Docs. n.d. *Intersection Observer API*. https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (accessed 29 October 2026).
- Google Search Central. n.d. *SEO Starter Guide*. https://developers.google.com/search/docs/fundamentals/seo-starter-guide (accessed 29 October 2026).
- OpenStreetMap contributors. n.d. *OpenStreetMap*. https://www.openstreetmap.org/ (accessed 29 October 2026).
- FormSubmit. n.d. *FormSubmit AJAX / form endpoint documentation*. https://formsubmit.co/ (accessed 29 October 2026).
