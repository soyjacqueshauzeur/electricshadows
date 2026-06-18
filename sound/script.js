document.addEventListener('DOMContentLoaded', function () {
    // FAQ Accordion
    const faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const item = this.closest('.glass-panel');
            const content = item.querySelector('.faq-content');
            const icon = this.querySelector('.material-symbols-outlined');

            content.classList.toggle('hidden');

            if (content.classList.contains('hidden')) {
                icon.textContent = 'add';
            } else {
                icon.textContent = 'remove';
            }

            document.querySelectorAll('.glass-panel').forEach(otherItem => {
                if (otherItem !== item) {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.material-symbols-outlined');
                    if (otherContent && !otherContent.classList.contains('hidden')) {
                        otherContent.classList.add('hidden');
                        if (otherIcon) otherIcon.textContent = 'add';
                    }
                }
            });
        });
    });

    // Form validation
    const form = document.getElementById('songForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();

            // if (nombre.includes(' ')) {
            //     alert('Por favor ingresa solo un nombre sin apellidos');
            //     return;
            // }

            // const phoneDigits = whatsapp.replace(/\D/g, '');
            // if (phoneDigits.length !== 10) {
            //     alert('Por favor ingresa un número de WhatsApp válido de 10 dígitos');
            //     return;
            // }

            const formData = {
                nombre: nombre,
                whatsapp: phoneDigits,
                mensaje: document.getElementById('mensaje').value.trim(),
                genero: document.getElementById('genero').value,
                idioma: document.getElementById('idioma').value,
                voz: document.getElementById('voz').value
            };

            console.log('Datos de la canción:', formData);
            alert('¡Datos recibidos! Serás redirigido al pago. Te contactaremos por WhatsApp.');
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Nav background on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    });

    // Modal functionality for payment methods
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
        });
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            });
        }
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });
    });

    console.log('🎵 Rythm - Theme toggle loaded');
});