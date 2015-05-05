<?php
 
/** Check if environment is development and display errors **/
 
function setReporting() {
    if (DEVELOPMENT_ENVIRONMENT == true) {
        error_reporting(E_ALL);
        ini_set('display_errors','On');
    } else {
        error_reporting(E_ALL);
        ini_set('display_errors','Off');
        ini_set('log_errors', 'On');
        ini_set('error_log', ROOT.DS.'tmp'.DS.'logs'.DS.'error.log');
    }
}
 
/** Check for Magic Quotes and remove them **/
 
function stripSlashesDeep($value) {
    $value = is_array($value) ? array_map('stripSlashesDeep', $value) : stripslashes($value);
    return $value;
}
 
function removeMagicQuotes() {
    if ( get_magic_quotes_gpc() ) {
        $_GET    = stripSlashesDeep($_GET   );
        $_POST   = stripSlashesDeep($_POST  );
        $_COOKIE = stripSlashesDeep($_COOKIE);
    }
}
 
/** Check register globals and remove them **/
 
function unregisterGlobals() {
    if (ini_get('register_globals')) {
        $array = array('_SESSION', '_POST', '_GET', '_COOKIE', '_REQUEST', '_SERVER', '_ENV', '_FILES');
        foreach ($array as $value) {
            foreach ($GLOBALS[$value] as $key => $var) {
                if ($var === $GLOBALS[$key]) {
                    unset($GLOBALS[$key]);
                }
            }
        }
    }
}
 
/** Main Call Function **/
 
function callHookInit() {
    //?? un util?
    global $url;

    if (file_exists(ROOT . DS . 'library' . DS . 'Slim' . DS .'Slim.php')) {
        require_once(ROOT . DS . 'library' . DS . 'Slim' . DS .'Slim.php');
    //fixme
    if (file_exists(ROOT . DS . 'library' . DS . 'Slim' . DS .'View.php')) {
        require_once(ROOT . DS . 'library' . DS . 'Slim' . DS .'View.php');
    }

    if (file_exists(ROOT . DS . 'application' . DS . 'views' . DS . 'RainTplView.php' )) {
        include_once(ROOT . DS . 'application' . DS . 'views' . DS . 'RainTplView.php');
    }

    if (file_exists(ROOT . DS . 'library' . DS . 'php-activerecord-master' . DS . 'ActiveRecord.php' )) {
        include_once(ROOT . DS . 'library' . DS . 'php-activerecord-master' . DS . 'ActiveRecord.php' );
    }

   \Slim\Slim::registerAutoloader();
    $app = new \Slim\Slim(array(
        'templates.path' => TEMPLATE_PATH,
         'view' => new RainTplView()
    ));

    ActiveRecord\Config::initialize(function($cfg){
         $cfg->set_model_directory(ROOT . DS . 'application' . DS . 'Models/' );
         $cfg->set_connections(array(
             'development' => 'mysql://liderdesarrollo@0.0.0.0/subastrs_root'));
             //'development' => 'mysql://subastrs_root:18005021aa11@localhost/subastrs_aplication'));
     });

    include_once(ROOT . DS . 'application' . DS . 'Models' . DS .'Usuario.php');

    require_once(ROOT . DS . 'application' . DS . 'views' . DS .'views.php');

    }

}
 


/** Autoload any classes that are required **/
 
 function __autoload($className) {

    if (file_exists(ROOT . DS . 'library' . DS . strtolower($className) . '.class.php')) {
        require_once(ROOT . DS . 'library' . DS . strtolower($className) . '.class.php');
    } else if (file_exists(ROOT . DS . 'application' . DS . 'controllers' . DS . strtolower($className) . '.php')) {
        require_once(ROOT . DS . 'application' . DS . 'controllers' . DS . strtolower($className) . '.php');
    } else if (file_exists(ROOT . DS . 'application' . DS . 'models' . DS . strtolower($className) . '.php')) {
        require_once(ROOT . DS . 'application' . DS . 'models' . DS . strtolower($className) . '.php');
    } else {
    }
    
}



spl_autoload_register('__autoload');

setReporting();
removeMagicQuotes();
unregisterGlobals();
callHookInit();