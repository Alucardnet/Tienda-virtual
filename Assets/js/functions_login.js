 $('.login-content [data-toggle="flip"]').click(function() {
    $('.login-box').toggleClass('flipped');
    return false;
});


var divLoading = document.querySelector("#divLoading");

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. INICIO DE SESIÓN (formLogin)
    // ==========================================
    const formLogin = document.querySelector("#formLogin");

    if (formLogin) {
        formLogin.addEventListener('submit', async function (e) {
            e.preventDefault();

            const strEmail = document.querySelector('#txtEmail').value.trim();
            const strPassword = document.querySelector('#txtPassword').value.trim();

            // Validación de campos vacíos
            if (strEmail === "" || strPassword === "") {
                Swal.fire({
                    title: "Por favor",
                    text: "Escribe usuario y contraseña.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
                return false;
            }

            // Muestra del Loader
            if (divLoading) divLoading.style.display = "flex";

            try {
                const ajaxUrl = `${base_url}login/loginUser`;
                const formData = new FormData(formLogin);

                const response = await fetch(ajaxUrl, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const objData = await response.json();

                if (objData.status) {
                    window.location = `${base_url}dashboard`;
                } else {
                    Swal.fire({
                        title: "Atención",
                        text: objData.msg,
                        icon: "error",
                        confirmButtonColor: "#d33"
                    });

                    const txtPassword = document.querySelector('#txtPassword');
                    if (txtPassword) txtPassword.value = "";
                }
            } catch (error) {
                console.error("Error en la petición de login:", error);
                Swal.fire({
                    title: "Atención",
                    text: "Error en el proceso. No se pudo conectar con el servidor.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            } finally {
                // Se asegura de ocultar el spinner de carga al terminar
                if (divLoading) divLoading.style.display = "none";
            }
        });
    }

   // ==========================================
    // 2. RECUPERACIÓN DE CONTRASEÑA (formRecetPass)
    // ==========================================
    const formRecetPass = document.querySelector("#formRecetPass");

    if (formRecetPass) {
        formRecetPass.addEventListener('submit', async function (e) {
            e.preventDefault();

            const strEmail = document.querySelector('#txtEmailReset').value.trim();

            if (strEmail === "") {
                Swal.fire({
                    title: "Por favor",
                    text: "Escribe tu correo electrónico.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
                return false;
            }

            if (divLoading) divLoading.style.display = "flex";

            try {
                const ajaxUrl = `${base_url}login/resetPass`;
                const formData = new FormData(formRecetPass);

                const response = await fetch(ajaxUrl, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const objData = await response.json();

                if (objData.status) {
                    Swal.fire({
                        title: "Proceso Exitoso",
                        text: objData.msg,
                        icon: "success",
                        confirmButtonColor: "#009688"
                    }).then(() => {
                        window.location = `${base_url}login`;
                    });
                } else {
                    Swal.fire({
                        title: "Atención",
                        text: objData.msg,
                        icon: "error",
                        confirmButtonColor: "#d33"
                    });
                }
            } catch (error) {
                console.error("Error en el restablecimiento de contraseña:", error);
                Swal.fire({
                    title: "Atención",
                    text: "No se pudo realizar el proceso. Intenta más tarde.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            } finally {
                if (divLoading) divLoading.style.display = "none";
            }
        });
    }

// ==========================================
    // 3. CAMBIAR CONTRASEÑA (formCambiarPass)
    // ==========================================
    const formCambiarPass = document.querySelector("#formCambiarPass");

    if (formCambiarPass) {
        formCambiarPass.addEventListener('submit', async function (e) {
            e.preventDefault();

            const strPassword = document.querySelector('#txtPassword').value;
            const strPasswordConfirm = document.querySelector('#txtPasswordConfirm').value;

            if (strPassword === "" || strPasswordConfirm === "") {
                Swal.fire({
                    title: "Por favor",
                    text: "Escribe la nueva contraseña y confirma la información.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
                return false;
            }

            if (strPassword !== strPasswordConfirm) {
                Swal.fire({
                    title: "Atención",
                    text: "Las contraseñas no coinciden.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
                return false;
            }

            if (divLoading) divLoading.style.display = "flex";

            try {
                const ajaxUrl = `${base_url}login/setPassword`;
                const formData = new FormData(formCambiarPass);

                const response = await fetch(ajaxUrl, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const objData = await response.json();

                if (objData.status) {
                    Swal.fire({
                        title: "Éxito",
                        text: objData.msg,
                        icon: "success",
                        confirmButtonColor: "#009688"
                    }).then(() => {
                        window.location = `${base_url}login`;
                    });
                } else {
                    Swal.fire({
                        title: "Atención",
                        text: objData.msg,
                        icon: "error",
                        confirmButtonColor: "#d33"
                    });
                }
            } catch (error) {
                console.error("Error al actualizar la contraseña:", error);
                Swal.fire({
                    title: "Atención",
                    text: "Ocurrió un problema al actualizar la contraseña.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            } finally {
                if (divLoading) divLoading.style.display = "none";
            }
        });
    }

});
