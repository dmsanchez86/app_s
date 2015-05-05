<?php
	/*** CRON 
	cd /home/subastrsds4/public_html/angela/cron_acceso/; php main.php
	***/

	/*** conexion a la base de datos **/
	$link = mysql_connect('localhost', 'subastrs_root', '18005021aa11')
    or die('No se pudo conectar: ' . mysql_error());
		mysql_select_db('subastrs_aplication') 
	or die('No se pudo seleccionar la base de datos');

	/*** consultar las frecuencias colocadas para envio de mensajes ***/
	$query2 = 'SELECT id, frecuencia FROM cron_frecuencia';
		$result_fr = mysql_query($query2) 
	or die('Consulta fallida: ' . mysql_error());
	$frecuencia=array();
	while ($frec = mysql_fetch_array($result_fr, MYSQL_ASSOC)) {
		$frecuencia[] = $frec["frecuencia"];
	}

	/*** consultar las fecha del ultimo acceso de cada usuario de la base de datos ***/
	$query = "SELECT id, ultimo_acceso, estado_registro FROM usuario WHERE estado_registro='2' OR estado_registro='3'";
		$result = mysql_query($query) 
	or die('Consulta fallida: ' . mysql_error());

	/*** fecha actual ***/
	date_default_timezone_set('America/Bogota');
	$date = new DateTime();
	
	/*** recorrer cada usuario con la fecha del ultimo acceso ***/
	while ($datos = mysql_fetch_array($result, MYSQL_ASSOC)) {
		$date2 = new DateTime($datos["ultimo_acceso"]); //fecha ultimo acceso del usuario
		$user = $datos["id"]; //id del usuario
		$estado = $datos["estado_registro"]; //estado del registro del usuario
		$email = $datos["correo_electronico"]; //estado del registro del usuario

		//sacar la diferencia de la fecha actual con la fecha del ultimo acceso de cada usuario
		$interval = $date->diff( $date2 );
		$sin_ingreso = $interval->format('%a');
		/*** recorrer las frecuencias establecidas por el administrador ***/
		$x=0;
		while ($x<count($frecuencia)) {
			if($sin_ingreso == $frecuencia[$x]){ 
				/*** si los días sin acceder al sistema son iguaes a una frecuncia, se envia el correo y se insertar en el historial***/
				$query_insert = "INSERT INTO cron_acceso (id_usuario, fecha_notificacion) VALUES ('".$user."', '".date('Y-m-d')."')";
				$inserto = mysql_query($query_insert);

				if($estado == '2'){
					$query4 = "SELECT contenido_html FROM plantilla_email WHERE id='7'";
						$template_02 = mysql_query($query4) 
					or die('Consulta fallida: ' . mysql_error());
					while ($tem = mysql_fetch_array($template_02, MYSQL_ASSOC)) {
						$plantilla_02=$tem["contenido_html"];
					}

					$to = $email;
					$subject = "Hemos notado tu ausencia";
					$txt = $plantilla_02;
					$headers = "MIME-Version: 1.0\r\n";
					$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
					mail($to, $subject, $txt, $headers);
				}
				if ($estado == '3') {
					$query5 = "SELECT contenido_html FROM plantilla_email WHERE id='6'";
						$template_03 = mysql_query($query5) 
					or die('Consulta fallida: ' . mysql_error());
					while ($tem1 = mysql_fetch_array($template_03, MYSQL_ASSOC)) {
						$plantilla_03=$tem1["contenido_html"];
					}

					$to = $email;
					$subject = "Hemos notado tu ausencia";
					$txt = $plantilla_03;
					$headers = "MIME-Version: 1.0\r\n";
					$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
					mail($to, $subject, $txt, $headers);
				}

			}
			$x++;
		}
	}

?>