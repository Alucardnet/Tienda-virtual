<?php

class Usuarios extends Controllers
{
    public function __construct()
    {
        parent::__construct();
    }

    public function Usuarios()
    {
        $data['page_tag'] = "Usuarios";
        $data['page_title'] = "Usuarios <small>Tienda Virtual</small>";
        $data['page_name'] = "usuarios";
        $this->views->getView($this, "usuarios", $data);
    }

    public function setUsuario()
    {
        if ($_POST) {
            if (
                empty($_POST['txtIdentificacion']) || empty($_POST['txtNombre']) || empty($_POST['txtApellido'])
                || empty($_POST['txtTelefono']) || empty($_POST['txtEmail']) || empty($_POST['listRolid']) || empty($_POST['listStatus'])
            ) {
                $arrResponse = array("status" => false, "msg" => 'Datos Incorrectos.');
            } else {
                $strIdentificacion = strClean($_POST['txtIdentificacion']);
                $strNombre = ucwords(strClean($_POST['txtNombre']));
                $strApellido = ucwords(strClean($_POST['txtApellido']));
                $intTelefono = intval(strClean($_POST['txtTelefono']));
                $strEmail = strtolower(strClean($_POST['txtEmail']));
                $intTipoId = intval(strClean($_POST['listRolid']));
                $intStatus = intval(strClean($_POST['listStatus']));

                $strPassword = empty($_POST['txtPassword']) ? hash("SHA256", passGenerator()) : hash("SHA256", $_POST['txtPassword']);

                $request_user = $this->model->insertUsuario(
                    $strIdentificacion,
                    $strNombre,
                    $strApellido,
                    $intTelefono,
                    $strEmail,
                    $strPassword,
                    $intTipoId,
                    $intStatus
                );

                // CORRECCIÓN CRÍTICA: Validar primero el string 'exist' de forma estricta
                if ($request_user === 'exist') {
                    $arrResponse = array('status' => false, 'msg' => '¡Atención! el email o la identificación ya existe, ingrese otro.');
                } else if ($request_user > 0) {
                    $arrResponse = array('status' => true, 'msg' => 'Datos guardados correctamente.');
                } else {
                    $arrResponse = array("status" => false, "msg" => 'No es posible almacenar los datos.');
                }
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        die();
    }

    public function getUsuarios()
    {
        $arrData = $this->model->selectUsuarios();
        for ($i = 0; $i < count($arrData); $i++) {
            if ($arrData[$i]['status'] == 1) {
                $arrData[$i]['status'] = '<span class="me-1 badge bg-success">Activo</span>';
            } else {
                $arrData[$i]['status'] = '<span class="me-1 badge bg-danger">Inactivo</span>';
            }

            // CORREGIDO: Se eliminaron las letras "s" adicionales de las clases de los botones
            $arrData[$i]['options'] = '<div class="text-center">
        <button class="btn btn-info btn-sm btnViewUsuario" us="' . $arrData[$i]['idpersona'] . '" title="Ver Usuario"><i class="bi bi-eye"></i></button>
        <button class="btn btn-primary btn-sm btnEditUsuario" us="' . $arrData[$i]['idpersona'] . '" title="Editar Usuario"><i class="bi bi-pencil-fill"></i></button>
        <button class="btn btn-danger btn-sm btnDelUsuario" us="' . $arrData[$i]['idpersona'] . '" title="Eliminar Usuario"><i class="bi bi-trash3-fill"></i></button>
        </div>';
        }
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function getUsuario(int $idpersona)
    {
        $idusuario = intval($idpersona);
        if ($idusuario > 0) {
            $arrData = $this->model->selectUsuario($idusuario);
            if (empty($arrData)) {
                $arrResponse = array('status' => false, 'msg' => 'Datos no encontrados');
            } else {
                $arrResponse = array('status' => true, 'data' => $arrData);
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        die();
    }
}
