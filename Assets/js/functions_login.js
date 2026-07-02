 $('.login-content [data-toggle="flip"]').click(function() {
    $('.login-box').toggleClass('flipped');
    return false;
});

document.addEventListener('DOMContentLoaded', function() {
    
    const formLogin = document.querySelector("#formLogin");
    
    if (formLogin) {
        formLogin.onsubmit = function(e) {
            e.preventDefault();
            
            const strEmail = document.querySelector('#txtEmail').value.trim();
            const strPassword = document.querySelector('#txtPassword').value.trim();

            // 1. Validación de campos vacíos (Corregido el paréntesis extra)
            if (strEmail === "" || strPassword === "") {
                Swal.fire({
                    title: "Por favor",
                    text: "Escribe usuario y contraseña.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
                return false;
            }

            // 2. Petición AJAX (Corregido XMLHttpRequest y removido ActiveXObject obsoleto)
            const request = new XMLHttpRequest();
            const ajaxUrl = `${base_url}/Login/loginUser`; 
            const formData = new FormData(formLogin);
            
            request.open("POST", ajaxUrl, true);
            request.send(formData);

           // ==========================================
           // 3. CAPTURA DE RESPUESTA (FUSIÓN OPTIMIZADA)
           // ==========================================
           request.onreadystatechange = function() {
               // Si la petición aún no termina (readyState != 4), detenemos la ejecución
               if (request.readyState !== 4) return;

               // Si el servidor responde correctamente (HTTP 200)
               if (request.status === 200) {
                   try {
                       const objData = JSON.parse(request.responseText);
            
                       if (objData.status) {
                           // Redirección exitosa usando Template Literals
                           window.location = `${base_url}/Dashboard`;
                       } else {
                           // Alerta con SweetAlert2 si las credenciales son incorrectas
                           Swal.fire({
                               title: "Atención",
                               text: objData.msg,
                               icon: "error",
                               confirmButtonColor: "#d33"
                           });
                
                           // Limpieza del campo de contraseña por seguridad (Detalle de tu instructor)
                           const txtPassword = document.querySelector('#txtPassword');
                           if (txtPassword) txtPassword.value = "";
                       }
                   } catch (error) {
                       console.error("Error al procesar la respuesta JSON de login: ", error);
                   }
               } else {
                   // Manejo de errores si el servidor falla (HTTP != 200)
                   Swal.fire({
                       title: "Atención",
                       text: "Error en el proceso. No se pudo conectar con el servidor.",
                       icon: "error",
                       confirmButtonColor: "#d33"
                   });
               }
           };
        };
    }
}, false);