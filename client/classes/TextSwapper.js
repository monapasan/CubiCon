Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function TextSwapper(node, data, options){
		this.node = node;
        this.data = data;
        this.options = _.extend(this.DEFAULT_PROPERTIES, options);
		this.currentPart = 0;
        setComponents.call(this,this.node);
        this.icons = createIcons.call(this, this.node);
        this.audio = createAudioPlayer.call(this, this.node);
        this.select(this.currentPart);
    }
    TextSwapper.prototype.DEFAULT_PROPERTIES = {
        spritz: true,
        text: true,
        audio: true,
        amount: 3,
        margin: 100,
        colorScheme: 'white'
    };
    TextSwapper.prototype.emit = function emit(event, payload) {
        this.node.emit(event, payload);
    };
    TextSwapper.prototype.select = function(i){
        this.icons[i].dom.setProperty('backgroundColor', this.options.colorScheme);
    };
    TextSwapper.prototype.deselect = function(i){
        this.icons[i].dom.setProperty('backgroundColor', "#080908");
    };
    function setComponents(node) {
        var comp = {};
        node.addComponent(comp);
    }

    function createIcons(node) {
        var i = 0, iconNode, position, el;
        var result = [];
        var urls = getUrls();
        var placeHolder = node.addChild()
                            .setSizeMode(0,1)
                            .setAbsoluteSize(undefined, 100)
                            .setProportionalSize(0.8, undefined)
                            .setAlign(0.1, 0);
        for(; i < this.options.amount; i++){
            position = i * this.options.margin;
            iconNode = placeHolder.addChild()
                            .setSizeMode(1,1)
                            .setAbsoluteSize(50, 50)
                            .setPosition(position, 0);
            el = new DOMElement(iconNode,{
                classes:['textSwapper'],
                properties:{
                    'background-image': 'url("' + urls[i] + '")'
                }
            });
            var gest = new GestureHandler(iconNode);
            gest.on('tap',bindEvents.bind(this,i,el));
            result.push({
                node:iconNode,
                dom : el
            });
        }
        return result;
    }

    function bindEvents(which, el){
        this.deselect(this.currentPart);
        this.select(which);
        this.currentPart = which;
    }

    function getUrls(){
        var result = [];
        result.push('icons/hearWhite.png');
        result.push('icons/lesen-weiss.png');
        result.push('icons/spritz-weiss.png');
        return result;
    }

    function createAudioPlayer(node) {
        var audioNode = node.addChild().setAlign(0, 0);
        return new App.AudioPlayer(audioNode, this.data, {colorScheme : this.options.colorScheme});
    }

    App.TextSwapper = TextSwapper;
});
