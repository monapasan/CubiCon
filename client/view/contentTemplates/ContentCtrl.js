Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function ContentCtrl(node, data, options){
		this.node = node.addChild();
		setComponents.call(this,this.node);
    }

	ContentCtrl.prototype.show = function show() {
		this.node.show();
	};
	ContentCtrl.prototype.hide = function hide() {
		this.node.hide();
	};
	ContentCtrl.prototype.emit = function emit(event, payload) {
		this.node.emit(event, payload);
	};
	function setComponents(node){
		var components = {
			onMount:this.hide(),
			onReceive: onReceive.bind(this)
		};
		node.addComponent(components);
		return node;
	}

	function onReceive(event,payload){
		if(event === 'openArticleContent'){
			openContent.call(this, payload);
		}
	}

	function openContent(payload){
		if(payload.type === "text"){
			new App.TextTemplate(this.node,payload.data);
		}
	}

    App.ContentCtrl = ContentCtrl;
});
