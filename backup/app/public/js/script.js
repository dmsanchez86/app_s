$(document).ready(function(){
    //create a new WebSocket object.
    var wsUri = "ws://72.29.87.162:5631/~gestionaloap/application/server.php";   
    websocket = new WebSocket(wsUri); 
    
    websocket.onopen = function(ev) { // connection is open 
        $('#message_box').append("<div class=\"system_msg\">Connected!</div>"); //notify user
    }

    $('.btn.btn-primary.btn-sm').click(function(){ //use clicks message send button   
        var mymessage = $('.form-control.input-sm.chat_input').val(); //get message text
        var myname = $('#name').val(); //get user name
        
        if(myname == ""){ //empty name?
            alert("Enter your Name please!");
            return;
        }
        if(mymessage == ""){ //emtpy message?
            alert("Enter Some message Please!");
            return;
        }
        
        //prepare json data
        var msg = {
        message: mymessage,
        name: myname,
        color : '<?php echo $colours[$user_colour]; ?>'
        };
        //convert and send data to server
        websocket.send(JSON.stringify(msg));
    });
    
    //#### Message received from server?
    websocket.onmessage = function(ev) {
        var msg = JSON.parse(ev.data); //PHP sends Json data
        var type = msg.type; //message type
        var umsg = msg.message; //message text
        var uname = msg.name; //user name
        var ucolor = msg.color; //color

        if(type == 'usermsg') 
        {
            $('.panel-body.msg_container_base').append('<div class="row msg_container base_receive"><div class="col-md-2 col-xs-2 avatar"></div><div class="col-md-10 col-xs-10"><div class="messages msg_receive"><p>'+umsg+'</div></div></div>');
        }
        if(type == 'system')
        {
            $('#message_box').append("<div class=\"system_msg\">"+umsg+"</div>");
        }
        
        $('#message').val(''); //reset text
    };
    
    websocket.onerror   = function(ev){$('#message_box').append("<div class=\"system_error\">Error Occurred - "+ev.data+"</div>");}; 
    websocket.onclose   = function(ev){$('#message_box').append("<div class=\"system_msg\">Connection Closed</div>");}; 
});