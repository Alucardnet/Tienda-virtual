<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Alucard_0x">
    <meta name="theme-color" content="#009688">
    <link rel="shortcut icon" href="<?= media(); ?>/images/favicon.ico">
    <link rel="stylesheet" type="text/css" href="<?= media(); ?>/css/main.css">
    <link rel="stylesheet" type="text/css" href="<?= media(); ?>/css/style.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <title><?= $data['page_tag']; ?></title>
</head>

<body>
    <section class="material-half-bg">
        <div class="cover"></div>
    </section>
    <section class="login-content">
        <div class="logo">
            <h1><?= $data['page_title']; ?></h1>
        </div>
        <div class="login-box flipped">
            <div id="divLoading">
                <div>
                    <img src="<?= media(); ?>/images/loading.svg" alt="Loading">
                </div>
            </div>

            <!-- Form Reset pass -->
            <form class="forget-form" name="formCambiarPass" id="formCambiarPass" action="">

                <!-- ¡CORREGIDO! Valores limpios sin la palabra "required" incrustada dentro del texto -->
                <input type="hidden" name="idUsuario" id="idUsuario" value="<?= $data['idpersona']; ?>">
                <input type="hidden" name="txtEmail" id="txtEmail" value="<?= $data['email']; ?>">
                <input type="hidden" name="txtToken" id="txtToken" value="<?= $data['token']; ?>">

                <h3 class="login-head"><i class="bi bi-key-fill"></i> Cambiar contraseña</h3>

                <div class="mb-3">
                    <input id="txtPassword" name="txtPassword" class="form-control" type="password" placeholder="Nueva contraseña" required>
                </div>

                <div class="mb-3">
                    <input id="txtPasswordConfirm" name="txtPasswordConfirm" class="form-control" type="password" placeholder="Confirmar contraseña" required>
                </div>

                <div class="mb-3 btn-container d-grid">
                    <button type="submit" class="btn btn-primary btn-block"><i class="bi bi-unlock me-2 fs-5"></i>REINICIAR</button>
                </div>

            </form>
        </div>
    </section>

    <script>
        const base_url = "<?= base_url(); ?>";
    </script>

    <script src="<?= media(); ?>/js/jquery-3.7.0.min.js"></script>
    <script src="<?= media(); ?>/js/bootstrap.min.js"></script>
    <script src="<?= media(); ?>/js/main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="<?= media(); ?>/js/<?= $data['page_functions_js']; ?>"></script>
</body>

</html>