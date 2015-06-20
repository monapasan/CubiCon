Meteor.startup(function(){
	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
    var GestureHandler = Famous.GestureHandler;
	function ArticleDescriptionView(data, options){
		this.options = Object.create(ArticleDescriptionView.DEFAULT_PROPERTIES);
        Node.apply(this,options);
        this.setOptions(options);
		this.data = data.articles[this.options.currentArticle];
        createHexagon.call(this);
        this.responsiveNode = this.addChild();
        createLine.call(this);
        createDescription.call(this);

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
    //0.865
    function createHexagon(){
        var hex = this.addChild().setProportionalSize(1, 0.3).addChild();
        var width = 0.5;
        var height = Utils.getHexHeight(width);
        hex.setSizeMode(0,1)
            .setAbsoluteSize(null, height)
            .setProportionalSize(width, null)
            .setAlign(0.5, 0.25)
            .setMountPoint(0.5, 0);
        var hexEl = new DOMElement(hex);
        
        hexEl.setContent('<svg version="1.1" viewBox="0 20 300 260" preserveAspectRatio="xMinYMin meet" class="svg-content"><polygon  points="300,150 225,280 75,280 0,150 75,20 225,20" fill="'+ this.data.colorScheme + '"></polygon></svg>');
        this.gestures = new GestureHandler(hex);
        this.gestures.on('tap', emitGoInsideArticle.bind(this));
        return hex;
    }
    function emitGoInsideArticle(){
        this.emit("insideArticle",{node: this});
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
