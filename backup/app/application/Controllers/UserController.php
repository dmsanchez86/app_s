<?php

class Controller{
	
	# Registro Usuario Básico
    function RegisterBasic($app){
          $email = $_POST["email"];
          $pass = $_POST["pass"]; 
          $role = $_POST["role"]; 
          
		  $response = null;
		
		  $query = Usuario::all(array('conditions' => array('correo_electronico = ? ', $email)));
           
		  if(count($query)>0){
			
			$response = array(
								'message' => "usuario duplicado",
								'status' => "2"
							 );
		  }else{
			  
			$hashnumber = bin2hex(mcrypt_create_iv(22, MCRYPT_DEV_URANDOM));
            $user = Usuario::create(array(
                           'id' => NULL, 
                           'correo_electronico' =>$email,
                           'contrasenia' 		=> $pass,
                           'estado_registro' 	=> 1,
                           'rol_id' 			=> $role,
                           'hashverified' 		=> $hashnumber
                           ));

            $response = array(
								'message' => "se le han enviado instrucciones al correo $email",
								'status' => "1"
							 );
		  
			$template_register_email = plantilla_email::find(1);  
			$mensaje = "Subastra\r\nUsa este codigo para entrar en la aplicacion\r\nhttp://subastra.com/app/index.php/aprobate/$hashnumber";
			$mensaje = str_replace("#LINK#",
								   "http://subastra.com/app/index.php/aprobate/$hashnumber",
								   		str_replace(
													"#LINK#",
													"http://subastra.com/app/index.php/aprobate/$hashnumber",
													$template_register_email->contenido_html
												   )
								  );

			$headers = "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
			  
			mail($email, 'Aprobacion usuario Subastra', $mensaje,$headers);
		  }
		   
          echo json_encode($response);
	}
	
	function AprobateTokenn($app,$accstkn){
		$query = Usuario::find('all', array('conditions' => "hashverified ='" . $accstkn . "'"));
		
		if(count($query)>0){
			$id = $query[0]->id;
			$user = Usuario::find($id);
			$user->estado_registro = 2;
			$user->save();
			$template_email = plantilla_email::find(3); 
			$content = $template_email->contenido_html ;
			echo $content;
			?>
			<script>
				setTimeout(function(){ window.location="http://subastra-liderdesarrollo.c9.io/"; },1800);
			</script>
			<?php
		}
		
	}
	
	function Login($app){
		$email = $_POST["email"];
        $pass = $_POST["pass"];
		$response = null;
		
		$query = Usuario::all(array('conditions' => array('correo_electronico = ? AND contrasenia = ? OR correo_electronico LIKE "%' . $email . '%" AND contrasenia IN("' . $pass . '")', $email, $pass)));
	
		if(count($query)>0){
			
			$estado_registro = $query[0]->estado_registro;
			if($estado_registro==1){
				$response = array(
									'message' => 'FAIL',
									'info' => 'debe estar aprobada la cuenta para ser usada'
								 );
				
			}else if($estado_registro==4){
				$response = array(
									'message' => 'DEACTIVATE',
									'info' => 'Su cuenta esta actualmente desactivada'
								 );
			}else{
				$id = $query[0]->id;
				$mail = $query[0]->correo_electronico;
				$estado_registro = $query[0]->estado_registro;
				$rol_id = $query[0]->rol_id;
				
				//ROL
				$query_rol = rol::find($rol_id);
				//ROL
	
				//INSERTAR EN EL HISTORIAL
				$metadata = array(
					"user_agent" => $_SERVER['HTTP_USER_AGENT']				
				);
				
				$historial=historial_acciones::create(array(
							   'id' => NULL, 
							   'metadata' => json_encode($metadata),
							   'id_tipo_historial' => 1,
							   'fecha' => null,
							   'us_id' =>$id
                           ));
				 //INSERTAR EN EL HISTORIAL
    
                $redirect_uri = "";
                
                if($rol_id==1){
                	$redirect_uri = "#page-admin-menu";
                }else if($rol_id==2){
                	
                	if($estado_registro==2){
                		$redirect_uri = "#page-view-profile";
                	}else{
                		$redirect_uri = "#page-profile";
                	}
                	
                }else if($rol_id==3){
                	
                	if($estado_registro==2){
                		$redirect_uri = "#page-view-profile";
                	}else{
                		$redirect_uri = "#page-profile";
                	}
                	
                }
				
				$response = array(
									'message' => 'OK',
									'info' => 'login correcto',
									'userdata' => array(
														'id' => $id,
														'mail' => $mail,
														'rol_id' => $rol_id,
														'estado_registro' =>$estado_registro,
														'permisions' =>$query_rol->permisos
													   ),
									'redirect_uri' => $redirect_uri,
									'referrer' => "login"
								 );
			}
			
			
		}else{
				$response = array(
						'message' => 'CREDENTIALS_INCORRECT',
						'info' => 'credenciales incorrectas'
					 );
		}
		
		echo json_encode($response);
		
	}
	
