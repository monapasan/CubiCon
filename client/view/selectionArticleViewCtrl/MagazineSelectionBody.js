Meteor.startup(function(){
    var Node = Famous.Node;
    var DOMElement = Famous.DOMElement;
    var GestureHandler = Famous.GestureHandler;
    var PhysicsEngine = Famous.PhysicsEngine;
    var FamousEngine = Famous.FamousEngine;
    var math = Famous.math;
    var physics = Famous.Physics;
    var Box = physics.Box;
    var Spring = physics.Spring;
    var RotationalSpring = physics.RotationalSpring;
    var RotationalDrag = physics.RotationalDrag;
    var Quaternion = math.Quaternion;
    var Vec3 = math.Vec3;
    function ArticleSelectionBody (data, i) {
        Node.call(this);
        this.data = data;
        this.currentMagazine = i;
        this.hexagon = _createHexagon.call(this);
        this.titleNode = _createName.call(this);
        this.description = _createDescription.call(this);
    }
    ArticleSelectionBody.prototype = Object.create(Node.prototype);


    function _createHexagon(){
    	var dataEl, el, hexEl, hexNode, dateNode, toMakeClickable;
    	var width,height;

        width = 0.5;
        height = Utils.getHexHeight(width);

    	el = this.addChild();

        hexNode = el.addChild();
		hexNode.setPosition(0, -35)
    		.setSizeMode(0, 1)
    		.setProportionalSize(width, null)
            .setAbsoluteSize(null ,height)
    		.setMountPoint(0.5,0)
    		.setAlign(0.5,0.05);
        // because of svg element we need some transparent element
        // to catch UI events
        // the size is absolutely the same
        var transpNode = el.addChild();
        transpNode.setPosition(0, -35)
        .setSizeMode(0, 1)
        .setProportionalSize(width, null)
        .setAbsoluteSize(null ,height)
        .setMountPoint(0.5,0)
        .setAlign(0.5,0.05);
        new DOMElement(transpNode,{
            classes:["transparentNode"],
            properties:{
                opacity:0,
                "z-index": 5
            }
        });

    	hexEl = new DOMElement(hexNode,{
    		classes:['articleHex']
    	});
        //http://dummyimage.com/300x300/000/fff.gif&text=+
        hexEl.setContent(
            '<svg version="1.1" viewBox="0 20 300 260" preserveAspectRatio="xMinYMin meet" class="svg-content">'+
                '<defs>' +
                    '<pattern id="image-bg" x="0" y="0" height="100%" width="100%" patternUnits="objectBoundingBox">' +
                      '<image preserveAspectRatio="xMidYMid slice" width="300" height="260" xlink:href="'+ this.data.imgUrl +'" ></image>' +
                    '</pattern>' +
                '</defs>' + 
                '<polygon id="' + "selectionHex" + this.currentMagazine + '" class="svgHexagon" points="300,150 225,280 75,280 0,150 75,20 225,20" fill="#FFF3F3"></polygon>' + 
            '</svg>');
    	dateNode = hexNode.addChild().setSizeMode(1, 0)
                                      .setProportionalSize(null, 0.2)
    								  .setAbsoluteSize(101, null)
    								  .setAlign(0.5, 0.5)
    								  .setMountPoint(0.5, 0.5)
    								  .setPosition(0, 0);
    	dataEl = new DOMElement(dateNode, {
    		content: this.data.date,
    		classes: ['release','magazine-selection']
    	});
        var dataGestures = new GestureHandler(transpNode);
        dataGestures.on('tap', _callEvents.bind(this));
        var hexGestures = new GestureHandler(dateNode);
        hexGestures.on('tap', _callEvents.bind(this));
        this.hexEl = el;
        return el;

    }

    function _callEvents(){
        this.emit("goInsideMagazine");
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
        new GestureHandler(nameNode);
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
        new GestureHandler(descriptionNode);
        return descriptionNode;
    }

    // ArticleSelectionBody.prototype.onUpdate = function onUpdate(time){
    //     this.simulation.update(time);
    //     FamousEngine.requestUpdateOnNextTick(this);
    // };

    App.ArticleSelectionBody = ArticleSelectionBody;
});
