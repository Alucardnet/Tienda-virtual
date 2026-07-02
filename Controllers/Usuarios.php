<?php

class Usuarios extends Controllers
{
    public function __construct()
    {
        session_start();
        if (empty($_SESSION['login'])) {
            header('Location: ' . base_url() . 'login');
        }
        parent::__construct();
    }

    public function Usuarios()
    {
        $data['page_tag'] = "Usuarios";
        $data['page_title'] = "Usuarios <small>Tienda Virtual</small>";
        $data['page_name'] = "usuarios";
        $data['page_functions_js'] = "functions_usuarios.js";
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
                $idUsuario = intval($_POST['idUsuario']);
                $strIdentificacion = strClean($_POST['txtIdentificacion']);
                $strNombre = ucwords(strClean($_POST['txtNombre']));
                $strApellido = ucwords(strClean($_POST['txtApellido']));
                $intTelefono = intval(strClean($_POST['txtTelefono']));
                $strEmail = strtolower(strClean($_POST['txtEmail']));
                $intTipoId = intval($_POST['listRolid']);
                $intStatus = intval($_POST['listStatus']);

                if ($idUsuario == 0) {
                    // Opción 1: Crear nuevo usuario
                    $option = 1;
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
                } else {
                    // Opción 2: Actualizar usuario existente
                    $option = 2;
                    $strPassword = "";

                    // Si el usuario ingresó algo en la contraseña, la encriptamos para actualizarla
                    if (!empty($_POST['txtPassword'])) {
                        $strPassword = hash("SHA256", $_POST['txtPassword']);
                    }

                    $request_user = $this->model->updateUsuario(
                        $idUsuario,
                        $strIdentificacion,
                        $strNombre,
                        $strApellido,
                        $intTelefono,
                        $strEmail,
                        $strPassword,
                        $intTipoId,
                        $intStatus
                    );
                }

                // Procesar la respuesta que regresa el Modelo
                if ($request_user === 'exist') {
                    $arrResponse = array('status' => false, 'msg' => '¡Atención! el email o la identificación ya existe, ingrese otro.');
                } else if ($request_user > 0) {
                    if ($option == 1) {
                        $arrResponse = array('status' => true, 'msg' => 'Datos guardados correctamente.');
                    } else {
                        $arrResponse = array('status' => true, 'msg' => 'Datos actualizados correctamente.');
                    }
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

    public function delUsuario()
    {
        if ($_POST) {
            $intIdpersona = intval($_POST['idUsuario']);
            $requestDelete = $this->model->deleteUsuario($intIdpersona);
            if ($requestDelete) {
                $arrResponse = array('status' => true, 'msg' => 'Se ha eliminado el usuario');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Error al eliminar el usuario');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        die();
    }
}
