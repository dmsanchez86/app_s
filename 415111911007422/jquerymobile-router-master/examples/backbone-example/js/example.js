var M={}, V={}, C={};

var Data=Backbone.Collection.extend({
	url: "services/getData.js"
});

var DetailView=Backbone.View.extend({
	//template: _.template('<div class="id">Id: <%= id %></div><div class="title">Titolo: <%= title %></div><div class="text">Testo: <%= text %></div>'),
	template:function(){
		this.render();
    	return this.el;
	},
	initialize: function(){
		this.listenTo(this.model, "reset", this.render);
	},
	url: function() {
    	return 'index.html';
  	},
	render: function(){
		if (!TemplateStore[this.url()])
      	return Backbone.sync('read', this, {});
    	return this.$el.html(_.template(TemplateStore[this.url()], this.model.attributes));
	}
});


M.data=new Data();

C.renderDetail=function(type, match, ui, page){
	if (!match){
		return;
	}
	if (!V.detail){
		V.detail=new DetailView({
			model: M.data, detailId: null, el: $(page).find(":jqmData(role='content')")
		});
	}
	var params=C.router.getParams(match[1]);
	if (params){
		// bad backbone usage here
		V.detail.options.detailId=params.id;
	}
	if (M.data.isEmpty()){
		M.data.fetch({ reset: true });
	} else {
		V.detail.render();
	}
};


C.renderPage = function (type, match, ui) {
	console.log('render Page - ' + type, 'match: ' + match);
};

C.router=new $.mobile.Router({
	"#index": function(){
		console.log("INDEX!");
	},
	"#detail([?].*)?": {
		handler: C.renderDetail, events: "bs"
	},
	".": {
		handler: C.renderPage, events: "bc"
	}
});

