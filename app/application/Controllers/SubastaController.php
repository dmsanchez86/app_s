<?php

class SubastaController{
	
	function demo(){
		
		date_default_timezone_set("America/Bogota");
		
		$hour_server = date('H:i');
		echo $hour_server == "12:00";
		echo  $hour_server;
	}
	
	function SetWinnerSubasta($app){
		
		date_default_timezone_set("America/Bogota");
		
		echo "test";
	}
	
	function EditSubasta($app){
	    
	    date_default_timezone_set("America/Bogota");
	    
		$id_subasta = $_POST["id_subasta"];			
		$estado = $_POST["estado"];			
        $clase_carga_id = $_POST["clase_carga_id"];				
        $unidad_medida_id = $_POST["unidad_medida_id"];
        $cantidad = $_POST["cantidad"];			
        $descripcion_carga = $_POST["descripcion_carga"];			
        $ciudad_recoleccion_carga = $_POST["ciudad_recoleccion_carga"];			
        $direccion_recoleccion_carga = $_POST["direccion_recoleccion_carga"];			
        $ciudad_entrega_carga = $_POST["ciudad_entrega_carga"];			
        $direccion_entrega_carga = $_POST["direccion_entrega_carga"];				
        $coordenada_inicial = $_POST["coordenada_inicial"];	
        $coordenada_final = $_POST["coordenada_final"];			
        $centroide_inicial = $_POST["centroide_inicial"];			
        $centroide_final = $_POST["centroide_final"];		
        $fecha_entrega_carga = $_POST["fecha_entrega_carga"];			
        $hora_entrega_carga = $_POST["hora_entrega_carga"];			
        $fecha_recogida_carga = $_POST["fecha_recogida_carga"]; 		
        $hora_recogida_carga = $_POST["hora_recogida_carga"];			
        $presupuesto_envio = $_POST["presupuesto_envio"];		
        $fecha_inicio_subasta = $_POST["fecha_inicio_subasta"];			
        $hora_inicio_subasta = $_POST["hora_inicio_subasta"];		
        $fecha_fin_subasta = $_POST["fecha_fin_subasta"];				
        $hora_fin_subasta = $_POST["hora_fin_subasta"];			
        $us_id = $_POST["us_id"];			
        $valor_final_subasta = $_POST["valor_final_subasta"];				
        $metadata = $_POST["metadata"];
        $fecha_creacion = $_POST["fecha_creacion"];
        $id_adjunto_parafiscal = $_POST["id_adjunto_parafiscal"];				
        $id_certificado_bancario = $_POST["id_certificado_bancario"];				
        $id_rut = $_POST["id_rut"];
       
        $response = null;
		
		$fecha_creacion = date('Y-m-d');
		$hora_creacion = date('H:i');
        
        if( 
        	$hora_inicio_subasta=="instant" && 
        	$fecha_inicio_subasta=="instant"
          ){
        	
        	$fecha_inicio_subasta = date('Y-m-d');
			$hora_inicio_subasta = date('H:i');
			$estado = 2;	
        }else{
        	$estado = 3;	
        } 
        
	    $subasta = subasta::find($id_subasta);
            $subasta->estado = $estado;
            $subasta->titulo_opcional = "";
            $subasta->clase_carga_id = $clase_carga_id;
            $subasta->unidad_medida_id = $unidad_medida_id;
            $subasta->cantidad = $cantidad;	
            $subasta->descripcion_carga = $descripcion_carga;		
            $subasta->ciudad_recoleccion_carga = $ciudad_recoleccion_carga;	
            $subasta->direccion_recoleccion_carga = $direccion_recoleccion_carga;		
            $subasta->ciudad_entrega_carga = $ciudad_entrega_carga;
            $subasta->direccion_entrega_carga =	$direccion_entrega_carga;
            $subasta->coordenada_inicial = $coordenada_inicial;
            $subasta->coordenada_final = $coordenada_final;	
            $subasta->centroide_inicial = $centroide_inicial;	
            $subasta->centroide_final =	$centroide_final;
            $subasta->fecha_entrega_carga =	$fecha_entrega_carga;		
            $subasta->hora_entrega_carga = $hora_entrega_carga;
            $subasta->fecha_recogida_carga = $fecha_recogida_carga;			
            $subasta->hora_recogida_carga = $hora_recogida_carga;
            $subasta->presupuesto_envio = $presupuesto_envio;			
            $subasta->fecha_inicio_subasta = $fecha_inicio_subasta;			
            $subasta->hora_inicio_subasta = $hora_inicio_subasta;
            $subasta->fecha_fin_subasta = $fecha_fin_subasta;			
            $subasta->hora_fin_subasta = $hora_fin_subasta;	
            $subasta->us_id = $us_id;
            $subasta->valor_final_subasta =	$valor_final_subasta;		
            $subasta->metadata = $metadata;
            $subasta->fecha_creacion = $fecha_creacion;			
            $subasta->hora_creacion = $hora_creacion;	
            $subasta->id_adjunto_parafiscal = $id_adjunto_parafiscal;
            $subasta->id_certificado_bancario = $id_certificado_bancario;
            $subasta->id_rut = $id_rut;
            
	    $status = $subasta->save();
        if($status){
            $response = "OK";
        }else{
            $response = "FAIL";
        }   

        echo json_encode($response);	    
	}
	
