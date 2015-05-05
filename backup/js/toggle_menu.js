$('.toggle-menu').unbind('click').click(function(){
    $(this).parent().next('.options-menu').slideToggle(300);
});