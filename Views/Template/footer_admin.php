<script>
    const base_url = "<?= base_url(); ?>"
</script>

<!-- Essential javascripts for application to work-->
<script src="<?= media(); ?>/js/jquery-3.7.0.min.js"></script>
<script src="<?= media(); ?>/js/bootstrap.min.js"></script>
<script src="<?= media(); ?>/js/main.js"></script>
<script src="<?= media(); ?>/js/functions_admin.js"></script>
<!-- Page specific javascripts-->


<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!-- Data table plugin-->
<script type="text/javascript" src="<?= media(); ?>/js/plugins/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="<?= media(); ?>/js/plugins/dataTables.bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/virtual-select-plugin@1.0.39/dist/virtual-select.min.js"></script>
<!--<script type="text/javascript" src="<?= media(); ?>/js/plugins/bootstrap-select.min.js"></script>-->

<?php if ($data['page_name'] == "rol_usuario") { ?>

    <script src="<?= media(); ?>/js/functions_roles.js"></script>
<?php } ?>

<?php if ($data['page_name'] == "usuarios") { ?>
    <script src="<?= media(); ?>/js/functions_usuarios.js"></script>
<?php } ?>

</body>

</html>