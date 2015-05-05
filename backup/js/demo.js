$().ready(load_document);

function load_document(){
    $(window).keyup(key_up);
    $('.view_1').fadeIn(2000);
    $('.mask .next').click(change_demo);
    $('.mask .prev').click(change_demo);
    $('.mask .close').click(close_demo);
}

function key_up(e){
    var key = e.keyCode;
    if(key === 39 || key === 38 || key === 13){
        $('.mask .next').click();
    }else if(key === 37 || key === 40 ){
        $('.mask .prev').click();
    }else if(key === 27){
        $('.mask .close').click();
    }
}

function change_demo(e){
    var direccion = e.target.className;
    var view = $('.view_image');
    var mask = $('.mask');
    var demo_view = view.attr('view');
    var tope = parseInt(view.attr('end'));
    var views = $('.mask .view_image > div');
    
    if(direccion === "next"){
        $('.mask .prev').css('visibility','visible');
        demo_view++;
    }else{
        $('.mask .next').css('visibility','visible');
        demo_view--;
    }
    
    if(demo_view === 1 || demo_view === 0){ // si el demo esta en la imagen 1, siempre sera la primera
        demo_view = 1;
        $('.mask .prev').css('visibility','hidden');
    }else if(demo_view == tope){
        demo_view = tope;
        $('.mask .next').css('visibility','hidden');
    }else if(demo_view === tope+1){ // si llega al tope de los demos siempre sera el tope
        demo_view = tope;
    }
    
    hide_views();
    $(views[demo_view-1]).fadeIn(100);
    
    view.attr('view',demo_view);
}

function close_demo(){
    history.back();
}

function hide_views(){
    var views = $('.mask .view_image > div');
    views.each(function( index, value ) {
        $(value).fadeOut(100);
    });
}