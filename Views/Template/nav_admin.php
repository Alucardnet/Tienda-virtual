    <!-- Sidebar menu-->
    <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
    <aside class="app-sidebar">
        <div class="app-sidebar__user"><img class="app-sidebar__user-avatar" src="<?= media(); ?>/images/avatar.png" alt="User Image">
            <div>
                <p class="app-sidebar__user-name"><?= $_SESSION['userData']['nombres'] ?></p>
                <p class="app-sidebar__user-designation"><?= $_SESSION['userData']['nombrerol'] ?></p>
            </div>
        </div>
        <ul class="app-menu">
            <?php if (!empty($_SESSION['permisos'][1]['r'])) { ?>
                <li><a class="app-menu__item" href="<?= base_url(); ?>dashboard"><i class="app-menu__icon bi bi-speedometer"></i><span class="app-menu__label">Dashboard</span></a></li>
            <?php } ?>
            <?php if (!empty($_SESSION['permisos'][2]['r'])) { ?>
                <li class="treeview"><a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon bi bi-people"></i><span class="app-menu__label">Usuarios</span><i class="treeview-indicator bi bi-chevron-right"></i></a>
                    <ul class="treeview-menu">
                        <li><a class="treeview-item" href="<?= base_url(); ?>usuarios"><i class="icon bi bi-circle-fill"></i> Usuarios</a></li>
                        <li><a class="treeview-item" href="<?= base_url(); ?>roles"><i class="icon bi bi-circle-fill"></i> Roles</a></li>
                    </ul>
                </li>
            <?php } ?>
            <?php if (!empty($_SESSION['permisos'][3]['r'])) { ?>
                <li><a class="app-menu__item" href="<?= base_url(); ?>clientes"><i class="app-menu__icon bi bi-person"></i><span class="app-menu__label">Clientes</span></a></li>
            <?php } ?>
            <?php if (!empty($_SESSION['permisos'][4]['r']) || !empty($_SESSION['permisos'][6]['r'])) { ?>
                <li class="treeview"><a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon bi bi-shop"></i><span class="app-menu__label">Tienda</span><i class="treeview-indicator bi bi-chevron-right"></i></a>
                    <ul class="treeview-menu">
                        <?php if (!empty($_SESSION['permisos'][4]['r'])) { ?>
                            <li><a class="treeview-item" href="<?= base_url(); ?>productos"><i class="icon bi bi-circle-fill"></i> Productos</a></li>
                        <?php } ?>
                        <?php if (!empty($_SESSION['permisos'][6]['r'])) { ?>
                            <li><a class="treeview-item" href="<?= base_url(); ?>categorias"><i class="icon bi bi-circle-fill"></i> Categorias</a></li>
                        <?php } ?>
                    </ul>
                </li>
            <?php } ?>
            <?php if (!empty($_SESSION['permisos'][5]['r'])) { ?>
                <li><a class="app-menu__item" href="<?= base_url(); ?>pedidos"><i class="app-menu__icon bi bi-cart4"></i><span class="app-menu__label">Pedidos</span></a></li>
            <?php } ?>
            <li><a class="app-menu__item" href="<?= base_url(); ?>logout"><i class="app-menu__icon bi bi-box-arrow-right"></i><span class="app-menu__label">Logout</span></a></li>
        </ul>
    </aside>