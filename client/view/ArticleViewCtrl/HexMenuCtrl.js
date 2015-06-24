Meteor.startup(function(){
	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var Align = Famous.Align;
	var Header = App.Header;
	var Footer = App.Footer;
	var Swapper = App.Swapper;
	var ArticleSelectionBody = App.ArticleSelectionBody;
	var MagazineSelectorCtrl = App.MagazineSelectorCtrl;

	function HexMenu(data) {
		Node.call(this);
		this.data = data;
		this.currentArticle = 0;
		this.descriptionsParent = this.addChild();
		this.gridsParent = this.addChild();
		this.amountArticles = this.data.articles.length;
		this.grids = _makeHexGrids.call(this);
		this.descriptions = _makeArticleDesc.call(this);
	
	}
    HexMenu.prototype = Object.create(Node.prototype);

	HexMenu.prototype.showAppropriateArticle = function showAppropriateArticle(){
			this.descriptions.forEach(function(desc, i){
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
				this.grids[i].grid.showElements();
			}
			else{
				this.grids[i].align.set(-1,0,0, {duration: 1});
				this.grids[i].grid.hide();
			}
		}.bind(this));
	};

	HexMenu.prototype.doControlView = function doControlView(currentMagazin){

	};

	HexMenu.prototype.onReceive = function onReceive(event, payload){
		if(event === "showMenu") {
			this.gridsParent.hide();
			//this.showAppropriateArticle();
		}
		if(event === "changeArticle"){
			//console.log(payload);
			this.currentArticle += 1;
			if(this.currentArticle >= this.amountArticles)
				this.currentArticle = 0;
			//this.showAppropriateArticle();
		}
		if(event === "insideArticle"){
			this.descriptionsParent.hide();
			//this.showAppropriateHexagonMenu();
		}
		if(event === 'showArticleBody'){
			this.doControlView(payload.currentMagazin);
		}
	};

	
	function _makeArticleDesc(){
		var result = [];
		this.data.articles.forEach(function(article, i){
			var childForAlign = this.descriptionsParent.addChild();
			var align = new Align(childForAlign);
			result.push({
				align: new Align(childForAlign),
				description: childForAlign.addChild(new App.ArticleDescriptionView(this.data, {currentArticle:i}))
			});
			align.set(-1,0,0);
		}.bind(this));
		return result;

	}
	function _makeHexGrids(){
		var result = [];
		this.data.articles.forEach(function(article, i){

			var childForAlign = this.gridsParent.addChild();
			result.push({
				align: new Align(childForAlign),
				grid: childForAlign.addChild(new App.HexGrid(this.data,{currentArticle:i}))
			});

		}.bind(this));
		return result;
	}

	HexMenu.prototype.getCurrentDesc = function getCurrentDesc(){
		return this.descriptions[this.currentArticle].description;
	};

	HexMenu.prototype.getDescriptions = function getDescriptions(){
		return this.descriptions;
	};

	HexMenu.prototype.getDescriptionsParent = function getDescriptionsParent(){
		return this.descriptionsParent;
	};

	HexMenu.prototype.getGridsParent = function getGridsParent(){
		return this.gridsParent;
	};

	HexMenu.prototype.getCurrentHexGrid = function getCurrentHexGrid(){
		return this.grids[this.currentArticle].grid;
	};

	App.HexMenu = HexMenu;
});