	function validarLogin($app){
		
		$id = $_POST["_id"];
		$query = session::find_by_sql("SELECT * FROM session s1 INNER JOIN usuario s2 ON s1.id_user = s2.id WHERE s1.id_user =" . $id );
		$mydata = array();
		foreach($query as $session){
			$mydata[] = $session->attributes();
		}
		echo json_encode($mydata);
	
	}
	
	function logout($app){
		session_start();
		session_destroy();
		$response = array(
				'info'=>'logout'
			);
		echo json_encode($response);
	}
	
	function FindUserById(){
		
		$id = $_POST["id"];
		$response = null;
		$user = Usuario::find($id);
		
		$usuario = $user->attributes();
		$vehiculos = array();
		
		$vehicles = vehiculo::all(array('conditions' => array('usuario_id = ?', $id)));
		foreach($vehicles as $item){
			$vehiculos[] = $item->attributes();
		}
		
		$usuario["vehiculos"] = $vehiculos;
		
		echo json_encode($usuario);
		
	}
	
	function LoadHistory($app,$id){
		$history = historial_acciones::all(array('conditions' => array('us_id = ?', $id)));
		$data = array();	
		foreach($history as $history_item){
			$data[] = $history_item->attributes();
		}
		echo json_encode($data);
	}
	
	function demo($app){
		try{
			$current_vehicle = vehiculo::find(99999);
        }catch(ActiveRecord\RecordNotFound $e){
         	$current_vehicle =  "k";
        }
		
		var_dump($current_vehicle);
	}
	
	function updateuser(){	
		$id = $_POST["id"];
		$name = $_POST["name"];
		$apellido = $_POST["apellido"];
		$username = $_POST["username"];
		$phone = $_POST["phone"];
		$nit = $_POST["nit"];
		$date = $_POST["date"];
		$cc_user = $_POST["cc_user"];
		$cooperativa = $_POST["cooperativa"];
		$metadata = json_decode($_POST["vehicles"]);
		$response = null;
		
		foreach($metadata as $vehicle){
			
			try{
				$current_vehicle = vehiculo::find($vehicle->id);
			}catch(ActiveRecord\RecordNotFound $e){
				$current_vehicle = array();
			}
			
			if(count($current_vehicle)!=0){
				$current_vehicle->modelo = $vehicle->modelo;
				$current_vehicle->observaciones = $vehicle->observaciones;
				$current_vehicle->placa = $vehicle->placa;
				$current_vehicle->save();
			}else{
				vehiculo::create(array(
							   'id' => NULL, 
							   'modelo' =>$vehicle->modelo,
							   'observaciones' => $vehicle->observaciones,
							   'placa' => $vehicle->placa,
							   'usuario_id' =>$id,
							   'id_adjunto' =>0
                           ));	
			}
			
		}
		
		$user = Usuario::find($id);
			$user->nombre = $name;
			$user->apellido = $apellido;
			$user->correo_electronico = $username;
			$user->telefono = $phone;
			$user->cedula = $cc_user;
			$user->nit = $nit;
			$user->fecha_nacimiento = $date;
			$user->estado_registro = 5;
			$user->cooperativa = $cooperativa;
		$user->save();
		
		$response = array(
							'message' => 'OK',
							'info' => 'Se acualizo correctamente'
						);
		
		echo json_encode($response);
	}
	
	function solvedudes(){
		$email = $_POST["email"];
		$nombre = $_POST["name"];
		$apellido = $_POST["surname"];
		$mensaje = $_POST["message"];
		
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
		
		$template_faq = plantilla_email::find(2);  

		$mensaje = str_replace(
			array("#MENSAJE#","#NOMBRE#","#APELLIDO#","#CORREO#"),
			array($mensaje, $nombre ,$apellido,$email),
			$template_faq->contenido_html
		);
		
		$estado = mail($email, 'Peticion/Queja Subastra', $mensaje,$headers);
	
		if($estado){
			$response = array(
							'message' => 'OK',
							'info' => 'Se envio correctamente'
						);
		}else{
			$response = array(
							'message' => 'FAIL',
							'info' => 'no Se envio correctamente'
						);
		}
		
		echo json_encode($response);
	}
	
