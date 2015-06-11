Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Section = App.Section;
	var data = App.data;

    var AMOUNT_ROW = 3;
    var AMOUNT_COLUMN = 3;
    var AMOUNT = AMOUNT_COLUMN * AMOUNT_ROW;
    var HEX_WIDTH = 1 / AMOUNT_ROW;
    // HEX_WIDTH = HEX_WIDTH + HEX_WIDTH / 4;
    var HEX_HEIGHT = (HEX_WIDTH / (2 * Math.tan(Math.PI /6)));

	function HexGrid(data){
		Node.call(this);
	    // create a new dom element
	    this.el = new DOMElement(this);
	    this.data = data;
        _generateCoords.call(this);
	}
    HexGrid.prototype = Object.create(Node.prototype);
    HexGrid.prototype.onReceive = function onReceive(event, payload){
	};

    function _generateCoords(){
        this.cord = [];
        var result = {};
        for (var i = 0;  i < AMOUNT_COLUMN; i++){
            result = {};
            result.x = i * 0.75 * HEX_WIDTH;
            for(var j = 0; j < AMOUNT_ROW; j++){
                if(i % 2)
                    result.y = j * HEX_HEIGHT + HEX_HEIGHT / 2;
                else
                    result.y = j * HEX_HEIGHT;
                this.cord.push(result);
                console.log(result);
            }
        }
    }

	App.HexGrid = HexGrid;
});