	function CreateSubasta($app){
	    
	    date_default_timezone_set("America/Bogota");
	    
        $id = null;
		$estado = $_POST["estado"];			
        $clase_carga_id = $_POST["clase_carga_id"];				
        $unidad_medida_id = $_POST["unidad_medida_id"];
        $cantidad = $_POST["cantidad"];			
        $descripcion_carga = $_POST["descripcion_carga"];			
        $ciudad_recoleccion_carga = $_POST["ciudad_recoleccion_carga"];			
        $direccion_recoleccion_carga = $_POST["direccion_recoleccion_carga"];			
        $ciudad_entrega_carga = $_POST["ciudad_entrega_carga"];			
        $direccion_entrega_carga = $_POST["direccion_entrega_carga"];				
        $coordenada_inicial = $_POST["coordenada_inicial"];	
        $coordenada_final = $_POST["coordenada_final"];			
        $centroide_inicial = $_POST["centroide_inicial"];			
        $centroide_final = $_POST["centroide_final"];		
        $fecha_entrega_carga = $_POST["fecha_entrega_carga"];			
        $hora_entrega_carga = $_POST["hora_entrega_carga"];			
        $fecha_recogida_carga = $_POST["fecha_recogida_carga"]; 		
        $hora_recogida_carga = $_POST["hora_recogida_carga"];			
        $presupuesto_envio = $_POST["presupuesto_envio"];		
        $fecha_inicio_subasta = $_POST["fecha_inicio_subasta"];			
        $hora_inicio_subasta = $_POST["hora_inicio_subasta"];		
        $fecha_fin_subasta = $_POST["fecha_fin_subasta"];				
        $hora_fin_subasta = $_POST["hora_fin_subasta"];			
        $us_id = $_POST["us_id"];			
        $valor_final_subasta = $_POST["valor_final_subasta"];				
        $metadata = $_POST["metadata"];
        $fecha_creacion = $_POST["fecha_creacion"];
        $id_adjunto_parafiscal = $_POST["id_adjunto_parafiscal"];				
        $id_certificado_bancario = $_POST["id_certificado_bancario"];				
        $id_rut = $_POST["id_rut"];
  
        $response = null;
		
		$fecha_creacion = date('Y-m-d');
		$hora_creacion = date('H:i');
        
        if( 
        	$hora_inicio_subasta=="instant" && 
        	$fecha_inicio_subasta=="instant"
          ){
        	
        	$fecha_inicio_subasta = date('Y-m-d');
			$hora_inicio_subasta = date('H:i');
			$estado = 2;	
        }else{
        	$estado = 3;	
        }
        
        
        
        $data  = subasta::create(
               array(
                        'id' => $id,
                        'estado'  => $estado,
                        'titulo_opcional' => "",
                        'clase_carga_id'  => $clase_carga_id,
                        'unidad_medida_id' => $unidad_medida_id,
                        'cantidad' => $cantidad,
                        'descripcion_carga' => $descripcion_carga,
                        'ciudad_recoleccion_carga' => $ciudad_recoleccion_carga,
                        'direccion_recoleccion_carga' => $direccion_recoleccion_carga,
                        'ciudad_entrega_carga' => $ciudad_entrega_carga,
                        'direccion_entrega_carga' => $direccion_entrega_carga,
                        'coordenada_inicial' => $coordenada_inicial,
                        'coordenada_final' => $coordenada_final,
                        'centroide_inicial' => $centroide_inicial,
                        'centroide_final' => $centroide_final,
                        'fecha_entrega_carga' => $fecha_entrega_carga,
                        'hora_entrega_carga' => $hora_entrega_carga,
                        'fecha_recogida_carga' => $fecha_recogida_carga,
                        'hora_recogida_carga' => $hora_recogida_carga,
                        'presupuesto_envio' => $presupuesto_envio,
                        'fecha_inicio_subasta' => $fecha_inicio_subasta,
                        'hora_inicio_subasta' => $hora_inicio_subasta,
                        'fecha_fin_subasta' => $fecha_fin_subasta,
                        'hora_fin_subasta' => $hora_fin_subasta,
                        'us_id' => $us_id,
                        'valor_final_subasta' => $valor_final_subasta,
                        'metadata' => $metadata,
                        'fecha_creacion' => $fecha_creacion,
                        'hora_creacion' => $hora_creacion,
                        'id_adjunto_parafiscal' => $id_adjunto_parafiscal,
                        'id_certificado_bancario' => $id_certificado_bancario,
                        'id_rut' => $id_rut,
                        'participants' => "[]"
                        )
                );
                
        $response  = array(
                    'status' => "OK"
                    );
                    


        // ahora mando el correo avisando que creo la subasta
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";        
        $email_creacion_subasta = plantilla_email::find(6);  

        $model_ciudad_entrega = ciudad::find($ciudad_entrega_carga);
        $ciudad_entrega_carga = $model_ciudad_entrega->nombre;

        $model_ciudad_recogida = ciudad::find($ciudad_recoleccion_carga);
        $ciudad_recogida_carga = $model_ciudad_recogida->nombre;

        $model_unidad_medida = unidad_medida::find($unidad_medida_id);
        $unidad_medida = $model_unidad_medida->nombre;

        $model_user = Usuario::find($us_id);
        $useremail = $model_user->correo_electronico;

        $mensaje = str_replace(
            array("##ORIGEN##","##DESTINO##","##CANTIDAD##","##UNIDAD_MEDIDA##","##VALOR##","##FECHA_INICIO##"),
            array(
                      $ciudad_recogida_carga, 
                      $ciudad_entrega_carga,
                      $cantidad,
                      $unidad_medida,
                      $presupuesto_envio,
                      $fecha_inicio_subasta
                  ),
            $email_creacion_subasta->contenido_html
        );
        $estado = mail($useremail, 'SUBASTRA / Acabas de Crear Una subasta', $mensaje,$headers);
        //fin funciones de plantilla_email


        echo json_encode($response);
	}
	
