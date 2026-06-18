// ==========================================
// 1. ESCUCHADORES DE INICIO (DOM READY)
// ==========================================
window.bootstrap = window.bootstrap || {};
var tableUsuarios;

document.addEventListener('DOMContentLoaded', function() {

    // Inicializamos DataTables
    tableUsuarios = $('#tableUsuarios').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-MX.json"
        },
        "ajax": {
            "url": " " + base_url + "/Usuarios/getUsuarios",
            "dataSrc": ""
        },
        "columns": [
            { data: 'idpersona' },
            { data: 'nombres' },
            { data: 'apellidos' },
            { data: 'email_user' },
            { data: 'telefono' },
            { data: 'nombrerol' },
            { data: 'status' },
            { data: 'options' }
        ],
        // drawCallback se encarga de activar el escucha de los botones cada vez que la tabla se redibuja o cambia de página
        "drawCallback": function(settings) {
            fntViewUsuario();
        },
        "responsive": true,
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0, "desc"]]
    });

    if (typeof fntRolesUsuario === "function") {
        fntRolesUsuario();
    }

    // Manejo del Envío del Formulario (Guardar / Registrar Usuario)
    var formUsuario = document.querySelector("#formUsuario");
    if (formUsuario) {
        formUsuario.onsubmit = function(e) {
            e.preventDefault();
           
            var strIdentificacion = document.querySelector('#txtIdentificacion').value;
            var strNombre = document.querySelector('#txtNombre').value;
            var strApellido = document.querySelector('#txtApellido').value;
            var strEmail = document.querySelector('#txtEmail').value;
            var intTelefono = document.querySelector('#txtTelefono').value;
            var intTipousuario = document.querySelector('#listRolid').value;

            if (strIdentificacion == '' || strApellido == '' || strNombre == '' || strEmail == '' || intTelefono == '' || intTipousuario == '') {
                Swal.fire({
                    title: "Atención",
                    text: "Todos los campos son obligatorios.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
                return false;
            }

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

            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + '/Usuarios/setUsuario';
            var formData = new FormData(formUsuario);
           
            request.open("POST", ajaxUrl, true);
            request.send(formData);

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    try {
                        var objData = JSON.parse(request.responseText);
                       
                        if (objData.status) {
                            const modalElement = document.querySelector('#modalFormUsuario');
                            if (modalElement) {
                                const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                                if (modal) modal.hide();
                            }
                           
                            formUsuario.reset();
                           
                            Swal.fire({
                                title: "Usuarios",
                                text: objData.msg,
                                icon: "success",
                                confirmButtonColor: "#1b6341"
                            });
                           
                            tableUsuarios.ajax.reload();
                           
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: objData.msg,
                                icon: "error",
                                confirmButtonColor: "#d33"
                            });
                        }
                    } catch (error) {
                        console.error("Error al procesar la respuesta JSON: ", error);
                    }
                }
            };
        };
    }
}, false);

// ==========================================
// 2. FUNCIÓN: CARGAR ROLES EN SELECT
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

// ==========================================
// 3. FUNCIÓN: VER DETALLES DE UN USUARIO (DELEGACIÓN ASÍNCRONA)
// ==========================================
function fntViewUsuario() {
    var btnViewUsuario = document.querySelectorAll(".btnViewUsuario");
    btnViewUsuario.forEach(function(btnViewUsuario) {
        btnViewUsuario.addEventListener('click', function() {
            var idpersona = this.getAttribute("us");
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + '/Usuarios/getUsuario/' + idpersona;
            
            request.open("GET", ajaxUrl, true);
            request.send();

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    // Imprimimos la respuesta en consola igual que en tus pruebas
                    console.log("Respuesta del servidor:", request.responseText);
                    
                    // Inyectamos temporalmente la respuesta en el campo Identificación
                    document.querySelector("#celIdentificacion").innerHTML = request.responseText;
                    document.querySelector("#celNombre").innerHTML = "Instructor de curso php";
                    document.querySelector("#celApellido").innerHTML = "Conexión Exitosa bug resuelto";
                    
                    // SOLUCIÓN MODERNIZADA BOOTSTRAP 5 (Reemplaza al clásico $('#modalViewUser').modal('show'))
                    const modalElement = document.querySelector('#modalViewUser');
                    if (modalElement) {
                        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
                        modal.show();
                    }
                }
            };
        });
    });
}

// ==========================================
// 4. FUNCIÓN: CONFIGURAR Y ABRIR REGISTRO NUEVO
// ==========================================
function openModal() {
    document.querySelector('#idUsuario').value = "";
   
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
   
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Usuario";
   
    document.querySelector("#formUsuario").reset();
   
    const modalElement = document.querySelector('#modalFormUsuario');
    if (modalElement) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.show();
    }
}