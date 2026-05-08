<?=
headerAdmin($data);
getModal('modalRoles', $data);
?>
<main class="app-content">
    <div class="app-title">
        <div>
            <h1><i class="bi bi-person-vcard-fill"></i> <?= $data['page_title'] ?>
                <button class="btn btn-primary" type="button" onclick="openModal();"><i class="bi bi-plus-circle-dotted"></i>Nuevo</button>
            </h1>

        </div>
        <ul class="app-breadcrumb breadcrumb">
            <li class="breadcrumb-item"><i class="bi bi-house-door fs-6"></i></li>
            <li class="breadcrumb-item"><a href="<?= base_url(); ?>roles"><?= $data['page_title'] ?></a></li>
        </ul>
    </div>


    <!-- Data Table -->

    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered" id="tableRoles">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Status</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>

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