	function ListSubasta($app){
	    
	    date_default_timezone_set("America/Bogota");
	    
	    $subasta_each = array();
	    $subastas = subasta::find('all',array('conditions' => array('1=1')));
	    
	    foreach($subastas as $subasta_item){
	        $subasta_current_item = $subasta_item->attributes();
	        
	        $model_unidad_medida = unidad_medida::find($subasta_current_item["unidad_medida_id"]);
	        $unidad_medida = $model_unidad_medida->nombre;
	        
	        $model_ciudad_recoleccion = ciudad::find($subasta_current_item["ciudad_recoleccion_carga"]);
	        $model_ciudad_entrega = ciudad::find($subasta_current_item["ciudad_entrega_carga"]);
	   
    	        $model_ciudad_recoleccion_ = $model_ciudad_recoleccion->attributes();
    	        $model_ciudad_entrega_ = $model_ciudad_entrega->attributes();
	        
	        $ciudad_entrega_carga = $model_ciudad_entrega->nombre;
	        $ciudad_recoleccion_carga = $model_ciudad_recoleccion->nombre;
	        
	        $date1 = new DateTime($subasta_item->fecha_inicio_subasta->format('Y-m-d'));
			$date2 = new DateTime(date('Y-m-d'));
			$interval = $date1->diff($date2);
			
			$dtime = $subasta_item->hora_inicio_subasta;
			$atime = date('H:i');
			
			$nextDay=$dtime>$atime?1:0;
    		$dep=explode(':',$dtime);
    		$arr=explode(':',$atime);
    		$diff=abs(mktime($dep[0],$dep[1],0,date('n'),date('j'),date('y'))-mktime($arr[0],$arr[1],0,date('n'),date('j')+$nextDay,date('y')));
    		$hours=floor($diff/(60*60));
    		$mins=floor(($diff-($hours*60*60))/(60));
    		$secs=floor(($diff-(($hours*60*60)+($mins*60))));
    		if(strlen($hours)<2){$hours="0".$hours;}
    		if(strlen($mins)<2){$mins="0".$mins;}
    		if(strlen($secs)<2){$secs="0".$secs;}
    		$difference = $hours.':'.$mins.':'.$secs;
    					 
    		if((int)$interval->d<=0){
    		  $e_stado = "CORRIENDO";   
    		}else{
    		  $e_stado = "PROGRAMADA";     
    		}
    		
	        $subasta_each[] = array(
	                            'id' => $subasta_item->id,
	                            'unidad_medida' => $unidad_medida,
	                            'titulo_opcional' =>$subasta_item->titulo_opcional,
	                            'ciudad_entrega_carga' => $ciudad_entrega_carga,
	                            'cantidad' => $subasta_item->cantidad,
	                            'presupuesto_envio' => $subasta_item->presupuesto_envio,
	                            'ciudad_recoleccion_carga'=> $ciudad_recoleccion_carga,
	                            'fecha_inicio_subasta'=> $subasta_item->fecha_inicio_subasta->format('Y-m-d'),
	                            'hora_inicio_subasta'=> $subasta_item->hora_inicio_subasta,
	                            'difference_days'=> $interval->d,
	                            'difference_hours'=> $difference,
	                            'now'=> $atime,
	                            'estado'=> $e_stado
	                           );
	    }
	    
	    echo json_encode($subasta_each);
	}	
	
	
	function ListSubastaTransporter($app){
		
		date_default_timezone_set("America/Bogota");
	    
	    $subasta_each = array();
	    $subastas = subasta::find('all',array('conditions' => array('1=1')));
	    
	    foreach($subastas as $subasta_item){
	        $subasta_current_item = $subasta_item->attributes();
	        
	        $model_unidad_medida = unidad_medida::find($subasta_current_item["unidad_medida_id"]);
	        $unidad_medida = $model_unidad_medida->nombre;
	        
	        $model_ciudad_recoleccion = ciudad::find($subasta_current_item["ciudad_recoleccion_carga"]);
	        $model_ciudad_entrega = ciudad::find($subasta_current_item["ciudad_entrega_carga"]);
	   
    	        $model_ciudad_recoleccion_ = $model_ciudad_recoleccion->attributes();
    	        $model_ciudad_entrega_ = $model_ciudad_entrega->attributes();
	        
	        $ciudad_entrega_carga = $model_ciudad_entrega->nombre;
	        $ciudad_recoleccion_carga = $model_ciudad_recoleccion->nombre;
	        
	        
	        
	        //hora de inicio y hora actual
	        $dtime = $subasta_item->hora_inicio_subasta;
			$atime = date('H:i');
			
				
				
			 $date1 = new DateTime($subasta_item->fecha_inicio_subasta->format('Y-m-d'));
			 $date2 = new DateTime(date('Y-m-d'));
			 $interval = $date1->diff($date2);
				
			
			 $nextDay=$dtime>$atime?1:0;
			 $dep=explode(':',$dtime);
			 $arr=explode(':',$atime);
			 $diff=abs(mktime($dep[0],$dep[1],0,date('n'),date('j'),date('y'))-mktime($arr[0],$arr[1],0,date('n'),date('j')+$nextDay,date('y')));
			 $hours=floor($diff/(60*60));
			 $mins=floor(($diff-($hours*60*60))/(60));
			 $secs=floor(($diff-(($hours*60*60)+($mins*60))));
			 if(strlen($hours)<2){$hours="0".$hours;}
			 if(strlen($mins)<2){$mins="0".$mins;}
			 if(strlen($secs)<2){$secs="0".$secs;}
			 $difference = $hours.':'.$mins.':'.$secs;

            if((int)$interval->d<=0){
    		  $e_stado = "CORRIENDO";   
    		}else{
    		  $e_stado = "PROGRAMADA";     
    		}
					
	        $subasta_each[] = array(
	                            'id' => $subasta_item->id,
	                            'unidad_medida' => $unidad_medida,
	                            'titulo_opcional' =>$subasta_item->titulo_opcional,
	                            'ciudad_entrega_carga' => $ciudad_entrega_carga,
	                            'cantidad' => $subasta_item->cantidad,
	                            'presupuesto_envio' => $subasta_item->presupuesto_envio,
	                            'ciudad_recoleccion_carga'=> $ciudad_recoleccion_carga,
	                            'fecha_inicio_subasta'=> $subasta_item->fecha_inicio_subasta->format('Y-m-d'),
	                            'hora_inicio_subasta'=> $subasta_item->hora_inicio_subasta,
	                            'difference'=> $difference,
	                            '_difference'=> $interval,
	                            'difference_days'=> $interval->days,
	                            'now' => $atime,
	                            'estado'=> $e_stado
	                           );
	    }
	    
	    echo json_encode($subasta_each);
	}
	
	
	function SocketServiceTime($app){
	    
	   date_default_timezone_set("America/Bogota");
	    
	   $id_subasta = $_POST["_id"];
       $response = null;
       $status = null;
    
       $subasta = subasta::find($id_subasta);
       $dtime = $subasta->hora_fin_subasta;
       $atime = date('H:i');
		
       $date1 = new DateTime($subasta->fecha_fin_subasta->format('Y-m-d'));
       $date2 = new DateTime(date('Y-m-d'));
       $interval = $date1->diff($date2);
       
       if((int)$interval->days<=0){
          $status = "FINISH";
       }else{
          $status = "ACTIVE";
       }
        
	   $response = array(
                        "fecha_fin" => $subasta->fecha_fin_subasta->format('Y-m-d'),
                        "hora_fin" => $dtime,
                        "fecha_ahora" => $dtime,
		                "hora_ahora" => $atime,
		                "fecha_ahora" => date('Y-m-d'),
		                "interval" => $interval->days,
		                "status" => $status
		                );
			
	   echo json_encode($response);
	}

/*
		$result_hours_fin = explode(":",$dtime); 
		$result_hours_fin = (int)$result_hours_fin[0]; 
		
		$result_hours_ahora = explode(":",$atime); 
		$result_hours_ahora = (int)$result_hours_ahora[0]; 
		
    	if( $result_hours_ahora >= $result_hours_fin ){
    		    
		}else{
		    $status = "SUBASTA_ACTIVE";
		}
		
*/	
	function FindSubasta($app){
	    
	    date_default_timezone_set("America/Bogota");
	    
	    $id = $_POST["_id"];
	    $subasta = subasta::find($id);
	    
	    $model_unidad_medida = unidad_medida::find($subasta->unidad_medida_id);
	    $unidad_medida = $model_unidad_medida->nombre;
	        
	    $model_ciudad_recoleccion = ciudad::find($subasta->ciudad_recoleccion_carga);
	    $depto_ciudad_recoleccion = departamento::find($model_ciudad_recoleccion->id_departamento);
	    
	    $model_ciudad_entrega = ciudad::find($subasta->ciudad_entrega_carga);
    	$depto_ciudad_entrega = departamento::find($model_ciudad_entrega->id_departamento);
    	
    	$model_ciudad_recoleccion_ = $model_ciudad_recoleccion->attributes();
    	$model_ciudad_entrega_ = $model_ciudad_entrega->attributes();
	
	    $ciudad_entrega_carga = $model_ciudad_entrega->nombre;
	    $ciudad_recoleccion_carga = $model_ciudad_recoleccion->nombre;
	        
	    $newdata = array(
	                            'id' => $subasta->id,
	                            'unidad_medida' => $unidad_medida,
	                            'titulo_opcional' =>$subasta->titulo_opcional,
	                            'ciudad_entrega_carga' => $ciudad_entrega_carga,
	                            'cantidad' => $subasta->cantidad,
	                            'presupuesto_envio' => $subasta->presupuesto_envio,
	                            'ciudad_recoleccion_carga'=> $ciudad_recoleccion_carga,        
	                            'descripcion_carga'=> $subasta->descripcion_carga,	        
	                            'coordenada_inicial'=> $subasta->coordenada_inicial,	        
	                            'coordenada_final'=> $subasta->coordenada_final,	        
	                            'fecha_inicio_subasta'=> $subasta->fecha_inicio_subasta->format('Y-m-d'),	        
	                            'hora_inicio_subasta'=> $subasta->hora_inicio_subasta,	        
	                            'fecha_fin_subasta'=> $subasta->fecha_fin_subasta->format('Y-m-d'),	        
	                            'hora_fin_subasta'=> $subasta->hora_fin_subasta,        
	                            'fecha_recogida_carga'=> $subasta->fecha_recogida_carga->format('Y-m-d'),	       
	                            'hora_recogida_carga'=> $subasta->hora_recogida_carga,	      
	                            'fecha_entrega_carga'=> $subasta->fecha_entrega_carga->format('Y-m-d'),	      
	                            'hora_entrega_carga'=> $subasta->hora_entrega_carga,	      
	                            'direccion_recoleccion_carga'=> $subasta->direccion_recoleccion_carga,	      
	                            'direccion_entrega_carga'=> $subasta->direccion_entrega_carga,	      
	                            'unidad_medida_id'=> $subasta->unidad_medida_id,	      
	                            'clase_carga_id'=> $subasta->clase_carga_id,	      
	                            'ciudad_recoleccion_carga'=> $subasta->ciudad_recoleccion_carga,	      
	                            'ciudad_entrega_carga'=> $subasta->ciudad_entrega_carga,
	                            'departamento_recoleccion' => $depto_ciudad_recoleccion->id,
	                            'departamento_entrega' => $depto_ciudad_entrega->id
	                   );
	    
	    echo json_encode($newdata);
	}  	
	
