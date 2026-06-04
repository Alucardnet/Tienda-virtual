function openModal() {
    // 1. Limpieza y preparación de campos del formulario
    document.querySelector('#idUsuario').value = "";
    
    // 2. Reseteo de clases visuales para el modo "Registrar"
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    
    // 3. Cambio de textos dinámicos
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Usuario";
    
    // 4. Resetear los inputs del formulario
    document.querySelector("#formUsuario").reset();
    
    // 5. Mostrar el modal usando Vanilla JS (Estándar de Bootstrap 5)
    const modalElement = document.querySelector('#modalFormUsuario');
    if (modalElement) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.show();
    }
}