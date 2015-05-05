<?php
include_once(ROOT . DS . 'application' . DS . "Controllers" . DS . "UserController.php");
include_once(ROOT . DS . 'application' . DS . "Controllers" . DS . "AdminController.php");
include_once(ROOT . DS . 'application' . DS . "Controllers" . DS . "SubastaController.php");

$app->post(
    '/create/subasta','SubastaController:CreateSubasta'
)->setParams(array($app));

$app->post(
    '/subasta/list','SubastaController:ListSubasta'
)->setParams(array($app));

/************************************************/
$app->post(
    '/bind/tipos_carga','SubastaController:BindTiposDeCarga'
)->setParams(array($app));

$app->post(
    '/bind/unidad_medida','SubastaController:BindUnidadDeMedida'
)->setParams(array($app));

$app->post(
    '/bind/ciudades','SubastaController:BindCiudades'
)->setParams(array($app));

$app->get(
    '/bind/departamentos','SubastaController:BindDepartamentos'
)->setParams(array($app));

$app->get(
    '/bind/ciudades/:id','SubastaController:BindCiudades'
)->setParams(array($app));
/************************************************/

$app->post(
    '/subasta/find','SubastaController:FindSubasta'
)->setParams(array($app));

$app->post(
    '/change_pass','Controller:ChangePassword'
)->setParams(array($app));

$app->post(
    '/registerbasic','Controller:RegisterBasic'
)->setParams(array($app));

$app->get(
    '/aprobate/:accstkn','Controller:AprobateTokenn'
)->setParams(array($app));

$app->get(
    "/test","Home:indexAction"
)->setParams(array($app));

$app->get(
    '/loadhistory/:id','Controller:LoadHistory'
)->setParams(array($app));

$app->get(
    '/kill/:id','Controller:KillSession'
)->setParams(array($app));

$app->get(
    '/demo','Controller:demo'
)->setParams(array($app));

$app->post(
    '/login','Controller:Login'
)->setParams(array($app));

$app->post(
    '/validar/login','Controller:validarLogin')->setParams(array($app));

$app->post(
    '/finduserbyid','Controller:FindUserById'
)->setParams(array($app));

$app->post(
    '/updateuser','Controller:updateuser'
)->setParams(array($app));

$app->post(
    '/faq','Controller:solvedudes'
)->setParams(array($app));

$app->post(
    '/admin/aprobate/user','AdminController:aprobateUser'
)->setParams(array($app));

$app->post(
    '/deactivate/user/:id','Controller:deactivateUser'
)->setParams(array($app));
$app->post(
    '/active/user/','Controller:activeUser'
)->setParams(array($app));

# Acciones del Administrador
$app->post(
    '/register/new/user','AdminController:registerNewUser'
)->setParams(array($app));

$app->post(
    '/users','AdminController:allUsers'    
)->setParams(array($app));

$app->post(
    '/search_user','AdminController:searchUser'    
)->setParams(array($app));

$app->post(
    '/update/user/:id','AdminController:updateUser'    
)->setParams(array($app));

$app->post(
    '/delete/user/:id','AdminController:deleteUser'    
)->setParams(array($app));

$app->post(
    '/history/user/:id','AdminController:historyUser'    
)->setParams(array($app));
# Fin acciones Administrador

/********************************/
$app->get(
    '/registro',
    function () use ($app) {
        $result = "hoolaaaa";
        $app->render('register', array('title' => 'Sahara'));
    }
);

$app->post(
    '/post',
    function () {
        echo 'This is a POST route';
    }
);

// PUT route
$app->put(
    '/put',
    function () {
        echo 'This is a PUT route';
    }
);

// PATCH route
$app->patch('/patch', function () {
    echo 'This is a PATCH route';
});

// DELETE route
$app->delete(
    '/delete',
    function () {
        echo 'This is a DELETE route';
    }
);



$app->run();

?>