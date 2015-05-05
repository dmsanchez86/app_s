/*
    bc  => pagebeforecreate
    c   => pagecreate
    i   => pageinit
    bs  => pagebeforeshow
    s   => pageshow
    bh  => pagebeforehide
    h   => pagehide
    rm  => pageremove
    bC  => pagebeforechange
    bl  => pagebeforeload
    l   => pageload
*/
var webserviceURL = "https://subastra-liderdesarrollo.c9.io/app/index.php";

var validate = true;

var router=new $.mobile.Router({
  "#login-page": {handler: "loginpage", events: "s" },//pagina principal
  "#page-register": {handler: "register", events: "s" },
  "#page-profile": {handler: "profile", events: "s" },
  "#dialog-history": {handler: "history_dialog", events: "s" },
  "#page-view-profile": {handler: "edit_profile", events: "s" },
  "#page-dudes": {handler: "dudes_page", events: "s" },
  "#page-register-user-admin":{handler: "register_user_admin", events:"s"},
  "#page-all-user-admin":{handler: "all_user_admin", events:"s"},
  "#page-update-user-admin":{handler: "update_user_admin", events:"s"},
  "#page-history":{handler: "history_user_admin", events:"s"},
  "#page-admin-user":{handler: "page_admin_user", events:"s"},
  "#page-admin-menu":{handler: "page_admin_menu", events:"s"},
  "#options-page":{handler: "options_page", events:"s"},
  "#dialog-close-sesion":{handler: "close_sesion_action", events:"s"},
  "#dialog-change-pass":{handler: "dialog_change_pass", events:"s"},
  "#dialog-desactivate":{handler:"account_deactivate",events:"s"},
  "#page-create-subasta":{handler:"page_create_subasta",events:"s"},
  "#dialog-active-account":{handler:"active_account",events:"s"},
  "#page-list-subasta":{handler:"page_list_subasta",events:"s"},
  "#page-subasta":{handler:"page_subasta",events:"s"},
  "#dialog-details":{handler:"dialog_details",events:"s"},
  "#dialog-auntentication-admin":{handler:"dialog_auntentication_admin",events:"s"}
},{
	dialog_auntentication_admin:function(type,match,ui){
		
		$(".enviar_input.sesion_si").click(function(){
			history.back();
		});
	},
	dialog_details:function(type,match,ui){
		var params=router.getParams(match[1]);
		var id=params.id;
		
	  	var $thispage = $("#dialog-details");
		$(".message").hide();
		SUBASTRA.validateSession($thispage);
     	
     	$.ajax({
			type: "POST",
			url: webserviceURL + "/subasta/find",
			data: {
				_id:id	
			},
			success: function (dataCheck) {
				var response = JSON.parse(dataCheck);
			
				var coordenada_inicial = response.coordenada_inicial.split(",");
				var coordenada_final = response.coordenada_final.split(",");
				
				console.log(coordenada_inicial);
				console.log(coordenada_final);
				
				 var markers = [
					            {
					                "title": 'Alibaug',
					                "lat": coordenada_inicial[0],
					                "lng": coordenada_inicial[1],
					                "description": 'Alibaug is a coastal town and a municipal council in Raigad District in the Konkan region of Maharashtra, India.'
					            }
					        ,
					            {
					                "title": 'Mumbai',
					                "lat": coordenada_final[0],
					                "lng": coordenada_final[1],
					                "description": 'Mumbai formerly Bombay, is the capital city of the Indian state of Maharashtra.'
					            }
					    ];
					    
					    
				        var mapOptions = {
				            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
				            zoom: 10,
				            mapTypeId: google.maps.MapTypeId.ROADMAP
				        };
				        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
				        var infoWindow = new google.maps.InfoWindow();
				        var lat_lng = new Array();
				        var latlngbounds = new google.maps.LatLngBounds();
				        for (i = 0; i < markers.length; i++) {
				            var data = markers[i]
				            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
				            lat_lng.push(myLatlng);
				            var marker = new google.maps.Marker({
				                position: myLatlng,
				                map: map,
				                title: data.title
				            });
				            latlngbounds.extend(marker.position);
				            (function (marker, data) {
				                google.maps.event.addListener(marker, "click", function (e) {
				                    infoWindow.setContent(data.description);
				                    infoWindow.open(map, marker);
				                });
				            })(marker, data);
				        }
				        map.setCenter(latlngbounds.getCenter());
				        map.fitBounds(latlngbounds);
				 
				        //***********ROUTING****************//
				 
				        //Initialize the Path Array
				        var path = new google.maps.MVCArray();
				 
				        //Initialize the Direction Service
				        var service = new google.maps.DirectionsService();
				 
				        //Set the Path Stroke Color
				        var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
				 
				        //Loop and Draw Path Route between the Points on MAP
				        for (var i = 0; i < lat_lng.length; i++) {
				            if ((i + 1) < lat_lng.length) {
				                var src = lat_lng[i];
				                var des = lat_lng[i + 1];
				                path.push(src);
				                poly.setPath(path);
				                service.route({
				                    origin: src,
				                    destination: des,
				                    travelMode: google.maps.DirectionsTravelMode.DRIVING
				                }, function (result, status) {
				                    if (status == google.maps.DirectionsStatus.OK) {
				                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
				                            path.push(result.routes[0].overview_path[i]);
				                        }
				                    }
				                });
				            }
				        }
				    
					    
    
			}
		});
		
	},
	page_subasta:function(type,match,ui){
		var params=router.getParams(match[1]);  
	  	var $thispage = $("#page-subasta");
		$(".message").hide();
		SUBASTRA.validateSession($thispage);
	},
	page_list_subasta:function(type,match,ui){
		var params=router.getParams(match[1]);  

	  	var $thispage = $("#page-list-subasta");
		$(".message").hide();
		SUBASTRA.validateSession($thispage);
		
		$.mobile.loading( 'show', {
			text: 'Cargando',
			textVisible: true,
			theme: 'z',
			html: ""
		});
		
		$.ajax({
			type: "POST",
			url: webserviceURL + "/subasta/list",
			data: null,
			success: function (dataCheck) {
				var all_subastas = JSON.parse(dataCheck);
				
				$(".content-each-subasta").empty();
				
				all_subastas.forEach(function(o,i){
			        $(".content-each-subasta").append(tmpl("each_subasta", o));
			    });
    
				$.mobile.loading( 'hide', {
					text: 'Cargando',
					textVisible: true,
					theme: 'z',
					html: ""
				});
			}
		});
		
	},
	dudes_page: function(type,match,ui){
		$(".message").hide();
		
		var $thispage = $("#page-dudes");
		var $message = $(".message-notification[data-message=dudes]");
		
		SUBASTRA.validateSession($thispage);
		
		$("#send-message").unbind("submit").submit(function(e){
			e.preventDefault();
			$message.find(".message[type]").hide();
			var $name = $thispage.find("#name").val();
			var $surname = $thispage.find("#surname").val();
			var $email = $thispage.find("#email").val();
			var $message_field = $thispage.find("#message").val();
			
			var expresion = $name === "" || $email === "" || $message_field ==="";
			
			if(expresion){
				$message.find(".message[type=3]").show();
			}else{
				
				if(!SUBASTRA.validateEmail($email)){
					$message.find(".message[type=4]").show();
				}else{
					
					if($message_field.length>40){
						
						$message.find(".message[type=99]").show();
						$.ajax({
							type: "POST",
							url: webserviceURL + "/faq",
							data: {
								name:$name,
								surname:$surname,
								email:$email,
								message:$message_field
							},
							success: function (dataCheck) {
								var response = JSON.parse(dataCheck);

								$message.find(".message[type]").hide();

								if(response.message=="OK"){
									$message.find(".message[type=2]").show();
								}else{
									$message.find(".message[type=1]").show();
								}

							}
						});
						
					}else{
						$message.find(".message[type=5]").show();
					}
					
					
				}
				
			}
			
			
	  
		});
		
		$('.menu_forwardd').unbind('click').click(function(e) {
		    history.back();
		});
	},
  	edit_profile: function(type,match,ui){
  		
  		/* obtengo los parametros de la vista*/
		var params=router.getParams(match[1]);  
		var $myid = params.iduser;
		var $refer = params.referrer;
		
	  	var $thispage = $("#page-view-profile");
		$(".message").hide();
		SUBASTRA.validateSession($thispage);
		
		var $message = $(".message-notification[data-message=edit_profile]");
		$message.find(".message[type]").hide();

		var $messagetop = $(".message-notification[data-message=edit_profile_top]");
		$messagetop.find(".message[type]").hide();
		
		//SUBASTRA.validateSession($thispage);

	  	$.ajax({
				type: "POST",
				url: webserviceURL + "/finduserbyid",
				data: {
					id:$myid
				},
				success: function (dataCheck) {
					var response = JSON.parse(dataCheck);
					
					if(response.estado_registro==2){
						$thispage.find("div[data-role=footer] div[data-role=navbar]").hide();
					}else if(response.estado_registro==3){
						$thispage.find("div[data-role=footer] div[data-role=navbar]").show();
					}

					var vehiculos = response.vehiculos;
				
					var $container = $thispage.find(".vehicles-items");
						$container.empty();
					
					for(var i=0; i<vehiculos.length; i++){
						var strcontent = tmpl("vehicle_template", vehiculos[i]);
						$container.append( strcontent );
					}
					$thispage.find(".vehicles-items").trigger("create");
					
					$thispage.find("#name-user").val(response.nombre);
					$thispage.find("#surname-user").val(response.apellido);
					$thispage.find("#email-user").val(response.correo_electronico);
					$thispage.find("#nit-user").val(response.nit);
					$thispage.find("#rut-user").val(response.rut);
					$thispage.find(".debug-profile").val(response.rol_id);
					
					//var newDate = new Date(Date.parse(response.fecha_nacimiento.date));
						
					//$thispage.find("#date-user").val(getFormattedDate(newDate));
					$thispage.find("#date-user").val("d");
					$thispage.find("#cc-user").val(response.cedula);
					$thispage.find("#phone-user").val(response.telefono);
					$thispage.find("#cooperativa-name-user").val(response.cooperativa);
					
					$(".block-empresa").hide();
					$(".block-user").hide();
						 
					if(response.rol_id=="3"){
					     $(".block-user").show();  
					}else if(response.rol_id=="2"){
						 $(".block-empresa").show();	  	  
					}
					
					
					 $("input[name=cooperativa-user]").unbind("click").click(function(){
						 $(".cooperativa-name-user").hide();
						 var $valueselected = $(this).val();
							  if($valueselected==="yes"){
								 $(".cooperativa-name-user").show();  
							  }else if($valueselected==="not"){
								  $(".cooperativa-name-user").hide();
							  }
					  });
					  
					  $thispage.find(".add_vehicle").unbind("click").click(function(){
						  var $firstitem = $("#fieldset_template").html();
						  $(".vehicles-items").append($firstitem);
						  $(".vehicles-items").trigger("create");
					  });
					  
					  $thispage.find(".remove_vehicle").unbind("click").click(function(){
						   $(".vehicles-items fieldset").last().remove();
					  });
	  
					    if($refer=="login"){
							$messagetop.find(".message[type=1]").show();
						}
					
					  $("#form-user").unbind("submit").submit(function(e){
						 e.preventDefault();
						  
						 $message.find(".message[type]").hide();
						 $message.find(".message[type=99]").show();
						 	
						 var $name = $(this).find("#name-user").val();
						 var $apellido = $(this).find("#surname-user").val();
						 var $username = $(this).find("#email-user").val();
						 var $phone = $(this).find("#phone-user").val();
						 var $role = "";
							 
						 if(response.rol_id=="3"){
							$role = "transportista";
						 }else if(response.rol_id=="2"){
							$role = "empresa";
						 }
					
						 var $cooperativa = $('input[name=cooperativa-user]:checked', '#form-user').val();
						 var $cooperativa_name = $('.cooperativa-name-user').val();
						 var $nit = $(this).find("#nit-user").val();
						 var $date = $(this).find("#date-user").val();
						 var $cc_user = $(this).find("#cc-user").val();
						  
						  //corregirme porfavor
						 if($date!==""){
							var alldate = $date.split("/");
						  	 $date = alldate[2]+"-"+alldate[0]+"-"+alldate[1];	 
						 }
						  
						 var $items = $(this).find(".vehicles-items fieldset");
						 var vehiclevalidate = true;
						 for(var i=0; i<$items.length; i++){
							var $placa = $items.eq(i).find(".placa-user").val();
							var $model = $items.eq(i).find(".modelo-user").val();
						 	if($placa===""  || $model === ""){
								 vehiclevalidate=false;
							 }
						 }
						 
						  var expresion;
						  if($cooperativa==="yes"){
							  
							  expresion = $name === "" || 
							  			  $apellido === "" || 
							  			  $username === "" || 
							  			  $phone === "" || 
							  			  $cooperativa_name === "" || 
							  			  $date === "" || 
							  			  $role === "" ;
							  
						  }else{
							  
							  expresion = $name === "" || 
											  $apellido === "" || 
											  $username === "" || 
											  $phone === "" || 
											  $date === "" || 
											  $role === "" ;
							  
						  }
						  
						  var $validateFields = false;
						  
						  if($role=="empresa"){
							  if(expresion || $nit === ""){
								  $validateFields = $validateFields;
							  }else{
								  $validateFields = !$validateFields;
						  	  }
						  }else if($role=="transportista"){
							  if(expresion || $cc_user===""){
								  $validateFields = $validateFields;
							  }else{
								  $validateFields = !$validateFields;	  
							  }	  
						  }
						  
						  if($validateFields && vehiclevalidate){
							  
							  $message.find(".message[type=99]").show();
							  
							  var $items = $(this).find(".vehicles-items fieldset");
							  var vehicledata = new Array();
							  for(var i=0; i<$items.length; i++){
								var $id = $items.eq(i).attr("data-id");
								var $placa = $items.eq(i).find(".placa-user").val();
								var $model = $items.eq(i).find(".modelo-user").val();
								var $observaciones = $items.eq(i).find(".message-user").val();
									vehicledata.push({
										placa:$placa,
										observaciones:$observaciones,
										modelo:$model,
										id:$id
									});
							  }
								
							  $.ajax({
									type: "POST",
									url: webserviceURL + "/updateuser",
									data: {
										 id : $myid,
										 name : $name,
										 apellido : $apellido,
										 username : $username,
										 phone : $phone,
										 role : $role,
										 nit : $nit,
										 date : $date,
										 cc_user : $cc_user,
										 cooperativa : $cooperativa_name,
										 vehicles: JSON.stringify(vehicledata)
									},
									success: function (dataCheck) {
										var response = JSON.parse(dataCheck);
										$message.find(".message[type]").hide();
										
										if(response.message=="OK"){
											 $message.find(".message[type=2]").show();
										}else{
											$message.find(".message[type=3]").show();
										}
									}
								});
				
						  }else{
						  	$message.find(".message[type]").hide();
							$message.find(".message[type=1]").show();
						  }
					  });
				  
				  
				}
			});
			
		$('#cancel-user').click(function(e) {
		    history.back();
		});
	  
  },
    loginpage: function(type,match,ui){
	
	  //oculto todos los mensajes
	  $(".message").hide();
	  
	  // reseteo el fomrulario
      $("#login_container")[0].reset();
      
      var $thispage = $("#login-page");
      
      SUBASTRA.validateSession($thispage);
	  
	  /*
	  	activo el evento submit del formulario lo quito con unbind porque como se vuelve a llamar 				entonces lo ejecuta 2 veces
	  */
	  $("#login_container").unbind("submit").submit(function(e){
	  	e.preventDefault();
		  var $username = $(this).find("#name").val();
		  var $password = $(this).find("#pass").val();
		  var $message = $(".message-notification[data-message=login]");
		  $message.find(".message[type]").hide();
		  	  
		  if($username === "" || $password  === ""){
			  $message.find(".message[type=3]").show();
		  }else{
			  	
			  $message.find(".message[type=99]").show();
				$.ajax({
					type: "POST",
					url: webserviceURL + "/login",
					data: {
						email:$username,
						pass:$password
					},
					success: function (dataCheck) {
						$message.find(".message[type]").hide();
						var response = JSON.parse(dataCheck);
 						
 						console.log(response);
 						
						if(response.message=="FAIL"){
							$message.find(".message[type=1]").show();
						}else if(response.message=="OK"){
										
							var $userId = response.userdata.id;
							var response_uri = response.redirect_uri;
							var rol_id = response.userdata.rol_id;
							var estado_registro = response.userdata.estado_registro;
							var role_permisions = response.userdata.permisions;
							
							if(estado_registro==5){
								
								 $.mobile.changePage( "#dialog-auntentication-admin", { role: "dialog" } );
								 
							}else{
								
								SUBASTRA.setCookie("myid",$userId,9999999);
								SUBASTRA.setCookie("rol_id",rol_id,9999999);
								SUBASTRA.setCookie("estado_registro",estado_registro,9999999);
								SUBASTRA.setCookie("role_permisions",role_permisions,9999999);
								SUBASTRA.setCookie("response_uri",response_uri,9999999);
								
								$.mobile.changePage( response_uri + "?referrer=login&iduser="+$userId, {
								  transition: "slide",
								  reverse: false
								});
									
							}
							
						}else if(response.message=="CREDENTIALS_INCORRECT"){
							$message.find(".message[type=2]").show();
						}else if(response.message == "DEACTIVATE"){
							$message.find(".message[type=6]").show();
						}

					}
				});
		  }
		  	
	  });
	  
  },
    history_dialog: function(type,match,ui){
	  $(".message").hide();
	  
	var params=router.getParams(match[1]);  
	var $myid = params.iduser;
	  
	$.mobile.loading( 'show', {
		text: '',
		textVisible: true,
		theme: 'z',
		html: ""
	});

	  $.ajax({
			type: "GET",
			url: webserviceURL + "/loadhistory/" + $myid,
			data: null,
			success: function (dataCheck) {
				var history = JSON.parse(dataCheck);
				var $container = $("#history-list");
					$container.empty();
				
				for(var i=0; i<history.length; i++){
					$container.append( tmpl("history_tmpl_item", history[i]) );
				}
				
				$container.find('li[data-role=collapsible]').collapsible();  
				
			$.mobile.loading( 'hide', {
				text: '',
				textVisible: true,
				theme: 'z',
				html: ""
			});

				
			}
		});
	  
  },
    profile: function(type,match,ui){
	  //
	var $this_container = $("#page-profile");
    $(".message").hide();
	SUBASTRA.validateSession($this_container);
	
	var params=router.getParams(match[1]);  
	var $myid = params.iduser;
	var $message = $(".message-notification[data-message=profile]");
	
	$(".link_profile").unbind("click").click(function(e){
		e.preventDefault();
		$.mobile.changePage( $(this).attr("href") + "?iduser="+$myid );
	});
	  
	$(".button").unbind("click").click(function(){
      $.mobile.changePage( "#dialog-history?iduser="+$myid, { role: "dialog" } );
    });
	  
	$message.find(".message[type]").hide();
	  $.ajax({
				type: "POST",
				url: webserviceURL + "/finduserbyid",
				data: {
					id:$myid
				},
				success: function (dataCheck) {
					var response = JSON.parse(dataCheck);
					
					var $label_name = $("span[react-type][id='name-user']");
					if(response.nombre==""){
						$label_name.text("Transportista #" + response.id);
					}else{
						$label_name.text(response.nombre);
					}
					
						 $("a[data-bind-event='profile']").click(function(e){
							e.preventDefault();

							$.mobile.changePage( "#options-page?iduser="+$userId, {
												  transition: "slide",
												  reverse: false
												});

						});
					
					if(response.estado_registro==2){
						$message.find(".message[type=1]").show();
						$this_container.find("div[data-role=footer] div[data-role=navbar]").hide();
					}else if(response.estado_registro==3){
						$this_container.find("div[data-role=footer] div[data-role=navbar]").show();
					}
				}
			});
	  
  },
    register: function(type,match,ui){
  	$(".message").hide();
  	
  	var $thispage = $("#page-register");
  	
  	SUBASTRA.validateSession($thispage);
  		
	    $("#register_container")[0].reset();
	    $("#register_container").unbind("submit").submit(function(e){

		  e.preventDefault();
		  var $el = this;
		  var $username = $(this).find("#name").val();
		  var $password = $(this).find("#pass").val();
		  var $confirm = $(this).find("#conf_pass").val();
		  var $message = $(".message-notification[data-message=register]");
		  var $role = $('input[name=role-user]:checked',"#register_container").val();
		  
		  $message.find(".message[type]").hide();
		  if($username === "" || $password  === "" || $confirm  === ""){
			  $message.find(".message[type=1]").show();
		  }else{
			  if(!SUBASTRA.validateEmail($username)){
			  	$message.find(".message[type=3]").show();
			  }else{
				  if($password!=$confirm){
					  $message.find(".message[type=2]").show();
				  }else{
					  if($password.length<6 && $confirm.length<6){
					  	$message.find(".message[type=4]").show();
					  }else{
						
						  $message.find(".message[type=99]").show();
						  $.ajax({
								type: "POST",
								url: webserviceURL + "/registerbasic",
								data: {
									email:$username,
									pass:$password,
									role:$role
								},
								success: function (dataCheck) {
									
									$message.find(".message[type]").hide();
									var response = JSON.parse(dataCheck);
									console.log(response);
									if(response.status==2){
										$message.find(".message[type=8]").show();
									}else if(response.status==1){
										$message.find(".message[type=5]").show();
										$($el)[0].reset();
									}
								}
							});
						  
					  }
				  }
			  }
		  }
		  
	  });
	  
  },
    register_user_admin: function(type,match,ui){
	var params=router.getParams(match[1]);  

	try{
		var $referrer = params.referrer;
	}catch(e){
		var $referrer = "#page-register-user-admin";
		console.log("params is undefined");
	}
		
   	var $thispage = $("#page-register-user-admin");
  	SUBASTRA.validateSession($thispage);
  	
	  	$(".option_link").unbind("click").click(function(e){
			$.mobile.changePage( "#options-page?referrer="+$thispage.attr("id"), {
					  transition: "slide",
					  reverse: false
					});
		});
		
        $("#form-new-user").unbind("submit").submit(function(e){
	       e.preventDefault();
	       
	       var nombre = $('#name-user-a').val();
	       var apellido = $('#surname-user-a').val();
	       var correo = $('#email-user-a').val();
	       var telefono  = $('#phone-user-a').val();
	       var rol = $('#role-user-a').val();
	       var cedula = $('#cc-user-a').val();
	       var fecha = $('#date-user-a').val();
	       var cooperativa = $('#cooperativa-name-user-a').val();
	       var contrasenia = $('#contrasenia-user-a').val();
	       
	       if(nombre == "" || apellido == "" || correo == "" || telefono == "" || cedula == "" || fecha == "" || contrasenia ==""){
	           alert("No pueden haber campos vacios"); 
	       }else{
	           $.ajax({
                    type: "POST",
                    url: webserviceURL + "/register/new/user",
                    data: {
                        nombre      : nombre,
                        apellido    : apellido,
                        correo      : correo,
                        telefono    : telefono,
                        rol         : rol,
                        cedula      : cedula,
                        fecha       : fecha,
                        coop        : cooperativa,
                        contrasenia : contrasenia
                    },
                    success: function (dataCheck) {
                        var respuesta = JSON.parse(dataCheck);
                        console.log(respuesta);
                        alert("Mensaje: "+respuesta.message+"\nEstatus: "+respuesta.status);
                    }
                });
	       }
	    });
    },
    all_user_admin:function(type,match,ui){

    var params=router.getParams(match[1]);  

	try{
		var $referrer = params.referrer;
	}catch(e){
		var $referrer = "#page-all-user-admin";
		console.log("params is undefined");
	}
	
    var $thispage = $("#page-all-user-admin");
  	SUBASTRA.validateSession($thispage);
  	
	$(".option_link").unbind("click").click(function(e){
		$.mobile.changePage( "#options-page?referrer="+$thispage.attr("id"), {
		  transition: "slide",
		  reverse: false
		});
	});
	
	$.mobile.loading( 'show', {
		text: 'Cargando',
		textVisible: true,
		theme: 'z',
		html: ""
	});
			
        $.ajax({
            type: "POST",
            url: webserviceURL + "/users",
            data: null,
            success: function (dataCheck) {
                var respuesta = JSON.parse(dataCheck);

                mostrarUsuarios(respuesta);
            }
        });
    },
    update_user_admin: function(type,match,ui){
    
    var $thispage = $("#page-update-user-admin");
  	SUBASTRA.validateSession($thispage);
  	
    	var $message = $(".message-notification[data-message=edit_profile]");
		$message.find(".message[type]").hide();
		  
        $('#form_search').unbind('submit').submit(function(e){
            e.preventDefault();
            filter_user();
        });
        $("#form-update-user").unbind('submit').submit(function(e){
        	e.preventDefault();
        	var id = $('#user-id-a').val();
            var nombre = $('#name-user-u').val();
            var apellido = $('#surname-user-u').val();
            var correo = $('#email-user-u').val();
            var cedula = $('#cc-user-u').val();
            var fecha_nacimiento = $('#date-user-u').val();
            var cooperativa = $('#cooperativa-name-user-u').val();
            var nivel = $('#nivel-user-u').val();
            var telefono = $('#phone-user-u').val();
            
            if(nombre == "" || apellido == "" || telefono == "" || fecha_nacimiento == "" || cooperativa == ""){
            	alert('Hay campos vacios');
            }else{
            	console.log(id);
            	$.ajax({
                    type: "POST",
                    url: webserviceURL + "/update/user/"+id,
                    data: {
                    	id			: id,
                    	nombre 		: nombre,
                    	apellido	: apellido,
                    	correo		: correo,
                    	cedula 		: cedula,
                    	fecha_nacimiento: fecha_nacimiento,
                    	cooperativa	: cooperativa,
                    	nivel		: nivel,
                    	telefono	: telefono
                    },
                    success: function (dataCheck) {
                         var respuesta = dataCheck;
                         limpiar();
						if(respuesta=="OK"){
							 $message.find(".message[type=2]").show();
						}else{
							$message.find(".message[type=3]").show();
						}
                    }
                });
            }
        });
        $('#cedula').keyup(function(e){
            var parametro = $(this).val();
            if(e.keyCode == 13){
                filter_user();
            }else{
                $.ajax({
                    type: "POST",
                    url: webserviceURL + "/search_user",
                    data: { parameter: parametro },
                    success: function (dataCheck) {
                        var respuesta = JSON.parse(dataCheck);
                        // var output = "<li><small><small>";
                        // try{
                        //     if(parametro == ''){
                        //         $('.result_names').find('ul').html('');
                        //     }
                        //     output += "Cédula <b>"+respuesta[0].cedula+"</b> / Nombre <b>"+respuesta[0].nombre+"</b> / Correo <b>"+respuesta[0].correo_electronico+"</b></small></small></li>";
                        //     $('.result_names').find('ul').html(output);
                        // }catch(e){
                        //     $('.result_names').find('ul').html('');
                        // }
                    }
                });
            }
        });
        $('#delete-user-registered').click(function(){
        	var id = $('#user-id-a').val();
        	$.ajax({
	            type: "POST",
	            url: webserviceURL + "/delete/user/"+id,
	            data: null,
	            success: function (dataCheck) {
	                var respuesta = dataCheck;
	                limpiar();
	                if(respuesta=="OK"){
						 $message.find(".message[type=6]").show();
					}else{
						$message.find(".message[type=3]").show();
					}
	            }
	        });
        });
    },
    history_user_admin: function(type,match,ui){
    var params=router.getParams(match[1]);  
    
	try{
		var $referrer = params.referrer;
	}catch(e){
		var $referrer = "#page-history";
		console.log("params is undefined");
	}
	
	$(".option_link").unbind("click").click(function(e){
		$.mobile.changePage( "#options-page?referrer="+$thispage.attr("id"), {
		  transition: "slide",
		  reverse: false
		});
	});
	
	var $thispage = $("#page-history");
	SUBASTRA.validateSession($thispage);
		
    	var select = $('#select-history');
    	// $(".results-history .results-list").empty();
    	select.empty();
    	$.ajax({
            type: "POST",
            url: webserviceURL + "/users",
            data: null,
            success: function (dataCheck) {
                var respuesta = JSON.parse(dataCheck);
                console.log(respuesta);
                var salida = "";
                for(var i = 0; i < respuesta.length; i++){
                	salida += "<option value='"+respuesta[i].id+"'>"+respuesta[i].nombre+" (" + respuesta[i].correo_electronico + ") </option>";
                }
                select.append(salida);
            }
        });
        
        select.change(function(){
        	var id = $(this).val();
        	
        	$.mobile.loading( 'show', {
				text: 'Cargando',
				textVisible: true,
				theme: 'z',
				html: ""
			});
			
        	$.ajax({
	            type: "POST",
	            url: webserviceURL + "/history/user/"+id,
	            data: null,
	            success: function (dataCheck) {
	                var respuesta = JSON.parse(dataCheck);

	                $('.results-list').empty();
	                
	                respuesta.forEach(function(o,i){
	                	$('.results-list').append(tmpl("history_user_admin",o));
	                });
	                
	                $.mobile.loading( 'hide', {
						text: 'Cargando',
						textVisible: true,
						theme: 'z',
						html: ""
					});
			
	                $('.results-list').trigger("create");
	            }
	        });
        });
    },
    page_admin_menu: function(type,match,ui){
    
		var params=router.getParams(match[1]); 
		
		try{
			var $referrer = params.referrer;
		}catch(e){
			var $referrer = "#page-admin-menu";
			console.log("params is undefined");
		}
		
		var $thispage = $("#page-admin-menu");
		SUBASTRA.validateSession($thispage);
		
		$(".option_link").unbind("click").click(function(e){
			$.mobile.changePage( "#options-page?referrer="+$thispage.attr("id"), {
					  transition: "slide",
					  reverse: false
					});
		});
		
    },
    page_admin_user: function(type,match,ui){
		var params=router.getParams(match[1]);  
		
		try{
			var $referrer = params.referrer;
		}catch(e){
			var $referrer = "#page-admin-user";
			console.log("params is undefined");
		}
		
		var $thispage = $("#page-admin-user");
		SUBASTRA.validateSession($thispage);
		
		var breadcrumblinks = "";
		if($referrer==""){
			breadcrumblinks = "";
		}else{
			breadcrumblinks+= $referrer;
		}
		    	
		$(".option_link").unbind("click").click(function(e){
			$.mobile.changePage( "#options-page?referrer="+$thispage.attr("id"), {
					  transition: "slide",
					  reverse: false
					});
		});
    },
    options_page: function(type,match,ui){
    	var params=router.getParams(match[1]);  
		
		try{
			var $referrer = params.referrer;
		}catch(e){
			var $referrer = "#options-page";
			console.log("params is undefined");
		}
		
		var $thispage = $("#options-page");
		SUBASTRA.validateSession($thispage);
		
		//link de cerrar sesin
		$(".options_links.close_sesion").unbind("click").click(function(e){
			e.preventDefault();
      		$.mobile.changePage( "#dialog-close-sesion", { role: "dialog" } );
    	});
		
		//link de cambiar contraseña
		$(".options_links.change_pass").unbind("click").click(function(e){
			e.preventDefault();
      		$.mobile.changePage( "#dialog-change-pass", { role: "dialog" } );
    	});
    	
		//link de ayuda
		$(".options_links.page_help").unbind("click").click(function(e){
			e.preventDefault();
      		$.mobile.changePage( "#page-dudes");
    	});  
    	
		//link de reportar una ayuda
		$(".options_links.report_issue").unbind("click").click(function(e){
			e.preventDefault();
      		$.mobile.changePage( "#page-dudes");
    	});
    	
		//link de editar perfil
		$(".options_links.edit_profile").unbind("click").click(function(e){
			e.preventDefault();
			var $myid = SUBASTRA.getCookie("myid");
      		$.mobile.changePage( "#page-view-profile?iduser=" + $myid);
    	});
    	
    	//link de cerrar sesión
    	$thispage.find(".back_link").unbind("click").click(function(e){
    		e.preventDefault();
    		if($referrer=="" || $referrer == undefined || $referrer == null ){
				$.mobile.changePage( "#login-page");
			}else{
				$.mobile.changePage( "#" + $referrer);
			}
		});
		
		$('.menu_forward').unbind('click').click(function(e) {
		    history.back();
		});
		
    },
    close_sesion_action: function(type,match,ui){
		var $thispage = $("#options-page");
		SUBASTRA.validateSession($thispage);
		
		//link de cerrar sesin
		$(".enviar_input.sesion_si").unbind("click").click(function(e){
			e.preventDefault();
			SUBASTRA.deleteAndClearCookies("myid");
			SUBASTRA.deleteAndClearCookies("rol_id");
			SUBASTRA.deleteAndClearCookies("estado_registro");
			SUBASTRA.deleteAndClearCookies("role_permisions");
			
			$.mobile.loading( 'show', {
				text: 'Cerrando Sesiòn',
				textVisible: true,
				theme: 'z',
				html: ""
			});
			
			setTimeout(function(){
				$.mobile.changePage( "#login-page");	
			}, 2000);
			
    	
		});
		
		$('.enviar_input.sesion_no').click(function(e) {
		    history.back();
		});
    	
    },
    dialog_change_pass:function(type,match,ui){ 
    	
    var $thispage = $("#dialog-change-pass");
   	var $message = $(".message-notification[data-message=change_pass]");
   	$thispage.find(".form_change_pass")[0].reset();
	
	$("#cancel_btn").unbind("click").click(function(e){
		e.preventDefault();
		$("#dialog-change-pass").dialog('close');	
	});
	
	$(".enviar_input.submit_btn").unbind("click").click(function(e){
	  $message.find(".message[type]").hide();
	  var $old_password = $thispage.find("#old_pass").val();
	  var $password = $thispage.find("#new_pass").val();
	  var $confirm = $thispage.find("#re_new_pass").val();
	  if($old_password === "" || $password  === "" || $confirm  === ""){
	  	$message.find(".message[type=2]").show();
	  }else{
	  	if($password!==$confirm){
	  		$message.find(".message[type=1]").show();	
	  	}else{
	  		
	  		var $myid = SUBASTRA.getCookie("myid");
	  		
	  		$.mobile.loading( 'show', {
				text: 'foo',
				textVisible: true,
				theme: 'z',
				html: ""
			});
			
	  		$.ajax({
				type: "POST",
				url: webserviceURL + "/finduserbyid",
				data: {
					id:$myid
				},
				success: function (dataCheck) {
					var $userdata = JSON.parse(dataCheck);
					var $new_pass = $userdata.contrasenia;
					
					if($old_password!=$new_pass){
						$message.find(".message[type=3]").show();
						
						
						$.mobile.loading( 'hide', {
							text: 'Cargando..',
							textVisible: true,
							theme: 'z',
							html: ""
						});
						
					}else{
						
						$.ajax({
							type: "POST",
							url: webserviceURL + "/change_pass",
							data: {
								id:$myid,
								new_pass:$new_pass
							},
							success: function (dataCheck) {
								
								var response = JSON.parse(dataCheck);
								
								$.mobile.loading( 'hide', {
									text: 'Cargando..',
									textVisible: true,
									theme: 'z',
									html: ""
								});
									
								if(response.status=="OK"){
									$thispage.find(".form_change_pass")[0].reset();
									$message.find(".message[type=5]").show();
								}else{
									$message.find(".message[type=4]").show();
								}	
							}
						});
						
					}
				}		
			});
			
	  	}
	  }
	});
	
	$(".enviar_input.cancel_btn").unbind("click").click(function(e){
		history.back();
	});
    	
    },
    account_deactivate:function(type,match,ui){
    	var id = SUBASTRA.getCookie('myid');
    	
    	$('#send_deactivate').click(function(e) {
    	    if($('input[name="radio-choice-1"]:checked').val() == "si"){
	    		$.ajax({
	    			type 	: "POST",
	    			url		: webserviceURL+"/deactivate/user/"+id,
	    			data	: null,
	    			success: function(response){
	    				console.log(response);
	    				if(response == "si"){
							SUBASTRA.deleteAndClearCookies("myid");
							SUBASTRA.deleteAndClearCookies("rol_id");
							SUBASTRA.deleteAndClearCookies("estado_registro");
							SUBASTRA.deleteAndClearCookies("role_permisions");
							
							$.mobile.loading( 'show', {
								text: 'Cerrando Cuenta',
								textVisible: true,
								theme: 'z',
								html: ""
							});
							
							setTimeout(function(){
								$.mobile.changePage( "#login-page");	
							}, 2000);
						}else{
							alert("no se pudo desactivar la cuenta");
						}
	    			}
	    		});
	    	}
    	});
    },
    active_account:function(type,match,ui){
    	$('#submit_btna').click(function(){
    		var email = $('#email_activate').val();
    		var pwd = $('#pwd_activate').val();
    		
    		if(email == "" || pwd == ""){
    			alert("No pueden haber campos vacios");
    		}else{
    			$.ajax({
    				type:"POST",
    				url:webserviceURL+"/active/user",
    				data:{
    					email:email,
    					pwd:pwd
    				},success:function(response){
    					console.log(response);
    					if(response == "si"){
							
							$.mobile.loading( 'show', {
								text: 'Tu cuenta a sido activada de nuevo - Redirigiendo al Inicio',
								textVisible: true,
								theme: 'z',
								html: ""
							});
							
							setTimeout(function(){
								$.mobile.changePage( "#login-page");	
							}, 2000);
						}else{
							alert("no se pudo desactivar la cuenta");
						}
    				}
    			});
    		}
    	});
    },
    page_create_subasta: function(type,match,ui){
    	var params=router.getParams(match[1]);  
		
		try{
			var $referrer = params.referrer;
		}catch(e){
			var $referrer = "#page-create-subasta";
			console.log("params is undefined");
		}
		
		var $thispage = $("#page-create-subasta");
		SUBASTRA.validateSession($thispage);

			

		//cargo los select de tipos de carga
		$(".unidad_medida").empty();
			 $.ajax({
	    			type 	: "POST",
	    			url		: webserviceURL + "/bind/tipos_carga",
	    			data	: null,
	    			success: function(response){
	    				var tipos_de_carga = JSON.parse(response);
	    				
	    				var selector = $("select[data-bind='type_charge']");
	    				
	    				tipos_de_carga.forEach(function(o, i) {
	    					console.log(o);
	    					selector.append(		
	    						$('<option>', { 
						        	value: o.slug,
						        	text : o.nombre 
						    	})
						    );
	    				});
	    					
	    			}
	    		});
		//cargo los select de tipos de carga    
			
		
		//cargo los select de tipos de carga
		$(".unidad_medida").empty();
			 $.ajax({
	    			type 	: "POST",
	    			url		: webserviceURL + "/bind/unidad_medida",
	    			data	: null,
	    			success: function(response){
	    				var unidad_medida = JSON.parse(response);
	    				
	    				var selector = $("select[data-bind='unidad_medida']");
	    				
	    				unidad_medida.forEach(function(o, i) {
	    					console.log(o);
	    					selector.append(		
	    						$('<option>', { 
						        	value: o.id,
						        	text : o.nombre 
						    	})
						    );
	    				});
	    					
	    			}
	    		});
		//cargo los select de tipos de carga        
		
		
		//cargo las ciudades y los departamentos 
			   $(".Departamento").empty();
			   $.ajax({
	    			type 	: "POST",
	    			url		: webserviceURL + "/bind/departamentos",
	    			data	: null,
	    			success: function(response){
	    				var ciudades = JSON.parse(response);
	    				
	    				var selector = $("select[data-bind='state']");
	    				ciudades.forEach(function(o, i) {
	    					console.log(o);
	    					selector.append(		
	    						$('<option>', { 
						        	value: o.id,
						        	text : o.nombre 
						    	})
						    );
	    				});
	    					
	    			}
	    		});
		//cargo las ciudades y los departamentos 
		
		$("#create_subasta_container").submit(function(e){
			e.preventDefault();

			var $clase_carga_id = $(".type_chargue").val();
			var $cantidad = $(".cantidad").val();
			var $unidad_medida = $(".unidad_medida").val();
			var $ciudad = $(".ciudad").val();
			var $direccion = $(".direccion").val();
			var $fecha_entrega = $(".fecha_entrega").val();
			var $fecha_recoleccion = $(".fecha_recoleccion").val();
			var $presupuesto = $(".presupuesto").val();
			var $fecha_inicio_subasta = $(".fecha_inicio_subasta").val();

			$.ajax({
	    			type 	: "POST",
	    			url		: webserviceURL + "/create/subasta",
	    			data	: {
	    				clase_carga_id 		: $clase_carga_id,
	    				cantidad			: $cantidad,
	    				unidad_medida		: $unidad_medida,
	    				ciudad				: $ciudad,
	    				direccion			: $direccion,
	    				fecha_entrega		: $fecha_entrega,
	    				fecha_recoleccion	: $fecha_recoleccion,
	    				presupuesto			: $presupuesto,
	    				fecha_inicio_subasta: $fecha_inicio_subasta,
	    			},
	    			success: function(response){
	    				var $response = JSON.parse(response);
	    				
	    				if($response.status=="OK"){
	    					
	    				}
	    			}
	    		});

		});
		
    },
}, { 
  defaultHandler: function(type, ui, page) {
    console.log("Default handler called due to unknown route (" 
      + type + ", " + ui + ", " + page + ")"
    );
  },
  defaultHandlerEvents: "s",
  defaultArgsRe: true
});

