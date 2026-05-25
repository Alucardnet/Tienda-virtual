var tableRoles;
document.addEventListener('DOMContentLoaded', function(){
    tableRoles = $('#tableRoles').dataTable({
        "aProcessing":true,
        "aServerSide":true,
        "language":{
            "url":"//cdn.datatables.net/plug-ins/2.3.8/i18n/es-MX.json"
        },
        "ajax":{
            "url": " "+base_url+"/Roles/getRoles",

            "dataSrc":""
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
        "order":[[0,"desc"]]
    });


    //Nuevo Rol
    var formRol = document.querySelector("#formRol");

    formRol.onsubmit = function(e){
        e.preventDefault();

        var intIdrol = document.querySelector('#idRol').value;
        var strNombre  = document.querySelector('#txtNombre').value;
        var strDescripcion = document.querySelector('#txtDescripcion').value;
        var intstatus = document.querySelector('#listStatus').value;

        if(strNombre == '' || strDescripcion == '' || intstatus == '') {
            // Implementación de SweetAlert2
            Swal.fire({
                title: "Atención",
                text: "Todos los campos son obligatorios",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#1b6341",
            });
            return false;
        }

        // código AJAX 
        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url+'Roles/setRol';
        var formData = new FormData(formRol);
        request.open("POST",ajaxUrl,true);
        request.send(formData);
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                var objData = JSON.parse(request.responseText);

                if(objData.status) {
                    // Cerrar el modal
                    $('#modalFormRol').modal("hide");
                    // Limpiar el formulario
                    formRol.reset();
    
                    // SweetAlert2 para éxito
                    Swal.fire({
                        title: "Roles de usuario",
                        text: objData.msg,
                        icon: "success",
                        confirmButtonColor: "#1b6341",
                        confirmButtonText: "Aceptar" 
                    });

                    // Recargar la tabla (corregido a .reload())
                    tableRoles.api().ajax.reload(); 

                } else {
                    // SweetAlert2 para error
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
});

$('#tableRoles').DataTable(); 

function openModal(){

    document.querySelector('#idRol').value="";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Rol";
    document.querySelector("#formRol").reset();

    $('#modalFormRol').modal('show');
}

function fntEditRol() {
    // Usamos delegación de eventos sobre el cuerpo de la tabla
    const tableBody = document.querySelector('#tableRoles tbody');

    if (tableBody) {
        tableBody.addEventListener('click', function(e) {
            // Buscamos si el clic ocurrió en un botón de edición o un elemento hijo
            const btnEdit = e.target.closest(".btnEditRol");
            
            if (btnEdit) {
    // 1. Obtener el ID del rol desde el atributo personalizado 'rl' del botón
    const idRol = btnEdit.getAttribute("rl"); 

    // Cambios visuales del modal (Bootstrap 5)
    document.querySelector('#titleModal').innerHTML = "Actualizar Rol";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML = "Actualizar";

    // 2. Instanciar el objeto XMLHttpRequest
    const request = new XMLHttpRequest();
    const ajaxUrl = base_url + '/Roles/getRol/' + idRol; 

    // 3. Configurar la petición
    request.open("GET", ajaxUrl, true);
    
    // 4. Definir qué hacer cuando llegue la respuesta
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            const objData = JSON.parse(request.responseText);
            
            if (objData.status) {
                document.querySelector("#idRol").value = objData.data.idrol;
                document.querySelector("#txtNombre").value = objData.data.nombrerol;
                document.querySelector("#txtDescripcion").value = objData.data.descripcion;

                // CORRECCIÓN 1: Declarar la variable fuera del if/else para que tenga alcance global en este bloque
                let optionSelect = '';
                if (objData.data.status == 1) {
                    optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
                } else {
                    optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
                }

                // CORRECCIÓN 2: Cambiar comillas simples por backticks (``) para que funcione la interpolación ${}
                const htmlSelect = `${optionSelect}
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>`;
                                    
                document.querySelector("#listStatus").innerHTML = htmlSelect;
                
                // CORRECCIÓN 3: Se eliminó la línea de jQuery $('#modalFormRol').modal('show') de aquí,
                // ya que manejas la apertura del modal al final de manera estándar con Bootstrap 5.

            } else {
                // CORRECCIÓN 4: Se cambió el punto por una coma
                swal("Error", objData.msg, "error");
            }
        }
    };

    // 5. Enviar la petición al servidor
    request.send();

    // Mostrar modal con Vanilla JS (Estándar de Bootstrap 5)
    const modalElement = document.querySelector('#modalFormRol');
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
}
        });
    }
}

// Ejecuta la función una sola vez al cargar el documento
document.addEventListener('DOMContentLoaded', function() {
    fntEditRol();
    fntDelRol();
    fntPermisos();
});

function fntDelRol() {
    // 1. Delegación de eventos en el documento (funciona siempre, incluso tras recargar)
    document.addEventListener('click', function(e) {
        
        const btnDelRol = e.target.closest(".btnDelRol");
        
        if (btnDelRol) {
            var idrol = btnDelRol.getAttribute("rl");

            // 2. SweetAlert moderno (SweetAlert2) basado en Promesas
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
                
                // Reemplaza al antiguo 'if(isConfirm)'
                if (result.isConfirmed) {
                    
                    // 3. Petición AJAX (Manteniendo XMLHttpRequest pero optimizado)
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
                                // Alerta de éxito moderna
                                Swal.fire({
                                    title: "Eliminar!",
                                    text: objData.msg,
                                    icon: "success",
                                    confirmButtonColor: "#1b6341"
                                });

                                // 4. Recarga limpia de DataTables
                                // Ya NO necesitas volver a meter las funciones aquí adentro
                                tableRoles.api().ajax.reload();
                                
                            } else {
                                // Alerta de error moderna
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
    // 1. Delegación de eventos en el documento global (evita que se rompa al paginar o recargar la tabla)
    document.addEventListener('click', function(e) {
        
        // Detectamos si se hizo clic en el botón de permisos o en su icono interno
        const btnPermisosRol = e.target.closest(".btnPermisosRol");
        
        if (btnPermisosRol) {
            // Capturamos el ID del rol desde el atributo "rl"
            var idrol = btnPermisosRol.getAttribute("rl");

            // 2. Petición AJAX (Manteniendo XMLHttpRequest estructurado de forma moderna)
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + '/Permisos/getPermisosRol/' + idrol;
            
            request.open("GET", ajaxUrl, true);
            request.send();

            request.onreadystatechange = function() {
                // Validación estándar de respuesta correcta (readyState 4 y status 200)
                if (request.readyState == 4 && request.status == 200) {
                    
                    // Aquí el instructor imprime la respuesta en consola
                    console.log(request.responseText);
                    
                    // Puedes colocar aquí la lógica para renderizar los permisos en el modal cuando el instructor lo enseñe
                }
            };

            // 3. Mostrar el modal usando Vanilla JS (Estándar de Bootstrap 5)
            const modalElement = document.querySelector('.modalPermisos');
            if (modalElement) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
                modal.show();
            }
        }
    });
}