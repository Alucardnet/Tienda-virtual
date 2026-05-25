<?php

class Permisos extends Controllers
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getPermisosRol(int $idrol)
    {
        $rolid = intval($idrol);
        if ($rolid > 0) {
            $arrModulos = $this->model->selectModulos();
            $arrPermisosRol = $this->model->selectPermisosRol($rolid);

            dep($arrModulos);
            dep($arrPermisosRol);
        }
    }
}
