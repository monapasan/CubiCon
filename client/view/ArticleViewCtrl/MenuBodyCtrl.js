Meteor.startup(function(){
	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var Align = Famous.Align;
	var Header = App.Header;
	var Footer = App.Footer;
	var Swapper = App.Swapper;
	var ArticleSelectionBody = App.ArticleSelectionBody;
	var SelectionView = App.SelectionView;
	function HexMenu(data) {
		Node.call(this);
		this.data = data;

        _makeSectionPreview.call(this);
		_makeHexGrid.call(this);
	}
    HexMenu.prototype = Object.create(Node.prototype);


	function _makeSectionPreview(){
		this.addChild(new App.SectionPreview(this.data));
	}
	function _makeHexGrid(){
		this.addChild(new App.HexGrid(this.data));
	}

	App.HexMenu = HexMenu;
});
