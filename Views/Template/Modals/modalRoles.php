<!-- Modal -->
<div class="modal fade" id="modalFormRol" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header headerRegister">
                <h5 class="modal-title" id="titleModal">Nuevo Rol</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <!-- Form -->
                <div class="tile">
                    <div class="tile-body">
                        <form id="formRol" name="formRol">
                            <input type="hidden" id="idRol" name="idRol" value="">
                            <div class="mb-3">
                                <label class="form-label">Nombre</label>
                                <input class="form-control" id="txtNombre" name="txtNombre" type="text" placeholder="Nombre del rol">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Descripción</label>
                                <textarea class="form-control" id="txtDescripcion" name="txtDescripcion" rows="2" placeholder="Descripcion del rol"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="exampleSelect1">Estado</label>
                                <select class="form-control" id="listStatus" name="listStatus">
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                </select>
                            </div>
                            <div class="tile-footer">
                                <button id="btnActionForm" class="btn btn-primary" type="submit"><i class="bi bi-check-circle-fill me-2"></i><span id="btnText">Guardar</span></button>&nbsp;&nbsp;&nbsp;<a class="btn btn-secondary" href="#" data-bs-dismiss="modal"><i class="bi bi-x-circle-fill me-2"></i>Cancelar</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal Permisos -->
<div class="modal fade modalPermisos" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title h4">Permisos Roles de Usuario</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">x</span>
                </button>
            </div>

            <div class="modal-body">

                <div class="col-md-12">
                    <div class="tile">
                        <form action="" id="formPermisos" name="formPermisos">

                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Modulo</th>
                                            <th>Leer</th>
                                            <th>Escribir</th>
                                            <th>Actualizar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Usuario</td>
                                            <td>
                                                <div class="toggle-flip">
                                                    <label>
                                                        <input type="checkbox">
                                                        <span class="flip-indicator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="toggle-flip">
                                                    <label>
                                                        <input type="checkbox">
                                                        <span class="flip-indicator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="toggle-flip">
                                                    <label>
                                                        <input type="checkbox">
                                                        <span class="flip-indicator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="toggle-flip">
                                                    <label>
                                                        <input type="checkbox">
                                                        <span class="flip-indicator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="toggle-flip">
                                                    <label>
                                                        <input type="checkbox">
                                                        <span class="flip-indicator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="text-center">
                                <button class="btn btn-success" type="submit"><i class="bi bi-check2-circle"></i>Guardar</button>
                                <button class="btn btn-danger" type="button" data-bs-dismiss="modal"><i class="bi bi-box-arrow-right" aria-hidden="true"></i>Salir</button>
                            </div>
                        </form>

                    </div>
                </div>

            </div>

        </div>
    </div>
</div>