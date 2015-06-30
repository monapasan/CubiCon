Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function SpeadReader(node, data, options){
		this.node = node;
        this.data = data;
        this.options = _.extend(this.DEFAULT_PROPERTIES, options);
		this.text = createSpeadReader.call(this, this.node);
    }

	function createSpeadReader(node) {
        var sr = node.addChild().setAlign(0, 0.2).setSizeMode(0,1).setAbsoluteSize(null, 50);
        var el = new DOMElement(sr,{
            content:'Touche this please',
            properties:{
                'border': "solid 2px black"
            }
        });
        sr.addUIEvent('touchstart');
        sr.onReceive = function(e){
            if(e == 'touchstart'){
                this.sprayReader = new SprayReader(el);
                this.sprayReader.setInput(this.data.text);
                this.sprayReader.setWpm(350);
                this.sprayReader.start();
            }
        }.bind(this);

	}
    SpeadReader.prototype.DEFAULT_PROPERTIES = {
        spritz: true,
        text: true,
        audio: true,
        amount: 3,
        margin: 100,
        colorScheme: 'white'
    };
    App.SpeadReader = SpeadReader;
});
