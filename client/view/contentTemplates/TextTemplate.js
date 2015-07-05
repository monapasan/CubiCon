Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function TextTemplate(node, data){
		this.node = node.addChild();
		this.defaultTemplate = createDefaultTemplate.call(this,this.node, data);
		this.core = createCore.call(this, this.node, this.defaultTemplate.data, this.defaultTemplate.colorScheme);
    }


    TextTemplate.prototype.show = function show() {
        this.node.show();
    };
    TextTemplate.prototype.hide = function hide() {
        this.node.hide();
    };
    TextTemplate.prototype.emit = function emit(event, payload) {
        this.node.emit(event, payload);
    };
	function createDefaultTemplate(node, data){
		var options = {
			type: "text",
			includeImg: true
		};
		return new App.DefaultTemplate(node, data, options);
	}

	function createCore(node, data, colorScheme) {
		var textSwapperNode = node.addChild().setAlign(0, 0.5);
		return new App.TextSwapper(textSwapperNode, data, {colorScheme: colorScheme});
	}

    App.TextTemplate = TextTemplate;

});