	function SocketService($app){
	    
	    date_default_timezone_set("America/Bogota");
	    
		$id_ = $_POST["_id"];
		$response = null;
		
		if(isset($_POST["_metadata"])){
			
			$_metadata = $_POST["_metadata"];
			
			$subasta = subasta::find($id_);

			if($_metadata==$subasta->participants){
				
				$response = array(
								"status" => "OK_STATUS"
								);
			}else{
				$response = array(
								"status" => "REFRESH_STATUS",
								"data" => $subasta->attributes()
								);
			}
	
		}else{
				$response = array(
								"status" => "INITIALIZING"
								);
		}
		
		echo json_encode($response);
		
	}
	
	function FindSubastaPerParticipants($app){
	    
	    date_default_timezone_set("America/Bogota");
	    
	    $id = $_POST["_id"];
	    $subasta = subasta::find($id);
	    
	    $model_unidad_medida = unidad_medida::find($subasta->unidad_medida_id);
	    $unidad_medida = $model_unidad_medida->nombre;
	        
	    $model_ciudad_recoleccion = ciudad::find($subasta->ciudad_recoleccion_carga);
	    $model_ciudad_entrega = ciudad::find($subasta->ciudad_entrega_carga);

    	        $model_ciudad_recoleccion_ = $model_ciudad_recoleccion->attributes();
    	        $model_ciudad_entrega_ = $model_ciudad_entrega->attributes();
	
	     $ciudad_entrega_carga = $model_ciudad_entrega->nombre;
	     $ciudad_recoleccion_carga = $model_ciudad_recoleccion->nombre;
	        
	    $newdata = array(
	                            'id' => $subasta->id,
	                            'unidad_medida' => $unidad_medida,
	                            'titulo_opcional' =>$subasta->titulo_opcional,
	                            'ciudad_entrega_carga' => $ciudad_entrega_carga,
	                            'cantidad' => $subasta->cantidad,
	                            'presupuesto_envio' => $subasta->presupuesto_envio,
	                            'ciudad_recoleccion_carga'=> $ciudad_recoleccion_carga,        
	                            'descripcion_carga'=> $subasta->descripcion_carga,	        
	                            'coordenada_inicial'=> $subasta->coordenada_inicial,	        
	                            'coordenada_final'=> $subasta->coordenada_final,	        
	                            'participants'=> $subasta->participants,
	                           	'fecha_inicio_subasta'=> $subasta->fecha_inicio_subasta->format('Y-m-d'),	        
	                            'hora_inicio_subasta'=> $subasta->hora_inicio_subasta,	        
	                            'fecha_fin_subasta'=> $subasta->fecha_fin_subasta->format('Y-m-d'),	        
	                            'hora_fin_subasta'=> $subasta->hora_fin_subasta	
	                   );
	    
	    echo json_encode($newdata);
	}  
	
