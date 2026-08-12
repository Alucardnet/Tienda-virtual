<div class="modal fade" id="modalFormPerfil" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header headerUpdate">
                <h5 class="modal-title" id="titleModal">Actualizar Datos</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <form id="formPerfil" name="formPerfil" class="form-horizontal">
                    <input type="hidden" id="idUsuario" name="idUsuario" value="">
                    <p class="text-primary">Los campos con asterisco (<span class="required">*</span>) son obligatorios</p>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="txtIdentificacion" class="form-label">Identificación <span class="required">*</span></label>
                            <input type="text" class="form-control" id="txtIdentificacion" name="txtIdentificacion" value="<?= $_SESSION['userData']['identificacion']; ?>" required="">
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="txtNombre" class="form-label">Nombres <span class="required">*</span></label>
                            <input type="text" class="form-control valid validText" id="txtNombre" name="txtNombre" value="<?= $_SESSION['userData']['nombres']; ?>" required="">
                        </div>
                        <div class="col-md-6">
                            <label for="txtApellido" class="form-label">Apellidos <span class="required">*</span></label>
                            <input type="text" class="form-control valid validText" id="txtApellido" name="txtApellido" value="<?= $_SESSION['userData']['apellidos']; ?>" required="">
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="txtTelefono" class="form-label">Teléfono <span class="required">*</span></label>
                            <input type="text" class="form-control valid validNumber" id="txtTelefono" name="txtTelefono" value="<?= $_SESSION['userData']['telefono']; ?>" required="" onkeypress="return controlTag(event);">
                        </div>
                        <div class="col-md-6">
                            <label for="txtEmail" class="form-label">Email</label>
                            <input type="email" class="form-control valid validEmail" id="txtEmail" name="txtEmail" value="<?= $_SESSION['userData']['email_user']; ?>" required="" readonly disabled>
                        </div>
                    </div>


                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label for="txtPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="txtPassword" name="txtPassword">
                        </div>

                        <div class="col-md-6">
                            <label for="txtPasswordConfirm" class="form-label">Confirmar Password</label>
                            <input type="password" class="form-control" id="txtPasswordConfirm" name="txtPasswordConfirm">
                        </div>
                    </div>

                    <div class="tile-footer d-flex justify-content-start gap-2">
                        <button id="btnActionForm" class="btn btn-info" type="submit">
                            <i class="bi bi-check-circle-fill me-2"></i><span id="btnText">Actualizar</span>
                        </button>
                        <button class="btn btn-danger" type="button" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle-fill me-2"></i>Cancelar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>