<?php

class NotificationsController{

	function ShowNotifications($app){
	   
	   $id = $_POST["id_"];
	   $query = Notificacion::find('all', array('conditions' => "id_user = $id"));
       $subastadata = array();
       
       foreach($query as $current_item){
           $subastadata[] = $current_item->attributes();
       }
       
       echo json_encode($subastadata);
       
	}
	
	function CheckNotifications($app){
	    $id = $_POST["id_ck"];
	    $checked = $_POST["checked"];
	    
	    $current_n = Notificacion::find($id);
	        
	        if($checked=="true"){
	            $current_n->visto = 0;
	        }else{
	            $current_n->visto = 1;
	        }
	        
	    $current_n->save();
	    
	    echo json_encode(array(
	        "status" => "OK"
	       ));
	       
	}
	
	function ShowCuantity($app){
	   
	   $id = $_POST["id_"];
	   $query = Notificacion::find('all', array('conditions' => "id_user = $id AND visto = 0"));
       $subastadata = array();
       
       foreach($query as $current_item){
           $subastadata[] = $current_item->attributes();
       }
       
       echo count($subastadata);
       
	}
	
	function requestEndSubasta($app,$id){
	    
	    $subasta = subasta::find($id);
	    $usuario_asoc = Usuario::find($subasta->us_id);

	    $empesa_nombre = $usuario_asoc->nombre;
	    $empesa_nit = $usuario_asoc->nit;
	    $empesa_email = $usuario_asoc->correo_electronico;
	    $empesa_telefono = $usuario_asoc->telefono;

	    $model_ciudad_recoleccion = ciudad::find($subasta->ciudad_recoleccion_carga);
        $ciudad_recoleccion_carga = $model_ciudad_recoleccion->nombre;

	    $model_ciudad_entrega= ciudad::find($subasta->ciudad_entrega_carga);
        $ciudad_entrega_carga = $model_ciudad_entrega->nombre;

        $direccion_recoleccion_carga = $subasta->direccion_recoleccion_carga;
        $direccion_entrega_carga = $subasta->direccion_entrega_carga;

        $descripcion = $subasta->descripcion_carga;

        $presupuesto = $subasta->presupuesto_envio;

        $cantidad = $subasta->cantidad;

        $coordenada_inicial = $subasta->coordenada_inicial;

        $coordenada_final = $subasta->coordenada_final;

        $fecha_inicio_subasta = $subasta->fecha_inicio_subasta->format('Y-m-d') .  " " . $subasta->hora_inicio_subasta;
        
        $fecha_fin_subasta = $subasta->fecha_fin_subasta->format('Y-m-d').  " " . $subasta->hora_fin_subasta;

        $model_unidad_medida = unidad_medida::find($subasta->unidad_medida_id);
	    $unidad_medida = $model_unidad_medida->nombre;

	    $model_ciudad_recoleccion = ciudad::find($subasta->ciudad_recoleccion_carga);
	    $depto_ciudad_recoleccion = departamento::find($model_ciudad_recoleccion->id_departamento);
	    
	    $model_ciudad_entrega = ciudad::find($subasta->ciudad_entrega_carga);
    	$depto_ciudad_entrega = departamento::find($model_ciudad_entrega->id_departamento);


	    $datos = json_decode($subasta->participants);
		if(count($datos)>0){

			$tmp_data = $datos;
			usort($tmp_data, function($a, $b) {
	    		return $a->amount > $b->amount ? -1 : 1; 
			});  

		 	$index = count($tmp_data)-1;
			$datau = $tmp_data[$index];

			$transportista = Usuario::find($datau->us_id);
			
			$datauser = array(
					'win_name' => $transportista->nombre, 
					'win_ced' => $transportista->cedula, 
					'win_email' => $transportista->correo_electronico, 
					'win_phone' => $transportista->telefono, 
					'us_ammount' => $datau->amount, 
			);

			echo json_encode(
				array(
						'status' => "FULL",
						'data' => $datauser
					 )
				);


			$headers = "MIME-Version: 1.0\r\n";
        	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";        
        	$email_ganador_subasta = plantilla_email::find(8);  

			$mensaje = str_replace(
	            array(
	            	  "##EMPRESA_NOMBRE##",
	            	  "##NIT_EMPRESA##",
	            	  "##EMAIL_EMPRESA##",
	            	  "##TELEFONO_EMPRESA##",
	            	  "##TRANSPORTISTA_GANADOR_NOMBRE##",
	            	  "##TRANSPORTISTA_GANADOR_APELLIDO##",
	            	  "##TRANSPORTISTA_GANADOR_CEDULA##",
	            	  "##TRANSPORTISTA_GANADOR_EMAIL##",
	            	  "##TRANSPORTISTA_GANADOR_TELEFONO##",
	            	  "##TRANSPORTISTA_GANADOR_COOPERATIVA##",

	            	  "##DEPARTAMENTO_RECOGIDA##",
	            	  "##CIUDAD_RECOGIDA##",
	            	  "##DIRECCION_RECOGIDA##",

	            	  "##DEPARTAMENTO_ENTREGA##",
	            	  "##CIUDAD_ENTREGA##",
	            	  "##DIRECCION_ENTREGA##",

	            	  "##DESCRIPCION##",
	            	  "##PRESUPUESTO##",
	            	  "##CANTIDAD##",
	            	  "##UNIDAD_MEDIDA##",

	            	  "##COORDENADA_INICIAL##",
	            	  "##COORDENADA_FINAL##",

	            	  "##FECHA_INICIO_SUBASTA##",
	            	  "##FECHA_FIN_SUBASTA##",


	            	  ),
	            array(
	                      $empesa_nombre,
	                      $empesa_nit,
	                      $empesa_email,
	                      $empesa_telefono,
	                      $transportista->nombre, 
	                      $transportista->apellido,
	                      $transportista->cedula,
	                      $transportista->correo_electronico,
	                      $transportista->telefono,
	                      $transportista->cooperativa,

	                      $depto_ciudad_recoleccion->nombre,
	                      $ciudad_recoleccion_carga,
	                      $direccion_recoleccion_carga,

	                      $depto_ciudad_entrega->nombre,
	                      $ciudad_entrega_carga,
	                      $direccion_entrega_carga,

	                      $descripcion,
	                      $presupuesto,
	                      $cantidad,
	                      $unidad_medida,

	                      $coordenada_inicial,
	                      $coordenada_final,

	                      $fecha_inicio_subasta,
	                      $fecha_fin_subasta,
	                  ),
	            $email_ganador_subasta->contenido_html
	        );
	        $estado = mail("heanfig@gmail.com", 'SUBASTRA / Acabas de Adjudicar una subasta', $mensaje,$headers);



		}else{
			
			echo json_encode(
				array(
						'status' => "EMPTY"
					 )
				);


		}

	}	

