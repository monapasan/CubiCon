Meteor.startup(function(){
	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var Align = Famous.Align;
	var Header = App.Header;
	var Footer = App.Footer;
	var Swapper = App.Swapper;
	var MagazineSelectorCtrl = App.MagazineSelectorCtrl;
	function FoxyHexagon(node, data) {
		this.data = data;
		this.node = node.addChild();
		_makeMagazineSelectorCtrl.call(this, this.node);
		_makeArticleView.call(this, this.node);
		_makeContentCtrl.call(this, this.node);
	}
	FoxyHexagon.prototype = Object.create(Object.prototype);

	function _makeArticleView(node){
		new App.ArticleMenu(node, this.data);
	}
	function _makeMagazineSelectorCtrl(node){
		new App.MagazineSelectorCtrl(node, this.data);
	}
	function _makeContentCtrl(node){
		new App.ContentCtrl(node);
	}
	App.FoxyHexagon = FoxyHexagon;
});
