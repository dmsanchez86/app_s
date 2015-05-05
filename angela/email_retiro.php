<?php
	
	$opcion = $_POST['Opcion'];
	$texto = $_POST['Texto'];

	$to = "gaviria4502@hotmail.com";
	$subject = "Retiro de Subastra";
	if($texto==''){
		$txt = "Motivo del retiro: ".$opcion;	
	}
	else {
		$txt = "Motivo del retiro: ".$opcion."\n".
		"Observación: ".$texto;
	}

	mail($to, $subject, $txt);

	echo "Gracias por tu tiempo!";

?>