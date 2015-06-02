var SUBASTRA = {};

SUBASTRA.scaleContentToDevice = function(){
    scroll(0, 0);
    var content = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
    $(".ui-content").height(content);
};

SUBASTRA.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

SUBASTRA.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

SUBASTRA.clearAllSession =function(){
  
  if(SUBASTRA.getCookie("myid") != ""){
    $.ajax({
  				type: "GET",
  				url: webserviceURL + "/kill/" + SUBASTRA.getCookie("myid"),
  				data: null,
  				success: function(res){
  				  var response = JSON.parse(res);
  				  
    				  if(response.status=="OK"){
    				      document.cookie = "";  
    				  }else{
    				    console.log("NO SE PUDO ELIMINAR LA SESION");
    				  }
  				  
  				}
  	  });
  }
  
};


SUBASTRA.LoadNav = function(thispage){

  thispage.find(".navar_type[nav-type]").hide();

  if(thispage.find(".navar_type").exists()){
    

    var myrole = SUBASTRA.getCookie("rol_id");
    var $myid = SUBASTRA.getCookie("myid");


    thispage.find(".navar_type[nav-type=" + myrole + "]").show();

    console.log(".navar_type[nav-type=" + myrole + "]");

      setTimeout(function(){
          thispage.find(".navar_type[nav-type=" + myrole + "]").find(".ulink_action").unbind("click").click(function(e){
            e.preventDefault();   
              var m_id = $(this).attr("bind");
              $.mobile.changePage( m_id + "?iduser="+ $myid );
          });
      }, 1000);

  }

};

SUBASTRA.validateSession = function(referrer){

referrer.find("div[data-role=content]").hide();
referrer.find(".loader-wrapper-page .message[type]").hide();
referrer.find(".loader-wrapper-page .message[type=2]").show();

var referrername = referrer.attr("id");

var cookieSessionId = SUBASTRA.getCookie("myid");
var cookieRolePermisions = SUBASTRA.getCookie("role_permisions");

if(cookieSessionId =="" && cookieRolePermisions =="" ){
    if(referrername == "login-page"){
      referrer.find("div[data-role=content]").show();
      referrer.find(".loader-wrapper-page .message[type]").hide();
    }else if(referrername == "page-register"){
      referrer.find("div[data-role=content]").show();
      referrer.find(".loader-wrapper-page .message[type]").hide();
    }
    else if(referrername == "page-dudes"){
      referrer.find("div[data-role=content]").show();
      referrer.find(".loader-wrapper-page .message[type]").hide();
    }
    else{
      referrer.find(".loader-wrapper-page .message[type=1]").show();
      referrer.find(".loader-wrapper-page .message[type=2]").hide();
      referrer.find(".loader-wrapper-page .message[type=3]").hide();
      referrer.find(".loader-wrapper-page .message[type=4]").hide();
      referrer.find("div[data-role=content]").hide();
    }
  }else{
    if(referrername == "login-page"){
      referrer.find(".loader-wrapper-page .message[type=4]").show();
      referrer.find(".loader-wrapper-page .message[type=1]").hide();
      referrer.find(".loader-wrapper-page .message[type=2]").hide();
      referrer.find(".loader-wrapper-page .message[type=3]").hide();

      var $myrol  = SUBASTRA.getCookie("rol_id");
      var $userId  = SUBASTRA.getCookie("myid");
      
      if($myrol=="3"){   
        $.mobile.changePage( "#page-profile" + "?referrer=login&iduser="+$userId, {
                  transition: "flip",
                  reverse: false
                });
      }else if($myrol=="2"){
        $.mobile.changePage( "#page-profile" + "?referrer=login&iduser="+$userId, {
                  transition: "flip",
                  reverse: false
                });
      }else if($myrol=="1"){
        $.mobile.changePage( "#page-admin-menu" + "?referrer=login&iduser="+$userId, {
                  transition: "flip",
                  reverse: false
                });
      }

      referrer.find("div[data-role=content]").hide();
    }else if(referrername == "page-register"){
      referrer.find(".loader-wrapper-page .message[type=4]").show();
      referrer.find(".loader-wrapper-page .message[type=1]").hide();
      referrer.find(".loader-wrapper-page .message[type=2]").hide();
      referrer.find(".loader-wrapper-page .message[type=3]").hide();
      referrer.find("div[data-role=content]").hide();
    }else{
      if(cookieRolePermisions.indexOf(referrername)==-1){
        referrer.find(".loader-wrapper-page .message[type=3]").show();
        referrer.find(".loader-wrapper-page .message[type=4]").hide();
        referrer.find(".loader-wrapper-page .message[type=1]").hide();
        referrer.find(".loader-wrapper-page .message[type=2]").hide();
        referrer.find("div[data-role=content]").hide();        
      }else{
        referrer.find(".loader-wrapper-page .message[type=1]").hide();
        referrer.find(".loader-wrapper-page .message[type=2]").hide();
        referrer.find(".loader-wrapper-page .message[type=3]").hide();
        referrer.find(".loader-wrapper-page .message[type=4]").hide();  
        referrer.find("div[data-role=content]").show();
      }
    }
  }
};


