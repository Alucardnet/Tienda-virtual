var tableRoles;
document.addEventListener('DOMContentLoaded', function(){
    // CORRECCIÓN 1: Se cambió a la inicialización moderna de DataTables para evitar conflictos
    tableRoles = $('#tableRoles').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            // CORRECCIÓN 2: Se agregó "https:" explícito para solucionar el error de CORS (i18n loading error)
            "url": "https://cdn.datatables.net/plug-ins/2.3.8/i18n/es-MX.json"
        },
        "ajax": {
            "url": " " + base_url + "/Roles/getRoles",
            "dataSrc": ""
        },
        columns: [
            { data: 'idrol' },
            { data: 'nombrerol' },
            { data: 'descripcion' },
            { data: 'status' },
            { data: 'options' }
        ],
        "responsive": true,
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0, "desc"]]
    });

    // Nuevo Rol
    var formRol = document.querySelector("#formRol");
    if (formRol) {
        formRol.onsubmit = function(e){
            e.preventDefault();

            var strNombre = document.querySelector('#txtNombre').value;
            var strDescripcion = document.querySelector('#txtDescripcion').value;
            var intstatus = document.querySelector('#listStatus').value;

            if (strNombre == '' || strDescripcion == '' || intstatus == '') {
                Swal.fire({
                    title: "Atención",
                    text: "Todos los campos son obligatorios",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#1b6341",
                });
                return false;
            }

            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + 'Roles/setRol';
            var formData = new FormData(formRol);
            request.open("POST", ajaxUrl, true);
            request.send(formData);
            
            request.onreadystatechange = function(){
                if (request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);

                    if (objData.status) {
                        // CORRECCIÓN 3: Cierre de modal con estándar Bootstrap 5 puro (Sin jQuery)
                        const modalElement = document.querySelector('#modalFormRol');
                        if (modalElement) {
                            bootstrap.Modal.getOrCreateInstance(modalElement).hide();
                        }
                        
                        formRol.reset();
        
                        Swal.fire({
                            title: "Roles de usuario",
                            text: objData.msg,
                            icon: "success",
                            confirmButtonColor: "#1b6341",
                            confirmButtonText: "Aceptar" 
                        });

                        // CORRECCIÓN 4: Al usar .DataTable() moderno se recarga directamente con .ajax.reload()
                        tableRoles.ajax.reload(); 

                    } else {
                        Swal.fire({
                            title: "Error",
                            text: objData.msg,
                            icon: "error",
                            confirmButtonColor: "#d33",
                            confirmButtonText: "Entendido"
                        });
                    }
                }
            }
        }
    }
});

// CORRECCIÓN 5: SE ELIMINÓ LA LÍNEA SOLITARIA $('#tableRoles').DataTable(); QUE DUPLICABA LA TABLA

function openModal(){
    document.querySelector('#idRol').value = "";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Rol";
    document.querySelector("#formRol").reset();

    // CORRECCIÓN 6: Apertura de modal con Vanilla JS (Bootstrap 5)
    const modalElement = document.querySelector('#modalFormRol');
    if (modalElement) {
        bootstrap.Modal.getOrCreateInstance(modalElement).show();
    }
}

