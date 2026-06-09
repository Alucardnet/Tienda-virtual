// ==========================================
// 1. ESCUCHADORES DE INICIO (DOM READY)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el selector de roles de forma inmediata
    fntRolesUsuario();

    // Capturar el formulario de usuarios de manera segura
    var formUsuario = document.querySelector("#formUsuario");
    
    if (formUsuario) {
        formUsuario.onsubmit = function(e) {
            e.preventDefault();
            
            // Extracción de valores de los inputs
            var strIdentificacion = document.querySelector('#txtIdentificacion').value;
            var strNombre = document.querySelector('#txtNombre').value;
            var strApellido = document.querySelector('#txtApellido').value;
            var strEmail = document.querySelector('#txtEmail').value;
            var intTelefono = document.querySelector('#txtTelefono').value;
            var intTipousuario = document.querySelector('#listRolid').value;
            var strPassword = document.querySelector('#txtPassword').value;

            // Validación 1: Campos obligatorios vacíos
            if (strIdentificacion == '' || strApellido == '' || strNombre == '' || strEmail == '' || intTelefono == '' || intTipousuario == '') {
                Swal.fire({
                    title: "Atención",
                    text: "Todos los campos son obligatorios.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
                return false;
            }

            // Validación 2: Verificar si existen validaciones nativas en rojo (.is-invalid)
            let elementsValid = document.getElementsByClassName("valid");
            for (let i = 0; i < elementsValid.length; i++) { 
                if (elementsValid[i].classList.contains('is-invalid')) { 
                    Swal.fire({
                        title: "Atención",
                        text: "Por favor verifique los campos en rojo.",
                        icon: "error",
                        confirmButtonColor: "#d33"
                    });
                    return false;
                } 
            } 

            // Configuración del envío de datos por AJAX (POST)
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + '/Usuarios/setUsuario'; 
            var formData = new FormData(formUsuario);
            
            request.open("POST", ajaxUrl, true);
            request.send(formData);

            // Estructura preparada para cuando el instructor añada la respuesta de éxito/error del servidor
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    console.log(request.responseText);
                }
            };
        };
    }
}, false);

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

                // Mantenemos la inicialización de tu buscador moderno sin errores
                VirtualSelect.init({
                    ele: '#listRolid',
                    search: true,
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