function mostrarUsuarios(obj){
    var output = "";
	$(".content-each-users").empty();
    
    obj.forEach(function(o,i){
        $(".content-each-users").append(tmpl("each_user", o));
    });
    
    $.mobile.loading( 'hide', {
		text: 'Cargando',
		textVisible: true,
		theme: 'z',
		html: ""
	});
	
    $(".token_aprobate").click(function(){
    	
    	var $parent = $(this).parent()
    						 .parent()
    						 .parent()
    						 .find(".notification_pane");
    	
    	if($parent.css("display")=="none"){
    	 	$parent.show();
    	
    	}else{
    		$parent.hide();	
    	}
    	
    });
    
    $(".aprobate_auth").click(function(e){
    	e.preventDefault();
        var $myid = $(this).attr("data-rel-id");
        
        $.ajax({
            type: "POST",
            url: webserviceURL + "/admin/aprobate/user",
            data: {
            	id: $myid
            },
            success: function (dataCheck) {
				alert(dataCheck);
            }
        });
        
    });
    
}
function filter_user(e){
    var parametro = $('#cedula').val();
    if(parametro == ''){
        alert('Debes ingresar algun valor');
    }else{
        $.ajax({
            type: "POST",
            url: webserviceURL + "/search_user",
            data: { parameter: parametro },
            success: function (dataCheck) {
                var res = JSON.parse(dataCheck);
                console.log(res);
                try{
                	var id = res[0].id;
                    var nombre = res[0].nombre;
                    var apellido = res[0].apellido;
                    var cedula = res[0].cedula;
                    var cooperativa = res[0].cooperativa;       
                    var correo = res[0].correo_electronico;
                    var fecha_creacion = res[0].fecha_creacion;
                    var fecha_nacimiento = res[0].fecha_nacimiento.date.split(" ");
                    var nivel = res[0].id_nivel;
                    var estado_registro = res[0].estado_registro;
                    var telefono = res[0].telefono;
                    $('#user-id-a').val(id);
                    $('#name-user-u').val(nombre);
                    $('#surname-user-u').val(apellido);
                    $('#email-user-u').val(correo);
                    $('#cc-user-u').val(cedula);
                    $('#date-user-u').val(fecha_nacimiento[0]);
                    $('#cooperativa-name-user-u').val(cooperativa);
                    $('#nivel-user-u').val(nivel);
                    $('#phone-user-u').val(telefono);
                }catch(e){
                }
                
            }
        });
    }
}
function limpiar(){
	$('#cedula').val('');
	$('#user-id-a').val('');
    $('#name-user-u').val('');
    $('#surname-user-u').val('');
    $('#email-user-u').val('');
    $('#cc-user-u').val('');
    $('#date-user-u').val('');
    $('#cooperativa-name-user-u').val('');
    $('#nivel-user-u').val('');
    $('#phone-user-u').val('');
}
