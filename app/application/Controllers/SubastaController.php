<?php

class SubastaController{
	
	
	function CreateSubasta($app){
	    
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
        $hora_creacion = $_POST["hora_creacion"];
        $id_adjunto_parafiscal = $_POST["id_adjunto_parafiscal"];				
        $id_certificado_bancario = $_POST["id_certificado_bancario"];				
        $id_rut = $_POST["id_rut"];
        
        $response = null;
        
        $data  = subasta::create(
               array(
                        'id' => $id,
                        'estado'  => $estado,
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
                        'fecha_creacion' => "2015-04-30",
                        'hora_creacion' => $hora_creacion,
                        'id_adjunto_parafiscal' => $id_adjunto_parafiscal,
                        'id_certificado_bancario' => $id_certificado_bancario,
                        )
                );
        
        $response  = array(
                    'status' => "OK"
                    );
                    
        echo json_encode($response);
	}
	
	function ListSubasta($app){
	    
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
	
	function FindSubasta($app){
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
	                            'coordenada_final'=> $subasta->coordenada_final	        
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
	
}