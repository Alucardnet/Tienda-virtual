document.addEventListener('DOMContentLoaded', function() {
    // Inicializamos las funciones de escucha una sola vez de forma global
    fntRolesUsuario();
});

// ==========================================
// 2. FUNCIÓN: TRAER ROLES AL SELECT DEL MODAL
// ==========================================
function fntRolesUsuario() {
    var ajaxUrl = base_url + '/Roles/getSelectRoles';
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    
    request.open("GET", ajaxUrl, true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            const selectRol = document.querySelector('#listRolid');
            
            if (selectRol) {
                selectRol.innerHTML = request.responseText;
                selectRol.value = 1;

                // INICIALIZAR EL BUSCADOR MODERNO:
                VirtualSelect.init({
                    ele: '#listRolid',
                    search: true,              // Esto activa el buscador obligatorio de tu curso
                    placeholder: 'Seleccione un rol',
                    noOptionsFoundText: 'No se encontraron resultados'
                });
            }
        }
    };
}



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