	function BindTiposDeCarga(){
	   $clase_carga_each = array();
	   
	   $clase_carga = clase_carga::find('all',array('conditions' => array('1=1')));
	   
	   	foreach($clase_carga as $clase_carga_item){
	        $clase_carga_each[] = $clase_carga_item->attributes();
	    }
	    
	    echo json_encode($clase_carga_each);
	    
	}
	
	function Participe(){
	    
	    date_default_timezone_set("America/Bogota");
		
		$_id = $_POST["_id"];
		$_id_subasta = $_POST["_id_subasta"];
		$_amount = $_POST["_amount"];
		$_metadata = $_POST["_metadata"];
		$response = null;
		$datos = json_decode($_metadata);
		
		if(count($datos)>0){
				
				$tmp_data = $datos;
				usort($tmp_data, function($a, $b) {
		    		return $a->amount > $b->amount ? -1 : 1; 
				});  
				
			  if($_amount >= $tmp_data[count($tmp_data)-1]->amount ){
						$response = "MIN_VALUE";
				}else{
						$datos[] = array(
												"id_user" => $_id,
												"amount" => $_amount
											);
											
					  $subasta = subasta::find($_id_subasta);
					  $subasta->participants = json_encode($datos);
					  $status = $subasta->save();
					  
						if($status){
							$response = "OK";
						}else{
							$response = "FAIL";
						}
				}
			
		}else{
				
				$subasta = subasta::find($_id_subasta);
				$subastaattr = $subasta;
				
				if($_amount >= $subastaattr->presupuesto_envio ){
						$response = "MIN_VALUE";
				}else{
					
						$datos[] = array(
								"id_user" => $_id,
								"amount" => $_amount
							);
							
					  $subasta = subasta::find($_id_subasta);
					  $subasta->participants = json_encode($datos);
					  $status = $subasta->save();
					  
						if($status){
							$response = "OK";
						}else{
							$response = "FAIL";
						}		
						
				}
						
		}
		


		echo $response;
		
	}
	
