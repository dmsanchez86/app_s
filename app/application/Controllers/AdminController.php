<?php

class AdminController{
	
	# Métodos por parte del administrador

    // guardar un tipo de carga
    function save_type(){
        $name = $_POST['name'];
        $des = $_POST['des'];
        
        $user = clase_carga::create(array(
                'id'            =>null,
                'nombre'        =>$name,
                'slug'          =>$name,
                'descripcion'   =>$des,
                'metadata'      =>'{}'
            ));
            
        $response = array(
            					'message' => "se registro correctamente el tipo de carga",
            					'status' => "1"
            				 );
        echo json_encode($response);
    }
    
    function LoadTypesCharge($app){
        $query = clase_carga::all(array('conditions' => array('1 = 1')));
               
        if(count($query)>0){
          $data = array();
          foreach($query as $tipos){
            $data[] = $tipos->attributes();
          }
          $response = array(
                'status' => "OK",
                'data' => $data
               );
        }else{
            $response = array(
                  'status' => "NOT_FOUND"
                 );
        } 
        echo json_encode($response);
    }
    
    function delete_type($app,$id){
        $query = clase_carga::find($id);
        $result  = $query->delete();
        
        if($result)
            echo "OK";
	    else
	        echo "NOT";
    }
    
    // GCRUD unidad de medida
    function save_unit(){
        $name = $_POST['name'];
        
        $user = unidad_medida::create(array(
                'id'            =>null,
                'nombre'        =>$name,
                'SIM'          =>$name
            ));
            
        $response = array(
            					'message' => "se registro correctamente el tipo de unidad de medida",
            					'status' => "1"
            				 );
        echo json_encode($response);
    }
    
    function delete_unit($app,$id){
        $query = unidad_medida::find($id);
        $result  = $query->delete();
        
        if($result)
            echo "OK";
	    else
	        echo "NOT";
    }
    
    function LoadUnitsMeasure(){
        $query = unidad_medida::all(array('conditions' => array('1 = 1')));
               
        if(count($query)>0){
        
          $data = array();
          foreach($query as $tipos){
            $data[] = $tipos->attributes();
          }
        
          $response = array(
                'status' => "OK",
                'data' => $data
               );
          
        }else{
            $response = array(
                  'status' => "NOT_FOUND"
                 );
        } 
        
        echo json_encode($response);
    }

