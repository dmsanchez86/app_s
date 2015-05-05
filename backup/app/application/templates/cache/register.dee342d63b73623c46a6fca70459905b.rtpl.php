<?php if(!class_exists('raintpl')){exit;}?><link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>

<script type="text/javascript">
	$(document).ready(function(){
		$(".send_user").submit(function(e){
			e.preventDefault();

			console.log(new FormData(this));

			$.ajax({
				url: $(this).attr("action"), // Url to which the request is send
				type: "POST",             // Type of request to be send, called as method
				data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
				contentType: false,       // The content type used when sending data to the server.
				cache: false,             // To unable request pages to be cached
				processData:false,        // To send DOMDocument or non processed data file it is set to false
				success: function(data){
					console.log(data);
			 	}
			});

		});
	});

</script>
<h1><?php echo var_dump( $data );?></h1>
<div class="container">
	<div class="row">
        <div class="col-sm-12">
            <legend>Mr. Sosa:</legend>
        </div>
        <!-- panel preview -->
        <div class="col-sm-5">
            <h4>Add payment:</h4>
            <form class="send_user" action="http://72.29.87.162/~gestionaloap/GlipZopp-master/index.php/registro/usuario" method="post" enctype="multipart/form-data">
            <div class="panel panel-default">
                <div class="panel-body form-horizontal payment-form">
                    <div class="form-group">
                        <label for="concept" class="col-sm-3 control-label">Nombre</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="concept" name="concept">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="description" class="col-sm-3 control-label">Apellido</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="description" name="description">
                        </div>
                    </div> 
                    <div class="form-group">
                        <label for="amount" class="col-sm-3 control-label">Imagen</label>
                        <div class="col-sm-9">
                            <input type="file" class="form-control" id="file_avatar" name="amount">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="status" class="col-sm-3 control-label">Genero</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="status" name="status">
                                <option>masculino</option>
                                <option>Femenimo</option>
                            </select>
                        </div>
                    </div> 
                    <div class="form-group">
                        <label for="date" class="col-sm-3 control-label">Sitio Web</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="date" name="date">
                        </div>
                    </div> 
                    <div class="form-group">
                        <label for="date" class="col-sm-3 control-label">Fecha Nacimiento</label>
                        <div class="col-sm-9">
                            <input type="date" class="form-control" id="date" name="date">
                        </div>
                    </div> 
                    <div class="form-group">
                        <label for="date" class="col-sm-3 control-label">Pais</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="date" name="date">
                        </div>
                    </div> 
                    <div class="form-group">
                        <label for="date" class="col-sm-3 control-label">Correo Electronico</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="date" name="date">
                        </div>
                    </div> 
                    <input type="submit" class="btn" value="crear Usuario">
                </div>
            </div>  
            </form>          
        </div> <!-- / panel preview -->
	</div>
</div>