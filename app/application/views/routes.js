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
var webserviceURL = "http://subastra.com/app/index.php";
var validate = true;
var geocoder;
var interval = null;

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
  "#dialog-desactivate":{handler:"account_desactivate",events:"s"},
  "#page-create-subasta":{handler:"page_create_subasta",events:"s"},
  "#dialog-active-account":{handler:"active_account",events:"s"},
  "#page-list-subasta":{handler:"page_list_subasta",events:"s"},
  "#page-subasta":{handler:"page_subasta",events:"s"},
  "#dialog-details":{handler:"dialog_details",events:"s"},
  "#dialog-auntentication-admin":{handler:"dialog_auntentication_admin",events:"s"},
  "#dialog-aprobate-edit-register":{handler:"dialog_aprobate_edit_register",events:"s"},
  "#page-list-subasta-participe":{handler:"page_list_subasta_participe",events:"s"},
  "#page-config-coins":{handler:"page_config_coins",events:"s"},
  "#page-califik":{handler:"page_califik",events:"s"}
},{
	page_califik:function(type,match,ui){
		
		var $thispage = $("#page-califik");
		$(".message").hide();
		SUBASTRA.validateSession($thispage);
		
		
	},
	page_config_coins:function(type,match,ui){
		var $thispage = $("#page-config-coins");
		$(".message").hide();
		SUBASTRA.validateSession($thispage);
		
		$.ajax({
			type: "GET",
			url: webserviceURL + "/page-config-coins",
			data: '',
			success: function (dataCheck) {
			    $(".price_per_credit").val(dataCheck);
			}
    	});	
    	
    	$("#md-pcredito").click(function(){
    		var nuevo_precio = $(".price_per_credit").val();
    		
    		$("#pop-up-accept-cambio-pcredito").popup("open");
    		(function(){
				var mypopup = $("#pop-up-accept-cambio-pcredito");
				mypopup.find(".ui-header").css("background","rgb(237, 46, 61)");	
				mypopup.css("border","1px solid rgb(237, 46, 61)");	
				mypopup.find(".ui-title").text("Esta Seguro de Realizar la Oferta?");
				mypopup.find(".panel-mensaje-creditos p").html('Esta seguro de cambiar el precio de los creditos?');
									
			})();
    		
    		$(".btn_sbmit.ok_btn").click(function(){
				$.ajax({
					type: "GET",
					url: webserviceURL + "/page-config-coins-mod",
					data: {
						nprecio: nuevo_precio
					},
					success: function (dataCheck) {
					    	var mypopup = $("#pop-up-accept-cambio-pcredito");
							mypopup.find(".ui-header").css("background","rgb(21, 123, 30)");	
							mypopup.css("border","1px solid rgb(21, 123, 30)");	
							mypopup.find(".ui-title").text("ESTADO");
							mypopup.find(".panel-mensaje-creditos p").html(dataCheck);
							mypopup.find(".panel-mensaje-creditos .btn_sbmit.ok_btn").hide();
							mypopup.find(".panel-mensaje-creditos .btn_sbmit.cancel_btn ").text("Regresar");
					}
		    	});	
    		});
    		$(".btn_sbmit.cancel_btn").click(function(){
				$.mobile.changePage( "#page-config-coins");
    		});
    		
    		
    	});
			
	},
    dialog_aprobate_edit_register:function(type,match,ui){
		
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
		
		SUBASTRA.deleteAndClearCookies("myid");
		SUBASTRA.deleteAndClearCookies("rol_id");
		SUBASTRA.deleteAndClearCookies("estado_registro");
		SUBASTRA.deleteAndClearCookies("role_permisions");
			
		$(".enviar_input.sesion_si").click(function(){
			$.mobile.changePage( "#login-page");
		});
	},
	dialog_auntentication_admin:function(type,match,ui){
		
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
				
		$(".enviar_input.sesion_si").click(function(){
			history.back();
		});
	},
	dialog_details:function(type,match,ui){
				
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
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

				$("#dialog-details div[data-role='content']").html(tmpl("detail_subasta_", response));
					
					
				//functiones de tiempo
					var str_time = response.fecha_fin_subasta + "T" + response.hora_fin_subasta + ":00";
					//console.log(str_time);
					SUBASTRA.setTime("2",str_time,".time-rest span");
				//fin funciones de tiempo
				
				var coordenada_inicial = response.coordenada_inicial.split(",");
				var coordenada_final = response.coordenada_final.split(",");
				
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
				    
				    
				 $(".ofert-button").click(function(){
				 	$.mobile.changePage( "#page-subasta?id=" + id, { transition: "slideup" } );
				 });
				 
					    
    
			}
		});
		
	},
	page_subasta:function(type,match,ui){
				
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
		var params=router.getParams(match[1]);  
		var id = params.id;
		var id_subasta = id;
		
		//empiezo el bind
		interval = SUBASTRA.listen(id_subasta);
		//empiezo el bind
		
	  	var $thispage = $("#page-subasta");
		$(".message").hide();
		SUBASTRA.validateSession($thispage);

		$.ajax({
			type: "POST",
			url: webserviceURL + "/subasta/find2",
			data: {
				_id:id	
			},
			success: function (dataCheck) {
				var response = JSON.parse(dataCheck);
				var participants  = JSON.parse(response.participants);
				
				
				
				//functiones de tiempo
					var str_time = response.fecha_fin_subasta + "T" + response.hora_fin_subasta + ":00";
					SUBASTRA.setTime("1",str_time,".description-subasta .header-1");
				//fin funciones de tiempo
				

				$thispage.find("div[data-role='content']").html(tmpl("detail_subasta_participe", response));
				
				
				$("#pop-up-accept-participe").popup();
				$("#pop-up-accept-participe").popup("destroy");
				$("#pop-up-accept-participe").trigger('create');
				$("#pop-up-accept-participe").popup();
				
				
				
				
				
				var coordenada_inicial = response.coordenada_inicial.split(",");
				var coordenada_final = response.coordenada_final.split(",");
				
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
				    
				    
				 $(".submit-price-participant").unbind("submit").submit(function(e){
				 	
				 	(function(){
						var mypopup = $("#pop-up-accept-participe");
						mypopup.find(".ui-header").css("background","rgb(237, 46, 61)");	
						mypopup.css("border","1px solid rgb(237, 46, 61)");	
						mypopup.find(".ui-title").text("Esta Seguro de Realizar la Oferta?");
						mypopup.find(".panel-mensaje-particpacion p").html('va a participar en la oferta por un valor de $ <span class="price-label-participe">$ 99</span> es correcto ?');
						mypopup.find(".panel-mensaje-particpacion .btn_sbmit.ok_btn").show();
						mypopup.find(".panel-mensaje-particpacion .btn_sbmit.cancel_btn ").text("Cancelar");
						
						mypopup.find(".panel-mensaje-particpacion .btn_sbmit.cancel_btn ").unbind("click").click(function(){
							mypopup.popup("hide");						
						});
											
					})();
										
				 	e.preventDefault();
				 	
				 	var price_cost = parseFloat($(this).find(".put-price").val());

				 	if(price_cost<=0){
				 		
				 		$("#pop-up-accept-participe").popup("open");
				 		
				 		(function(){
							var mypopup = $("#pop-up-accept-participe");
							mypopup.find(".ui-header").css("background","rgb(237, 46, 61)");	
							mypopup.css("border","1px solid rgb(237, 46, 61)");	
							mypopup.find(".ui-title").text("ESTADO");
							mypopup.find(".panel-mensaje-particpacion p").html("el valor ingresado no puede ser menor a 0 ");
							mypopup.find(".panel-mensaje-particpacion .btn_sbmit.ok_btn").hide();
							mypopup.find(".panel-mensaje-particpacion .btn_sbmit.cancel_btn ").text("Regresar");
							
							mypopup.find(".panel-mensaje-particpacion .btn_sbmit.cancel_btn ").unbind("click").click(function(){
								mypopup.popup("hide");						
							});
						})();
											
				 	}else{
				 		
		 				$("#pop-up-accept-participe").popup("open");
					 	$(".price-label-participe").text(price_cost);
					 	
					 	var metadata = $(this).attr("metadata");
					 	
					 	$(".btn_sbmit").unbind("click").click(function(){
					 		var $value = $(this).attr("data-value");
					 		
					 		if($value=="cancel"){
					 			
					 		}else if($value=="ok"){
					 			e.preventDefault();
					 			
					 			var $myid = SUBASTRA.getCookie("myid");
					 			
	
			 					$thispage.find(".load-pane").show();
			 					
			 					$.ajax({
									type: "POST",
									url: webserviceURL + "/subasta/participe",
									data: {
										_id : $myid,
										_id_subasta : id_subasta,
										_amount : price_cost,
										_metadata : metadata 
									},
									success: function (dataCheck) {
										
										//console.log(dataCheck);
										
										$thispage.find(".load-pane").hide();
										
										if(dataCheck=="OK"){
										
											(function(){
												var mypopup = $("#pop-up-accept-participe");
												mypopup.find(".ui-header").css("background","rgb(21, 123, 30)");	
												mypopup.css("border","1px solid rgb(21, 123, 30)");	
												mypopup.find(".ui-title").text("ESTADO");
												mypopup.find(".panel-mensaje-particpacion p").html("Haz Ofertado Correctamente, porfavor esta pendiente para futuras ofertas");
												mypopup.find(".panel-mensaje-particpacion .btn_sbmit.ok_btn").hide();
												mypopup.find(".panel-mensaje-particpacion .btn_sbmit.cancel_btn ").text("Regresar");
												
												mypopup.find(".panel-mensaje-particpacion .btn_sbmit.cancel_btn ").unbind("click").click(function(){
													$(".panel-participants-loader").show();
														
													$.ajax({
														type: "POST",
														url: webserviceURL + "/subasta/refresh",
														data: {
															_id_subasta : id_subasta,
														},
														success: function (dataCheck) {
															var response = JSON.parse(dataCheck);
															var participants = JSON.parse(response.participants);
															
															$(".table.table-participants").empty();
															
															var newsort = participants.sort(function(a,b) { return parseFloat(a.amount) - parseFloat(b.amount) } );
	
															newsort.forEach(function(obx,ix){
																$(".table.table-participants").append(tmpl("row_participants", obx));
															});
															
															$(".header-3.price-rule").text(newsort[0].amount);
															$(".submit-price-participant").attr("metadata",response.participants);
															$(".panel-participants-loader").hide();
														}
													});
									
													mypopup.popup("hide");	
												});
												
											})();
	
										}else if(dataCheck=="FAIL"){
											
											(function(){
												var mypopup = $("#pop-up-accept-participe");
												mypopup.find(".ui-header").css("background","rgb(237, 46, 61)");	
												mypopup.css("border","1px solid rgb(237, 46, 61)");	
												mypopup.find(".ui-title").text("ESTADO");
												mypopup.find(".panel-mensaje-particpacion p").html("Hubo un error! porque no intentas nuevamente");
												mypopup.find(".panel-mensaje-particpacion .btn_sbmit.ok_btn").hide();
												mypopup.find(".panel-mensaje-particpacion .btn_sbmit.cancel_btn ").text("Regresar");
												
												mypopup.find(".panel-mensaje-particpacion .btn_sbmit.cancel_btn ").unbind("click").click(function(){
													mypopup.popup("hide");						
												});
												
											})();
											
										}else if(dataCheck=="MIN_VALUE"){
											
											(function(){
												var mypopup = $("#pop-up-accept-participe");
												mypopup.find(".ui-header").css("background","rgb(237, 46, 61)");	
												mypopup.css("border","1px solid rgb(237, 46, 61)");	
												mypopup.find(".ui-title").text("ESTADO");
												mypopup.find(".panel-mensaje-particpacion p").html("Para poder participar debes de  digitar un valor menor al menor");
												mypopup.find(".panel-mensaje-particpacion .btn_sbmit.ok_btn").hide();
												mypopup.find(".panel-mensaje-particpacion .btn_sbmit.cancel_btn ").text("Regresar");
												
												mypopup.find(".panel-mensaje-particpacion .btn_sbmit.cancel_btn ").unbind("click").click(function(){
													mypopup.popup("hide");						
												});
												
											})();
											
											
										}
										
										
										
									}
			 					});
	
					 		}
					 			
					 	});
				 		
				 	}
				 	

				 	
				 });
				
			}
		});
		
		
	},
	page_list_subasta:function(type,match,ui){
				
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
		var params=router.getParams(match[1]);  
	  	var $thispage = $("#page-list-subasta");
		$(".message").hide();
		$('.campos_filtro > div').css('display','none');
		SUBASTRA.validateSession($thispage);
		
		$.mobile.loading( 'show', {
			text: 'Cargando',
			textVisible: true,
			theme: 'z',
			html: ""
		});
		$('.back').unbind('click').click(function(e) {
		    history.back();
		});
		
		
		$('.nav-item-filter a').unbind('click').click(function(e){
			e.preventDefault();
			
			var target = $(this).attr("href");
			
			if(target=="#pop-up-filter-date"){
				
				$( target ).popup( "open" );
				
			}else if(target=="#pop-up-filter-price"){
				
				$(".sbmit-filter-price").unbind("click").click(function(e){
					e.preventDefault();
					var $selected = $("#select-filter-price").val();
						
						$.mobile.loading( 'show', {
                                text: '',
                                textVisible: false,
                                theme: 'z',
                                html: ""
                         });
                            
						$.ajax({
							type: "POST",
							url: webserviceURL + "/filter/subasta/price",
							data: {
								range:$selected
							},
							success: function (dataCheck) {
								var response = JSON.parse(dataCheck);
						
								$.mobile.loading( 'hide', {
		                                text: '',
		                                textVisible: false,
		                                theme: 'z',
		                                html: ""
		                         });
                         
								if(response.length==0){
									
									$("#list-subasta").html("<div class='alert_message'>NO HAY REGISTROS</div>");
									$( target ).popup( "close" );
									
								}else{
									
									$(".content-each-subasta").empty();
									response.forEach(function(o,i){
										//console.log(o);
								        $(".content-each-subasta").append(tmpl("each_subasta", o));
								    });
								    
								    $( target ).popup( "close" );
			    
								}
								
							}
						});
		
				});
				
				$( target ).popup( "open" );
				
			}else if(target=="#pop-up-filter-map"){
				
				$( target).popup( "open" );
				
				
				$(".state_filter_depto").empty();
					$.ajax({
						type 	: "GET",
						url		: webserviceURL + "/bind/departamentos",
						data	: null,
						success: function(response){
							var departamentos = JSON.parse(response);
							
							var selector = $("select[data-bind='state_filter_depto']");
							
					        selector.append(		
					        $('<option>', { 
					        	value: "-1",
					        	text : "Seleccione una opción" 
					            })
					        );
					
					        departamentos.forEach(function(o, i) {
								selector.append(		
									$('<option>', { 
							        	value: o.id,
							        	text : o.nombre 
							    	})
							    );	    
							});
					
							selector[0].selectedIndex = 0;
					        selector.selectmenu("refresh");
					 
					
					        var selector_ciudad = $("select[data-bind='state_filter_city']");
						        selector_ciudad.empty();
						        
						    selector_ciudad.append(		
					            $('<option>', { 
					            	value: "-1",
					            	text : "Seleccione una departamento" 
					                })
					            );
					        
					        selector_ciudad[0].selectedIndex = 0;
					        selector_ciudad.selectmenu("refresh");  
					        	
						}
					});
					
					
				$("select[data-bind='state_filter_depto']").on('change', function (e) {
				    var optionSelected = $("option:selected", this);
				    var valueSelected = this.value;
				    
				    $.mobile.loading( 'show', {
				                text: 'Cargando',
				                textVisible: true,
				                theme: 'z',
				                html: ""
				    });
				            
				    if(valueSelected=="-1"){
				        
				         var selector_ciudad = $("select[data-bind='state_filter_city']");
				            selector_ciudad.empty();
				            
				        selector_ciudad.append(     
				            $('<option>', { 
				                value: "-1",
				                text : "Seleccione una departamento" 
				                })
				            );
				        
				        selector_ciudad[0].selectedIndex = 0;
				        selector_ciudad.selectmenu("refresh");
				        
				        $.mobile.loading( 'hide', {
				                text: 'Cargando',
				                textVisible: true,
				                theme: 'z',
				                html: ""
				        });
				        
				    }else{
				        
				        $.ajax({
				            type    : "GET",
				            url     : webserviceURL + "/bind/ciudades/" + valueSelected,
				            data    : null,
				            success: function(response){
				          
				            var ciudades = JSON.parse(response);
				            var selector = $("select[data-bind='state_filter_city']");
				                selector.empty();
				
				            ciudades.forEach(function(o, i) {
				                selector.append(        
				                    $('<option>', { 
				                        value: o.id,
				                        text : o.nombre 
				                    })
				                );
				            });
				
				            selector[0].selectedIndex = 0;
				            selector.selectmenu("refresh");
				                
				                $.mobile.loading( 'hide', {
				                        text: 'Cargando',
				                        textVisible: true,
				                        theme: 'z',
				                        html: ""
				                });
				                
				            }
				        });
				        
				    }
				
				});
				
				
				$(".sbmit-filter-map").unbind("click").click(function(e){
					e.preventDefault();
				
					var $selected = $("select.state_filter_city").val();

						$.mobile.loading( 'show', {
                                text: '',
                                textVisible: false,
                                theme: 'z',
                                html: ""
                         });
                         
						$.ajax({
				            type    : "POST",
				            url     : webserviceURL + "/filter/subasta/map",
				            data    : {
				            	id_ciudad : $selected
				            },
				            success: function(dataCheck){
				            	var response = JSON.parse(dataCheck);
						
								$.mobile.loading( 'hide', {
		                                text: '',
		                                textVisible: false,
		                                theme: 'z',
		                                html: ""
		                         });
                         
								if(response.length==0){
									
									$("#list-subasta").html("<div class='alert_message'>NO HAY REGISTROS</div>");
									$( target ).popup( "close" );
									
								}else{
									
									$(".content-each-subasta").empty();
									response.forEach(function(o,i){
										//console.log(o);
								        $(".content-each-subasta").append(tmpl("each_subasta", o));
								    });
								    
								    $( target ).popup( "close" );
			    
								}
				            }
						});
					
				});

				
			}else if(target=="#pop-up-filter-weight"){
				
				
				$(".sbmit-filter-weight").unbind("click").click(function(e){
					e.preventDefault();
					var $selected = $("#select-filter-weight").val();
						
						$.mobile.loading( 'show', {
                                text: '',
                                textVisible: false,
                                theme: 'z',
                                html: ""
                         });
                            
						$.ajax({
							type: "POST",
							url: webserviceURL + "/filter/subasta/weight",
							data: {
								range:$selected
							},
							success: function (dataCheck) {
								var response = JSON.parse(dataCheck);
						
								$.mobile.loading( 'hide', {
		                                text: '',
		                                textVisible: false,
		                                theme: 'z',
		                                html: ""
		                         });
                         
								if(response.length==0){
									
									$("#list-subasta").html("<div class='alert_message'>NO HAY REGISTROS</div>");
									$( target ).popup( "close" );
									
								}else{
									
									$(".content-each-subasta").empty();
									response.forEach(function(o,i){
										//console.log(o);
								        $(".content-each-subasta").append(tmpl("each_subasta", o));
								    });
								    
								    $( target ).popup( "close" );
			    
								}
								
							}
						});
		
				});
				
				$( target ).popup( "open" );
				
			}else if(target=="#pop-up-filter-volume"){
				
				$(".sbmit-filter-volume").unbind("click").click(function(e){
					e.preventDefault();
					var $selected = $("#select-filter-volume").val();
						
						$.mobile.loading( 'show', {
                                text: '',
                                textVisible: false,
                                theme: 'z',
                                html: ""
                         });
                            
						$.ajax({
							type: "POST",
							url: webserviceURL + "/filter/subasta/volume",
							data: {
								range:$selected
							},
							success: function (dataCheck) {
								var response = JSON.parse(dataCheck);
						
								$.mobile.loading( 'hide', {
		                                text: '',
		                                textVisible: false,
		                                theme: 'z',
		                                html: ""
		                         });
                         
								if(response.length==0){
									
									$("#list-subasta").html("<div class='alert_message'>NO HAY REGISTROS</div>");
									$( target ).popup( "close" );
									
								}else{
									
									$(".content-each-subasta").empty();
									response.forEach(function(o,i){
										//console.log(o);
								        $(".content-each-subasta").append(tmpl("each_subasta", o));
								    });
								    
								    $( target ).popup( "close" );
			    
								}
								
							}
						});
		
				});
				
				$( target ).popup( "open" );
				
			}
			
		});
		
		
		
		
		
		$('.ui-btn-text').click(function(){
			//$('.ui-popup-screen').click();
			var val = $('input[name="precio"]').val();
			window.location = "#page-list-subasta?filter="+val;
			//console.log(val);
		});
		
		$.ajax({
			type: "POST",
			url: webserviceURL + "/subasta/list",
			data: null,
			success: function (dataCheck) {
				var all_subastas = JSON.parse(dataCheck);
				
				$(".content-each-subasta").empty();
				
				all_subastas.forEach(function(o,i){
					//console.log(o);
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
	page_list_subasta_participe:function(type,match,ui){
				
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
		var params=router.getParams(match[1]);  
	  	var $thispage = $("#page-list-subasta-participe");
		$(".message").hide();
		$('.campos_filtro > div').css('display','none');
		SUBASTRA.validateSession($thispage);
		
		$.mobile.loading( 'show', {
			text: 'Cargando',
			textVisible: true,
			theme: 'z',
			html: ""
		});
		$('.back').unbind('click').click(function(e) {
		    history.back();
		});
		
		
		$('.nav-item-filter a').unbind('click').click(function(e){
			e.preventDefault();
			
			var target = $(this).attr("href");
			
			if(target=="#pop-up-filter-date"){
				
				$( target ).popup( "open" );
				
			}else if(target=="#pop-up-filter-price"){
				
				$(".sbmit-filter-price").unbind("click").click(function(e){
					e.preventDefault();
					var $selected = $("#select-filter-price").val();
						
						$.mobile.loading( 'show', {
                                text: '',
                                textVisible: false,
                                theme: 'z',
                                html: ""
                         });
                            
						$.ajax({
							type: "POST",
							url: webserviceURL + "/filter/subasta/price",
							data: {
								range:$selected
							},
							success: function (dataCheck) {
								var response = JSON.parse(dataCheck);
						
								$.mobile.loading( 'hide', {
		                                text: '',
		                                textVisible: false,
		                                theme: 'z',
		                                html: ""
		                         });
                         
								if(response.length==0){
									
									$("#list-subasta").html("<div class='alert_message'>NO HAY REGISTROS</div>");
									$( target ).popup( "close" );
									
								}else{
									
									$(".content-each-subasta").empty();
									response.forEach(function(o,i){
										//console.log(o);
								        $(".content-each-subasta").append(tmpl("each_subasta", o));
								    });
								    
								    $( target ).popup( "close" );
			    
								}
								
							}
						});
		
				});
				
				$( target ).popup( "open" );
				
			}else if(target=="#pop-up-filter-map"){
				
				$( target).popup( "open" );
				
				
				$(".state_filter_depto").empty();
					$.ajax({
						type 	: "GET",
						url		: webserviceURL + "/bind/departamentos",
						data	: null,
						success: function(response){
							var departamentos = JSON.parse(response);
							
							var selector = $("select[data-bind='state_filter_depto']");
							
					        selector.append(		
					        $('<option>', { 
					        	value: "-1",
					        	text : "Seleccione una opción" 
					            })
					        );
					
					        departamentos.forEach(function(o, i) {
								selector.append(		
									$('<option>', { 
							        	value: o.id,
							        	text : o.nombre 
							    	})
							    );	    
							});
					
							selector[0].selectedIndex = 0;
					        selector.selectmenu("refresh");
					 
					
					        var selector_ciudad = $("select[data-bind='state_filter_city']");
						        selector_ciudad.empty();
						        
						    selector_ciudad.append(		
					            $('<option>', { 
					            	value: "-1",
					            	text : "Seleccione una departamento" 
					                })
					            );
					        
					        selector_ciudad[0].selectedIndex = 0;
					        selector_ciudad.selectmenu("refresh");  
					        	
						}
					});
					
					
				$("select[data-bind='state_filter_depto']").on('change', function (e) {
				    var optionSelected = $("option:selected", this);
				    var valueSelected = this.value;
				    
				    $.mobile.loading( 'show', {
				                text: 'Cargando',
				                textVisible: true,
				                theme: 'z',
				                html: ""
				    });
				            
				    if(valueSelected=="-1"){
				        
				         var selector_ciudad = $("select[data-bind='state_filter_city']");
				            selector_ciudad.empty();
				            
				        selector_ciudad.append(     
				            $('<option>', { 
				                value: "-1",
				                text : "Seleccione una departamento" 
				                })
				            );
				        
				        selector_ciudad[0].selectedIndex = 0;
				        selector_ciudad.selectmenu("refresh");
				        
				        $.mobile.loading( 'hide', {
				                text: 'Cargando',
				                textVisible: true,
				                theme: 'z',
				                html: ""
				        });
				        
				    }else{
				        
				        $.ajax({
				            type    : "GET",
				            url     : webserviceURL + "/bind/ciudades/" + valueSelected,
				            data    : null,
				            success: function(response){
				          
				            var ciudades = JSON.parse(response);
				            var selector = $("select[data-bind='state_filter_city']");
				                selector.empty();
				
				            ciudades.forEach(function(o, i) {
				                selector.append(        
				                    $('<option>', { 
				                        value: o.id,
				                        text : o.nombre 
				                    })
				                );
				            });
				
				            selector[0].selectedIndex = 0;
				            selector.selectmenu("refresh");
				                
				                $.mobile.loading( 'hide', {
				                        text: 'Cargando',
				                        textVisible: true,
				                        theme: 'z',
				                        html: ""
				                });
				                
				            }
				        });
				        
				    }
				
				});
				
				
				$(".sbmit-filter-map").unbind("click").click(function(e){
					e.preventDefault();
				
					var $selected = $("select.state_filter_city").val();

						$.mobile.loading( 'show', {
                                text: '',
                                textVisible: false,
                                theme: 'z',
                                html: ""
                         });
                         
						$.ajax({
				            type    : "POST",
				            url     : webserviceURL + "/filter/subasta/map",
				            data    : {
				            	id_ciudad : $selected
				            },
				            success: function(dataCheck){
				            	var response = JSON.parse(dataCheck);
						
								$.mobile.loading( 'hide', {
		                                text: '',
		                                textVisible: false,
		                                theme: 'z',
		                                html: ""
		                         });
                         
								if(response.length==0){
									
									$("#list-subasta").html("<div class='alert_message'>NO HAY REGISTROS</div>");
									$( target ).popup( "close" );
									
								}else{
									
									$(".content-each-subasta").empty();
									response.forEach(function(o,i){
										//console.log(o);
								        $(".content-each-subasta").append(tmpl("each_subasta", o));
								    });
								    
								    $( target ).popup( "close" );
			    
								}
				            }
						});
					
				});

				
			}else if(target=="#pop-up-filter-weight"){
				
				
				$(".sbmit-filter-weight").unbind("click").click(function(e){
					e.preventDefault();
					var $selected = $("#select-filter-weight").val();
						
						$.mobile.loading( 'show', {
                                text: '',
                                textVisible: false,
                                theme: 'z',
                                html: ""
                         });
                            
						$.ajax({
							type: "POST",
							url: webserviceURL + "/filter/subasta/weight",
							data: {
								range:$selected
							},
							success: function (dataCheck) {
								var response = JSON.parse(dataCheck);
						
								$.mobile.loading( 'hide', {
		                                text: '',
		                                textVisible: false,
		                                theme: 'z',
		                                html: ""
		                         });
                         
								if(response.length==0){
									
									$("#list-subasta").html("<div class='alert_message'>NO HAY REGISTROS</div>");
									$( target ).popup( "close" );
									
								}else{
									
									$(".content-each-subasta").empty();
									response.forEach(function(o,i){
										//console.log(o);
								        $(".content-each-subasta").append(tmpl("each_subasta", o));
								    });
								    
								    $( target ).popup( "close" );
			    
								}
								
							}
						});
		
				});
				
				$( target ).popup( "open" );
				
			}else if(target=="#pop-up-filter-volume"){
				
				$(".sbmit-filter-volume").unbind("click").click(function(e){
					e.preventDefault();
					var $selected = $("#select-filter-volume").val();
						
						$.mobile.loading( 'show', {
                                text: '',
                                textVisible: false,
                                theme: 'z',
                                html: ""
                         });
                            
						$.ajax({
							type: "POST",
							url: webserviceURL + "/filter/subasta/volume",
							data: {
								range:$selected
							},
							success: function (dataCheck) {
								var response = JSON.parse(dataCheck);
						
								$.mobile.loading( 'hide', {
		                                text: '',
		                                textVisible: false,
		                                theme: 'z',
		                                html: ""
		                         });
                         
								if(response.length==0){
									
									$("#list-subasta").html("<div class='alert_message'>NO HAY REGISTROS</div>");
									$( target ).popup( "close" );
									
								}else{
									
									$(".content-each-subasta").empty();
									response.forEach(function(o,i){
										//console.log(o);
								        $(".content-each-subasta").append(tmpl("each_subasta", o));
								    });
								    
								    $( target ).popup( "close" );
			    
								}
								
							}
						});
		
				});
				
				$( target ).popup( "open" );
				
			}
			
		});
		
		
		
		
		
		$('.ui-btn-text').click(function(){
			//$('.ui-popup-screen').click();
			var val = $('input[name="precio"]').val();
			window.location = "#page-list-subasta?filter="+val;
			//console.log(val);
		});
		
		$.ajax({
			type: "POST",
			url: webserviceURL + "/subasta/listtransporter",
			data: null,
			success: function (dataCheck) {
				var all_subastas = JSON.parse(dataCheck);
				
				$(".content-each-subasta").empty();
				
				all_subastas.forEach(function(o,i){
					//console.log(o);
			        $(".content-each-subasta").append(tmpl("each_subasta_participe", o));
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
		
				
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
		
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
		
		var params=router.getParams(match[1]); 
		var ref = params.ref;
		
		if(ref =! undefined){
			$('.nav-list-links').hide();
		}
	},
  	edit_profile: function(type,match,ui){
  		
  				
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
  		
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
		
        $.mobile.loading( 'show', {
        	text: '',
        	textVisible: false,
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
					var response = JSON.parse(dataCheck);
					//console.log(response);
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
					$thispage.find("#date-user").val(response.fecha_nacimiento);
					$thispage.find("#cc-user").val(response.cedula);
					$thispage.find("#phone-user").val(response.telefono);
					$thispage.find("#cooperativa-name-user").val(response.cooperativa);
					
					$.mobile.loading( 'hide', {
                    	text: '',
                    	textVisible: false,
                    	theme: 'z',
                    	html: ""
                    });
					
					
					$(".block-empresa").hide();
					$(".block-user").hide();
						 
					if(response.rol_id=="3"){
					     $(".block-user").show();  
					}else if(response.rol_id=="2"){
						 $(".block-empresa").show();	  	  
					}
					
					
					 $("input[name=cooperativa-user]").unbind("click").click(function(){
					     $(".cooperativa-name-user").val("");
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
						 
						 if($items.length==0){
						     vehiclevalidate=false;
						 }else{
						    for(var i=0; i<$items.length; i++){
    							var $placa = $items.eq(i).find(".placa-user").val();
    							var $model = $items.eq(i).find(".modelo-user").val();
    						 	if($placa===""  || $model === ""){
    								 vehiclevalidate=false;
    							 }
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
							
							$.mobile.loading( 'show', {
                            	text: '',
                            	textVisible: false,
                            	theme: 'z',
                            	html: ""
                            });
                            
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
									    
									   	$.mobile.loading( 'hide', {
                                        	text: '',
                                        	textVisible: false,
                                        	theme: 'z',
                                        	html: ""
                                        });
                            
										var response = JSON.parse(dataCheck);
										$message.find(".message[type]").hide();
										
										if(response.message=="OK"){
											 $message.find(".message[type=2]").show();
							
										 $.mobile.changePage( "#dialog-aprobate-edit-register", { role: "dialog" } );
								 
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
    	
    			
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
	
	  //oculto todos los mensajes
	  $(".message").hide();
	  
	  // reseteo el fomrulario
      $("#login_container")[0].reset();
      
      $('.nav-list-links').show();
      
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
 						
 						//console.log(response);
 						
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
						}else if(response.message == "DEACTIVATE ADMIN"){
							$message.find(".message[type=7]").show();
						}

					}
				});
		  }
		  	
	  });
	  
	  $('.option_home').click(function(){
	  		var id = SUBASTRA.getCookie('myid');
	  		var rol = SUBASTRA.getCookie('rol_id');
	  		
	  		if(rol == "1"){
	  			$.mobile.changePage('#page-admin-menu',{role:"page"});
	  		}else if(rol == "2"){
	  			$.mobile.changePage('#page-profile?referrer=login&iduser='+id,{role:"page"});
	  		}else if(rol == "3"){
	  			$.mobile.changePage('#page-profile?referrer=login&iduser='+id,{role:"page"});
	  		}
	  });
	  
  },
    history_dialog: function(type,match,ui){
    	
	try{
		SUBASTRA.clearTimer();	
	}catch(e){
		console.log("the socket is not responding correctly");
	}
	
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
    			
	try{
		SUBASTRA.clearTimer();	
	}catch(e){
		console.log("the socket is not responding correctly");
	}
	
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
	$(".subastra-icon-home").unbind("click").click(function(e){
		var id = $(this).attr('data-id');
		$.mobile.changePage('#page-view-profile?iduser='+id,{role:"page"});
	});
	  
	$(".button").unbind("click").click(function(){
      $.mobile.changePage( "#dialog-history?iduser="+$myid, { role: "dialog" } );
    });
    
    $('.profile-lbl').unbind('click').click(function(){
		var id = $(this).attr('data-id');	
		$.mobile.changePage('#page-view-profile?iduser='+id,{role:"page"});
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
					//console.log(response);
					
					$('.profile-lbl').attr('data-id',response.id);
					$('.subastra-icon-home').attr('data-id',response.id);
					
					var $label_name = $("span[react-type][id='name-user']");
					if(response.nombre==""){
						$label_name.text("Transportista #" + response.id);
					}else{
						$label_name.text(response.nombre);
					}
					
						 $("a[data-bind-event='profile']").click(function(e){
							e.preventDefault();

							$.mobile.changePage( "#options-page?iduser="+$myid, {
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
    	
	try{
		SUBASTRA.clearTimer();	
	}catch(e){
		console.log("the socket is not responding correctly");
	}
		
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
									//console.log(response);
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
    			
	try{
		SUBASTRA.clearTimer();	
	}catch(e){
		console.log("the socket is not responding correctly");
	}
	
	var params=router.getParams(match[1]);  

	try{
		var $referrer = params.referrer;
	}catch(e){
		var $referrer = "#page-register-user-admin";
		console.log("params is undefined");
	}
		
   	var $thispage = $("#page-register-user-admin");
  	    
  	    SUBASTRA.validateSession($thispage);
  	    
  	    var $message = $(".message-notification[data-message=register_user_admin]");
  	    
	  	$(".option_link").unbind("click").click(function(e){
			$.mobile.changePage( "#options-page?referrer="+$thispage.attr("id"), {
					  transition: "slide",
					  reverse: false
					});
		});
		
		 $thispage.find("input[name=cooperativa-user]").unbind("click").click(function(){
             $thispage.find(".cooperativa-name-register-2").find(".cooperativa-name-user").val("");
        	 $thispage.find(".cooperativa-name-register-2").hide();
        	 var $valueselected = $(this).val();
        		  if($valueselected==="yes"){
        			 $thispage.find(".cooperativa-name-register-2").show();  
        		  }else if($valueselected==="not"){
        			  $thispage.find(".cooperativa-name-register-2").hide();
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
		  
		  $thispage.find("input[name='role-user']").unbind("click").click(function(){
			  var $roleselected = $(this).val(); 
			     //console.log($roleselected);
			     
			     
			  if($roleselected==3){
			      $thispage.find(".block-empresa").hide();
			      $thispage.find(".block-user").show();
			  }else{
			      $thispage.find(".block-user").hide();
			      $thispage.find(".block-empresa").show();
			  }
			  
		  });
		  
		$("#form-register-user-admin").unbind("submit").submit(function(e){
			 e.preventDefault();
			  
			 $message.find(".message[type]").hide();
			 $message.find(".message[type=99]").show();
			 	
			 var $name = $(this).find("#name-user").val();
			 var $apellido = $(this).find("#surname-user").val();
			 var $username = $(this).find("#email-user").val();
			 var $phone = $(this).find("#phone-user").val();
			 var $rolem = $(this).find("input[name='role-user']:checked").val();
			 var $pass_change = $(this).find("#pass-change").val();
			
			 
			 if($rolem == "3"){
				$role = "transportista";
			 }else if($rolem == "2"){
				$role = "empresa";
			 }
		
			 var $cooperativa = $(this).find('input[name=cooperativa-user]:checked').val();
			 var $cooperativa_name = $(this).find('.cooperativa-name-user').val();
			 var $nit = $(this).find("#nit-user").val();
			 var $date = $(this).find("#date-user-2").val();
			 var $cc_user = $(this).find("#cc-user").val();
			  
			 var $items = $(this).find(".vehicles-items fieldset");
			 var vehiclevalidate = true;
			 
			 if($items.length==0){
			     vehiclevalidate=false;
			 }else{
			    for(var i=0; i<$items.length; i++){
					var $placa = $items.eq(i).find(".placa-user").val();
					var $model = $items.eq(i).find(".modelo-user").val();
				 	if($placa===""  || $model === ""){
						 vehiclevalidate=false;
					 }
			    }    
			 }
			 
			  var expresion;
			  if($cooperativa==="yes"){
				  
				  expresion = $name === "" || 
				  			  $apellido === "" || 
				  			  $username === "" || 
				  			  $pass_change === "" ||
				  			  $phone === "" || 
				  			  $cooperativa_name === "" || 
				  			  $date === "" || 
				  			  $role === "" ;
				  
			  }else{
				  
				  expresion = $name === "" || 
								  $apellido === "" || 
								  $username === "" || 
								  $pass_change === "" ||
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
				
				$.mobile.loading( 'show', {
                	text: '',
                	textVisible: false,
                	theme: 'z',
                	html: ""
                });
                
				  $.ajax({
						type: "POST",
						url: webserviceURL + "/register/new/user",
						data: {
							 nombre : $name,
							 apellido : $apellido,
							 rol : $rolem,
							 correo : $username,
							 telefono : $phone,
							 cedula : $cc_user,
							 nit : $nit,
							 fecha : $date,
							 coop : $cooperativa_name,
							 contrasenia : $pass_change,
							 vehicles: JSON.stringify(vehicledata)
						},
						success: function (dataCheck) {
						    
						   	$.mobile.loading( 'hide', {
                            	text: '',
                            	textVisible: false,
                            	theme: 'z',
                            	html: ""
                            });
                
							var response = JSON.parse(dataCheck);
							$message.find(".message[type]").hide();
							
							if(response.status=="2"){
								 $message.find(".message[type=2]").show();
				
							 //$.mobile.changePage( "#dialog-aprobate-edit-register", { role: "dialog" } );
					 
							}else{
								$message.find(".message[type=3]").show();
							}
						}
					});
					
					
					//console.log("HA HECHO UNA INSERCION");
	
			  }else{
			  	$message.find(".message[type]").hide();
				$message.find(".message[type=1]").show();
			  }
		  });
		
		
		/**********************************/
		/**********************************/
		/**********************************/
		
    },
    all_user_admin:function(type,match,ui){
    	
    			
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
		
	    var params=router.getParams(match[1]);  
	
		$('#datos_user').val("");
	
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
		
		$('.select-filter-users').change(function(){
    		var filter = $(this).val();
    		$.ajax({
    			type:"POST",
    			url:webserviceURL+"/users/"+filter,
    			data: null,
    			success:function(res){
    				var respuesta = JSON.parse(res);
	            	mostrarUsuarios(respuesta);
    			}
    		});
    	});
		
		$('#datos_user').keyup(function(){
			var d = $(this).val();
			$.ajax({
		        type: "POST",
		        url: webserviceURL + "/users/busqueda",
		        data: {datos:d},
		        success: function (dataCheck) {
		            var respuesta = JSON.parse(dataCheck);
		            mostrarUsuarios(respuesta);
		        }
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
	        url: webserviceURL + "/users/pendientes",
	        data: null,
	        success: function (dataCheck) {
	            var respuesta = JSON.parse(dataCheck);
	            mostrarUsuarios(respuesta);
	        }
	    });
    },
    update_user_admin: function(type,match,ui){
    
	try{
		SUBASTRA.clearTimer();	
	}catch(e){
		console.log("the socket is not responding correctly");
	}
	
		
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
            	//console.log(id);
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
    	
    			
	try{
		SUBASTRA.clearTimer();	
	}catch(e){
		console.log("the socket is not responding correctly");
	}
		
		
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
                //console.log(respuesta);
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
    			
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
    
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
    	
    			
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
		
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
    	
    			
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
		
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
    	
    			
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
		
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
    	
    			
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
    	
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
    account_desactivate:function(type,match,ui){
    	
    			
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
    	
    	var $message = $(".message-notification[data-message='deactivate_account']");
		$message.find(".message[type]").hide();
		
		try{
			var params=router.getParams(match[1]);
    		var id_ = params.iduser;
		}catch(e){
			
		}
		
		$('.ui-footer .ui-navbar').css('opacity','0').hide();
		
    	if(id_ != undefined){
    		
	    	$('#send_deactivate').unbind('click').click(function(e) {
    	    	if($('input[name="radio-choice-1"]:checked').val() == "si"){
	    			$.ajax({
		    			type 	: "POST",
		    			url		: webserviceURL+"/deactivate/user_admin/"+id_,
		    			data	: null,
		    			success: function(response){
		    				if(response == "si"){
								$message.find(".message[type=1]").show();
								
								$.mobile.loading( 'show', {
									text: 'Cargando...',
									textVisible: true,
									theme: 'z',
									html: ""
								});
								
								setTimeout(function(){
									$.mobile.changePage( "#page-all-user-admin",{transition:"flip"});	
								}, 2000);
							}else{
								$message.find(".message[type=3]").show();
							}
		    			}
		    		});
    	    	}
    	    });	
    	}else{
    		var id = SUBASTRA.getCookie('myid');
    		$('#send_deactivate').unbind('click').click(function(e) {
    	    if($('input[name="radio-choice-1"]:checked').val() == "si"){
	    		$.ajax({
	    			type 	: "POST",
	    			url		: webserviceURL+"/deactivate/user/"+id,
	    			data	: null,
	    			success: function(response){
	    				//console.log(response);
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
								$.mobile.changePage( "#login-page",{transition:"flip"});	
							}, 2000);
						}else{
							alert("no se pudo desactivar la cuenta");
						}
	    			}
	    		});
	    	}
    	});
    	}
    	setTimeout(function() {
    		$('.icon-home.back').unbind('click').click(function(){
	    		history.back();
	    	});
    	}, 500);
    },
    active_account:function(type,match,ui){
    	
    			
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
		
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
    					//console.log(response);
    					if(response == "si"){
							
							$.mobile.loading( 'show', {
								text: 'Cargando...',
								textVisible: true,
								theme: 'z',
								html: ""
							});
							
							setTimeout(function(){
								$.mobile.changePage( "#login-page");	
							}, 2000);
						}else{
							alert("Error");
						}
    				}
    			});
    		}
    	});
    },
    page_create_subasta: function(type,match,ui){
    	
    			
		try{
			SUBASTRA.clearTimer();	
		}catch(e){
			console.log("the socket is not responding correctly");
		}
		
    	
    	$(".hidden-area").show();
    	
    	//invoco los calendarios de las fechas
  
		var m = $("input.fecha_entrega").datepicker({
		        onSelect: function(selected) {  
		          $("input.fecha_recoleccion").datepicker("option","maxDate", selected);
		          SUBASTRA.fixDateOnCreateSubasta();
		        }
		    });
		var m2 = $("input.fecha_recoleccion").datepicker({
		        onSelect: function(selected) {  
		          $("input.fecha_entrega").datepicker("option","minDate", selected);
		          SUBASTRA.fixDateOnCreateSubasta();
		        }
		    });  
		    
		    
		var m3 = $("input.fecha_inicio_subasta").datepicker({
		        onSelect: function(selected) {  
		          $("input.fecha_fin_subasta").datepicker("option","minDate", selected);
		          SUBASTRA.fixDateOnCreateSubasta();
		        }
		    });
		
		var m4 = $("input.fecha_fin_subasta").datepicker({
		        onSelect: function(selected) {  
		          $("input.fecha_inicio_subasta").datepicker("option","maxDate", selected);
		          SUBASTRA.fixDateOnCreateSubasta();
		        }
		    });
		
		SUBASTRA.fixDateOnCreateSubasta();
		
		//activo el evetno click de los checkbox
		$("#checkbox-programar").click(function(){
		  if ($(this).is(":checked")) {
		       $(".field-row-programar-si").hide();
		   }else{
		       $(".field-row-programar-si").show();
		   }
		});
		
    	//invoco los calendarios de las fechas
    	
    	
    	var $thispage = $("#page-create-subasta");
		var $message = $(".message-notification[data-message=register-subasta]");
		   	
		$message.find(".message[type]").hide();

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
		$(".type_charge").empty();
		 
        $.ajax({
        	type 	: "POST",
        	url		: webserviceURL + "/bind/tipos_carga",
        	data	: null,
        	success: function(response){
        		var tipos_de_carga = JSON.parse(response);
        		
        		var selector = $("select[data-bind='type_charge']");
    		    
    		    selector.append(		
    				$('<option>', { 
    		        	value: "-1",
    		        	text : "Seleccione una opción" 
    		    	})
    		    );
        		    
        		tipos_de_carga.forEach(function(o, i) {
        			selector.append(		
        				$('<option>', { 
        		        	value: o.id,
        		        	text : o.nombre 
        		    	})
        		    );
        		});
        		
                selector[0].selectedIndex = 0;
                selector.selectmenu("refresh");
        		
        			
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
	    				
                            selector.append(		
                				$('<option>', { 
                		        	value: "-1",
                		        	text : "Seleccione una opción" 
                		    	})
                		    );
        		    
        		    
	    				unidad_medida.forEach(function(o, i) {
	    					//console.log(o);
	    					selector.append(		
	    						$('<option>', { 
						        	value: o.id,
						        	text : o.nombre 
						    	})
						    );
	    				});
	    				
	    				selector[0].selectedIndex = 0;
                        selector.selectmenu("refresh");
        		
	    					
	    			}
	    		});
		//cargo los select de tipos de carga        
		
		
		//cargo las ciudades y los departamentos 
			   $(".departamento_recoleccion").empty();
			   $.ajax({
	    			type 	: "GET",
	    			url		: webserviceURL + "/bind/departamentos",
	    			data	: null,
	    			success: function(response){
	    				var departamentos = JSON.parse(response);
	    				
	    				var selector = $("select[data-bind='state_recoleccion']");
	    				
    	                selector.append(		
                        $('<option>', { 
                        	value: "-1",
                        	text : "Seleccione una opción" 
                            })
                        );
                        
	    				var selector_entrega = $("select[data-bind='state_entrega']");
	    				
    	                selector_entrega.append(		
                        $('<option>', { 
                        	value: "-1",
                        	text : "Seleccione una opción" 
                            })
                        );
                        
                        
                        departamentos.forEach(function(o, i) {
	    					
	    					selector.append(		
	    						$('<option>', { 
						        	value: o.id,
						        	text : o.nombre 
						    	})
						    );
						    
						    selector_entrega.append(		
	    						$('<option>', { 
						        	value: o.id,
						        	text : o.nombre 
						    	})
						    );
						    
	    				});

	    				selector[0].selectedIndex = 0;
                        selector.selectmenu("refresh");
                        
                        
	    				selector_entrega[0].selectedIndex = 0;
                        selector_entrega.selectmenu("refresh");
                        
                        var selector_ciudad = $("select[data-bind='city_recoleccion']");
    				        selector_ciudad.empty();
    				        
    				    selector_ciudad.append(		
                            $('<option>', { 
                            	value: "-1",
                            	text : "Seleccione una departamento" 
                                })
                            );
                        
                        selector_ciudad[0].selectedIndex = 0;
                        selector_ciudad.selectmenu("refresh");  
                        
                        var selector_ciudad_entrega = $("select[data-bind='city_entrega']");
    				        selector_ciudad_entrega.empty();
    				        
    				    selector_ciudad_entrega.append(		
                            $('<option>', { 
                            	value: "-1",
                            	text : "Seleccione una departamento" 
                                })
                            );
                        
                        selector_ciudad_entrega[0].selectedIndex = 0;
                        selector_ciudad_entrega.selectmenu("refresh");
                        
  	    					
	    			}
	    		});
		 
		        $("select[data-bind='state_recoleccion']").on('change', function (e) {
                    var optionSelected = $("option:selected", this);
                    var valueSelected = this.value;
                    
                    $.mobile.loading( 'show', {
								text: 'Cargando',
								textVisible: true,
								theme: 'z',
								html: ""
					});
							
                    if(valueSelected=="-1"){
                        
                         var selector_ciudad = $("select[data-bind='city_recoleccion']");
    				        selector_ciudad.empty();
    				        
    				    selector_ciudad.append(		
                            $('<option>', { 
                            	value: "-1",
                            	text : "Seleccione una departamento" 
                                })
                            );
                        
                        selector_ciudad[0].selectedIndex = 0;
                        selector_ciudad.selectmenu("refresh");
                        
                        $.mobile.loading( 'hide', {
								text: 'Cargando',
								textVisible: true,
								theme: 'z',
								html: ""
					    });
                        
                    }else{
                        
                        $.ajax({
        	    			type 	: "GET",
        	    			url		: webserviceURL + "/bind/ciudades/" + valueSelected,
        	    			data	: null,
        	    			success: function(response){
        		          
        		            var ciudades = JSON.parse(response);
    		                var selector = $("select[data-bind='city_recoleccion']");
        				        selector.empty();
    
                            ciudades.forEach(function(o, i) {
    	    					selector.append(		
    	    						$('<option>', { 
    						        	value: o.id,
    						        	text : o.nombre 
    						    	})
    						    );
    	    				});
    
    	    				selector[0].selectedIndex = 0;
                            selector.selectmenu("refresh");
                                
                                $.mobile.loading( 'hide', {
        								text: 'Cargando',
        								textVisible: true,
        								theme: 'z',
        								html: ""
        					    });
                                
        	    			}
        	    		});
                        
                    }
                    
                });
                
                
                
                
                
                
                $("select[data-bind='state_entrega']").on('change', function (e) {
                    var optionSelected = $("option:selected", this);
                    var valueSelected = this.value;
                    
                    $.mobile.loading( 'show', {
								text: 'Cargando',
								textVisible: true,
								theme: 'z',
								html: ""
					});
							
                    if(valueSelected=="-1"){
                        
                         var selector_ciudad = $("select[data-bind='city_entrega']");
    				        selector_ciudad.empty();
    				        
    				    selector_ciudad.append(		
                            $('<option>', { 
                            	value: "-1",
                            	text : "Seleccione una departamento" 
                                })
                            );
                        
                        selector_ciudad[0].selectedIndex = 0;
                        selector_ciudad.selectmenu("refresh");
                        
                        $.mobile.loading( 'hide', {
								text: 'Cargando',
								textVisible: true,
								theme: 'z',
								html: ""
					    });
                        
                    }else{
                        
                        $.ajax({
        	    			type 	: "GET",
        	    			url		: webserviceURL + "/bind/ciudades/" + valueSelected,
        	    			data	: null,
        	    			success: function(response){
        		          
        		            var ciudades = JSON.parse(response);
    		                var selector = $("select[data-bind='city_entrega']");
        				        selector.empty();
    
                            ciudades.forEach(function(o, i) {
    	    					selector.append(		
    	    						$('<option>', { 
    						        	value: o.id,
    						        	text : o.nombre 
    						    	})
    						    );
    	    				});
    
    	    				selector[0].selectedIndex = 0;
                            selector.selectmenu("refresh");
                                
                                $.mobile.loading( 'hide', {
        								text: 'Cargando',
        								textVisible: true,
        								theme: 'z',
        								html: ""
        					    });
                                
        	    			}
        	    		});
                        
                    }
      
                });
                
            
            var city_entrega = $("select[data-bind='city_entrega']");
			city_entrega.on('change', function (e) {
			    
			    var city_entrega_sel = $(this).find("option:selected").val();
			    var address_city_entrega_sel = $(this).find("option:selected").text();
			    var address_depto_entrega_sel = $("select[data-bind='state_entrega'] option:selected").text();
			    
			    var city_recoleccion = $("select[data-bind='city_recoleccion']");
			    var address_city_recoleccion_sel = $("select[data-bind='city_recoleccion'] option:selected").text();
			    var address_depto_recoleccion_sel = $("select[data-bind='state_recoleccion'] option:selected").text();
			    
			    if(city_entrega_sel != "-1" && city_recoleccion.val() != "-1"){
			        
			        geocoder = new google.maps.Geocoder();
			        
                          geocoder.geocode({ 
                              
                              'address': address_city_entrega_sel.toLowerCase()
                              + "," + address_depto_entrega_sel.toLowerCase()
                          
                          }, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                
                                   
                                geocoder.geocode( { 
                                    
                                    'address': address_city_recoleccion_sel.toLowerCase()
                                   + "," + address_depto_recoleccion_sel.toLowerCase()
                                    
                                }, function(results2, status2) {
                                    
                                    if (status2 == google.maps.GeocoderStatus.OK) {
                                       
                                    var pto1 = new google.maps.LatLng(
                                                                         results[0].geometry.location.k, 
                                                                         results[0].geometry.location.D
                                                                         );
                                                                         
                                    var pto2 = new google.maps.LatLng(
                                                                         results2[0].geometry.location.k,
                                                                         results2[0].geometry.location.D
                                                                         );  
                                    
                                    var directionsService = new google.maps.DirectionsService();
                                    
                                    /************DIBUJO EL MAPA***********/
                                    
                                    /************DIBUJO EL MAPA***********/
                                    var request = {
                                        origin:pto1,
                                        destination:pto2,
                                        travelMode: google.maps.TravelMode.DRIVING
                                      };
                                    
                                      directionsService.route(request, function(result, status) {
                                          //console.log(result);
                                        
                                        if (status == google.maps.DirectionsStatus.OK) {
                                             
                                            var resultkm = result.routes[0].legs[0].distance.text;
                                            $(".distance_").val( resultkm + " de Ciudad a Ciudad");
                                        
                                        }else{
                                            
                                            var distancia = google.maps.geometry.spherical.computeDistanceBetween(pto1, pto2);
                                            var flotante = parseFloat(distancia/1000);
                                            var resultado = Math.round(flotante*Math.pow(10,3))/Math.pow(10,3);
                                            $(".distance_").val( (resultado) + " KMS de Ciudad a Ciudad");
                                        }
                                        
                                      });
                                      
                                   /**************************************/
                                   /**************************************/
                                   /**************************************/
                                   var markers = [
								    {
								        "title": 'Alibaug',
								        "latLng": pto1,
								        "description": 'Alibaug is a coastal town and a municipal council in Raigad District in the Konkan region of Maharashtra, India.'
								    }
									,
								    {
								        "title": 'Mumbai',
								        "latLng": pto2,
								        "description": 'Mumbai formerly Bombay, is the capital city of the Indian state of Maharashtra.'
								    }
									];
									       
                                    /***************************/
                                    $("input.ltlg1").val(pto1.k+","+pto1.D);
                                    $("input.ltlg2").val(pto2.k+","+pto2.D);
                                    /***************************/
								
								    var mapOptions = {
								        center: markers[0].latLng,
								        zoom: 10,
								        mapTypeId: google.maps.MapTypeId.ROADMAP
								    };
								    var map = new google.maps.Map(document.getElementById("map-canvase"), mapOptions);
								    var infoWindow = new google.maps.InfoWindow();
								    var lat_lng = new Array();
								    var latlngbounds = new google.maps.LatLngBounds();
								    for (i = 0; i < markers.length; i++) {
								        var data = markers[i]
								        var myLatlng = data.latLng;
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
								    
								    $(".hidden-area").hide();

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
				        
                                   /**************************************/
                                   /**************************************/
                                   /**************************************/
                                      
                                    } else {
                                      alert('Geocode was not successful for the following reason: ' + status2);
                                    }
                                 });
                          
                              
                            } else {
                              alert('Geocode was not successful for the following reason: ' + status);
                            }
                           });
                          
                          
                          
                          
    			    }else{
    			        $(".distance_").val("Falta un datos");
    			    }          
                
  
                    
			    
			    
			});
            
            var city_recoleccion = $("select[data-bind='city_recoleccion']");
    		city_recoleccion.on('change', function (e) {
    		    
			    var city_recoleccion_sel = $(this).find("option:selected").val();
			    var address_city_recoleccion_sel = $(this).find("option:selected").text();
			    var address_depto_recoleccion_sel = $("select[data-bind='state_recoleccion'] option:selected").text();
			    
			    var city_entrega_sel = $("select[data-bind='city_entrega']");
			    var address_city_entrega_sel = $("select[data-bind='city_entrega'] option:selected").text();
			    var address_depto_entrega_sel = $("select[data-bind='state_entrega'] option:selected").text();
			    
			    if(city_entrega_sel.val() != "-1" && city_recoleccion_sel != "-1"){
			     
                
                    geocoder = new google.maps.Geocoder();
			        
			              geocoder.geocode({ 
                              
                              'address': address_city_entrega_sel.toLowerCase()
                              + "," + address_depto_entrega_sel.toLowerCase()
                          
                          }, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                
                                   
                                geocoder.geocode( { 
                                    
                                    'address': address_city_recoleccion_sel.toLowerCase()
                                   + "," + address_depto_recoleccion_sel.toLowerCase()
                                    
                                }, function(results2, status2) {
                                    
                                    if (status2 == google.maps.GeocoderStatus.OK) {
                                       
                                    var pto1 = new google.maps.LatLng(
                                                                         results[0].geometry.location.k, 
                                                                         results[0].geometry.location.D
                                                                         );
                                                                         
                                    var pto2 = new google.maps.LatLng(
                                                                         results2[0].geometry.location.k,
                                                                         results2[0].geometry.location.D
                                                                         );  
                                                                         
                                    var directionsService = new google.maps.DirectionsService();
                                    
                                    var request = {
                                        origin:pto1,
                                        destination:pto2,
                                        travelMode: google.maps.TravelMode.DRIVING
                                      };
                                    
                                      directionsService.route(request, function(result, status) {
                                          //console.log(result);
                                        if (status == google.maps.DirectionsStatus.OK) {
                                         
                                          var resultkm = result.routes[0].legs[0].distance.text;
                                          $(".distance_").val( resultkm + " de Ciudad a Ciudad");
                                            
                                        }else{
                                            var distancia = google.maps.geometry.spherical.computeDistanceBetween(pto1, pto2);
                                            var flotante = parseFloat(distancia/1000);
                                            var resultado = Math.round(flotante*Math.pow(10,3))/Math.pow(10,3);
                                            $(".distance_").val( (resultado) + " KMS de Ciudad a Ciudad");
                                        }
                                      }); 
                                      
                                   /**************************************/
                                   /**************************************/
                                   /**************************************/
                                   var markers = [
								    {
								        "title": 'Alibaug',
								        "latLng": pto1,
								        "description": 'Alibaug is a coastal town and a municipal council in Raigad District in the Konkan region of Maharashtra, India.'
								    }
									,
								    {
								        "title": 'Mumbai',
								        "latLng": pto2,
								        "description": 'Mumbai formerly Bombay, is the capital city of the Indian state of Maharashtra.'
								    }
									];
									
									
									/***************************/
                                    $("input.ltlg1").val(pto1.k+","+pto1.D);
                                    $("input.ltlg2").val(pto2.k+","+pto2.D);
                                    /***************************/
								
								
								    var mapOptions = {
								        center: markers[0].latLng,
								        zoom: 10,
								        mapTypeId: google.maps.MapTypeId.ROADMAP
								    };
								    var map = new google.maps.Map(document.getElementById("map-canvase"), mapOptions);
								    var infoWindow = new google.maps.InfoWindow();
								    var lat_lng = new Array();
								    var latlngbounds = new google.maps.LatLngBounds();
								    for (i = 0; i < markers.length; i++) {
								        var data = markers[i]
								        var myLatlng = data.latLng;
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
								    
								    $(".hidden-area").hide();

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
                                   
                                   /**************************************/
                                   /**************************************/
                                   /**************************************/
                                   
                                    //http://www.phonegapspain.com/topic/google-maps-y-calculo-de-distancia-entre-dos-puntos-geograficos/
                                    
                                    } else {
                                      alert('Geocode was not successful for the following reason: ' + status2);
                                    }
                                 });
                          
                              
                            } else {
                              alert('Geocode was not successful for the following reason: ' + status);
                            }
                           });
                
                
                        
			    }else{
			        $(".distance_").val("Falta un datos");
			    }
			    
			});
			
			
     		/*
                estado : 				
                clase_carga_id : 				
                unidad_medida_id :
                cantidad :			
                descripcion_carga :			
                ciudad_recoleccion_carga :				
                ciudad_entrega_carga :				
                coordenada_inicial :			
                coordenada_final :			
                centroide_inicial :			
                centroide_final	:		
                fecha_entrega_carga	:			
                hora_entrega_carga :				
                fecha_recogida_carga :				
                hora_recogida_carga :				
                presupuesto_envio :			
                fecha_inicio_subasta :				
                hora_inicio_subasta :				
                fecha_fin_subasta :				
                hora_fin_subasta :				
                us_id :				
                valor_final_subasta :				
                metadata :			
                fecha_creacion :
                hora_creacion :				
                id_adjunto_parafiscal :				
                id_certificado_bancario :				
                id_rut :

			*/           
			
		$message.find(".message[type]").hide();
			
		$("#create_subasta_container").submit(function(e){
			e.preventDefault();
			
			var $estado = null;				
            var $clase_carga_id = $("select.type_chargue").val(); 				
            var $unidad_medida_id = $("select.unidad_medida").val();
            var $cantidad = $(".cantidad").val();			
            var $descripcion_carga = $(".descripcion").val();			
            var $ciudad_recoleccion_carga = $("select.ciudad_recoleccion").val();				
            var $direccion_recoleccion_carga = $(".direccion_recoleccion").val();				
            var $ciudad_entrega_carga = $("select.ciudad_entrega").val();				
            var $direccion_entrega_carga = $(".direccion_entrega").val();				
            var $coordenada_inicial = $("input.ltlg1").val();
            var $coordenada_final =	 $("input.ltlg2").val();		
            var $centroide_inicial = $("input.ltlg1").val();			
            var $centroide_final = $("input.ltlg2").val();		
            var $fecha_entrega_carga = $(".fecha_entrega").val();			
            var $hora_entrega_carga = $(".hour_entrega").val();			
            var $fecha_recogida_carga = $(".fecha_recoleccion").val();			
            var $hora_recogida_carga = $(".hour_recoleccion").val();				
            var $presupuesto_envio = $(".presupuesto").val();			
            var $fecha_inicio_subasta =	$(".fecha_inicio_subasta").val();			
            var $hora_inicio_subasta = $(".hora_inicio_subasta").val();			
            var $fecha_fin_subasta = $(".fecha_fin_subasta").val();				
            var $hora_fin_subasta =	$(".hora_fin_subasta").val();			
            var $us_id = SUBASTRA.getCookie("myid");				
            var $valor_final_subasta = 0;				
            var $metadata = null;
            var $fecha_creacion = null;
            var $hora_creacion = null;				
            var $id_adjunto_parafiscal = null;				
            var $id_certificado_bancario = null;				
            var $id_rut = null;

			var expresion_datos_generales = $clase_carga_id == "-1" ||
											$cantidad == "" ||
											$unidad_medida_id  == "-1" ||
											$descripcion_carga == "" ||
											$presupuesto_envio ==  "";
											
			var expresion_datos_recoleccion = $fecha_recogida_carga == "" ||
											  $ciudad_recoleccion_carga == "-1" ||
											  $direccion_recoleccion_carga == "" ||
											  $hora_recogida_carga == "";
											  
			var expresion_datos_entrega = $fecha_entrega_carga == "" ||
										  $ciudad_entrega_carga == "-1" ||
										  $direccion_entrega_carga == "" ||
										  $hora_entrega_carga == "";
											  
											  
			  if ($("#checkbox-programar").is(":checked")) {
				
					var expresion_publicacion = $fecha_fin_subasta == "" ||
										  	  	$hora_fin_subasta == "";  
				
					
					$fecha_inicio_subasta = "instant";
			    	$hora_inicio_subasta= "instant";
			    	//$fecha_inicio_subasta = SUBASTRA.getcurrentDate();
			    	//var mhours = new Date().getHours();
			    	//var mminutes = new Date().getMinutes();
			    	//$hora_inicio_subasta = mhours + ":" + mminutes;
			    	
			   }else{
			   	
			       	var expresion_publicacion = $fecha_inicio_subasta == "" ||
										  		$hora_inicio_subasta == "" ||
										  		$fecha_fin_subasta == "" ||
										  		$hora_fin_subasta == "";
			   }

											  
			if (
				expresion_datos_generales ||
				expresion_datos_recoleccion ||
				expresion_datos_entrega ||
				expresion_publicacion
				){
				$message.find(".message[type=1]").show();
			
 				$.mobile.loading( 'hide', {
						text: 'foo',
						textVisible: false,
						theme: 'z',
						html: ""
				});
				
				$( "#pop-up-warning" ).popup( "open" );
				
			}else{
				
				
				console.log({
								id : null,
								estado : $estado,			
					            clase_carga_id : $clase_carga_id,				
					            unidad_medida_id : $unidad_medida_id,
					            cantidad : $cantidad,			
					            descripcion_carga : $descripcion_carga,			
					            ciudad_recoleccion_carga : $ciudad_recoleccion_carga,			
					            direccion_recoleccion_carga : $direccion_recoleccion_carga,			
					            ciudad_entrega_carga : $ciudad_entrega_carga,			
					            direccion_entrega_carga : $direccion_entrega_carga,				
					            coordenada_inicial : $coordenada_inicial,	
					            coordenada_final : $coordenada_final,			
					            centroide_inicial : $centroide_inicial,			
					            centroide_final : $centroide_final,		
					            fecha_entrega_carga : $fecha_entrega_carga,			
					            hora_entrega_carga : $hora_entrega_carga,			
					            fecha_recogida_carga : $fecha_recogida_carga, 		
					            hora_recogida_carga : $hora_recogida_carga,			
					            presupuesto_envio :	$presupuesto_envio,		
					            fecha_inicio_subasta : $fecha_inicio_subasta,			
					            hora_inicio_subasta : $hora_inicio_subasta,		
					            fecha_fin_subasta : $fecha_fin_subasta,				
					            hora_fin_subasta : $hora_fin_subasta,			
					            us_id : $us_id,			
					            valor_final_subasta : $valor_final_subasta,				
					            metadata : $metadata,
					            fecha_creacion : $fecha_creacion,
					            hora_creacion : $hora_creacion, 				
					            id_adjunto_parafiscal : $id_adjunto_parafiscal, 				
					            id_certificado_bancario : $id_certificado_bancario,				
					            id_rut : $id_rut
        					});
        			
        		debugger;
				
				$.mobile.loading( 'show', {
					text: 'foo',
					textVisible: false,
					theme: 'z',
					html: ""
				});
			
				$.ajax({
        			type 	: "POST",
        			url		: webserviceURL + "/create/subasta",
        			data	: {
        				id : null,
						estado : $estado,			
			            clase_carga_id : $clase_carga_id,				
			            unidad_medida_id : $unidad_medida_id,
			            cantidad : $cantidad,			
			            descripcion_carga : $descripcion_carga,			
			            ciudad_recoleccion_carga : $ciudad_recoleccion_carga,			
			            direccion_recoleccion_carga : $direccion_recoleccion_carga,			
			            ciudad_entrega_carga : $ciudad_entrega_carga,			
			            direccion_entrega_carga : $direccion_entrega_carga,				
			            coordenada_inicial : $coordenada_inicial,	
			            coordenada_final : $coordenada_final,			
			            centroide_inicial : $centroide_inicial,			
			            centroide_final : $centroide_final,		
			            fecha_entrega_carga : $fecha_entrega_carga,			
			            hora_entrega_carga : $hora_entrega_carga,			
			            fecha_recogida_carga : $fecha_recogida_carga, 		
			            hora_recogida_carga : $hora_recogida_carga,			
			            presupuesto_envio :	$presupuesto_envio,		
			            fecha_inicio_subasta : $fecha_inicio_subasta,			
			            hora_inicio_subasta : $hora_inicio_subasta,		
			            fecha_fin_subasta : $fecha_fin_subasta,				
			            hora_fin_subasta : $hora_fin_subasta,			
			            us_id : $us_id,			
			            valor_final_subasta : $valor_final_subasta,				
			            metadata : $metadata,
			            fecha_creacion : $fecha_creacion,
			            hora_creacion : $hora_creacion, 				
			            id_adjunto_parafiscal : $id_adjunto_parafiscal, 				
			            id_certificado_bancario : $id_certificado_bancario,				
			            id_rut : $id_rut
        			},
        			success: function(response){
        				
        				//console.log(response);
        				
        				$.mobile.loading( 'hide', {
								text: 'foo',
								textVisible: false,
								theme: 'z',
								html: ""
						});
						
						$( "#pop-up-sucess" ).popup( "open" );

        			}
    	    	});
				

			}
			
    			
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
        console.log(o);
   //     $(".content-each-users").append(tmpl("each_user", o));
    });
    
    //console.log(obj);
    
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
            	var res = JSON.parse(dataCheck);
            	if(res.status == "OK"){
            		alert("El usuario ha sido autentificado con éxito");
            		$.ajax({
				        type: "POST",
				        url: webserviceURL + "/users/all",
				        data: null,
				        success: function (dataCheck) {
				            var respuesta = JSON.parse(dataCheck);
				            mostrarUsuarios(respuesta);
				        }
				    });
            	}
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
                //console.log(res);
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
