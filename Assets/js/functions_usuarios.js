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
// 3. FUNCIÓN: VER DETALLES DE UN USUARIO (ACTUALIZADA)
// ==========================================
function fntViewUsuario() {
    const tableContainer = document.querySelector('#tableUsuarios');
    if (!tableContainer) return;

    // Desvinculamos cualquier escucha previo para evitar peticiones duplicadas
    tableContainer.removeEventListener('click', handleTableClick);
    tableContainer.addEventListener('click', handleTableClick);
}

// Manejador del evento Clic adaptado a la lógica del instructor pero en Bootstrap 5
function handleTableClick(e) {
    // Detecta el botón correcto cuidando que las clases coincidan con tu controlador PHP
    const btn = e.target.closest('.btnViewUsuario');
    
    if (btn) {
        var idpersona = btn.getAttribute("us");
        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url + '/Usuarios/getUsuario/' + idpersona;
        
        request.open("GET", ajaxUrl, true);
        request.send();

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                try {
                    // Si tu instructor todavía tiene el "echo $idpersona; die();", este bloque try/catch 
                    // evitará que la aplicación truene y te avisará en la consola.
                    var objData = JSON.parse(request.responseText);

                    if (objData.status) {
                        // ACTUALIZADO: Clases de Bootstrap 5 para los badges ('bg-success' / 'bg-danger')
                        var estadoUsuario = objData.data.status == 1 ? 
                            '<span class="badge bg-success">Activo</span>' : 
                            '<span class="badge bg-danger">Inactivo</span>';

                        // Inyección de información en las celdas del modal
                        document.querySelector("#celIdentificacion").innerHTML = objData.data.identificacion;
                        document.querySelector("#celNombre").innerHTML = objData.data.nombres;
                        document.querySelector("#celApellido").innerHTML = objData.data.apellidos;
                        
                        // Validación por si el ID de tu tabla HTML se llama #celtelefono o #celTelefono
                        const celTelefono = document.querySelector("#celtelefono") || document.querySelector("#celTelefono");
                        if (celTelefono) {
                            celTelefono.innerHTML = objData.data.telefono;
                        } else {
                            document.querySelector("#celTelefono").innerHTML = objData.data.telefono;
                        }
                        
                        document.querySelector("#celEmail").innerHTML = objData.data.email_user;
                        document.querySelector("#celTipoUsuario").innerHTML = objData.data.nombrerol;
                        document.querySelector("#celEstado").innerHTML = estadoUsuario;
                        document.querySelector("#celFechaRegistro").innerHTML = objData.data.fecharegistro; 

                        // ACTUALIZADO: Sintaxis moderna de Bootstrap 5 en JS puro para abrir el modal
                        const modalElement = document.querySelector('#modalViewUser');
                        if (modalElement) {
                            const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
                            modal.show();
                        }
                    } else {
                        // ACTUALIZADO: Alerta adaptada a SweetAlert2 (Swal.fire)
                        Swal.fire({
                            title: "Error",
                            text: objData.msg,
                            icon: "error",
                            confirmButtonColor: "#d33"
                        });
                    }
                } catch (error) {
                    // Manejo de contingencia por si el servidor aún no responde un JSON válido
                    console.log("El controlador aún no devuelve JSON. Respuesta recibida:", request.responseText);
                    
                    // Comportamiento temporal para visualizar que la conexión responde el ID
                    document.querySelector("#celIdentificacion").innerHTML = request.responseText;
                    document.querySelector("#celNombre").innerHTML = "Esperando actualización de la base de datos...";
                    
                    const modalElement = document.querySelector('#modalViewUser');
                    if (modalElement) {
                        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
                        modal.show();
                    }
                }
            }
        };
    }
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