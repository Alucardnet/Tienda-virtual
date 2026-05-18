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
});