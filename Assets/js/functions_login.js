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

            // 3. CAPTURA DE RESPUESTA (Lo que le faltaba al instructor para que funcione)
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                    try {
                        const objData = JSON.parse(request.responseText);
                        
                        if (objData.status) {
                            // Si el controlador PHP devuelve true, redirige al Dashboard
                            window.location = `${base_url}/Dashboard`;
                        } else {
                            // Alerta si el usuario o contraseña son incorrectos
                            Swal.fire({
                                title: "Error",
                                text: objData.msg,
                                icon: "error",
                                confirmButtonColor: "#d33"
                            });
                        }
                    } catch (error) {
                        console.error("Error al procesar la respuesta JSON de login: ", error);
                    }
                }
            };
        };
    }
}, false);