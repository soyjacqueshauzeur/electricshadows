// ================= CONFIGURACIÓN =================
// Reemplaza con tu URL de webhook de n8n (cuando lo crees)
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyZ4sfK_BZ5lhi7bZgjR8UomgQwmeogWNP95ASUJFRQ84VLHOF4z1eMJtOZ67i7U7WkWw/exec';

// Tu número de WhatsApp (formato: código país + número sin +, solo números)
const WHATSAPP_NUMBER = '573507402009';

// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('songForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
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
        
        // 1. Cambio visual inmediato
        submitBtn.innerHTML = 'ENVIANDO...';
        submitBtn.disabled = true;

        // 2. Envío a Google (Fire and forget)
        fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors', 
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(err => console.error('Error enviando a Google:', err));

        // 3. Preparar mensaje de WhatsApp (Corregido el nombre de la variable y saltos de línea)
        const messageText = `*Nueva solicitud de canción*\n\n` +
            `👤 *Para:* ${data.nombre}\n` +
            `📱 *WhatsApp:* ${data.whatsapp}\n` +
            `💌 *Mensaje:* ${data.mensaje}\n` +
            `🎵 *Género:* ${data.genero}\n` +
            `🌐 *Idioma:* ${data.idioma}\n` +
            `🎤 *Voz:* ${data.voz}`;

        // Aquí estaba el error: textoMensaje no existía. Ahora usamos encodeURIComponent sobre todo el texto.
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;

        // 4. Abrir WhatsApp
        window.open(whatsappUrl, '_blank');

        // 5. Feedback visual (Ahora sí se ejecutará)
        submitBtn.innerHTML = '✅ ENVIADO';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 3000);
    });
});