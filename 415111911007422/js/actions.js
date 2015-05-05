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