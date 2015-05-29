<?php
include_once(ROOT . DS . 'application' . DS . "Controllers" . DS . "UserController.php");
include_once(ROOT . DS . 'application' . DS . "Controllers" . DS . "AdminController.php");
include_once(ROOT . DS . 'application' . DS . "Controllers" . DS . "SubastaController.php");
include_once(ROOT . DS . 'application' . DS . "Controllers" . DS . "ReferedController.php");
include_once(ROOT . DS . 'application' . DS . "Controllers" . DS . "PagosController.php");
include_once(ROOT . DS . 'application' . DS . "Controllers" . DS . "NotificationsController.php");

$app->post(
    '/create/subasta','SubastaController:CreateSubasta'
)->setParams(array($app));

$app->post(
    '/edit/subasta','SubastaController:EditSubasta'
)->setParams(array($app));

$app->post(
    '/subasta/list','SubastaController:ListSubasta'
)->setParams(array($app));

$app->post(
    '/subasta/listtransporter','SubastaController:ListSubastaTransporter'
)->setParams(array($app));

$app->post(
    '/subasta/setWinner','SubastaController:SetWinnerSubasta'
)->setParams(array($app));

$app->post(
    '/notifications/unread','NotificationsController:CheckNotifications'
)->setParams(array($app));

$app->post(
    '/notifications/showc','NotificationsController:ShowCuantity'
)->setParams(array($app));

/************************************************/
$app->post(
    '/bind/tipos_carga','SubastaController:BindTiposDeCarga'
)->setParams(array($app));

$app->post(
    '/bind/unidad_medida','SubastaController:BindUnidadDeMedida'
)->setParams(array($app));

$app->post(
    '/reffered/getDataReffered','ReferedController:getReferedData'
)->setParams(array($app));

$app->post(
    '/bind/ciudades/:id','SubastaController:BindCiudades'
)->setParams(array($app));

$app->get(
    '/bind/departamentos','SubastaController:BindDepartamentos'
)->setParams(array($app));

$app->get(
    '/notification/end_subasta/:id','NotificationsController:requestEndSubasta'
)->setParams(array($app));

$app->get(
    '/bind/ciudades/:id','SubastaController:BindCiudades'
)->setParams(array($app));

$app->get(
    '/cron','SubastaController:Cron'
)->setParams(array($app));

$app->get(
    '/hora','SubastaController:demo'
)->setParams(array($app));

/************************************************/
/************************************************/

$app->post(
    '/filter/subasta/price','SubastaController:FilterSubastaByPrice'
)->setParams(array($app));

$app->post(
    '/filter/subasta/map','SubastaController:FilterSubastaByMap'
)->setParams(array($app));

$app->post(
    '/filter/subasta/weight','SubastaController:FilterSubastaByweight'
)->setParams(array($app));

$app->post(
    '/filter/subasta/volume','SubastaController:FilterSubastaByvolume'
)->setParams(array($app));

$app->post(
    '/subasta/socket_service','SubastaController:SocketService'
)->setParams(array($app));

$app->post(
    '/subasta/socket_servicetime','SubastaController:SocketServiceTime'
)->setParams(array($app));

$app->post(
    '/notifications/show','NotificationsController:ShowNotifications'
)->setParams(array($app));

/************************************************/
/************************************************/
$app->post(
    '/subasta/find','SubastaController:FindSubasta'
)->setParams(array($app));

$app->post(
    '/subasta/find2','SubastaController:FindSubastaPerParticipants'
)->setParams(array($app));

$app->post(
    '/subasta/participe','SubastaController:Participe'
)->setParams(array($app));

$app->post(
    '/subasta/refresh','SubastaController:Refresh'
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
    '/deactivate/user_admin/:id','Controller:deactivateUserAdmin'
)->setParams(array($app));

$app->post(
    '/reactivate/user_admin/:id','Controller:ReactivateUserAdmin'
)->setParams(array($app));

