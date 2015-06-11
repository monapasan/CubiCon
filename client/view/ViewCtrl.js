Meteor.startup(function(){
	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var Align = Famous.Align;
	var Header = App.Header;
	var Footer = App.Footer;
	var Swapper = App.Swapper;
	var ArticleSelectionBody = App.ArticleSelectionBody;
	var SelectionView = App.SelectionView;
	function FoxyHexagon(data) {
		Node.call(this);
		this.data = data;

		_makeSelectionView.call(this);
		_makeArticleView.call(this);
	}
	FoxyHexagon.prototype = Object.create(Node.prototype);


	FoxyHexagon.prototype.onMount = function(parent, myId) {
    	return this.mount(parent, myId);
	};

	function _makeArticleView(){
		var child = this.addChild(new App.MenuView(this.data));
	}
	function _makeSelectionView(){
		this.addChild(new App.SelectionView(this.data));
	}

	App.FoxyHexagon = FoxyHexagon;
});
