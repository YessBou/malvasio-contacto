function enviarCorreo() {
    const asunto = document.getElementById('asunto').value;
    const mail = document.getElementById('mail').value;
    const mensaje = document.getElementById('mensaje').value;
    const destinatario = 'tuemail@ejemplo.com'; // Cambia esto por tu correo electrónico



    const mailtoLink = `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;
    window.location.href = mailtoLink;
}