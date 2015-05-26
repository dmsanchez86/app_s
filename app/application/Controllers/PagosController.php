<?php

class PagosController{

	function LoadAmmountVal(){
		$creditos = configuracion_creditos::find(1);
		$valor_credito = $creditos->precio_por_credito;

		$response = array(
			'status' => "OK",
			'value' => $valor_credito
			);

		echo json_encode($response);
	}

	function LoadCreditPerUser(){

		$usuario = $_POST['user'];
		$response = null;

		$creditos_existentes = credito::find('all',array('conditions' => array('id_usuario='.$usuario)));

		if(count($creditos_existentes) > 0){
			
			$datos_creditos = $creditos_existentes[0]->attributes();

			$response = array(
				'status' => "OK",
				'value' => $datos_creditos['cantidad']
				);

		}else{

			$response = array(
				'status' => "OK",
				'value' => 0
				);

		}

		echo json_encode($response);

	}
    
    function RealizarPagoConfiguracion($app){
        
        $usuario = $_POST['user'];
        $valor = $_POST['valor'];
        //buscar el valor del credito
        $creditos = configuracion_creditos::find(1);
        $valor_credito = $creditos->precio_por_credito;
        //calcular cuantos creditos salen del valor ingresado
        $tcreditos = (int)($valor / $valor_credito);
        //calcular si existe algun sobrante del valor ingresado
        $sobrante = $valor % $valor_credito;
        
        //cargar informacion si el usuarios ya tiene datos ingresados
        $creditos_existentes = credito::find('all',array('conditions' => array('id_usuario='.$usuario)));
        //si el usuario ya tiene creditos se actualiza la informacion de la cantidad
        if(count($creditos_existentes) > 0){
            $datos_creditos = $creditos_existentes[0]->attributes();
            $total = $tcreditos + $datos_creditos['cantidad'];
            $modificar = credito::find($datos_creditos['id']);
            $modificar->cantidad=$total;
            $modificar->save();
        }
        else{ //si el usuario no tiene creditos se registra la informacion.
            $data  = credito::create(
               array(
                    'id' => null,
                    'id_usuario'  => $usuario,
                    'cantidad'  => $tcreditos,
                    'configuracion_creditos_id' => 1
                )
            );
        }
        //si genera algun sobrante se saca un mensaje que informe al usuario
        if($sobrante>0){
            echo "Transacción exitosa, tienes un sobrante de $".$sobrante;
        }

    }

}
