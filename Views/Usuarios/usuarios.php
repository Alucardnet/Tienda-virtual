<?=
headerAdmin($data);
getModal('modalUsuarios', $data);
?>
<main class=" app-content">
    <div class="app-title">
        <div>
            <h1><i class="bi bi-person-vcard-fill"></i> <?= $data['page_title'] ?>
                <?php if ($_SESSION['permisosMod']['w']) { ?>
                    <button class="btn btn-primary" type="button" onclick="openModal();"><i class="bi bi-plus-circle-dotted"></i>Nuevo</button>
                <?php } ?>
            </h1>

        </div>
        <ul class="app-breadcrumb breadcrumb">
            <li class="breadcrumb-item"><i class="bi bi-house-door fs-6"></i></li>
            <li class="breadcrumb-item"><a href="<?= base_url(); ?>usuarios"><?= $data['page_title'] ?></a></li>
        </ul>
    </div>


    <!-- Data Table -->

    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered" id="tableUsuarios">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Email</th>
                                    <th>Telefono</th>
                                    <th>Rol</th>
                                    <th>Status</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Jose</td>
                                    <td>Jimenez</td>
                                    <td>hydradevsec98@gmail.com</td>
                                    <td>5573314861</td>
                                    <td>Administrador</td>
                                    <td>Activo</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- End Data Table -->
</main>
<?= footerAdmin($data); ?>