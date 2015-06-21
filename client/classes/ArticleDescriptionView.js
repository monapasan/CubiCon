Meteor.startup(function(){
	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
    var GestureHandler = Famous.GestureHandler;
    var Align = Famous.Align;
    var Position = Famous.Position;
    var Opacity = Famous.Opacity;
    var Transitionable= Famous.Transitionable;
	function ArticleDescriptionView(data, options){
		this.options = Object.create(ArticleDescriptionView.DEFAULT_PROPERTIES);
        Node.apply(this,options);
        this.setOptions(options);
		this.data = data.articles[this.options.currentArticle];
        this.opacityChanger = new Transitionable(1);
        this.hexagon = createHexagon.call(this);
        this.responsiveNode = this.addChild();
        this.title = createLine.call(this);
        this.description = createDescription.call(this);
        this.lineOpacity = new Opacity(this.description);
        this.descriptionOpacity = new Opacity(this.description);


	}
    ArticleDescriptionView.prototype = Object.create(Node.prototype);
    ArticleDescriptionView.prototype.constructor = ArticleDescriptionView;
    ArticleDescriptionView.prototype.setOptions = function setOptions(options){
        if(!options) return;
        if(options.currentArticle) this.options.currentArticle = options.currentArticle;
    };
    ArticleDescriptionView.DEFAULT_PROPERTIES = {
        currentArticle:0
    };
    function createHexagon(){
        var alignEl = this.addChild().setProportionalSize(1, 0.3);
        this.hexAlign = new Align(alignEl);
        this.hexagonPosition = new Position(alignEl);
        var hex = alignEl.addChild();
        var width = Utils.getHexWidth();
        var height = Utils.getHexHeight(width);
        hex.setSizeMode(0,1)
            .setAbsoluteSize(null, height)
            .setProportionalSize(width, null)
            .setAlign(0.5, 0.25)
            .setMountPoint(0.5, 0);
        var hexEl = new DOMElement(hex);
        this.hexOpacity = new Opacity(hex);
        hexEl.setContent('<svg version="1.1" viewBox="0 20 300 260" preserveAspectRatio="xMinYMin meet" class="svg-content"><polygon  points="300,150 225,280 75,280 0,150 75,20 225,20" fill="'+ this.data.colorScheme + '"></polygon></svg>');
        this.gestures = new GestureHandler(hex);
        this.gestures.on('tap', makeAnimations.bind(this));
        return hex;
    }
    function createOpacityComponent(node){
        var id  = node.addComponent({
            onUpdate: function(){
                var newOpacity = this.opacityChanger.get();
                node.setOpacity(newOpacity);
                if (this.opacityChanger.isActive()) node.requestUpdate(id);
            }.bind(this)
        });
        node.requestUpdate(id);
    }
    function emitGoInsideArticle(){
        this.hexOpacity.set(0,{duration: 300}, function(){
            this.emit("insideArticle",{node: this});
            setTimeout(function(){
                this.hexagonPosition.set(0, 0, 0, {duration: 1});
                this.hexOpacity.set(1,{duration:1});
            }.bind(this), 200);
        }.bind(this));
    }
    function makeAnimations(){
        this.opacityChanger.to(0, 'linear', 300).delay(1000).to(1, 'linear', 1);
        createOpacityComponent.call(this, this.line);
        createOpacityComponent.call(this, this.description);
        createOpacityComponent.call(this, this.title);
        var cord = Utils.hexCordinates[5];
        var curve =  {duration: 700, curve: 'outBack'};
        // this.descriptionOpacity.set(0,{duration:300});
        // this.lineOpacity.set(0,{duration:300},function(){
        //     console.log(1);
        // });
        //this.hexAlign.set(cord.x, 0.5 ,0, curve);
        this.hexagonPosition.set(0, cord.y - 30, 0, curve,function(){
            emitGoInsideArticle.call(this);
        }.bind(this));
    }
    // new App.TitleWithLine({string: this.data.name})
    function createLine(){
        var title = this.responsiveNode.addChild()
                        .setProportionalSize(1, 0.1)
                        .setAlign(0.5,0.52)
                        .setMountPoint(0.5, 1);
        var titleEl = new DOMElement(title,{
             content: this.data.name,
             classes:['article-description', 'name']
         });
         var line = title.addChild()
                        .setSizeMode(1,1)
                        .setAbsoluteSize(50,5)
                        .setAlign(0.5,0.8)
                        .setMountPoint(0.5,0.5);
        new DOMElement(line, {
            properties: {
                'background-color':'#222229'
                }
            });
        this.line = line;
        return title;
    }
    function createDescription(){
    	var descriptionNode = this.responsiveNode.addChild().setDifferentialSize(-100,0)
    										 .setProportionalSize(1, 0.4)
    										 .setAlign(0.5, 0.52)
    										 .setMountPoint(0.5, 0.05);
		var descriptionEl = new DOMElement(descriptionNode,{
			tagName: "h2",
			classes: ['article-description','description'],
			content: this.data.description
		});
        return descriptionNode;
    }
     App.ArticleDescriptionView = ArticleDescriptionView;
});
