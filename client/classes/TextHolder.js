Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function TextHolder(node, data, options){
		this.node = node;
        this.data = data;
        this.options = _.extend(this.DEFAULT_PROPERTIES, options);
		this.text = createTextHolder.call(this, this.node);
    }

	function createTextHolder(node) {
		var text = node.addChild()
						.setAlign(0.5, 0.2)
						.setSizeMode(0, 2)
						.setProportionalSize(0.8,undefined)
						.setMountPoint(0.5,0);
		new DOMElement(text,{
			classes: ['staticText'],
			content: this.data.text
		});
	}
    TextHolder.prototype.DEFAULT_PROPERTIES = {
        spritz: true,
        text: true,
        audio: true,
        amount: 3,
        margin: 100,
        colorScheme: 'white'
    };
    App.TextHolder = TextHolder;
});