SUBASTRA.getcurrentDate = function(){
  
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = yyyy+'-'+mm+'-'+dd;
    
    return today
}


SUBASTRA.validateEmail=function($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
};

SUBASTRA.deleteAndClearCookies=function(name){
  // This function will attempt to remove a cookie from all paths.
  var pathBits = location.pathname.split('/');
  var pathCurrent = ' path=';

  // do a simple pathless delete first.
  document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';

  for (var i = 0; i < pathBits.length; i++) {
      pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
      document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
  }
};

SUBASTRA.listenTime = function(id){
  
  return setInterval(function(){ 
        
    	$.ajax({
    		type: "POST",
    		url: webserviceURL + "/subasta/socket_servicetime",
    		data: {
    			_id: id
    		},
    		success: function (dataCheck) {
    		    var response = JSON.parse(dataCheck);
        		//console.log(response);
        		/*if(response.status=="FINISH"){
        		    console.log("finish");
        		}else if(response.status=="ACTIVE"){
        		    console.log("active");
        		}*/
        		
    		}
      	});
        
        
  }, 500);

};

SUBASTRA.listen = function(id){
  
  var i = 0;
  return setInterval(function(){ 
    
  	$.ajax({
			type: "POST",
			url: webserviceURL + "/subasta/socket_service",
			data: {
				_id: id,	
				_metadata: $(".submit-price-participant").attr("metadata")	
			},
			success: function (dataCheck) {
			  var response = JSON.parse(dataCheck);
			  
			  if(response.status=="INITIALIZING"){
			     console.log("inicio");
			  }else if(response.status=="OK_STATUS"){
			     console.log("no hay nada que sincronizar");
			  }else if(response.status=="REFRESH_STATUS"){
			      
			      $(".panel-participants-loader").show();
			      
			      setTimeout(function(){ 
			        
	            	var participants = JSON.parse(response.data.participants);
      					
      					$(".table.table-participants").empty();
      					
      					var newsort = participants.sort(function(a,b) { return parseFloat(a.amount) - parseFloat(b.amount) } );
      
      					newsort.forEach(function(obx,ix){
      						$(".table.table-participants").append(tmpl("row_participants", obx));
      					});
      					
      					$(".header-3.price-rule").text(newsort[0].amount);
      					$(".submit-price-participant").attr("metadata",response.data.participants);
      					$(".panel-participants-loader").hide();	        
			        
			      }, 500);
  					
			  }
			 
			}
  	});
			
  }, 500);
  
}

SUBASTRA.clearTimer = function(){
  clearInterval(interval);
  clearInterval(newtime);
}

SUBASTRA.setTime = function(type,date_to,container){

  var str = moment(date_to).countdown().toString();

  if(str=="1 second"){
    clearInterval(newtime);
    clearInterval(interval);

     $.ajax({
         type: "POST",
         url: webserviceURL + "/subasta/setWinner",
         data: null,
         success: function (dataCheck) {
           console.log(dataCheck);
        }
    });

  }else{
    $(container).html(str);
    newtime = window.setTimeout("SUBASTRA.setTime('" + type + "','" + date_to + "','" + container + "');", 1000);    
  }

}