function fntEditRol() {
    const tableBody = document.querySelector('#tableRoles tbody');

    if (tableBody) {
        tableBody.addEventListener('click', function(e) {
            const btnEdit = e.target.closest(".btnEditRol");
            
            if (btnEdit) {
                const idRol = btnEdit.getAttribute("rl"); 

                document.querySelector('#titleModal').innerHTML = "Actualizar Rol";
                document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
                document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
                document.querySelector('#btnText').innerHTML = "Actualizar";

                const request = new XMLHttpRequest();
                const ajaxUrl = base_url + '/Roles/getRol/' + idRol; 

                request.open("GET", ajaxUrl, true);
                
                request.onreadystatechange = function() {
                    if (request.readyState == 4 && request.status == 200) {
                        const objData = JSON.parse(request.responseText);
                        
                        if (objData.status) {
                            document.querySelector("#idRol").value = objData.data.idrol;
                            document.querySelector("#txtNombre").value = objData.data.nombrerol;
                            document.querySelector("#txtDescripcion").value = objData.data.descripcion;

                            let optionSelect = '';
                            if (objData.data.status == 1) {
                                optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
                            } else {
                                optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
                            }

                            const htmlSelect = `${optionSelect}
                                                <option value="1">Activo</option>
                                                <option value="2">Inactivo</option>`;
                                                
                            document.querySelector("#listStatus").innerHTML = htmlSelect;
                            
                            // CORRECCIÓN 7: El modal se abre UNICAMENTE cuando los datos ya se inyectaron de forma exitosa
                            const modalElement = document.querySelector('#modalFormRol');
                            if (modalElement) {
                                bootstrap.Modal.getOrCreateInstance(modalElement).show();
                            }

                        } else {
                            Swal.fire("Error", objData.msg, "error");
                        }
                    }
                };

                request.send();
            }
        });
    }
}

// Inicialización única de escuchas al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    fntEditRol();
    fntDelRol();
    fntPermisos();
});

function fntDelRol() {
    document.addEventListener('click', function(e) {
        const btnDelRol = e.target.closest(".btnDelRol");
        
        if (btnDelRol) {
            var idrol = btnDelRol.getAttribute("rl");

            Swal.fire({
                title: "Eliminar Rol",
                text: "¿Realmente quiere eliminar el Rol?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "No, cancelar!",
                confirmButtonColor: "#1b6341",
                cancelButtonColor: "#d33"
            }).then((result) => {
                if (result.isConfirmed) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxUrl = base_url + 'Roles/delRol/';
                    var strData = "idrol=" + idrol;
                    
                    request.open("POST", ajaxUrl, true);
                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    request.send(strData);
                    
                    request.onreadystatechange = function() {
                        if (request.readyState == 4 && request.status == 200) {
                            var objData = JSON.parse(request.responseText);
                            
                            if (objData.status) {
                                Swal.fire({
                                    title: "Eliminar!",
                                    text: objData.msg,
                                    icon: "success",
                                    confirmButtonColor: "#1b6341"
                                });

                                tableRoles.ajax.reload();
                                
                            } else {
                                Swal.fire({
                                    title: "Atención!",
                                    text: objData.msg,
                                    icon: "error",
                                    confirmButtonColor: "#d33"
                                });
                            }
                        }
                    };
                }
            });
        }
    });
}

function fntPermisos() {
    document.addEventListener('click', function(e) {
        const btnPermisosRol = e.target.closest(".btnPermisosRol");
        
        if (btnPermisosRol) {
            var idrol = btnPermisosRol.getAttribute("rl");

            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + '/Permisos/getPermisosRol/' + idrol;
            
            request.open("GET", ajaxUrl, true);
            request.send();

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    document.querySelector('#contentAjax').innerHTML = request.responseText;
                    
                    const modalElement = document.querySelector('.modalPermisos');
                    if (modalElement) {
                        bootstrap.Modal.getOrCreateInstance(modalElement).show();
                    }

                    const formPermisos = document.querySelector('#formPermisos');
                    if (formPermisos) {
                        formPermisos.addEventListener('submit', fntSavePermisos, false);
                    }
                }
            };
        }
    });
}

function fntSavePermisos(event) {
    event.preventDefault();

    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = base_url + '/Permisos/setPermisos';
    var formData = new FormData(event.target);

    request.open("POST", ajaxUrl, true);
    request.send(formData);

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var objData = JSON.parse(request.responseText);
            
            if (objData.status) {
                Swal.fire({
                    title: "Permisos de usuario",
                    text: objData.msg,
                    icon: "success",
                    confirmButtonColor: "#1b6341"
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: objData.msg,
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            }
        }
    };
}