$app->post(
    '/reffered/generate','ReferedController:generateRefferedLink'
)->setParams(array($app));

$app->post(
    '/active/user/','Controller:activeUser'
)->setParams(array($app));

$app->post(
    '/LoadTypesCharge','AdminController:LoadTypesCharge'
)->setParams(array($app));

$app->post(
    '/LoadUnitsMeasure','AdminController:LoadUnitsMeasure'
)->setParams(array($app));


$app->post(
    '/saveType','AdminController:save_type'
)->setParams(array($app));

$app->post(
    '/saveUnit','AdminController:save_unit'
)->setParams(array($app));

$app->post(
    '/deleteType/:id','AdminController:delete_type'
)->setParams(array($app));

$app->post(
    '/deleteUnit/:id','AdminController:delete_unit'
)->setParams(array($app));

# Acciones del Administrador
$app->post(
    '/register/new/user','AdminController:registerNewUser'
)->setParams(array($app));

$app->post(
    '/users/:filter','AdminController:allUsers'    
)->setParams(array($app));

$app->post(
    '/users','AdminController:All_User'    
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

$app->get(
    '/demo1',
    function () use ($app) {
        $datos = '{"desactivated":[4],"acti":[4]}';
        $new = json_decode($datos);
        $new->desactivated[] = 7;
        
        echo json_encode($new);
    }   
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
    '/pagos','PagosController:RealizarPagoConfiguracion'    
)->setParams(array($app));

$app->post(
    '/loadCreditPerUser','PagosController:LoadCreditPerUser'    
)->setParams(array($app));

$app->post(
    '/LoadAmmountVal','PagosController:LoadAmmountVal'    
)->setParams(array($app));

$app->get('/prueba_mail', function () use ($app) { 
        //buscar el valor del credito
        $datos_email = plantilla_email::find(8);
        $mensaje = $datos_email->contenido_html;
        
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

        $to = "gaviria4502@hotmail.com";
        $subject = "Prueba";
        $txt = $mensaje;

        mail($to, $subject, $txt, $headers);
    }
);

$app->get('/page-config-coins', function () use ($app) { 
        $creditos = configuracion_creditos::find(1);
        $valor_credito = $creditos->precio_por_credito;
        echo $valor_credito;
    }
);

$app->get('/page-config-coins-mod',function () use ($app) {
        $precio=$_GET['nprecio'];
        $mod_precio = configuracion_creditos::find(1);
        $mod_precio->precio_por_credito=$precio;
        $mod_precio->save();
        echo "Precio de credito actualizado";
    }
);


$app->post('/page-califik',function () use ($app) {
        $descripcion=$_POST['despregunta'];
         $data  = item_calificacion::create(
             array('id' => '',
             'descripcion' => $descripcion)
        );
        $response = array(
        		'message' => "se registro correctamente la pregunta",
        		'status' => "1"
		 );
        echo json_encode($response);
    }
);
$app->post(
    '/allItemPreguntas','AdminController:allItemPreguntas'
)->setParams(array($app));

$app->post(
    '/deletePregunta/:id','AdminController:deletePregunta'
)->setParams(array($app));

$app->post('/page-calificion',function () use ($app) {
        $preguntas=$_POST['datos'];
        $promedio=$_POST['promcalifica'];
        
        $mod_calificacion = usuario::find(15);
        $mod_calificacion->calification=$preguntas;
        $mod_calificacion->average_star=$promedio;
        $mod_calificacion->save();
        
        $response = array(
        		'message' => "se registro correctamente la calificacion",
        		'status' => "1"
		 );
        echo json_encode($response);
    }
);


$app->post('/post', function () {
        echo 'This is a POST route';
    }
);

// PUT route
$app->put('/put', function () {
        echo 'This is a PUT route';
    }
);

// PATCH route
$app->patch('/patch', function () {
    echo 'This is a PATCH route';
});

// DELETE route
$app->delete('/delete', function () {
        echo 'This is a DELETE route';
    }
);

$app->run();

?>