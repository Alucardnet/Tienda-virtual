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
    // Esto es vital cuando usas DataTables con AJAX
    const tableBody = document.querySelector('#tableRoles tbody');

    if (tableBody) {
        tableBody.addEventListener('click', function(e) {
            // Buscamos si el clic ocurrió en un botón de edición o un elemento hijo del mismo
            const btnEdit = e.target.closest(".btnEditRol");
            
            if (btnEdit) {
                // Cambios visuales del modal (Bootstrap 5)
                document.querySelector('#titleModal').innerHTML = "Actualizar Rol";
                document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
                document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
                document.querySelector('#btnText').innerHTML = "Actualizar";

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