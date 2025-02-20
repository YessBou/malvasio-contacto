const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validarCampo(id) {
    let valor = document.getElementById(id).value.trim();
    let errorCampo = document.getElementById(`error${id.charAt(0).toUpperCase() + id.slice(1)}`);
    let boton = document.querySelector(".boton-principal");

    if (id === "email") {
        if (valor === "") {
            errorCampo.innerText = "Campo obligatorio";
            errorCampo.style.visibility = "visible";
        } else if (!emailRegex.test(valor)) {
            errorCampo.innerText = "Email inválido";
            errorCampo.style.visibility = "visible";
        } else {
            errorCampo.style.visibility = "hidden";
        }
    } else {
        errorCampo.innerText = "Campo obligatorio";
        errorCampo.style.visibility = valor === "" ? "visible" : "hidden";
    }

    validarBoton();
}

function validarBoton() {
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let boton = document.querySelector(".boton-principal");

    if (nombre !== "" && emailRegex.test(email)) {
        boton.removeAttribute("disabled");
    } else {
        boton.setAttribute("disabled", "true");
    }
}

function enviarCorreo() {
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let boton = document.querySelector(".boton-principal");
    let spinner = document.querySelector("img[alt='']");
    let mensaje = document.createElement("p");

    // Validación antes de enviar
    if (nombre === "" || !emailRegex.test(email)) {
        return;
    }

    // Deshabilitar botón y mostrar spinner
    boton.setAttribute("disabled", "true");
    spinner.style.display = "inline-block";
    const form = document.getElementById("contactForm");
    const formData = new FormData(form);
    
    // Convertir FormData en un objeto
    const datos = {
        nombre: formData.get("nombre"),
        email: formData.get("email"),
        mensaje: formData.get("mensaje")
    };

    // URL de tu Google Apps Script (reemplazar con la correcta)
    const scriptURL = "https://script.google.com/macros/s/AKfycbwCVeYWl2N56JH1ivzi1mVm2IQA7QhJ2bWkwNtSgECeLdqCDK-JI35mGyhey4y1NtDA/exec";
    
    fetch(scriptURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(datos)
    })
    .then(response => response.json())
    .then(data => {
        mostrarMensaje("¡Mail enviado exitosamente!", true); 
        form.reset();
    })
    .catch(error => {
        console.error("Error al enviar el formulario:", error);
        mostrarMensaje("Error al enviar el mail. Intente nuevamente.", false); // Error
    })
    .finally(() => {
        spinner.style.display = "none";
    });
}

function mostrarMensaje(mensajeTexto, esExito) {
    let mensaje = document.getElementById("mensajeResultado");

    // Seteamos el texto
    mensaje.innerText = mensajeTexto;

    // Aplicamos color según el tipo de mensaje
    mensaje.style.color = esExito ? "green" : "red";
    
    // Mostramos el mensaje
    mensaje.style.visibility = "visible";

    // Ocultar después de unos segundos
    setTimeout(() => {
        mensaje.style.visibility = "hidden";
    }, 3000);
}