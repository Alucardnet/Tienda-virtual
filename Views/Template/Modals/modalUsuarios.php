<div class="modal fade" id="modalFormUsuario" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header headerRegister">
                <h5 class="modal-title" id="titleModal">Nuevo Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <form id="formUsuario" name="formUsuario" class="form-horizontal">
                    <input type="hidden" id="idUsuario" name="idUsuario" value="">
                    <p class="text-primary">Todos los campos son obligatorios.</p>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="txtIdentificacion" class="form-label">Identificación</label>
                            <input type="text" class="form-control" id="txtIdentificacion" name="txtIdentificacion" required="">
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="txtNombre" class="form-label">Nombres</label>
                            <input type="text" class="form-control" id="txtNombre" name="txtNombre" required="">
                        </div>
                        <div class="col-md-6">
                            <label for="txtApellido" class="form-label">Apellidos</label>
                            <input type="text" class="form-control" id="txtApellido" name="txtApellido" required="">
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="txtTelefono" class="form-label">Teléfono</label>
                            <input type="text" class="form-control" id="txtTelefono" name="txtTelefono" required="">
                        </div>
                        <div class="col-md-6">
                            <label for="txtEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="txtEmail" name="txtEmail" required="">
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="listRolid" class="form-label">Tipo usuario</label>
                            <select class="form-select" id="listRolid" name="listRolid" required>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="listStatus" class="form-label">Status</label>
                            <select class="form-select" id="listStatus" name="listStatus" required>
                                <option value="1">Activo</option>
                                <option value="2">Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label for="txtPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="txtPassword" name="txtPassword">
                        </div>
                    </div>

                    <div class="tile-footer d-flex justify-content-start gap-2">
                        <button id="btnActionForm" class="btn btn-primary" type="submit">
                            <i class="bi bi-check-circle-fill me-2"></i><span id="btnText">Guardar</span>
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


<div class="modal fade" id="modalViewUser" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header header-primary">
                <h5 class="modal-title" id="titleModal">Datos del Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td class="fw-bold">Identificación:</td>
                            <td id="celIdentificacion"></td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Nombres:</td>
                            <td id="celNombre"></td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Apellidos:</td>
                            <td id="celApellido"></td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Teléfono:</td>
                            <td id="celTelefono"></td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Email (Usuario):</td>
                            <td id="celEmail"></td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Tipo Usuario:</td>
                            <td id="celTipoUsuario"></td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Estado:</td>
                            <td id="celEstado"></td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Fecha de registro:</td>
                            <td id="celFechaRegistro"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>