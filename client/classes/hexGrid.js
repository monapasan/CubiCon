Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Section = App.Section;
	var data = App.data;

    var AMOUNT_ROW = 3;
    var AMOUNT_COLUMN = 3;
    var AMOUNT = AMOUNT_COLUMN * AMOUNT_ROW;
    var HEX_WIDTH = 1 / AMOUNT_COLUMN;
    var margin_y = 0.06;
	var margin_x = 0.065;
	var HEX_HEIGHT = (HEX_WIDTH / (2 * Math.tan(Math.PI /6))) - margin_y;
    //HEX_WIDTH = HEX_WIDTH;

	function HexGrid(data){
		Node.call(this);
	    // create a new dom element
	    this.el = new DOMElement(this);
	    this.data = data;
		this.numberOfHexagon = 4;
        _generateCoords.call(this);
		console.log(HEX_WIDTH, HEX_HEIGHT);
		_makeHexagons.call(this);
	}
    HexGrid.prototype = Object.create(Node.prototype);
	HexGrid.prototype.onReceive = function onReceive(event, payload){
	};
	HexGrid.DEFAULT_PROPERTIES = {
	    headerSize: 100,
	    footerSize: 100
	};
    function _generateCoords(){
        this.cord = [];
        var result = {};
		var q = 0;
        for (var i = 0;  i < AMOUNT_COLUMN; i++){
            result = {};
			result.x = 0.04 + i * 0.75 * HEX_WIDTH + i * margin_x;
            for(var j = 0; j < AMOUNT_ROW; j++){
                if(i % 2)
                    result.y = j * HEX_HEIGHT + HEX_HEIGHT / 2;
                else
                    result.y = j * HEX_HEIGHT;
                this.cord.push(_.clone(result));
                console.log(q++,result);
            }
        }
    }
	function _makeHexagons(){
		this.hexs = [];
		var hex, coord,el;
		for(var i = 0; i < this.numberOfHexagon; i++){
			data = this.data.sections[i];
			cord = this.cord[data.position];
			console.log(cord);
			hex = this.addChild()
									.setProportionalSize(HEX_WIDTH, HEX_HEIGHT)
									.setDifferentialSize(0, -15)
									.setAlign(cord.x, cord.y);
			//el = new DOMElement(hex,{tagName: 'img'}).setAttribute('src', data.menuUrl);
			el = new DOMElement(hex);
			//el.setContent('<div class="hexrow"><div style="background: url(http://lorempixel.com/200/200/nature/); no-repeat center">' +
			//	        '<span><h3>' + data.shortName.toUpperCase() + '</h3></span><div></div><div></div></div></div>');
			el.setContent(
				'<div class="hexrow">'+
					'<div style="background-image: url(img/Article1/04-artikel-ansicht-text-paradies_bild1.jpg);">' +
						'<span><h3>' + data.shortName.toUpperCase() + '</h3></span>' +
						'<div></div><div></div>' +
					'</div>' +
				'</div>'
			);
			this.hexs.push(hex);

		}
	}

	App.HexGrid = HexGrid;
});
