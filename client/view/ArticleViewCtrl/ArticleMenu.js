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
	    this.articleAmount = data.length;
	    makeBg.call(this);
		this.magazines = [];
		this.footers = _makeFooters.call(this, data);
		this.menus = _makeMenus.call(this, data);
	    this.data = data;
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


	MenuView.prototype.hideElementsFromAnotherMagazine = function hideElementsFromAnotherMagazine(){
/*		this.magazines.forEach(function(magazin){
				magazin.menu.setAlign(-1, 0, 0, {duration:1});
			magazin.footer.setAlign(-1, 0, 0, {duration:1});
			magazin.menu.hide();
			magazin.footer.hide();
		});*/

		this.footers.forEach(function(footerEl, i){
			footerEl.footer.hide();
			this.menus[i].menu.hide();
		}.bind(this));

	};

	MenuView.prototype.changeDescription = function changeDescription(){
		this.menus[this.currentMagazin].menu.getDescriptionsParent().show();
		var grids = this.menus[this.currentMagazin].menu.grids;
		grids.forEach(function(gridEl){
			if(gridEl.grid.isShown()){
				gridEl.grid.hide();
				gridEl.grid.hideElements();
			}
		});
		var descriptions = this.menus[this.currentMagazin].menu.getDescriptions();
		descriptions.forEach(function(desc, i){
			if(i === this.currentArticle) {
				desc.align.set(0,0,0, {duration: 1});
			}
			else{
				desc.align.set(-1,0,0);
			}
		}.bind(this));
	};

	MenuView.prototype.onReceive = function onReceive(event, payload){
		if(event ==="showMenu"){
				 this.show();
				//this.hideElementsFromAnotherMagazine();
/*				var prefix = new Transitionable([0.7, Utils.scaleMenuIn]);
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
				prefix.set([1, 1], { duration: Utils.selectionMenuChangeTime});*/

				this.currentMagazin = payload.id;
				showAppropriateMagazin.call(this);
				this.changeDescription();
		}
		if(event === "changeArticle"){
			changeArticle.call(this);
		}
		if(event ===  "insideArticle"){
			this.menus[this.currentMagazin].menu.grids[this.currentArticle].grid.show();
			this.menus[this.currentMagazin].menu.grids[this.currentArticle].grid.showElements();
		}
	};

	MenuView.DEFAULT_PROPERTIES = {
		footerSize:50
	};
	function changeArticle(){
		this.currentArticle += 1;
		if(this.currentArticle >= this.data[this.currentMagazin].articles.length)
			this.currentArticle = 0;
		this.changeDescription();
	}
	function showAppropriateMagazin(){
		//this.menus[this.currentMagazin].menu.show();
		this.menus.forEach(function(el, i){
			if(i !== this.currentMagazin){
				el.menu.getGridsParent().hide();
				el.menu.getDescriptionsParent().hide();
				this.footers[i].footer.hide();
			}
		}.bind(this));
		//this.menus[this.currentMagazin].menu.getGridsParent().hide();
		this.menus[this.currentMagazin].menu.getDescriptionsParent().show();
		this.footers[this.currentMagazin].footer.show();
		this.emit("showArticleBody",{currentMagazin: this.currentMagazin});
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
/*		data.forEach(function(magazin, i){
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
		}.bind(this));*/
	function _makeFooters(data){
		var result = [];
		var el = this.addChild();
		data.forEach(function(magazin){
			var childForAlign = el.addChild();
			var footer = makeFooter.call(this, childForAlign, magazin);
			result.push({
				align: new Align(childForAlign),
				footer:footer
			});
			footer.hide();
		}.bind(this));
		return result;
	}

	function _makeMenus(data){
		var result = [];
		var el = this.addChild();
		data.forEach(function(magazin){
			var childForAlign = el.addChild();
			var menu = makeHexMenuElements.call(this, childForAlign, magazin);
			result.push({
				align: new Align(childForAlign),
				menu: menu
			});
			menu.hide();
		}.bind(this));
		return result;
	}

	function makeFooter(child, data){
		var footer = child.addChild()
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
