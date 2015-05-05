
/* ==========================================================================
 * A "Hello World"-like example of Javascript using the MVC pattern.
 * ========================================================================== */



/*
 * Model
 */

// a model is where the data object is created.
var ModelExample = function ( data ) {
	// the model instance has a property called "myProperty"
	// created from the data's "yourProperty".
	this.myProperty = data.yourProperty;

	// return the model instance
	return this;
};

// a model constructor might have a function that creates new model instances.
ModelExample.find = function ( id ) {
	// data used to create a new model may come from anywhere
	// but in this example data comes from this inline object.
	var ourData = {
		'123': {
			yourProperty: 'Hello World'
		}
	};

	// get a new model instance containing our data.
	var model = new ModelExample(ourData[id]);

	// return the model.
	return model;
};



/*
 * View
 */

// a view is where the output is created.
var ViewExample = function ( model ) {
	this.model = model;

	return this;
};

// a view might have a function that returns the rendered output.
ViewExample.prototype.output = function () {
	// data used to create a template may come from anywhere
	// but in this example template comes from this inline string.
	var ourData = '<h1><%= myProperty %></h1>';

	// store this instance for reference in the replace function below
	var instance = this;

	// return the template using values from the model.
	return ourData.replace(/<%=\s+(.*?)\s+%>/g, function (m, m1) {
		return instance.model[m1];
	});
};

// a view might have a function that renders the output.
ViewExample.prototype.render = function () {
	// this view renders to the element with the id of "output"
	document.getElementById('output').innerHTML = this.output();
};



/*
 * Controller
 */

// a controller is where the model and the view are used together.
var ControllerExample = function () {
	return this;
};

// this function uses the Model and View together.
ControllerExample.prototype.loadView = function ( id ) {
	// get the model.
	var model = ModelExample.find( id );

	// get a new view.
	var view = new ViewExample(model);

	// run the view's "render" function
	view.render();
};




/*
 * Example
 */

function bootstrapper() {
	var controller = new ControllerExample;
	controller.loadView(123);
}

bootstrapper();