    // Usuarios
	function registerNewUser(){
	    $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $rol = $_POST['rol'];
        $correo = $_POST['correo'];
        $telefono = $_POST['telefono'];
        $cedula = $_POST['cedula'];
        $nit = $_POST['nit'];
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
                           'nit'                => $nit,
                           'id_referido'        => '',
                           'rut'                => '',
                           'id_cooperativa'     => '',
                           'cooperativa'        => $cooperativa,
                           'id_tipo_vehiculo'   => '',
                           'fecha_nacimiento'   => $fecha,
                           'estado_registro'    => 3,
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
	
	# Eliminar usuarios
	function deleteUser($app,$id){
	    $query = Usuario::find($id);
        $result  = $query->delete();
        
        if($result)
            echo "OK";
	    else
	        echo "NOT";
	}
	
	# Actualizar usuarios
	function updateUser($app){
	    $id = $_POST['id'];
	    $nombre = $_POST['nombre'];
	    $apellido = $_POST['apellido'];
	    $correo = $_POST['correo'];
	    $cedula = $_POST['correo'];
	    $fecha_nacimiento = $_POST['fecha_nacimiento'];
	    $cooperativa = $_POST['cooperativa'];
	    $nivel = $_POST['nivel'];
	    $telefono = $_POST['telefono'];
	    $query = Usuario::find($id);
	    $query->nombre = $nombre;
	    $query->apellido = $apellido;
	    $query->telefono = $telefono;
	    $query->fecha_nacimiento = $fecha_nacimiento;
	    $query->cooperativa = $cooperativa;
	    $data = $query->save();
	    
	    if($data)
	        echo "OK";
	    else
	        echo "NOT";
	}
	
	# Mostrar todos los usuarios
	function allUsers($app,$filter){
		
		if($filter == "all"){
		    $query = Usuario::all();
		}else if($filter == "activos"){
		    $query = Usuario::find('all',array('conditions'=>'estado_registro NOT IN(4,6)'));
		}else if($filter == "inactivos"){
		    $query = Usuario::find('all',array('conditions'=>'estado_registro = 4'));
		}else if($filter == "pendientes"){
		    $query = Usuario::find('all',array('conditions'=>'estado_registro = 5'));
		}else if($filter == "inactivos_admin"){
		    $query = Usuario::find('all',array('conditions'=>'estado_registro = 6'));
		}else if($filter == "administradores"){
		    $query = Usuario::find('all',array('conditions'=>'rol_id = 1'));
		}else if($filter == "transportistas"){
		    $query = Usuario::find('all',array('conditions'=>'rol_id = 3'));
		}else if($filter == "empresas"){
		    $query = Usuario::find('all',array('conditions'=>'rol_id = 2'));
		}else if($filter == "busqueda"){
		    $d = $_POST['datos'];
		    $query = Usuario::find('all',array('conditions'=>'nombre LIKE "%'.$d.'%" OR apellido LIKE "%'.$d.'%" OR correo_electronico LIKE "%'.$d.'%" OR cedula LIKE "%'.$d.'%"'));
		}
		
        $data = array();
        foreach($query as $usuario){
            
            if($usuario->fecha_nacimiento==null){
               $fnac = "0000-00-00";
            }else{
                $fnac = $usuario->fecha_nacimiento->format('Y-m-d');
            }
            
            
            $attribute = $usuario->attributes();
            $data[] = array(
                            'id' => $attribute["id"],
                            'rol_id' => $attribute["rol_id"],
                            'nombre' => $attribute["nombre"],
                            'correo_electronico' => $attribute["correo_electronico"],
                            'telefono' => $attribute["telefono"],
                            'cedula' => $attribute["cedula"],
                            'fecha_nacimiento' => $fnac,
                            'estado_registro' => $attribute["estado_registro"]
                        );
        }
            
		echo json_encode($data);
	}
	
	# Filtrar usuarios
	function searchUser(){
	    $parameter = $_POST['parameter'];
	    $query = Usuario::find('all', array('conditions' => "id LIKE '%". $parameter ."%' OR cedula LIKE '%" . $parameter . "%' OR nombre LIKE '%". $parameter ."%' OR correo_electronico LIKE '%".$parameter."%' OR telefono LIKE '%".$parameter."%'"));

        $data = array();
        foreach($query as $usuario){
            $data[] = $usuario->attributes();
        }
        echo json_encode($data);
	}
	
	# historial del usuario
    function historyUser($app,$id){
        $query = historial_acciones::find('all',  array('conditions' => " us_id = '".$id."'") );
        $data = array();
        foreach($query as $historial){
            $data[] = $historial->attributes();
        }
        echo json_encode($data);
    }	
    
	# historial del usuario
    function All_User($app){
        $query = Usuario::find('all',  array('conditions' => "1=1") );
        $data = array();
        foreach($query as $user){
            $data[] = $user->attributes();
        }
        echo json_encode($data);
    }	
    
    function aprobateUser(){
        $user = $_POST["id"];
        
        $found_user = Usuario::find($user);
        $found_user->estado_registro = 3;
        $status = $found_user->save();
        $response = null;
        
        if($status){
            $response = array(
                        "status"=>"OK"
                        );    
        }else{
            $response = array(
                        "status"=>"OK"
                        );              
        }
        
        echo json_encode($response);
        
    }
    
    # mostrar preguntas de bd
    function allItemPreguntas(){
        
        $query = item_calificacion::all(array('conditions' => array('1 = 1')));
        if(count($query)>0){
          $data = array();
          foreach($query as $tipos){
            $data[] = $tipos->attributes();
          }
          $response = array(
                'status' => "OK",
                'data' => $data
               );
        }else{
            $response = array(
                  'status' => "NOT_FOUND"
                 );
        } 
        echo json_encode($response);
    }
    
    #eliminar pregunta
    function deletePregunta($app,$id){
        $query = item_calificacion::find($id);
        $result  = $query->delete();
        
        if($result)
            echo "OK";
	    else
	        echo "NOT";
    }
    
}
?>