	function Refresh(){
	    
	    date_default_timezone_set("America/Bogota");
	    
			$_id_subasta = $_POST["_id_subasta"];	
			$subasta = subasta::find($_id_subasta);
			echo json_encode($subasta->attributes());
	}
	
	
	function BindUnidadDeMedida(){
	   $unidad_medida_each = array();
	   
	   $unidad_medida = unidad_medida::find('all',array('conditions' => array('1=1')));
	   
	   foreach($unidad_medida as $unidad_medida_item){
	    $unidad_medida_each[] = $unidad_medida_item->attributes();
	   }
	    
	    echo json_encode($unidad_medida_each);
	    
	}
	
	function BindCiudades($app,$id){
	    
	    $ciudades_each = array();
	   
	    $ciudades = ciudad::find('all',array('conditions' => array('id_departamento=' . $id)));
	   
	   	foreach($ciudades as $ciudades_item){
	        $ciudades_each[] = $ciudades_item->attributes();
	    }
	    
	    echo json_encode($ciudades_each);
	    
	}
	
	
	function BindDepartamentos($app){

	    $departamentos_each = array();
	   
	    $departamentos = departamento::find('all',array('conditions' => array('1=1')));
	   
	   	foreach($departamentos as $departamento_item){
	        $departamentos_each[] = $departamento_item->attributes();
	    }
	    
	   // echo json_encode($departamentos_each);
	    echo json_encode($departamentos_each);
	}	
	
