<?php

class SubastaController{
	
	
	function CreateSubasta($app){
	    
	    $id = null;
        $estado =  1;
        $clase_carga_id =  1;
        $unidad_medida_id =  1;
        $cantidad =  200;
        $descripcion_carga =  "para llevar de un lugar a otro";
        $ciudad_recoleccion_carga = "Manizales";
        $ciudad_entrega_carga =  "Pereira";
        $coordenada_inicial =  "5.067132,-75.51828799999998";
        $coordenada_final =  "5.066041934601881,-75.50811706341551";
        $centroide_inicial = "null";
        $centroide_final =  "null";
        $fecha_entrega_carga =  "12/12/2012";
        $hora_entrega_carga =  "12/12/2012";
        $fecha_recogida_carga =  "12/12/2012";
        $hora_recogida_carga =  "12/12/2012";
        $presupuesto_envio =  4500000;
        $fecha_inicio_subasta = "12/12/2012";
        $hora_inicio_subasta =  "12/12/2012";
        $fecha_fin_subasta =  "12/12/2012";
        $hora_fin_subasta =  "12/12/2012";
        $us_id =  2;
        $valor_final_subasta =  900000;
        $metadata =  "";
        $fecha_creacion =  "12/12/2012";
        $hora_creacion =  2;
        $id_adjunto_parafiscal =  "null";
        $id_certificado_bancario =  "null";
        
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
                        'ciudad_entrega_carga' => $ciudad_entrega_carga,
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
	        $subasta_each[] = $subasta_item->attributes();
	    }
	    
	    echo json_encode($subasta_each);
	}
	
	function FindSubasta($app){
	    $id = $_POST["_id"];
	    $subasta = subasta::find($id);
	    
	    echo json_encode($subasta->attributes());
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
	
	function BindCiudades(){
	    
	}
	
	
	function BindDepartamentos(){
	    
	    
	    $departamentos_each = array();
	   
	    $departamentos = departamento::find('all',array('conditions' => array('1=1')));
	   
	   	foreach($departamentos as $departamento_item){
	        $departamentos_each[] = $departamento_item->attributes();
	    }
	    
	    var_dump($departamentos_each);
	}
	
}