// ==========================================
// 1. ESCUCHADORES DE INICIO (DOM READY)
// ==========================================
window.bootstrap = window.bootstrap || {};
var tableUsuarios;

document.addEventListener('DOMContentLoaded', function() {

    // ---------------------------------------------------
    // VALIDACIÓN: Sólo inicializa DataTables si existe la tabla
    // ---------------------------------------------------
    if (document.querySelector('#tableUsuarios')) {
        tableUsuarios = $('#tableUsuarios').DataTable({
            "aProcessing": true,
            "aServerSide": true,
            "language": {
                "processing": "Procesando...",
                "lengthMenu": "Mostrar _MENU_ entradas",
                "zeroRecords": "No se encontraron resultados",
                "emptyTable": "Ningún dato disponible en esta tabla",
                "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "search": "Buscar:",
                "paginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
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
            "layout": {
                "topStart": {
                    "pageLength": true, 
                    "buttons": [
                        { "extend": "copyHtml5", "text": "<i class='bi bi-clipboard'></i> Copiar", "titleAttr": "Copiar", "className": "btn btn-secondary" },
                        { "extend": "excelHtml5", "text": "<i class='bi bi-file-earmark-excel'></i> Excel", "titleAttr": "Exportar a Excel", "className": "btn btn-success" },
                        { "extend": "pdfHtml5", "text": "<i class='bi bi-file-earmark-pdf'></i> PDF", "titleAttr": "Exportar a PDF", "className": "btn btn-danger" },
                        { "extend": "csvHtml5", "text": "<i class='bi bi-filetype-csv'></i> CSV", "titleAttr": "Exportar a CSV", "className": "btn btn-info" }
                    ]
                },
                "topEnd": {
                    "search": true 
                }
            },
            "drawCallback": function(settings) {
                fntViewUsuario();
            },
            "responsive": true,
            "bDestroy": true,
            "order": [[0, "desc"]]
        });
    }

    if (typeof fntRolesUsuario === "function") {
        fntRolesUsuario();
    }

    // ---------------------------------------------------
    // VALIDACIÓN DEL FORMULARIO DE USUARIOS
    // ---------------------------------------------------
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
            for (let element of elementsValid) {
                if (element.classList.contains('is-invalid')) {
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
                            
                            if (tableUsuarios) {
                                tableUsuarios.ajax.reload();
                            }
                            
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
            
            // VALIDACIÓN DE EXISTENCIA: Evita el error Null al estar en la vista Perfil
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
// 3. FUNCIÓN: INICIALIZAR ESCUCHAS DE LA TABLA
// ==========================================
function fntViewUsuario() {
    const tableContainer = document.querySelector('#tableUsuarios');
    if (!tableContainer) return;

    tableContainer.removeEventListener('click', handleTableClick);
    tableContainer.addEventListener('click', handleTableClick);
}

// ==========================================
// 4. MANEJADOR CENTRAL DE CLICS (VER, EDITAR Y ELIMINAR)
// ==========================================
function handleTableClick(e) {
    const btnView = e.target.closest('.btnViewUsuario');
    if (btnView) {
        var idpersona = btnView.getAttribute("us");
        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url + '/Usuarios/getUsuario/' + idpersona;
        
        request.open("GET", ajaxUrl, true);
        request.send();

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                try {
                    var objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        var estadoUsuario = objData.data.status == 1 ? 
                            '<span class="badge bg-success">Activo</span>' : 
                            '<span class="badge bg-danger">Inactivo</span>';

                        document.querySelector("#celIdentificacion").innerHTML = objData.data.identificacion;
                        document.querySelector("#celNombre").innerHTML = objData.data.nombres;
                        document.querySelector("#celApellido").innerHTML = objData.data.apellidos;
                        
                        const celTelefono = document.querySelector("#celtelefono") || document.querySelector("#celTelefono");
                        if (celTelefono) celTelefono.innerHTML = objData.data.telefono;
                        
                        document.querySelector("#celEmail").innerHTML = objData.data.email_user;
                        document.querySelector("#celTipoUsuario").innerHTML = objData.data.nombrerol;
                        document.querySelector("#celEstado").innerHTML = estadoUsuario;
                        document.querySelector("#celFechaRegistro").innerHTML = objData.data.fecharegistro; 

                        const modalElement = document.querySelector('#modalViewUser');
                        if (modalElement) {
                            bootstrap.Modal.getOrCreateInstance(modalElement).show();
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        return;
    }

    const btnEdit = e.target.closest('.btnEditUsuario');
    if (btnEdit) {
        document.querySelector('#titleModal').innerHTML = "Actualizar Usuario";
        document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
        document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
        document.querySelector('#btnText').innerHTML = "Actualizar";

        var idpersona = btnEdit.getAttribute("us");
        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url + '/Usuarios/getUsuario/' + idpersona;
        
        request.open("GET", ajaxUrl, true);
        request.send();

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                try {
                    var objData = JSON.parse(request.responseText);

                    if (objData.status) {
                        document.querySelector("#idUsuario").value = objData.data.idpersona;
                        document.querySelector("#txtIdentificacion").value = objData.data.identificacion;
                        document.querySelector("#txtNombre").value = objData.data.nombres;
                        document.querySelector("#txtApellido").value = objData.data.apellidos;
                        document.querySelector("#txtTelefono").value = objData.data.telefono;
                        document.querySelector("#txtEmail").value = objData.data.email_user;
                        
                        const selectRol = document.querySelector('#listRolid');
                        if (selectRol && selectRol.setValue) {
                            selectRol.setValue(objData.data.idrol);
                        } else if (selectRol) {
                            selectRol.value = objData.data.idrol;
                        }

                        const selectStatus = document.querySelector("#listStatus");
                        if (objData.data.status == 1) {
                            if (selectStatus && selectStatus.setValue) selectStatus.setValue(1);
                            else if (selectStatus) selectStatus.value = 1;
                        } else {
                            if (selectStatus && selectStatus.setValue) selectStatus.setValue(2);
                            else if (selectStatus) selectStatus.value = 2;
                        }

                        const modalElement = document.querySelector('#modalFormUsuario');
                        if (modalElement) {
                            bootstrap.Modal.getOrCreateInstance(modalElement).show();
                        }
                    }
                } catch (error) {
                    console.error("Error al procesar la edición:", error);
                }
            }
        };
        return;
    }

    const btnDel = e.target.closest('.btnDelUsuario');
    if (btnDel) {
        var idpersona = btnDel.getAttribute("us"); 
        fntDelUsuario(idpersona);
        return;
    }
}

// ==========================================
// 5. FUNCIÓN: ELIMINAR USUARIO
// ==========================================
function fntDelUsuario(idpersona) {
    var idUsuario = idpersona;

    Swal.fire({
        title: "Eliminar Usuario",
        text: "¿Realmente quiere eliminar el Usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        confirmButtonColor: "#1b6341",
        cancelButtonColor: "#d33"
    }).then((result) => {
        if (result.isConfirmed) {
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + '/Usuarios/delUsuario';
            var strData = "idUsuario=" + idUsuario;

            request.open("POST", ajaxUrl, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(strData);

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    try {
                        var objData = JSON.parse(request.responseText);
                        if (objData.status) {
                            Swal.fire({
                                title: "Eliminar!",
                                text: objData.msg,
                                icon: "success",
                                confirmButtonColor: "#1b6341"
                            });
                            if (tableUsuarios) {
                                tableUsuarios.ajax.reload();
                            }
                        } else {
                            Swal.fire({
                                title: "Atención!",
                                text: objData.msg,
                                icon: "error",
                                confirmButtonColor: "#d33"
                            });
                        }
                    } catch (error) {
                        console.error("Error al eliminar usuario:", error);
                    }
                }
            };
        }
    });
}

// ==========================================
// 6. FUNCIÓN: CONFIGURAR Y ABRIR REGISTRO NUEVO
// ==========================================
function openModal() {
    const idUsuario = document.querySelector('#idUsuario');
    if(idUsuario) idUsuario.value = "";
   
    const header = document.querySelector('.modal-header');
    if(header) header.classList.replace("headerUpdate", "headerRegister");
    
    const btnAction = document.querySelector('#btnActionForm');
    if(btnAction) btnAction.classList.replace("btn-info", "btn-primary");
   
    const btnText = document.querySelector('#btnText');
    if(btnText) btnText.innerHTML = "Guardar";
    
    const titleModal = document.querySelector('#titleModal');
    if(titleModal) titleModal.innerHTML = "Nuevo Usuario";
   
    const formUsuario = document.querySelector("#formUsuario");
    if(formUsuario) formUsuario.reset();
   
    const modalElement = document.querySelector('#modalFormUsuario');
    if (modalElement) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.show();
    }
}

// ==========================================
// 7. FUNCIÓN: ABRIR MODAL PERFIL (Actualizado)
// ==========================================
function openModalPerfil() {
    // Busca el ID exacto que usa tu instructor para el modal de perfil
    const modalElement = document.querySelector('#modalFormPerfil');
    
    if (modalElement) {
        // Usa la sintaxis nativa de Bootstrap 5
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.show();
    } else {
        console.warn("No se encontró el elemento #modalFormPerfil en el DOM.");
    }
}