	function FilterSubastaByMap(){
		$id_ciudad = $_POST["id_ciudad"];
		
		$subasta_each = array();
	    $subastas = subasta::find('all',array('conditions' => array('ciudad_entrega_carga=' .$id_ciudad)));
	    
	    foreach($subastas as $subasta_item){
	        $subasta_current_item = $subasta_item->attributes();
	        
	        $model_unidad_medida = unidad_medida::find($subasta_current_item["unidad_medida_id"]);
	        $unidad_medida = $model_unidad_medida->nombre;
	        
	        $model_ciudad_recoleccion = ciudad::find($subasta_current_item["ciudad_recoleccion_carga"]);
	        $model_ciudad_entrega = ciudad::find($subasta_current_item["ciudad_entrega_carga"]);
	   
    	        $model_ciudad_recoleccion_ = $model_ciudad_recoleccion->attributes();
    	        $model_ciudad_entrega_ = $model_ciudad_entrega->attributes();
	        
	        $ciudad_entrega_carga = $model_ciudad_entrega->nombre;
	        $ciudad_recoleccion_carga = $model_ciudad_recoleccion->nombre;
	        
	        $subasta_each[] = array(
	                            'id' => $subasta_item->id,
	                            'unidad_medida' => $unidad_medida,
	                            'titulo_opcional' =>$subasta_item->titulo_opcional,
	                            'ciudad_entrega_carga' => $ciudad_entrega_carga,
	                            'cantidad' => $subasta_item->cantidad,
	                            'presupuesto_envio' => $subasta_item->presupuesto_envio,
	                            'ciudad_recoleccion_carga'=> $ciudad_recoleccion_carga
	                           );
	    }
	    
	    echo json_encode($subasta_each);
	    
	}
	
