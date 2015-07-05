Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function VideoTemplate(node, data, options){
		this.node = node.addChild();
		this.options = _.extend(this.DEFAULT_PROPERTIES, options);
        this.template = createDefaultTemplate.call(this, this.node, data);
		this.data = this.template.data;
		this.colorScheme = this.template.colorScheme;
		this.text = createText.call(this, this.node);
		this.video = createVideo.call(this, this.node);
    }
	VideoTemplate.prototype = Object.create(App.DefaultTemplate.prototype);
	VideoTemplate.prototype.DEFAULT_PROPERTIES = {
		text:true
	};
    VideoTemplate.prototype.show = function show() {
        this.node.show();
    };

    VideoTemplate.prototype.hide = function hide() {
        this.node.hide();
    };

	function createText(node){
		var textNode = node.addChild()
							.setSizeMode(0, 2)
							.setAlign(0.5, 0.17)
							.setProportionalSize(0.7, 0.2)
							.setMountPoint(0.5, 0);
		new DOMElement(textNode,{
			classes: ['videoTemplate', 'title'],
			content: this.data.text
		});
	}

	function createVideo(node) {
		var videoNode = node.addChild()
						.setAlign(0, 0.35)
						.setProportionalSize(1, 0.8);
        return new App.VideoPlayer(videoNode, this.data, {colorScheme : this.colorScheme});
	}

    function createDefaultTemplate(node, data){
        var options = {
            type:"video",
            includeImg: false
        };
        return new App.DefaultTemplate(node, data, options);
    }

    App.VideoTemplate = VideoTemplate;
});
