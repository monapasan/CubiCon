Meteor.startup(function(){


	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var Align = Famous.Align;
	var Header = App.Header;
	var Footer = App.Footer;
	var Swapper = App.Swapper;
	var ArticleSelectionBody = App.ArticleSelectionBody;
	var Transitionable = Famous.Transitionable;
	function MenuView(data) {
		this.options = Object.create(MenuView.DEFAULT_PROPERTIES);
		Node.call(this);
	    this.currentMagazin = 0;
		this.currentArticle = 0;
	    this.articelAmount = data.length;
	    makeBg.call(this);
		this.magazines = [];
		data.forEach(function(magazin, i){
			var menu = this.addChild();
			var footer = this.addChild();
			var menuAlign = new Align(menu);
			var footerAlign = new Align(footer);
			this.magazines[i] = {
				footer: makeFooter.call(this, footer.addChild(), magazin),
				menu: makeHexMenuElements.call(this, menu.addChild(), magazin),
				menuAlign: menuAlign,
				footerAlign: footerAlign
			};
		}.bind(this));
	    this.data = data[this.currentMagazin];
		//this.description = makeDescriptionView.call(this);
		//doControlsEvents();
	}
	MenuView.prototype = Object.create(Node.prototype);
	MenuView.prototype.constructor = MenuView;
	MenuView.prototype.onParentMount = function onParentMount(parent, parentId, index){
		this.mount(parent, parentId + '/' + index);
			this.hide();
		return this;
	};

	MenuView.prototype.hideElementsFromAnotherArticle = function hideElementsFromAnotherArticle(){
		this.magazines.forEach(function(magazin){
/*				magazin.menu.setAlign(-1, 0, 0, {duration:1});
			magazin.footer.setAlign(-1, 0, 0, {duration:1});*/
			magazin.menu.hide();
			magazin.footer.hide();
		});

	};

	MenuView.prototype.onReceive = function onReceive(event, payload){
		if(event ==="showMenu"){
				this.show();
				this.hideElementsFromAnotherArticle();
				var prefix = new Transitionable([0.7, Utils.scaleMenuIn]);
				var comp = this.addComponent({
					onUpdate: function(time){
						var newSize = prefix.get()[1];
						var newOpacity = prefix.get()[0];
						this.setOpacity(newOpacity);
						this.setOrigin(0.5,0.5);
						this.setScale(newSize, newSize);
						//console.log(newSize, newSize);
						if(prefix.isActive()){
							this.requestUpdate(comp);
						}
					}.bind(this)
				});
				this.requestUpdate(comp);
				prefix.set([1, 1], { duration: Utils.selectionMenuChangeTime});

				this.currentMagazin = payload.id;
				showAppropriateMagazin.call(this);
		}
		if(event === "changeFooterArticle"){
			this.currentArticle += 1;
			if(this.currentArticle >= this.amountArticles)
				this.currentArticle = 0;
		}
		if(event ===  "insideArticle"){
			this.magazines[this.currentMagazin].menu.grids[this.currentArticle].grid.show();
		}
	};
	MenuView.DEFAULT_PROPERTIES = {
		footerSize:50
	};

	function showAppropriateMagazin(){
		this.magazines[this.currentMagazin].menu.show();
		this.magazines[this.currentMagazin].footer.show();
		/*this.magazines[this.currentArticle].menu.setAlign(0,0,0, {duration:1});
		this.magazines[this.currentArticle].footer.setAlign(0,0,0, {duration:1});*/
	}
	function makeBg(){
		this.backgroundColor = new DOMElement(this, {
            classes: ['bg','articleMenu']/*,
            properties:{
                backgroundColor: '#'+ this.data.bgColor
            }*/
        });
	}
	function makeFooter(child, data){
		var footer = this.addChild()
				  	.setAlign(0.5, 1)
				  	.setMountPoint(0.5, 1)
				  	.setSizeMode(0, 1)
					.setAbsoluteSize(undefined, this.options.footerSize)
					.addChild(new App.HexFooter(data));
/*		footer.addUIEvent("click");
		Utils.addClickComponent(footer, "changeFooterArticle");*/
		return footer;
	}
	function makeHexMenuElements(child, data){
		return this.addChild()
					.setDifferentialSize(0, -this.options.footerSize)
					.addChild(new App.HexMenu(data));
	}
/*	function makeDescriptionView(){
		var desc = this.addChild()
						.setDifferentialSize(0, -this.options.footerSize)
						.addChild(new App.ArticleDescriptionView(this.data));
		return desc;
	}*/

	App.MenuView  = MenuView;
});
