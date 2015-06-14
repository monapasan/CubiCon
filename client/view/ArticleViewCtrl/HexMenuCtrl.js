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
		this.currentArticle = 0;
		this.descriptionsParent = this.addChild();
		this.gridsParent = this.addChild();
		this.descriptions = [];
		this.grids = [];
		this.amountArticles = this.data.articles.length;
		this.data.articles.forEach(function(article, i){
			var childDesc = this.descriptionsParent.addChild();
			this.descriptions[i] = {
				align: new Align(childDesc),
				description: _makeArticleDesc.call(this, childDesc, i)
			};

			var childGrid = this.gridsParent.addChild();
			this.grids.push({
				align: new Align(childGrid),
				grid: _makeHexGrid.call(this, childGrid, i)
			});
		}.bind(this));
	}
    HexMenu.prototype = Object.create(Node.prototype);
	HexMenu.prototype.showAppropriateArticle = function showAppropriateArticle(){
			this.data.articles.forEach(function(article, i){
				if(i === this.currentArticle) {
					this.descriptions[i].align.set(0,0,0, {duration: 1});
				}
				else{
					this.descriptions[i].align.set(-1,0,0, {duration: 1});
				}
			}.bind(this));
	};
	HexMenu.prototype.showAppropriateHexagonMenu = function showAppropriateHexagonMenu(){
		//this.grids[this.currentArticle].grid.show();
		this.gridsParent.show();
		//grid = this.grids;
		this.grids.forEach(function(grid, i){
			if(i === this.currentArticle) {
				this.grids[i].align.set(0,0,0, {duration: 1});
			}
			else{
				this.grids[i].align.set(-1,0,0, {duration: 1});
				this.grids[i].grid.hide();
			}
		}.bind(this));
	};
	HexMenu.prototype.onReceive = function onReceive(event, payload){
		if(event === "showMenu") {
			this.gridsParent.hide();
			this.showAppropriateArticle();
		}
		if(event === "changeFooterArticle"){
			//console.log(payload);
			this.currentArticle += 1;
			if(this.currentArticle >= this.amountArticles)
				this.currentArticle = 0;
			this.showAppropriateArticle();
		}
		if(event === "insideArticle"){
			this.descriptionsParent.hide();
			//this.showAppropriateHexagonMenu();
		}
	};
	function _makeArticleDesc(parent, i){
		return parent.addChild(new App.ArticleDescriptionView(this.data, {currentArticle:i}));
	}
	function _makeHexGrid(parent, i){
		return parent.addChild(new App.HexGrid(this.data, {currentArticle:i}));
	}

	App.HexMenu = HexMenu;
});
