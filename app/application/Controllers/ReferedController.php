<?php

class ReferedController{
    
    function generateRefferedLink($app){
        
        $myid = $_POST["id"];
        $algoritm = "12031_" . $myid . "_" . ( $myid + ( ( 1000 * 3 + 100 ) * 2 + 2) * 6 ) . "_2398_"; 
        $link = "http://subastra.com/415111911007422/index.html#rp?rh=$algoritm";

        $response = array(
                            'status' => "OK",
                            'link' => $link,
                            'embed' => "<a href='$link'><img src='http://subastra.com/415111911007422/banners-img/1.png'></a>"
                         );

        echo json_encode($response);
    }	
    function getReferedData($app){
    	
    	$myid = $_POST["id_reffered"];//12031_15_37227_2398_
        
        try{

            $data = explode("_", $myid);
            $id_r = $data[1];

            $user = Usuario::find($id_r);
            $natts = $user->attributes();
            
            $atts = array(
                'status' => "OK",
                'data' => $natts
            );

            echo json_encode($atts);
        
        }catch(ActiveRecord\RecordNotFound $e){

            $atts = array(
                'status' => "FAIL",
                'data' => false
            );

            echo json_encode($atts);
        }

        
        
	}

}
