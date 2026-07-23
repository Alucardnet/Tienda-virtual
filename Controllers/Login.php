<?php

class Login extends Controllers
{
    public function __construct()
    {
        session_start();
        if (isset($_SESSION['login'])) {
            header('Location: ' . base_url() . 'dashboard');
            die();
        }
        parent::__construct();
    }

    public function login()
    {
        $data['page_tag'] = "Login - Tienda Virtual";
        $data['page_title'] = "Login";
        $data['page_name'] = "login";
        $data['page_functions_js'] = "functions_login.js";
        $this->views->getView($this, "login", $data);
    }

    public function loginUser()
    {
        if (!$_POST) {
            die();
        }

        // 1. Validación de campos vacíos
        if (empty($_POST['txtEmail']) || empty($_POST['txtPassword'])) {
            $arrResponse = array('status' => false, 'msg' => 'Error de datos.');
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
            die();
        }

        $strUsuario = strtolower(strClean($_POST['txtEmail']));
        $strPassword = $_POST['txtPassword'];

        // 2. Encriptación SHA256 sincronizada con la consulta del Modelo
        $strPasswordHash = hash("SHA256", $strPassword);
        $requestUser = $this->model->loginUser($strUsuario, $strPasswordHash);

        if (empty($requestUser)) {
            $arrResponse = array('status' => false, 'msg' => 'El usuario o la contraseña es incorrecto.');

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
            die();
        }

        $arrData = $requestUser;

        // 3. Verificación de estado activo
        if ($arrData['status'] != 1) {
            $arrResponse = array('status' => false, 'msg' => 'Usuario inactivo.');
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
            die();
        }

        // 4. Inicialización de Sesión exitosa
        $_SESSION['idUser'] = $arrData['idpersona'];
        $_SESSION['login'] = true;

        // Carga de datos extendidos de la sesión
        $arrData = $this->model->sessionLogin($_SESSION['idUser']);
        $_SESSION['userData'] = $arrData;

        $arrResponse = array('status' => true, 'msg' => 'ok');

        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function resetPass()
    {
        if ($_POST) {
            error_reporting(0);

            if (empty($_POST['txtEmailReset'])) {
                $arrResponse = array('status' => false, 'msg' => 'Error de datos');
            } else {
                $token = token();
                $strEmail  =  strtolower(strClean($_POST['txtEmailReset']));
                $arrData = $this->model->getUserEmail($strEmail);

                if (empty($arrData)) {
                    $arrResponse = array('status' => false, 'msg' => 'Usuario no existente.');
                } else {
                    $idpersona = $arrData['idpersona'];
                    $nombreUsuario = $arrData['nombres'] . ' ' . $arrData['apellidos'];

                    $url_recovery = base_url() . '/login/confirmUser/' . $strEmail . '/' . $token;
                    $requestUpdate = $this->model->setTokenUser($idpersona, $token);

                    $dataUsuario = array(
                        'nombreUsuario' => $nombreUsuario,
                        'email' => $strEmail,
                        'asunto' => 'Recuperar cuenta - ' . NOMBRE_REMITENTE,
                        'url_recovery' => $url_recovery
                    );
                    if ($requestUpdate) {
                        $sendEmail = sendEmail($dataUsuario, 'email_cambioPassword');


                        if ($sendEmail) {
                            $arrResponse = array(
                                'status' => true,
                                'msg' => 'Se ha enviado un email a tu cuenta de correo para cambiar tu contraseña.'
                            );
                        } else {
                            $arrResponse = array(
                                'status' => false,
                                'msg' => 'No es posible realizar el proceso, intenta más tarde.'
                            );
                        }
                    } else {
                        $arrResponse = array(
                            'status' => false,
                            'msg' => 'No es posible realizar el proceso, intenta más tarde.'
                        );
                    }
                }
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        die();
    }

    public function confirmUser(string $params)
    {
        if (empty($params)) {
            header('Location: ' . base_url());
            die();
        }

        $arrParams = strpos($params, ',') !== false ? explode(',', $params) : explode('/', $params);

        if (count($arrParams) < 2) {
            header('Location: ' . base_url());
            die();
        }

        $strEmail = strClean($arrParams[0]);
        $strToken = strClean($arrParams[1]);

        $arrResponse = $this->model->getUsuario($strEmail, $strToken);

        if (empty($arrResponse)) {
            header("Location: " . base_url());
            die();
        }

        $data['page_tag'] = "Cambiar contraseña";
        $data['page_name'] = "cambiar_contrasenia";
        $data['page_title'] = "Cambiar contraseña";
        $data['email'] = $strEmail;
        $data['token'] = $strToken;
        $data['idpersona'] = $arrResponse['idpersona'];
        $data['page_functions_js'] = "functions_login.js";

        $this->views->getView($this, "cambiar_password", $data);
        die();
    }

    public function setPassword()
    {
        // 1. Validación de campos obligatorios
        if (empty($_POST['idUsuario']) || empty($_POST['txtEmail']) || empty($_POST['txtToken']) || empty($_POST['txtPassword']) || empty($_POST['txtPasswordConfirm'])) {
            $arrResponse = array('status' => false, 'msg' => 'Error de datos.');
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
            die();
        }

        // 2. Sanitización y asignación de variables
        $intIdPersona       = intval($_POST['idUsuario']);
        $strPassword        = $_POST['txtPassword'];
        $strPasswordConfirm = $_POST['txtPasswordConfirm'];
        $strEmail           = strClean($_POST['txtEmail']);
        $strToken           = strClean($_POST['txtToken']);

        // 3. Validación: Coincidencia de contraseñas
        if ($strPassword !== $strPasswordConfirm) {
            $arrResponse = array('status' => false, 'msg' => 'Las contraseñas no coinciden.');
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
            die();
        }

        // 4. Verificación del usuario y el token en la Base de Datos
        $arrResponseUser = $this->model->getUsuario($strEmail, $strToken);
        if (empty($arrResponseUser)) {
            $arrResponse = array('status' => false, 'msg' => 'Error de datos o token inválido.');
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
            die();
        }

        // 5. Encriptación SHA256 (Regresamos al formato esperado por el Modelo)
        $strPasswordHash = hash("SHA256", $strPassword);

        // 6. Ejecución de la actualización en el Modelo
        $requestPass = $this->model->insertPassword($intIdPersona, $strPasswordHash);

        if ($requestPass) {
            $arrResponse = array('status' => true, 'msg' => 'Contraseña actualizada con éxito.');
        } else {
            $arrResponse = array('status' => false, 'msg' => 'No es posible realizar el proceso, intente más tarde.');
        }
        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        die();
    }
}
