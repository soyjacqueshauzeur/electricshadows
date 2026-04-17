// ================= CONFIGURACIÓN =================
// Reemplaza con tu URL de webhook de n8n (cuando lo crees)
// Ejemplo: 'https://mi-nombre.app.n8n.cloud/webhook/formulario'
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzZvuCJNGPkAg9xs41eA8HjGsNYmM3Tx2qB5p2qY8dUd7xHLu1Cn7gtqPtQzZFcpLtR/exec';
// const WEBHOOK_URL = 'https://open-endless-elf.ngrok-free.app/webhook/formulario';

// Tu número de WhatsApp (formato: código país + número sin +, solo números)
const WHATSAPP_NUMBER = '573507402009';

// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('songForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            nombre: formData.get('nombre'),
            whatsapp: formData.get('whatsapp'),
            mensaje: formData.get('mensaje'),
            genero: formData.get('genero'),
            idioma: formData.get('idioma'),
            voz: formData.get('voz'),
            timestamp: new Date().toISOString()
        };

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'ENVIANDO...';
        submitBtn.disabled = true;

        // try {
        //     // Enviar a n8n vía webhook
        //     await fetch(WEBHOOK_URL, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     });

        try {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors', // <--- VITAL para que Google no bloquee el envío
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        });

            // Abrir WhatsApp con los datos
            const message = `*Nueva solicitud de canción*%0A%0A` +
                `%F0%9F%91%A4 *Para:* ${data.nombre}%0A` +
                `%F0%9F%93%B1 *WhatsApp:* ${data.whatsapp}%0A` +
                `%F0%9F%92%8C *Mensaje:* ${data.mensaje}%0A` +
                `%F0%9F%8E%B5 *Género:* ${data.genero}%0A` +
                `%F0%9F%8C%90 *Idioma:* ${data.idioma}%0A` +
                `%F0%9F%8E%A4 *Voz:* ${data.voz}`;

            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
            window.open(whatsappUrl, '_blank');

            submitBtn.innerHTML = '✅ ENVIADO';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 3000);

        } catch (error) {
            console.error('Error:', error);
            // Igualabrir WhatsApp si falla el webhook
            const message = `*Nueva solicitud de canción*%0A%0A` +
                `%F0%9F%91%A4 *Para:* ${data.nombre}%0A` +
                `%F0%9F%93%B1 *WhatsApp:* ${data.whatsapp}%0A` +
                `%F0%9F%92%8C *Mensaje:* ${data.mensaje}%0A` +
                `%F0%9F%8E%B5 *Género:* ${data.genero}%0A` +
                `%F0%9F%8C%90 *Idioma:* ${data.idioma}%0A` +
                `%F0%9F%8E%A4 *Voz:* ${data.voz}`;

            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            submitBtn.innerHTML = '✅ ENVIADO';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        }
    });
});