	function FilterSubastaByPrice(){
		$price = $_POST["range"];
		
		$params = explode(',',$price);
		
		$price_from = $params[0];
		$price_to = $params[1];

		$subasta_each = array();
	    $subastas = subasta::find('all',array('conditions' => "presupuesto_envio BETWEEN $price_from AND $price_to"));
	    
	    foreach($subastas as $subasta_item){
	        $subasta_current_item = $subasta_item->attributes();
	        
	        $model_unidad_medida = unidad_medida::find($subasta_current_item["unidad_medida_id"]);
	        $unidad_medida = $model_unidad_medida->nombre;
	        
	        $model_ciudad_recoleccion = ciudad::find($subasta_current_item["ciudad_recoleccion_carga"]);
	        $model_ciudad_entrega = ciudad::find($subasta_current_item["ciudad_entrega_carga"]);
	   
    	        $model_ciudad_recoleccion_ = $model_ciudad_recoleccion->attributes();
    	        $model_ciudad_entrega_ = $model_ciudad_entrega->attributes();
	        
	        $ciudad_entrega_carga = $model_ciudad_entrega->nombre;
	        $ciudad_recoleccion_carga = $model_ciudad_recoleccion->nombre;
	        
	        $subasta_each[] = array(
	                            'id' => $subasta_item->id,
	                            'unidad_medida' => $unidad_medida,
	                            'titulo_opcional' =>$subasta_item->titulo_opcional,
	                            'ciudad_entrega_carga' => $ciudad_entrega_carga,
	                            'cantidad' => $subasta_item->cantidad,
	                            'presupuesto_envio' => $subasta_item->presupuesto_envio,
	                            'ciudad_recoleccion_carga'=> $ciudad_recoleccion_carga
	                           );
	    }
	    
	    echo json_encode($subasta_each);
		
	}	
	
	
	function FilterSubastaByweight(){
		$price = $_POST["range"];
		
		$params = explode(',',$price);
		
		$price_from = $params[0];
		$price_to = $params[1];

		$subasta_each = array();
	    $subastas = subasta::find('all',array('conditions' => "unidad_medida_id = 1 AND cantidad BETWEEN $price_from AND $price_to"));
	    
	    foreach($subastas as $subasta_item){
	        $subasta_current_item = $subasta_item->attributes();
	        
	        $model_unidad_medida = unidad_medida::find($subasta_current_item["unidad_medida_id"]);
	        $unidad_medida = $model_unidad_medida->nombre;
	        
	        $model_ciudad_recoleccion = ciudad::find($subasta_current_item["ciudad_recoleccion_carga"]);
	        $model_ciudad_entrega = ciudad::find($subasta_current_item["ciudad_entrega_carga"]);
	   
    	        $model_ciudad_recoleccion_ = $model_ciudad_recoleccion->attributes();
    	        $model_ciudad_entrega_ = $model_ciudad_entrega->attributes();
	        
	        $ciudad_entrega_carga = $model_ciudad_entrega->nombre;
	        $ciudad_recoleccion_carga = $model_ciudad_recoleccion->nombre;
	        
	        $subasta_each[] = array(
	                            'id' => $subasta_item->id,
	                            'unidad_medida' => $unidad_medida,
	                            'titulo_opcional' =>$subasta_item->titulo_opcional,
	                            'ciudad_entrega_carga' => $ciudad_entrega_carga,
	                            'cantidad' => $subasta_item->cantidad,
	                            'presupuesto_envio' => $subasta_item->presupuesto_envio,
	                            'ciudad_recoleccion_carga'=> $ciudad_recoleccion_carga
	                           );
	    }
	    
	    echo json_encode($subasta_each);
		
	}	
	
	function FilterSubastaByvolume(){
		$price = $_POST["range"];
		
		$params = explode(',',$price);
		
		$price_from = $params[0];
		$price_to = $params[1];

		$subasta_each = array();
	    $subastas = subasta::find('all',array('conditions' => "unidad_medida_id = 2 AND cantidad BETWEEN $price_from AND $price_to"));
	    
	    foreach($subastas as $subasta_item){
	        $subasta_current_item = $subasta_item->attributes();
	        
	        $model_unidad_medida = unidad_medida::find($subasta_current_item["unidad_medida_id"]);
	        $unidad_medida = $model_unidad_medida->nombre;
	        
	        $model_ciudad_recoleccion = ciudad::find($subasta_current_item["ciudad_recoleccion_carga"]);
	        $model_ciudad_entrega = ciudad::find($subasta_current_item["ciudad_entrega_carga"]);
	   
    	        $model_ciudad_recoleccion_ = $model_ciudad_recoleccion->attributes();
    	        $model_ciudad_entrega_ = $model_ciudad_entrega->attributes();
	        
	        $ciudad_entrega_carga = $model_ciudad_entrega->nombre;
	        $ciudad_recoleccion_carga = $model_ciudad_recoleccion->nombre;
	        
	        $subasta_each[] = array(
	                            'id' => $subasta_item->id,
	                            'unidad_medida' => $unidad_medida,
	                            'titulo_opcional' =>$subasta_item->titulo_opcional,
	                            'ciudad_entrega_carga' => $ciudad_entrega_carga,
	                            'cantidad' => $subasta_item->cantidad,
	                            'presupuesto_envio' => $subasta_item->presupuesto_envio,
	                            'ciudad_recoleccion_carga'=> $ciudad_recoleccion_carga
	                           );
	    }
	    
	    echo json_encode($subasta_each);
		
	}
	
	
	function Cron(){
		echo "hello";
	}
	
}