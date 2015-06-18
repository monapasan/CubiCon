Meteor.startup(function(){
    var Node = Famous.Node;
    var DOMElement = Famous.DOMElement;
    var GestureHandler = Famous.GestureHandler;
    // the number of sections in the app

    // the footer will hold the nav buttons
    function ArticleSelectionBody (data, i) {
        // subclass Node
        Node.call(this);
        this.data = data;
        this.currentArticle = i;
        // object to store the buttons
        this.buttons = {};
        this.eventNode = this.addChild();
        this.hexagon = _createHexagon.call(this);
        this.titleNode = _createName.call(this);
        this.description = _createDescription.call(this);
        //_bindEvents.call(this);
        // for every section create a NavButton
        // and set its size and align
/*        data.sections.forEach(function (section, i) {
            this.buttons[section.id] = this.addChild(new App.NavButton(section.id))
                                           .setProportionalSize(1 / this.numSections)
                                           .setAlign(i / this.numSections);
        }.bind(this));*/
    }
/*    ArticleSelectionBody.prototype.ahangeArticle = function(to){
    	this.
		.setAbsoluteSize(300, null)
		.setProportionalSize(null, 0.37)
    }*/
/*    ArticleSelectionBody.prototype.onReceive = function onReceive (event, payload) {
        if(event == 'click'){
            this.emit("goInsideMagazine",{number: this.currentArticle});
        }
    };*/
    function _createHexagon(){
    	var dataEl, el, hexEl, hexNode, dateNode;
    	var width,height,type = this.data.imgUrl.split(".")[1];
    	if(type =="gif"){
    		width = 400;
    		height = 225;
    	}else{
    		width = 170;
    		height = Utils.getHexHeight(width/2);
    	}
    	el = this.eventNode.addChild();
        hexNode = el.addChild();
		hexNode.setPosition(0, -35)
    		//.setSizeMode(1, 1)
    		.setProportionalSize(1.2, 0.48)
            //.setAbsoluteSize(width,height)
    		.setMountPoint(0.5,0)
    		.setAlign(0.5,0);

    	hexEl = new DOMElement(hexNode,{
    		tagName: "img",
    		attributes:{
    			src: this.data.imgUrl
    		},
    		classes:['articleHex']
    	});
    	dateNode = el.addChild().setSizeMode(1, 2)
    								  .setAbsoluteSize(101, null)
    								  .setAlign(0.5, 0.1)
    								  .setMountPoint(0.5, 0.5)
    								  .setPosition(0,-13);
    	dataEl = new DOMElement(dateNode, {
    		tagName:'h2',
    		content: this.data.date,
    		classes: ['release','magazine-selection']
    	});
        var dataGestures = new GestureHandler(el);
        dataGestures.on('tap', _callEvents.bind(this));
        var hexGestures = new GestureHandler(dateNode);
        hexGestures.on('tap', _callEvents.bind(this));
        this.hexEl = el;
        return el;
    	/*var data = new DOMElement(el,{
    		tagName:'h2',
    		content: this.data.number
    	});*/
    	//hexEl.setContent("<h2>"+ this.data.number + "</h2>");
    	//hexEl.setContent("<img class='article' src='karibik.gif'><h2>"+ this.data.number + "</h2></img>");
    }
    function _callEvents(){
        this.emit("goInsideMagazine");
    }
    function _createName(){
    	var nameNode = this.eventNode.addChild()
	    							  .setProportionalSize(0.73,0.25)
	    							  .setAlign(0.5, 0.37)
	    							  .setMountPoint(0.5,0);
		var nameEl = new DOMElement(nameNode,{
			tagName:'h1',
			classes:['article-name', 'magazine-selection'],
			content: this.data.name
		});
        return nameNode;
    }
    function _createDescription(){
    	var descriptionNode = this.addChild().setDifferentialSize(-100,0)
    										 .setProportionalSize(1, 0.4)
    										 .setAlign(0.5, 0.58)
    										 .setMountPoint(0.5, 0);
		var descriptionEl = new DOMElement(descriptionNode,{
			tagName: "h2",
			classes: ['description','magazine-selection'],
			content: this.data.description
		});
        return descriptionNode;
    }
    ArticleSelectionBody.prototype = Object.create(Node.prototype);

    App.ArticleSelectionBody = ArticleSelectionBody;
});
