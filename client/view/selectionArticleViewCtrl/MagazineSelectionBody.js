Meteor.startup(function(){
    var Node = Famous.Node;
    var DOMElement = Famous.DOMElement;
    // the number of sections in the app

    // the footer will hold the nav buttons
    function ArticleSelectionBody (data, i) {
        // subclass Node
        Node.call(this);
        this.data = data;
        this.currentArticle = i;
        // object to store the buttons
        this.buttons = {};
        _createHexagon.call(this);
        _createName.call(this);
        _createDescription.call(this);
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
    	var dataEl;
    	var width,height,type = this.data.imgUrl.split(".")[1];
    	if(type =="gif"){
    		width = 400;
    		height = 225;
    	}else{
    		width = 170;
    		height = Utils.getHexHeight(width/2);
    	}
    	var el = this.addChild();
		el.setPosition(0, -35)
    		.setSizeMode(1, 1)
    		.setAbsoluteSize(width,height)
    		.setMountPoint(0.5,0)
    		.setAlign(0.5,0);

    	var hexEl = new DOMElement(el,{
    		tagName: "img",
    		attributes:{
    			src: this.data.imgUrl
    		},
    		classes:['articleHex']
    	});
    	var dateNode = this.addChild().setSizeMode(1, 2)
    								  .setAbsoluteSize(101, null)
    								  .setAlign(0.5, 0.1)
    								  .setMountPoint(0.5, 0.5)
    								  .setPosition(0,-13);
    	dataEl = new DOMElement(dateNode, {
    		tagName:'h2',
    		content: this.data.date,
    		classes: ['release','magazine-selection']
    	});
        el.addUIEvent('click');
        var comp = {
            onReceive: function(event, payload){
                if(event == "click"){
                    payload.stopPropagation();
                    this.emit("goInsideMagazine");
                }
            }.bind(this)
        };
        el.addComponent(comp);
        dateNode.addComponent(comp);
        this.hexEl = el;
    	/*var data = new DOMElement(el,{
    		tagName:'h2',
    		content: this.data.number
    	});*/
    	//hexEl.setContent("<h2>"+ this.data.number + "</h2>");
    	//hexEl.setContent("<img class='article' src='karibik.gif'><h2>"+ this.data.number + "</h2></img>");
    }

    function _createName(){
    	var nameNode = this.addChild()
	    							  .setProportionalSize(0.73,0.25)
	    							  .setAlign(0.5, 0.37)
	    							  .setMountPoint(0.5,0);
		var nameEl = new DOMElement(nameNode,{
			tagName:'h1',
			classes:['article-name', 'magazine-selection'],
			content: this.data.name
		});
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
    }
    ArticleSelectionBody.prototype = Object.create(Node.prototype);

    App.ArticleSelectionBody = ArticleSelectionBody;
});
