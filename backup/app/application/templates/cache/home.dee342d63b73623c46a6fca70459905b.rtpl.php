<?php if(!class_exists('raintpl')){exit;}?><!DOCTYPE html>
<html>
<head>
	<title> Gestionalo </title>
	<link rel="stylesheet" type="text/css" href="http://<?php echo $data["url_path"];?>css/styles.css">

	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

	<link href="http://<?php echo $data["url_path"];?>css/jquery.circlify.css" rel="stylesheet" type="text/css" />
	<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
	<script src="http://<?php echo $data["url_path"];?>js/jquery.circliful.min.js"></script>

</head>
<body>
	<div>
            <h1><?php echo $data["url_path"];?></h1>
		<div class="main">
			<div>
				<div class="container-left">
					<header class="container-logotype">
						<div class="container-logotype-2">
							<img src="/opt/lampp/htdocs/gestionalo_pruebas2/application/templates/img/agencia web.png" class="logotype">
						</div>
					</header>

					<div class="container-blue"> 

						<div class="container-avatar">
							<div class="avatar-img">
								<div class="editar"><a href="">editar</a></div>
								<div class="img-avatar">
									<img src="/opt/lampp/htdocs/gestionalo_pruebas2/application/templates/img/oscar.png" class="profile-img">
								</div>
							</div>
							<div class="avatar-name"> 
								<h3 class="name"> Oscar David</h3>
								<h4 class="profesion"> Director de empatia</h4>
							</div>
						</div>

						<div class="container-icon">
							<div class="icon a">
								<p> 23</p> <a href="#"><i class="fa fa-list-ul"></i> </a>
							</div>
							<div class="icon b">
								<p> 13</p> <a href="#"><i class="fa fa-calendar"></i> </a>
							</div>
							<div class="icon c">
								<p> 196</p> <a href=""><i class="fa fa-list-ul"></i> </a>
							</div>
							<div class="icon d">
								<p> 375</p> <a href=""><i class="fa fa-bullhorn"></i> </a>
							</div>
							<div class="icon e">
								<p> 34</p> <a href=""><i class="fa fa-list-ul"></i> </a>
							</div>
						</div>

						<div class="container-search">
							<input type="text" class="search" placeholder="Buscar plan..."><i class="fa fa-search"></i>
						</div>

						<div class="container-planes">
							<div class="menu">
								<a href=""><i class="fa fa-rocket"></i> <strong class="title-work">PLANES</strong></a>
								<ul class="menu-list">
									<li> <i class="fa fa-circle"></i> PLAN NUMERO UNO </li>
									<li><i class="fa fa-circle"></i> PLAN NUMERO DOS </li>
									<li><i class="fa fa-circle"></i> PLAN NUMERO TRES</li>
									<li><i class="fa fa-circle"></i> PLAN NUMERO CUATRO</li>
									<li><i class="fa fa-circle"></i> PLAN NUMERO CINCO</li>
									<li><i class="fa fa-circle"></i> PLAN NUMERO SEIS</li>
									<li><i class="fa fa-circle"></i> PLAN NUMERO SIETE</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="container-rigth">
					<div class="general-notifications"> Zona de notificaciones </div>
					<div class="container-all"> 
						<div class="member"> 
							<h3 class="title-members"> Miembros del plan</h3>
							<div class="profile">
								<div class="photo-friend"><a href="">Juan </a></div>
								<div class="conectado"><a href=""></a></div>
								<div class="photo-profile"> <img src="/opt/lampp/htdocs/gestionalo_pruebas2/application/templates/img/1.png" class="profile-member"></div>
							</div>

							<div class="profile">
								<div class="photo-friend"><a href="">Juan </a></div>
								<div class="conectado"><a href=""></a></div>
								<div class="photo-profile"> <img src="/opt/lampp/htdocs/gestionalo_pruebas2/application/templates/img/2.png" class="profile-member"></div>
							</div>

							<div class="profile">
								<div class="photo-friend"><a href="">Juan </a></div>
								<div class="conectado"><a href=""></a></div>
								<div class="photo-profile"> <img src="/opt/lampp/htdocs/gestionalo_pruebas2/application/templates/img/3.png" class="profile-member"></div>
							</div>

							<div class="profile">
								<div class="photo-friend"><a href="">Juan </a></div>
								<div class="conectado"><a href=""></a></div>
								<div class="photo-profile"> <img src="/opt/lampp/htdocs/gestionalo_pruebas2/application/templates/img/4.png" class="profile-member"></div>
							</div>

							<div class="profile">
								<div class="photo-friend"><a href="">Juan </a></div>
								<div class="conectado"><a href=""></a></div>
								<div class="photo-profile"> <img src="/opt/lampp/htdocs/gestionalo_pruebas2/application/templates/img/5.png" class="profile-member"></div>
							</div>

							<div class="profile">
								<div class="photo-friend"><a href="">Juan </a></div>
								<div class="conectado"><a href=""></a></div>
								<div class="photo-profile"> <img src="/opt/lampp/htdocs/gestionalo_pruebas2/application/templates/img/6.png" class="profile-member"></div>
							</div>

						</div>
						<div> 
							<div class="workspace status">
								<h3 class="title-workspace">Estado del plan</h3>

								<div class="date"> 
									<div class="date-begin"> <h4 class="date-text">Fecha Inicio</h4> <h5>Enero 28 de 2015</h5></div>
									<div class="date-final"><h4 class="date-text">Fecha Inicio</h4> <h5>Enero 28 de 2015</h5></div>
								</div>
								<div id="myStat2" data-dimension="200" data-text="45%" data-info="75 dias restantes" data-width="30" data-fontsize="38" data-percent="45" data-fgcolor="#fff" data-bgcolor="#2969b0" class="circliful"></div>

								<div class="container-progress">
									<div class="divs">
										<div class="punto atrazado"></div>
										<div class="letrapunto">Atrasado</div>
									</div>

									<div class="divs">
										<div class="punto aldia"></div>
										<div class="letrapunto">Al d&iacute;a</div>
									</div>
									<div class="divs">
										<div class="punto adelantado"></div>
										<div class="letrapunto">Adelantado</div>
									</div>
								</div>
							</div>

							<div class="workspace task">
								<h3 class="title-workspace">
									<i class="fa fa-list-ul icon-menu"></i>
									Tareas
								</h3>

								<div></div>
							</div>
							<div class="workspace events">
								<h3 class="title-workspace"> 
									<i class="fa fa-calendar icon-menu"></i>
									Eventos
								</h3>
								<div></div>
							</div>
							<div class="workspace file">
								<h3 class="title-workspace">
									Archivos
								</h3>
								<div></div>
							</div>
						</div>
					</div>

					<div class="container-input">
						<div class="zone-comment">
							<p class="plan-selected">PLAN NUMERO DOS</p>
						</div>
						<div class="zone-comment">
						<input type="text" name="comment" class="comment">
						</div>
						<div class="zone-comment">
							icon
						</div>
					</div>


				</div>


			</div>
		</div>
	</div>
</body>
<script>
	$( document ).ready(function() {
		$('#myStat2').circliful();
	});
</script>

</html>