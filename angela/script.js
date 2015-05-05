$(document).ready(function(){
    $("#r_aplicacion").change(function(){
        $("#apli_text").attr('disabled','disabled');
        $("#otra_text").attr('disabled','disabled');
        if($(this).is(':checked') == true){
          $("#apli_text").removeAttr('disabled');
        }
    });
    $("#r_otra").change(function(){
        $("#apli_text").attr('disabled','disabled');
        $("#otra_text").attr('disabled','disabled');
        if($(this).is(':checked') == true){
          $("#otra_text").removeAttr('disabled');
        }
    });
    
    $("input[id^='ra_']").change(function(){
        $("#apli_text").attr('disabled','disabled');
        $("#otra_text").attr('disabled','disabled');
    });

    $("#enviar_datos").click(function(){
        var seleccion = $("input[name='optradio']:checked").val();
        var texto = '';
        if(seleccion == 'aplicacion'){
            texto = $("#apli_text").val();
            seleccion = 'Otra aplicación existente';
        }
        if(seleccion == 'Otra'){
            texto = $("#otra_text").val();
        }
        $.ajax({
            type: "POST",
            url: 'email_retiro.php',
            data: {
                Opcion:seleccion,
                Texto:texto
            },
            success: function (data) {
                $("input[name='optradio']:checked").removeAttr('checked');
                alert(data);
            }
        });
    });
    
});