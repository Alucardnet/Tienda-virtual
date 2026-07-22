<?php

//Retorna la url del proeyecto
function base_url()
{
    return BASE_URL;
}
function media()
{
    return BASE_URL . "/Assets";
}

function headerAdmin($data = "")
{
    $view_header = "./Views/Template/header_admin.php";
    require_once($view_header);
}
function footerAdmin($data = "")
{
    $view_footer = "./Views/Template/footer_admin.php";
    require_once($view_footer);
}

//Muestra información  formateada
function dep($data)
{
    $format = print_r('<pre>');
    $format .= print_r($data);
    $format .= print_r('</pre>');
    return $format;
}

function getModal(string $nameModal, $data)
{
    $view_modal = "./Views/Template/Modals/{$nameModal}.php";
    require_once $view_modal;
}

//Envio de correos
// Envio de correos mediante API con cURL (100% PHP Nativo)
function sendEmail($data, $template)
{
    $asunto = $data['asunto'];
    $emailDestino = $data['email'];
    $empresa = NOMBRE_REMITENTE;
    $remitente = EMAIL_REMITENTE;

    // 1. Renderizamos la plantilla HTML (mantenemos tu lógica intacta)
    ob_start();
    require_once("Views/Template/Email/" . $template . ".php");
    $mensaje = ob_get_clean();

    // 2. Configuración de API Key (gratuita de Brevo / Resend)
    $apiKey = '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';

    $url = 'https://api.brevo.com/v3/smtp/email';

    // 3. Estructura JSON para la API
    $body = [
        'sender' => [
            'name' => $empresa,
            'email' => $remitente
        ],
        'to' => [
            ['email' => $emailDestino]
        ],
        'subject' => $asunto,
        'htmlContent' => $mensaje
    ];

    // 4. Envío nativo mediante cURL (Funciona en local y en InfinityFree)
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'accept: application/json',
        'api-key: ' . $apiKey,
        'content-type: application/json'
    ]);

    $response = curl_exec($ch);
    $err = curl_error($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // Retorna true si la API respondió correctamente (Código HTTP 200 o 201)
    if ($err || ($httpCode != 200 && $httpCode != 201)) {
        return false;
    }

    return true;
}

//Elimina exceso de espacios entre palabras
function strClean($strCadena)
{
    $string = preg_replace(['/\s+/', '/^\s|\s$/'], [' ', ''], $strCadena);
    $string = trim($string); //Elimina espacios en blanco al inicio y al final
    $string = stripslashes($string); // Elimina las \ invertidas
    $string = str_ireplace("<script>", "", $string);
    $string = str_ireplace("</script>", "", $string);
    $string = str_ireplace("<script src>", "", $string);
    $string = str_ireplace("<script type=>", "", $string);
    $string = str_ireplace("SELECT * FROM", "", $string);
    $string = str_ireplace("DELETE FROM", "", $string);
    $string = str_ireplace("INSERT INTO", "", $string);
    $string = str_ireplace("SELECT COUNT(*) FROM", "", $string);
    $string = str_ireplace("DROP TABLE", "", $string);
    $string = str_ireplace("OR '1'='1", "", $string);
    $string = str_ireplace('OR "1"="1"', "", $string);
    $string = str_ireplace('OR ´1´=´1´', "", $string);
    $string = str_ireplace("is NULL; --", "", $string);
    $string = str_ireplace("is NULL; --", "", $string);
    $string = str_ireplace("LIKE '", "", $string);
    $string = str_ireplace('LIKE "', "", $string);
    $string = str_ireplace("LIKE ´", "", $string);
    $string = str_ireplace("OR 'a'='a", "", $string);
    $string = str_ireplace('OR "a"="a', "", $string);
    $string = str_ireplace("OR ´a´=´a", "", $string);
    $string = str_ireplace("OR ´a´=´a", "", $string);
    $string = str_ireplace("--", "", $string);
    $string = str_ireplace("^", "", $string);
    $string = str_ireplace("[", "", $string);
    $string = str_ireplace("]", "", $string);
    $string = str_ireplace("==", "", $string);
    return $string;
}

//Genera una contraseña de 10 caracteres
function passGenerator($lenght = 10)
{
    $pass = "";
    $longitudPass = $lenght;
    $cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    $longitudCadena = strlen($cadena);

    for ($i = 1; $i <= $longitudPass; $i++) {
        $pos = rand(0, $longitudCadena - 1);
        $pass .= substr($cadena, $pos, 1);
    }
    return $pass;
}

//Genera un token
function token()
{
    $r1 = bin2hex(random_bytes(10));
    $r2 = bin2hex(random_bytes(10));
    $r3 = bin2hex(random_bytes(10));
    $r4 = bin2hex(random_bytes(10));
    $token = $r1 . '-' . $r2 . '-' . $r3 . '-' . $r4;
    return $token;
}

//Formato para valores monetarios
function formatMoney($cantidad)
{
    $cantidad = number_format($cantidad, 2, SPD, SPM);
    return $cantidad;
}
