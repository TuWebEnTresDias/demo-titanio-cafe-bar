document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');
    const links = document.querySelectorAll('.nav__link');

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', menu.classList.contains('active'));
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateSelectors = [
        '.differentials__card',
        '.process__step',
        '.star-product__image',
        '.star-product__content',
        '.gallery__item',
        '.testimonials__card',
        '.moments__card',
        '.hours__day',
        '.story__text',
        '.story__member',
        '.press__card',
        '.contact__content',
        '.contact__info',
        '.section-header'
    ].join(', ');

    document.querySelectorAll(animateSelectors).forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Stagger animation for grid children
    const staggerSelectors = ['.differentials__grid', '.gallery__grid', '.testimonials__grid', '.moments__grid', '.press__grid'];
    staggerSelectors.forEach(selector => {
        const grid = document.querySelector(selector);
        if (grid) {
            const style = document.createElement('style');
            style.textContent = `
                ${selector} .animate-on-scroll:nth-child(1) { transition-delay: 0s; }
                ${selector} .animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
                ${selector} .animate-on-scroll:nth-child(3) { transition-delay: 0.2s; }
                ${selector} .animate-on-scroll:nth-child(4) { transition-delay: 0.3s; }
                ${selector} .animate-on-scroll:nth-child(5) { transition-delay: 0.4s; }
                ${selector} .animate-on-scroll:nth-child(6) { transition-delay: 0.5s; }
                ${selector} .animate-on-scroll:nth-child(7) { transition-delay: 0.6s; }
            `;
            document.head.appendChild(style);
        }
    });

    // Header shadow on scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 80) {
            header.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    });

    // Contact form -> WhatsApp link
    const contactForm = document.getElementById('contactForm');
    const contactSubmit = document.getElementById('contactSubmit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const date = document.getElementById('contactDate').value;
            const guests = document.getElementById('contactGuests').value;
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !phone || !date) {
                return;
            }

            // Format date
            let formattedDate = date;
            try {
                const dateObj = new Date(date + 'T12:00:00');
                formattedDate = dateObj.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
            } catch (err) {
                formattedDate = date;
            }

            let whatsappMsg = `Hola! Soy ${name}. `;
            whatsappMsg += `Quiero reservar una mesa para el ${formattedDate} `;
            whatsappMsg += `somos ${guests} persona${guests !== '1' ? 's' : ''}.`;

            if (message) {
                whatsappMsg += ` ${message}`;
            }

            if (phone) {
                whatsappMsg += ` Mi teléfono es ${phone}.`;
            }

            const encodedMsg = encodeURIComponent(whatsappMsg);
            const whatsappUrl = `https://wa.me/5491166651174?text=${encodedMsg}`;

            window.open(whatsappUrl, '_blank', 'noopener');
        });
    }
});