SUBASTRA.toast = function(msx){
  
  /*$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>" + msx + "</h3></div>")
	.css({ display: "block", 
		opacity: 0.90, 
		position: "fixed",
		padding: "0px",
		"text-align": "center",
		"background": "rgb(237, 46, 61)",
		"border": "1px solid white",
		"border-radius": "14px",
		"color": "#ffffff",
		"font-size": "17px",
		width: "270px",
		left: ($(window).width() - 84)/2,
		top: $(window).height()-100 })
	  .appendTo( $.mobile.pageContainer ).delay( 1500 )
    .fadeOut( 400, function(){
		$(this).remove();
	});*/

  $.notific8('<p class="tt">AVISO</p><p class="c">' + msx + '</p>', {
        theme: 'smoke',
        horizontalEdge: 'bottom',
        icon: 'globe-world',
        life: 5000
  });

  try{
    navigator.vibrate(1000);
	}
  catch(e){
    console.log("vibrate not support");
  }
  
}

SUBASTRA.setTimeDeprecated = function(type,date_to,container){
    
    //like 
    //new Date(Date.parse("2005-07-08T00:00:00")).toString()
    //new Date().toString()
    now = new Date();
    y2k = new Date(Date.parse(date_to));
    days = (y2k - now) / 1000 / 60 / 60 / 24;
    daysRound = Math.floor(days);
    hours = (y2k - now) / 1000 / 60 / 60 - (24 * daysRound);
    hoursRound = Math.floor(hours);
    minutes = (y2k - now) / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound);
    minutesRound = Math.floor(minutes);
    seconds = (y2k - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
    secondsRound = Math.round(seconds);
    sec = (secondsRound == 1) ? " segundo" : " segundos";
    min = (minutesRound == 1) ? " minuto" : " minutos, ";
    hr = (hoursRound == 1) ? " hora" : " horas, ";
    dy = (daysRound == 1)  ? " día" : " d&iacute;as, "
    //$(".time-rest span").text("Tiempo Restante :" + daysRound  + dy + hoursRound + hr + minutesRound + min + secondsRound + sec);
    $(container).html("" + daysRound  + dy + hoursRound + hr + " " +  minutesRound + min + " " +secondsRound + sec);
 
    newtime = window.setTimeout("SUBASTRA.setTime('" + type + "','" + date_to + "','" + container + "');", 1000);

}