	function requestBeginSubasta($app,$id){
	    	
	    $subasta = subasta::find($id);

        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";        
        $email_creacion_subasta = plantilla_email::find(10);  

        $model_ciudad_entrega = ciudad::find($subasta->ciudad_entrega_carga);
        $ciudad_entrega_carga = $model_ciudad_entrega->nombre;

        $model_ciudad_recogida = ciudad::find($subasta->ciudad_recoleccion_carga);
        $ciudad_recogida_carga = $model_ciudad_recogida->nombre;

        $model_unidad_medida = unidad_medida::find($subasta->unidad_medida_id);
        $unidad_medida = $model_unidad_medida->nombre;

        $model_user = Usuario::find($subasta->us_id);
        $useremail = $model_user->correo_electronico;

        $mensaje = str_replace(
            array("##ORIGEN##","##DESTINO##","##CANTIDAD##","##UNIDAD##","##PRESUPUESTO##","##FECHA##","##HORA##"),
            array(
                      $ciudad_recogida_carga, 
                      $ciudad_entrega_carga,
                      $subasta->cantidad,
                      $unidad_medida,
                      $subasta->presupuesto_envio,
                      $subasta->fecha_inicio_subasta->format('Y-m-d'),
                      $subasta->hora_inicio_subasta
                  ),
            $email_creacion_subasta->contenido_html
        );
        $estado = mail($useremail, 'SUBASTRA / Acaba de Iniciar Una subasta', $mensaje,$headers);

	}
	
}