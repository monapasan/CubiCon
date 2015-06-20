Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;



/*    var AMOUNT_ROW = 3;
    var AMOUNT_COLUMN = 3;
    var AMOUNT = AMOUNT_COLUMN * AMOUNT_ROW;
    var HEX_WIDTH = 1 / AMOUNT_COLUMN;
	//inverse
    var margin_y = 0.075;
	var margin_x = 0.05;
	var HEX_HEIGHT = (HEX_WIDTH / (2 * Math.tan(Math.PI /6))) - margin_y;*/
    //HEX_WIDTH = HEX_WIDTH;

	function HexGrid(data, options){
		this.options = Object.create(HexGrid.DEFAULT_PROPERTIES);
		Node.apply(this, this.options);
		this.setOptions(options, data);
	    this.currentArticle = this.options.currentArticle;
		this.data = data.articles[this.currentArticle];
		this.hexWidth = calculateHexWidth.call(this);
		//this.hexHeight = (this.hexWidth / (2 * Math.tan(Math.PI /6))) - this.options.margin_y;
        this.hexHeight = calculateHexHeight.call(this);
        _generateCoords.call(this);
		//console.log(this.hexWidth , this.hexHeight);
		_makeHexagons.call(this);
	}
    HexGrid.prototype = Object.create(Node.prototype);
	HexGrid.prototype.onReceive = function onReceive(event, payload){
	};
	HexGrid.DEFAULT_PROPERTIES = {
	    headerSize: 100,
	    footerSize: 100,
		margin_x: 0.01,
		margin_y: 0.01,
		indent_x: 0,
		indent_y: 0.05,
		columnAmount:3,
		rowAmount:3,
		hexagonsAmount:4,
		currentArticle: 0,
	};
	function calculateHexWidth() {
		return 1/(this.options.columnAmount - (this.options.columnAmount - 1) * 0.25) - this.options.margin_x;
	}
	function calculateHexHeight() {
		var prefix = screen.width / screen.height;
		return  prefix * this.hexWidth;
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
                    result.y = this.options.indent_y + j * this.hexHeight + this.options.margin_y + this.hexHeight / 2;
                else
                    result.y = this.options.indent_y + j * this.hexHeight + this.options.margin_y;
                this.cord.push(_.clone(result));
                //console.log(q++,result);
            }
        }
    }
	function _makeHexagons(){
		this.hexs = [];
		var hex, coord,el;
		for(var i = 0; i < this.options.hexagonsAmount; i++){
			data = this.data.sections[i];
			cord = this.cord[data.position];
			//console.log(cord);
			hex = this.addChild().setSizeMode(0, 0)
									.setProportionalSize(this.hexWidth, this.hexHeight)
									//.setDifferentialSize(-46.66, -15)
									.setAlign(cord.x, cord.y);
			//el = new DOMElement(hex,{tagName: 'img'}).setAttribute('src', data.menuUrl);
			el = new DOMElement(hex);
			//el.setContent('<div class="hexrow"><div style="background: url(Mandarins.jpg); no-repeat center">' +
			//	        '<span><h3>' + data.shortName.toUpperCase() + '</h3></span><div></div><div></div></div></div>');
			// el.setContent(
			// 	'<div class="hexrow">'+
			// 		'<div style="background-image:url(img/Mandarins.jpg)">' +
			// 			'<span>' + data.shortName.toUpperCase() + somePlace + '</span>' +
			// 			'<div></div><div></div>' +
			// 		'</div>' +
			// 	'</div>'
			// );
			el.setContent(
				'<svg version="1.1" viewBox="0 20 300 260" preserveAspectRatio="xMinYMin meet" class="svg-content">'+
					'<defs>' +
					    '<pattern id="image-bg" x="0" y="0" height="100%" width="100%" patternUnits="objectBoundingBox">' +
					      '<image preserveAspectRatio="xMidYMid slice" width="300" height="260" xlink:href="' + data.menuUrl + '" ></image>' +
					    '</pattern>' +
				  	'</defs>' + 
					'<polygon class="svgHexagon" points="300,150 225,280 75,280 0,150 75,20 225,20" fill="url(#image-bg)"></polygon>' + 
				'</svg>');
			var text  = hex.addChild().setProportionalSize(0.7,0.5).setAlign(0.5, 0.6).setMountPoint(0.5, 0.5);
			new DOMElement(text,{
				tagName: 'span',
				classes:["text","hextext"],
				content: data.shortName.toUpperCase()
			});
			this.hexs.push(hex);
		}
	}
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
