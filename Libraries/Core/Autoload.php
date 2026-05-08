<?php

spl_autoload_register(function ($class) {
    //echo LIBS: 'CORE/'.$class.".php";
    if (file_exists("Libraries/" . 'CORE/' . $class . ".php")) {
        require_once("Libraries/" . 'CORE/' . $class . ".php");
    }
});
