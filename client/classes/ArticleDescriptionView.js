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
    function createHexagon(){
        var hex = this.addChild().setProportionalSize(1, 0.3).addChild();
        hex.setSizeMode(1,1).setAbsoluteSize(160,138).setAlign(0.5, 0.25).setMountPoint(0.40, 0);
        var hexEl = new DOMElement(hex);
        hexEl.setContent(
            '<div class="hexagon navHex" style="background-color:' + this.data.colorScheme+'">' +
                '<div class="hexagontent"></div>' +
            '</div>');
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
        if(window.screen.height < 490){
            this.responsiveNode.setPosition(0, 30);
        }
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
