Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function GalleryTemplate(node, data, options){
		this.node = node.addChild();
        this.options = _.extend(this.DEFAULT_PROPERTIES, options);
		this.defaultTemplate = createDefaultTemplate.call(this,this.node, data);
        this.data = this.defaultTemplate.data;
        this.colorScheme = this.defaultTemplate.colorScheme;
        this.amountPictures = this.data.images.length;

        this.gallery = createGallery.call(this, this.node);
    }

    GalleryTemplate.prototype.DEFAULT_PROPERTIES = {
        imgHeight: 400,
        captionHeight: 30,
        margin : 30
    };
    GalleryTemplate.prototype.show = function show() {
        this.node.show();
    };
    GalleryTemplate.prototype.hide = function hide() {
        this.node.hide();
    };
    GalleryTemplate.prototype.emit = function emit(event, payload) {
        this.node.emit(event, payload);
    };
	function createDefaultTemplate(node, data){
		var options = {
			type: "gallery",
			includeImg: false
		};
		return new App.DefaultTemplate(node, data, options);
	}

    function createGallery(node) {
        var result = [];
        for (var i = 0; i < this.amountPictures; i++) {
            createCaption.call(this, node, i);
            createImage.call(this, node, i);
        }
    }


    function createCaption(node, i){
        var position_y = 90 + i * ( 2 * this.options.margin + this.options.captionHeight + this.options.imgHeight);
        var captionNode = node.addChild()
                        .setSizeMode(0,1)
                        .setAlign(0.5,0)
                        .setProportionalSize(0.7, null)
                        .setAbsoluteSize(null, this.options.captionHeight)
                        .setMountPoint(0.5, 0)
                        .setPosition(0, position_y);
        var dom = new DOMElement(captionNode,{
            classes: ['galleryTemplate', 'caption'],
            content: this.data.captions[i]
        });
        return {
            node: captionNode,
            dom: dom
        };
    }

    function createImage(node, i){
        var position_y = this.options.margin + i * (this.options.margin + this.options.captionHeight + this.options.imgHeight);
        var imgNode = node.addChild()
                        .setSizeMode(0,1)
                        .setProportionalSize(0.7, null)
                        .setAlign(0.5, 0)
                        .setAbsoluteSize(null, this.options.imgHeight)
                        .setMountPoint(0.5, 0)
                        .setPosition(0, position_y);
        var dom = new DOMElement(imgNode,{
            classes: ['galleryTemplate', 'image'],
            properties:{
                'background-image': 'url("' +  this.data.images[i] + '")'
            }
        });
        return {
            node: imgNode,
            dom: dom
        };
    }
    App.GalleryTemplate = GalleryTemplate;

});