//corrije un bug donde cuando se invoca el datepicker no les da estilos
SUBASTRA.fixDateOnCreateSubasta = function(){
  
    $("input.fecha_entrega").focus(function(){
      $(".ui-datepicker") 
      .find( ".ui-datepicker-calendar" ).addClass( "mobile-enhanced" ).end()
      .find(".ui-datepicker-calendar a,.ui-datepicker-prev,.ui-datepicker-next").addClass("ui-btn").end()
      .find(".ui-datepicker-prev").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-l ui-shadow").end()
      .find(".ui-datepicker-next").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-r ui-shadow").end()
      .find(".ui-datepicker-header").addClass("ui-body-a ui-corner-top").removeClass("ui-corner-all").end()
      .find(".ui-datepicker-calendar th" ).addClass("ui-bar-a").end()
      .find(".ui-datepicker-calendar td" ).addClass("ui-body-a").end()
      .find(".ui-datepicker-calendar a.ui-state-active").addClass("ui-btn-active").end()
      .find(".ui-datepicker-calendar a.ui-state-highlight").addClass("ui-btn-up-a").end().find(".ui-state-disabled").css("opacity","1");
    });

    $("input.fecha_recoleccion").focus(function(){
      $(".ui-datepicker") 
      .find( ".ui-datepicker-calendar" ).addClass( "mobile-enhanced" ).end()
      .find(".ui-datepicker-calendar a,.ui-datepicker-prev,.ui-datepicker-next").addClass("ui-btn").end()
      .find(".ui-datepicker-prev").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-l ui-shadow").end()
      .find(".ui-datepicker-next").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-r ui-shadow").end()
      .find(".ui-datepicker-header").addClass("ui-body-a ui-corner-top").removeClass("ui-corner-all").end()
      .find(".ui-datepicker-calendar th" ).addClass("ui-bar-a").end()
      .find(".ui-datepicker-calendar td" ).addClass("ui-body-a").end()
      .find(".ui-datepicker-calendar a.ui-state-active").addClass("ui-btn-active").end()
      .find(".ui-datepicker-calendar a.ui-state-highlight").addClass("ui-btn-up-a").end().find(".ui-state-disabled").css("opacity","1");
    });  
    
    $("input.fecha_inicio_subasta").focus(function(){
      $(".ui-datepicker") 
      .find( ".ui-datepicker-calendar" ).addClass( "mobile-enhanced" ).end()
      .find(".ui-datepicker-calendar a,.ui-datepicker-prev,.ui-datepicker-next").addClass("ui-btn").end()
      .find(".ui-datepicker-prev").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-l ui-shadow").end()
      .find(".ui-datepicker-next").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-r ui-shadow").end()
      .find(".ui-datepicker-header").addClass("ui-body-a ui-corner-top").removeClass("ui-corner-all").end()
      .find(".ui-datepicker-calendar th" ).addClass("ui-bar-a").end()
      .find(".ui-datepicker-calendar td" ).addClass("ui-body-a").end()
      .find(".ui-datepicker-calendar a.ui-state-active").addClass("ui-btn-active").end()
      .find(".ui-datepicker-calendar a.ui-state-highlight").addClass("ui-btn-up-a").end().find(".ui-state-disabled").css("opacity","1");
    });

    $("input.fecha_fin_subasta").focus(function(){
      $(".ui-datepicker") 
      .find( ".ui-datepicker-calendar" ).addClass( "mobile-enhanced" ).end()
      .find(".ui-datepicker-calendar a,.ui-datepicker-prev,.ui-datepicker-next").addClass("ui-btn").end()
      .find(".ui-datepicker-prev").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-l ui-shadow").end()
      .find(".ui-datepicker-next").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-r ui-shadow").end()
      .find(".ui-datepicker-header").addClass("ui-body-a ui-corner-top").removeClass("ui-corner-all").end()
      .find(".ui-datepicker-calendar th" ).addClass("ui-bar-a").end()
      .find(".ui-datepicker-calendar td" ).addClass("ui-body-a").end()
      .find(".ui-datepicker-calendar a.ui-state-active").addClass("ui-btn-active").end()
      .find(".ui-datepicker-calendar a.ui-state-highlight").addClass("ui-btn-up-a").end().find(".ui-state-disabled").css("opacity","1");
    });

    $("input.desde-filter-input").focus(function(){
      $(".ui-datepicker") 
      .find( ".ui-datepicker-calendar" ).addClass( "mobile-enhanced" ).end()
      .find(".ui-datepicker-calendar a,.ui-datepicker-prev,.ui-datepicker-next").addClass("ui-btn").end()
      .find(".ui-datepicker-prev").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-l ui-shadow").end()
      .find(".ui-datepicker-next").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-r ui-shadow").end()
      .find(".ui-datepicker-header").addClass("ui-body-a ui-corner-top").removeClass("ui-corner-all").end()
      .find(".ui-datepicker-calendar th" ).addClass("ui-bar-a").end()
      .find(".ui-datepicker-calendar td" ).addClass("ui-body-a").end()
      .find(".ui-datepicker-calendar a.ui-state-active").addClass("ui-btn-active").end()
      .find(".ui-datepicker-calendar a.ui-state-highlight").addClass("ui-btn-up-a").end().find(".ui-state-disabled").css("opacity","1");
    });

    $("input.hasta-filter-input").focus(function(){
      $(".ui-datepicker") 
      .find( ".ui-datepicker-calendar" ).addClass( "mobile-enhanced" ).end()
      .find(".ui-datepicker-calendar a,.ui-datepicker-prev,.ui-datepicker-next").addClass("ui-btn").end()
      .find(".ui-datepicker-prev").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-l ui-shadow").end()
      .find(".ui-datepicker-next").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-r ui-shadow").end()
      .find(".ui-datepicker-header").addClass("ui-body-a ui-corner-top").removeClass("ui-corner-all").end()
      .find(".ui-datepicker-calendar th" ).addClass("ui-bar-a").end()
      .find(".ui-datepicker-calendar td" ).addClass("ui-body-a").end()
      .find(".ui-datepicker-calendar a.ui-state-active").addClass("ui-btn-active").end()
      .find(".ui-datepicker-calendar a.ui-state-highlight").addClass("ui-btn-up-a").end().find(".ui-state-disabled").css("opacity","1");
    });

};


jQuery.fn.exists = function(){return this.length;};

function getFormattedDate(date){
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return month + '/' + day + '/' + year;
}

(function(){
  var cache = {};
 
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();