	function registerNewUser(){
	    $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $rol = $_POST['rol'];
        $correo = $_POST['correo'];
        $telefono = $_POST['telefono'];
        $cedula = $_POST['cedula'];
        $fecha = $_POST['fecha'];
        $cooperativa = $_POST['coop'];
        $contrasenia = $_POST['contrasenia'];
        $response = null;
		
		$query = Usuario::all(array('conditions' => array('correo_electronico = ? ', $correo)));
           
        if(count($query)>0){
            $response = array(
        					'message' => "el usuario ya existe en la base de datos",
        					'status' => "2"
        				 );
        }else{
            $hashnumber = bin2hex(mcrypt_create_iv(22, MCRYPT_DEV_URANDOM));
            $user = Usuario::create(array(
                           'id'                 => null,
                           'nombre'             => $nombre,
                           'apellido'           => $apellido,
                           'rol_id'             => $rol,
                           'correo_electronico' => $correo,
                           'contrasenia'        => $contrasenia,
                           'telefono'           => $telefono,
                           'cedula'             => $cedula,
                           'nit'                => '',
                           'id_referido'        => '',
                           'rut'                => '',
                           'id_cooperativa'     => '',
                           'cooperativa'        => $cooperativa,
                           'id_tipo_vehiculo'   => '',
                           'fecha_nacimiento'   => $fecha,
                           'estado_registro'    => 2,
                           'metadata'           => '',
                           'fecha_creacion'     => 'now()',
                           'id_canal'           => '',
                           'ultimo_acceso'      => '',
                           'url_compartir'      => '',
                           'id_nivel'           => 0,
                           'hashverified'       => $hashnumber
                           ));
            $response = array(
            					'message' => "se registro correctamente el usuario",
            					'status' => "1"
            				 );
        }
        echo json_encode($response);
	}
	
	function deleteUser(){
	    $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $rol = $_POST['rol'];
        $correo = $_POST['correo'];
        $telefono = $_POST['telefono'];
        $cedula = $_POST['cedula'];
        $fecha = $_POST['fecha'];
        $cooperativa = $_POST['coop'];
        $contrasenia = $_POST['contrasenia'];
        $response = null;
		
		$query = Usuario::all(array('conditions' => array('correo_electronico = ? ', $correo)));
           
        if(count($query)>0){
            $response = array(
        					'message' => "el usuario ya existe en la base de datos",
        					'status' => "2"
        				 );
        }else{
            $hashnumber = bin2hex(mcrypt_create_iv(22, MCRYPT_DEV_URANDOM));
            $user = Usuario::create(array(
                           'id'                 => null,
                           'nombre'             => $nombre,
                           'apellido'           => $apellido,
                           'rol_id'             => $rol,
                           'correo_electronico' => $correo,
                           'contrasenia'        => $contrasenia,
                           'telefono'           => $telefono,
                           'cedula'             => $cedula,
                           'nit'                => '',
                           'id_referido'        => '',
                           'rut'                => '',
                           'id_cooperativa'     => '',
                           'cooperativa'        => $cooperativa,
                           'id_tipo_vehiculo'   => '',
                           'fecha_nacimiento'   => $fecha,
                           'estado_registro'    => 2,
                           'metadata'           => '',
                           'fecha_creacion'     => 'now()',
                           'id_canal'           => '',
                           'ultimo_acceso'      => '',
                           'url_compartir'      => '',
                           'id_nivel'           => 0,
                           'hashverified'       => $hashnumber
                           ));
            $response = array(
            					'message' => "se registro correctamente el usuario",
            					'status' => "1"
            				 );
        }
        echo json_encode($response);
	}
	
	function allUsers(){
		
		$query = Usuario::all();

        $data = array();
        foreach($query as $usuario){
            $data[] = $usuario->attributes();
        }
        echo json_encode($data);
	}
	
	function searchUser(){
	    $parameter = $_POST['parameter'];
	    $query = Usuario::find('all', array('conditions' => "id = '". $parameter ."' OR cedula ='" . $parameter . "' OR nombre = '". $parameter ."' OR correo_electronico = '".$parameter."' OR telefono = '".$parameter."'"));

        $data = array();
        foreach($query as $usuario){
            $data[] = $usuario->attributes();
        }
        echo json_encode($data);
	}
	
	function KillSession($app,$id){
		
		 $session = session::find(array('conditions' => array('id_user = ?', $id)));
		 $state = $session->delete();
		 $response = array();
		 
		 if($state){
		 	$response = array(
		 				"status" => "OK"
		 		);
		 }else{
		 	$response = array(
		 				"status" => "FAILED"
		 		);
		 }
		 
		echo json_encode($response);

	}
	
	function ChangePassword(){
		$id = $_POST['id'];
		$new_pass = $_POST['new_pass'];
		$response = null;
		
		$user = Usuario::find($id);
		$user->contrasenia = $new_pass;
		$bool = $user->save();
		if($bool){
			$response = array(
				"status" => "OK"
				);
		}else{
			$response = array(
				"status" => "FAILED"
			);
		}
		echo json_encode($response);
		
	}
	
	function deactivateUser($app,$id){
		$data = Usuario::find($id);
		$data->estado_registro = 4;
		if($data->save()){
			echo "si";
		}else{
			echo "no";
		}
	}
	function activeUser(){
		$email = $_POST['email'];
		$pwd = $_POST['pwd'];
		$data = Usuario::find(array('conditions' => array('correo_electronico = ? AND contrasenia = ? ', $email, $pwd)));
		$data->estado_registro = 2;
		if($data->save()){
			echo "si"; 
		}else{
			echo "no";
		}
	}
}

?>
