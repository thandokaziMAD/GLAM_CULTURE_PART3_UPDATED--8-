'use strict';

// Live date and time on every page. Uses the visitor's local time zone.
const liveClock = document.querySelector('#liveDateTime');
if (liveClock) {
    const updateClock = () => {
        const now = new Date();
        liveClock.textContent = `Current date and time: ${now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} | ${now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    };
    updateClock();
    window.setInterval(updateClock, 1000);
}

// Gallery slideshow: previous/next controls and automatic rotation.
const slideImage = document.querySelector('#slideImage');
if (slideImage) {
    const slides = [
        { src: 'images/hair.jpg', alt: 'Hair styling inspiration', caption: 'Hair Styling' },
        { src: 'images/nails.jpg', alt: 'Nail design inspiration', caption: 'Nail Designs' },
        { src: 'images/makeup.jpg', alt: 'Makeup look inspiration', caption: 'Makeup' },
        { src: 'images/facial.jpg', alt: 'Facial skincare inspiration', caption: 'Skin Care' },
        { src: 'images/bridal.jpg', alt: 'Bridal beauty inspiration', caption: 'Bridal Beauty' },
        { src: 'images/beauty.jpg', alt: 'Glam Culture beauty inspiration', caption: 'Glam Culture' }
    ];
    let slideIndex = 0;
    let slideshowTimer;
    let isPlaying = true;
    const caption = document.querySelector('#slideCaption');
    const counter = document.querySelector('#slideCounter');
    const toggle = document.querySelector('#toggleSlideshow');
    const showSlide = (index) => {
        slideIndex = (index + slides.length) % slides.length;
        const slide = slides[slideIndex];
        slideImage.src = slide.src;
        slideImage.alt = slide.alt;
        caption.textContent = slide.caption;
        counter.textContent = `${slideIndex + 1} of ${slides.length}`;
    };
    const stopTimer = () => window.clearInterval(slideshowTimer);
    const startTimer = () => {
        stopTimer();
        if (isPlaying) slideshowTimer = window.setInterval(() => showSlide(slideIndex + 1), 4500);
    };
    document.querySelector('#previousSlide').addEventListener('click', () => { showSlide(slideIndex - 1); startTimer(); });
    document.querySelector('#nextSlide').addEventListener('click', () => { showSlide(slideIndex + 1); startTimer(); });
    toggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        toggle.textContent = isPlaying ? 'Pause slideshow' : 'Play slideshow';
        toggle.setAttribute('aria-pressed', String(!isPlaying));
        startTimer();
    });
    showSlide(0);
    startTimer();
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopTimer(); else startTimer(); });
}


// Accessible mobile navigation.
const menuButton = document.querySelector('.menu-btn');
const navigation = document.querySelector('.nav-links');
if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
}

// Reveal sections when they enter the viewport, with a fallback for older browsers.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
} else {
    revealItems.forEach(item => item.classList.add('visible'));
}

// Dynamic service search and sorting.
const serviceList = document.querySelector('#serviceList');
if (serviceList) {
    const searchInput = document.querySelector('#serviceSearch');
    const sortSelect = document.querySelector('#serviceSort');
    const countMessage = document.querySelector('#serviceCount');
    const serviceCards = Array.from(serviceList.querySelectorAll('[data-service-card]'));
    const updateServices = () => {
        const term = (searchInput.value || '').trim().toLowerCase();
        const visibleCards = serviceCards.filter(card => card.textContent.toLowerCase().includes(term));
        const sortMode = sortSelect.value;
        visibleCards.sort((a, b) => {
            if (sortMode === 'price-low') return Number(a.dataset.price) - Number(b.dataset.price);
            if (sortMode === 'name') return a.dataset.name.localeCompare(b.dataset.name);
            return serviceCards.indexOf(a) - serviceCards.indexOf(b);
        });
        serviceCards.forEach(card => { card.hidden = !visibleCards.includes(card); });
        visibleCards.forEach(card => serviceList.appendChild(card));
        countMessage.textContent = `Showing ${visibleCards.length} of ${serviceCards.length} services.`;
        let emptyMessage = serviceList.querySelector('.no-services');
        if (visibleCards.length === 0) {
            if (!emptyMessage) {
                emptyMessage = document.createElement('p');
                emptyMessage.className = 'no-services';
                emptyMessage.textContent = 'No services match your search. Try another word.';
                emptyMessage.setAttribute('role', 'status');
                serviceList.appendChild(emptyMessage);
            }
        } else if (emptyMessage) emptyMessage.remove();
    };
    searchInput.addEventListener('input', updateServices);
    sortSelect.addEventListener('change', updateServices);
}

// Gallery lightbox with keyboard and click-to-close support.
const lightbox = document.querySelector('#galleryLightbox');
if (lightbox) {
    const largeImage = document.querySelector('#lightboxImage');
    const caption = document.querySelector('#lightboxCaption');
    const closeButton = lightbox.querySelector('.lightbox-close');
    document.querySelectorAll('[data-lightbox]').forEach(button => {
        button.addEventListener('click', () => {
            const image = button.querySelector('img');
            if (!image) return;
            largeImage.src = image.currentSrc || image.src;
            largeImage.alt = image.alt;
            caption.textContent = button.querySelector('span, h3')?.textContent.trim() || image.alt;
            if (typeof lightbox.showModal === 'function') lightbox.showModal();
            else lightbox.setAttribute('open', '');
            closeButton.focus();
        });
    });
    const closeLightbox = () => {
        if (typeof lightbox.close === 'function' && lightbox.open) lightbox.close();
        else lightbox.removeAttribute('open');
    };
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
}

// Shared, user-friendly client-side validation helper.
function showValidationMessage(form, message) {
    const status = form.querySelector('[aria-live="polite"]');
    if (status) status.textContent = message;
}
function validateFormFields(form) {
    const invalidField = Array.from(form.querySelectorAll('input, select, textarea')).find(field => !field.checkValidity());
    if (invalidField) {
        invalidField.reportValidity();
        invalidField.focus();
        showValidationMessage(form, invalidField.validationMessage);
        return false;
    }
    return true;
}

// Enquiry form: calculate a clear estimate from the service selected.
const enquiryForm = document.querySelector('#enquiryForm');
if (enquiryForm) {
    const estimates = {
        hair: { name: 'Hair Styling', amount: 'From R250' },
        nails: { name: 'Nail Services', amount: 'From R180' },
        makeup: { name: 'Makeup', amount: 'From R350' },
        facials: { name: 'Facials', amount: 'From R300' },
        bridal: { name: 'Bridal Beauty', amount: 'Price on request' },
        package: { name: 'Glam Package', amount: 'Custom quote required' }
    };
    enquiryForm.addEventListener('submit', event => {
        event.preventDefault();
        if (!validateFormFields(enquiryForm)) return;
        const selected = estimates[document.querySelector('#enquiryService').value];
        const name = document.querySelector('#enquiryName').value.trim();
        const dateValue = document.querySelector('#enquiryDate').value;
        const result = document.querySelector('#enquiryResult');
        result.innerHTML = '';
        const heading = document.createElement('h2'); heading.textContent = 'Your indicative estimate';
        const serviceLine = document.createElement('p'); serviceLine.textContent = `Hello ${name}, your selected service is ${selected.name}.`;
        const priceLine = document.createElement('p'); priceLine.className = 'estimate-price'; priceLine.textContent = selected.amount;
        const dateLine = document.createElement('p'); dateLine.textContent = dateValue ? `Preferred date: ${dateValue}. Availability must be confirmed by Glam Culture.` : 'Availability must be confirmed by Glam Culture.';
        const note = document.createElement('p'); note.textContent = 'This is an indicative starting price only, not a confirmed booking or final quote. Prices may vary with the requested style and service details.';
        result.append(heading, serviceLine, priceLine, dateLine, note);
        showValidationMessage(enquiryForm, 'Estimate calculated below.');
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// Contact form: asynchronous FormSubmit request. The mailbox owner must activate the service.
const CONTACT_EMAIL = 'REPLACE_WITH_YOUR_REAL_EMAIL@example.com'; // Set this to the mailbox that should receive enquiries.
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (!validateFormFields(contactForm)) return;
        if (CONTACT_EMAIL.startsWith('REPLACE_WITH_')) {
            showValidationMessage(contactForm, 'The website owner must add the correct receiving email address in js/script.js before email delivery can work.');
            return;
        }
        const submitButton = contactForm.querySelector('[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
        showValidationMessage(contactForm, 'Sending your message securely…');
        try {
            const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(Object.fromEntries(new FormData(contactForm).entries()))
            });
            if (!response.ok) throw new Error('The form service did not accept the request.');
            const result = await response.json();
            if (result.success === 'false' || result.success === false) throw new Error(result.message || 'The form service did not accept the request.');
            showValidationMessage(contactForm, 'Thank you. Your message was submitted. If this is the first submission, the mailbox owner may need to activate FormSubmit.');
            contactForm.reset();
        } catch (error) {
            showValidationMessage(contactForm, 'We could not confirm delivery. Please use the business email address shown on this website or try again later.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}
