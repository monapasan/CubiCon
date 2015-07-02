Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;
/*    var AMOUNT_ROW = 3;
    var AMOUNT_COLUMN = 3;
    var AMOUNT = AMOUNT_COLUMN * AMOUNT_ROW;
    var HEX_WIDTH = 1 / AMOUNT_COLUMN;
	//inverse
    var margin_y = 0.075;
	var margin_x = 0.05;
	var HEX_HEIGHT = (HEX_WIDTH / (2 * Math.tan(Math.PI /6))) - margin_y;*/
    //HEX_WIDTH = HEX_WIDTH;

	function HexGrid(node, data, options){
		this.options = Object.create(HexGrid.DEFAULT_PROPERTIES);
		this.node = node.addChild();
		this.setOptions(options, data);
	    this.currentArticle = this.options.currentArticle;
		this.data = data.articles[this.currentArticle];
		this.hexWidth = calculateHexWidth.call(this);
		//this.hexHeight = (this.hexWidth / (2 * Math.tan(Math.PI /6))) - this.options.margin_y;
        this.hexHeight = calculateHexHeight.call(this);
        //this.options.indent_y = calculateIndendtY.call(this);
        _generateCoords.call(this);
		//console.log(this.hexWidth , this.hexHeight);
		_makeHexagons.call(this, this.node);
	}
    HexGrid.prototype = Object.create(Object.prototype);

    HexGrid.prototype.show = function(){
        this.node.show();
    };
    HexGrid.prototype.hide = function hide(){
        this.node.hide();
    };
	function createComponent(node,transitionable, i){
        var id  = node.addComponent({
            onUpdate: function(){
                var newOpacity = transitionable.get()[i];
                node.setOpacity(newOpacity);
                if (transitionable.isActive()) node.requestUpdate(id);
            }.bind(this)
        });
        node.requestUpdate(id);
	}
	HexGrid.prototype.showElements = function showElements(){
		this.node.show();
		var opacityTrans = new Transitionable([0,0,0,0]);
		this.hexs.sort(function(a, b){
			if(a.position === 5){
				return false;
			}
			if(b.position === 5){
				return true;
			}
			return b.position%3 - a.position%3;
		});
		this.hexs.forEach(function(hex, i){
			//createComponent(hex.opacityHex);
			setTimeout(function(){
				hex.opacityHex.set(1,{duration: 800});
				hex.opacityText.set(1,{duration: 800});
			}, i * 300);
		}.bind(this));
	};
	HexGrid.prototype.hideElements = function hideElements(){
		this.node.hide();
		this.hexs.forEach(function(hex){
			hex.opacityText.set(0,{duration:1});
			hex.opacityHex.set(0,{duration:1});
		});
	};

	HexGrid.DEFAULT_PROPERTIES = {
	    footerSize: 50,
		margin_x: 0.01,
		margin_y: 5,
		indent_x: 0,
		indent_y:  5,
		columnAmount:3,
		rowAmount:3,
		hexagonsAmount:4,
		currentArticle: 0,
	};

	function calculateIndendtY(){
		var gridHeight = this.hexHeight * this.options.rowAmount + (this.options.rowAmount - 1) * this.options.margin_y;
		return (screen.height - this.options.footerSize - gridHeight) / 2;
	}
	function calculateHexWidth() {
		return 1/(this.options.columnAmount - (this.options.columnAmount - 1) * 0.25) - this.options.margin_x;
	}
	function calculateHexHeight() {
		//var prefix = screen.width / screen.height;
		//return  prefix * this.hexWidth;
		return Utils.getHexHeight(this.hexWidth);
	}
    function _generateCoords(){
        this.cord = [];
        var result = {};
		var q = 0;
        for (var i = 0;  i < this.options.columnAmount; i++){
            result = {};
			result.x = this.options.indent_x + i * 0.75 * this.hexWidth + i * this.options.margin_x;
            for(var j = 0; j < this.options.rowAmount; j++){
                if(i % 2)
                    result.y = this.options.indent_y + j * (this.hexHeight + this.options.margin_y) + this.hexHeight / 2;
                else
                    result.y = this.options.indent_y + j * (this.hexHeight + this.options.margin_y);
                this.cord.push(_.clone(result));
                //console.log(q++,result);
            }
        }
        Utils.hexCordinates = _.clone(this.cord);
    }
	function _makeHexagons(root){
		this.hexs = [];
		var hex, coord,el, data;
		for(var i = 0; i < this.options.hexagonsAmount; i++){
			data = this.data.sections[i];
			cord = this.cord[data.position];
			hex = root.addChild().setSizeMode(0, 1)
					.setProportionalSize(this.hexWidth, null)
					.setAbsoluteSize(null, this.hexHeight)
					.setAlign(cord.x, 0)
					.setPosition(0, cord.y);
			el = new DOMElement(hex);

			el.setContent(
				'<svg version="1.1" viewBox="0 20 300 260" preserveAspectRatio="xMinYMin meet" class="svg-content">'+
					'<defs>' +
					    '<pattern id="image-bg' + this.currentArticle + i +'" x="0" y="0" height="100%" width="100%" patternUnits="objectBoundingBox">' +
					      '<image preserveAspectRatio="xMidYMid slice" width="300" height="260" xlink:href="' + data.menuUrl + '" ></image>' +
					    '</pattern>' +
				  	'</defs>' +
					'<polygon class="svgHexagon" points="300,150 225,280 75,280 0,150 75,20 225,20" fill="url(#image-bg' + this.currentArticle + i +')"></polygon>' +
				'</svg>');
			var text  = hex.addChild().setProportionalSize(0.7,0.5).setAlign(0.5, 0.6).setMountPoint(0.5, 0.5);
			new DOMElement(text,{
				tagName: 'span',
				classes:["text","hextext"],
				content: data.shortName.toUpperCase()
			});
			//element to catch UIevents
			hex.addChild().setProportionalSize(1,1);
			var forUI = new DOMElement(hex,{
				classes: ['hexForUI']
			});
			var gest = new GestureHandler(hex);
			gest.on('tap', handleEvents.bind(this, i, this.data, data.type));

			// opacity for animate appering
			var opacityText = new Opacity(text);
			var opacityHex = new Opacity(hex);
			opacityHex.set(0,{duration: 10});
			opacityText.set(0,{duration: 10});
			this.hexs.push({
				node:hex,
				position: data.position,
				opacityHex: opacityHex,
				opacityText: opacityText
			});
		}
	}
	function handleEvents(number, data, type){
		console.log(number, data);
		this.emit('openArticleContent',{data: data, number:number,type:type});
	}
	HexGrid.prototype.emit = function emit(event, payload){
		this.node.emit(event,payload);
	};

	HexGrid.prototype.setOptions = function setOptions(options, data){
		if(!options) return;
		if(options.currentArticle) this.options.currentArticle = options.currentArticle;
		if(options.indent_y) this.options.indent_y = options.indent_y;
		// adjusting for mobiles that have another aspect ratio than iphone 4
		else if(screen.width / screen.height < 0.6) this.options.indent_y = (screen.width / screen.height) * 0.1;
		if(options.margin_x) this.options.margin_x = options.margin_x;
		if(options.rowAmount) this.options.rowAmount = options.rowAmount;
		if(options.columnAmount) this.options.columnAmount = options.columnAmount;
		if(options.indent_x) this.options.indent_x = options.indent_x;
		if(options.indent_y) this.options.indent_y = options.indent_y;
		if(options.hexagonsAmount) this.options.hexagonsAmount = options.hexagonsAmount;
		else this.options.hexagonsAmount = data.articles[this.options.currentArticle].sections.length;

	};

	App.HexGrid = HexGrid;
});
