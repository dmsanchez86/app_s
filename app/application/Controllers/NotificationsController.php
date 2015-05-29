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
	    echo "la subasta con id $id cerro";
	}
	
}