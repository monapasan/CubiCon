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
		this.setOptions(options);
	    this.currentArticle = this.options.currentArticle;
		this.data = data.articles[this.currentArticle];
		this.hexWidth = 1/this.options.columnAmount;
		this.hexHeight = (this.hexWidth / (2 * Math.tan(Math.PI /6))) - this.options.margin_y;
        _generateCoords.call(this);
		console.log(this.hexWidth , this.hexHeight);
		_makeHexagons.call(this);
	}
    HexGrid.prototype = Object.create(Node.prototype);
	HexGrid.prototype.onReceive = function onReceive(event, payload){
	};
	HexGrid.prototype.setOptions = function setOptions(options){
		if(!options) return;
		if(options.currentArticle) this.options.currentArticle = options.currentArticle;
	};
	HexGrid.DEFAULT_PROPERTIES = {
	    headerSize: 100,
	    footerSize: 100,
		margin_x: 0.05,
		margin_y: 0.075,
		indent_x: 0.1,
		indent_y: 0.2,
		columnAmount:3,
		rowAmount:3,
		hexagonsAmoung:4,
		currentArticle: 0,
	};
    function _generateCoords(){
        this.cord = [];
        var result = {};
		var q = 0;
        for (var i = 0;  i < this.options.columnAmount; i++){
            result = {};
			result.x = this.options.indent_x + i * 0.75 * this.hexWidth + i * this.options.margin_x;
            for(var j = 0; j < this.options.rowAmount; j++){
                if(i % 2)
                    result.y =this.options.indent_y + j * this.hexHeight + this.hexHeight / 2;
                else
                    result.y = this.options.indent_y + j * this.hexHeight;
                this.cord.push(_.clone(result));
                console.log(q++,result);
            }
        }
    }
	function _makeHexagons(){
		this.hexs = [];
		var hex, coord,el;
		for(var i = 0; i < this.options.hexagonsAmoung; i++){
			data = this.data.sections[i];
			cord = this.cord[data.position];
			console.log(cord);
			hex = this.addChild()
									.setProportionalSize(this.hexWidth, this.hexHeight)
									.setDifferentialSize(-46.66, -15)
									.setAlign(cord.x, cord.y);
			//el = new DOMElement(hex,{tagName: 'img'}).setAttribute('src', data.menuUrl);
			el = new DOMElement(hex);
			//el.setContent('<div class="hexrow"><div style="background: url(Mandarins.jpg); no-repeat center">' +
			//	        '<span><h3>' + data.shortName.toUpperCase() + '</h3></span><div></div><div></div></div></div>');
			el.setContent(
				'<div class="hexrow">'+
					'<div style="background-color:' + this.data.colorScheme + /*url(img/Mandarins.jpg);*/'">' +
						'<span>' + data.shortName.toUpperCase() + '</span>' +
						'<div></div><div></div>' +
					'</div>' +
				'</div>'
			);
			this.hexs.push(hex);

		}
	}

	App.HexGrid = HexGrid;
});
