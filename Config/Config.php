<?php

//define("BASE_URL", "http://localhost/tienda_virtual/");
const BASE_URL = "http://localhost/tienda_virtual/";

//Zona horaria
date_default_timezone_set('America/Mexico_City');

//const LIBS = "Libraries/";
//const VIEWS = "Views/";

//Datos de conexión a BD

const DB_HOST = "localhost";
const DB_PORT = 3307;
const DB_NAME = "db_tiendavirtual";
const DB_USER = "root";
const DB_PASSWORD = "";
const DB_CHARSET = "charset=utf8";

//Delimitadores decimal y millar Ej. 24,1989.00
const SPD = ".";
const SPM = ",";

//Simbolo de moneda
const SMONEY = "MXN";


//Datos envio de correo
const NOMBRE_REMITENTE = "Tienda Virtual";
const EMAIL_REMITENTE = "no-reply@cybercube.com";

const NOMBRE_EMPRESA = "CyberCube";
const WEB_EMPRESA = "www.cybercube.com";
