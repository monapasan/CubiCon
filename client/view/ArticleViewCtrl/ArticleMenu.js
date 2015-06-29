Meteor.startup(function(){


	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var Align = Famous.Align;
	var Header = App.Header;
	var Footer = App.Footer;
	var Swapper = App.Swapper;
	var MagazineSelectionBody = App.MagazineSelectionBody;
	var Transitionable = Famous.Transitionable;
	var Opacity = Famous.Opacity;
	var GestureHandler = Famous.GestureHandler;
	var PhysicsEngine = Famous.PhysicsEngine;
	var FamousEngine = Famous.FamousEngine;
	var Box = Famous.Box;
	var Quaternion = Famous.Quaternion;
	var RotationalSpring = Famous.RotationalSpring;
	var Position = Famous.Position;
	function ArticleMenu(node, data) {
		this.options = Object.create(ArticleMenu.DEFAULT_PROPERTIES);
		//this.node.mount(node.getId());
		this.node = node.addChild();
	    this.currentMagazin = 0;
		this.currentArticle = 0;
	    this.articleAmount = data.length;

	    makeBg.call(this, this.node);

	    setComponents.call(this,this.node);
		this.magazines = [];
	    this.data = data;
	    this.opacity = new Opacity(this.node);
	    this.opacity.set(0,{duration:1});
        this.simulation = new PhysicsEngine();

    	this.updater = {};
    	this.updater.onUpdate = onUpdate.bind(this);
    	this.force = new Famous.Vec3();
		this.footers = _makeFooters.call(this, data, this.node);
		this.menus = _makeMenus.call(this, data, this.node);
    	FamousEngine.requestUpdate(this.updater);
	}
	ArticleMenu.prototype = Object.create(Object.prototype);

	ArticleMenu.DEFAULT_PROPERTIES = {
		footerSize:50
	};

	ArticleMenu.prototype.constructor = ArticleMenu;

    ArticleMenu.prototype.show = function show(){
        this.node.show();
    };

    ArticleMenu.prototype.hide = function hide(){
        this.node.hide();
    };
	function setComponents(node){
		//onShow v0.6.2
		var component = {
			onMount:function(parent, parentId, index){
				this.hide();
				//this.backgroundColor.setProperty("display", "none");
			}.bind(this),
			onReceive: onReceive.bind(this)
		};
		node.addComponent(component);
	}
	function onUpdate(time) {
	    this.simulation.update(time);

	    var page;
	    var physicsTransform;
	    var p;
	    var r;
	    for (var i = 0, len = this.menus.length; i < len; i++) {
	        page = this.menus[i];

	        // Get the transform from the `Box` body
	        physicsTransform = this.simulation.getTransform(page.box);
	        // p = physicsTransform.position;
	        //r = physicsTransform.rotation;
	        //console.log(p);
	        // Set the `imageNode`'s x-position to the `Box` body's x-position
	        // page.position.set(p[0], p[1], 0);

	        // Set the `imageNode`'s rotation to match the `Box` body's rotation
	        //page.rotation.set(0, 0, 0, r[3]);
	        //console.log(r[0], r[1], r[2], r[3]);
	    }

	    FamousEngine.requestUpdateOnNextTick(this.updater);
	}

	ArticleMenu.prototype.hideElementsFromAnotherMagazine = function hideElementsFromAnotherMagazine(){
		this.footers.forEach(function(footerEl, i){
			footerEl.footer.node.hide();
			this.menus[i].node.node.hide();
		}.bind(this));

	};

	ArticleMenu.prototype.changeDescription = function changeDescription(){
		this.menus[this.currentMagazin].node.getDescriptionsParent().show();
		var grids = this.menus[this.currentMagazin].node.grids;
		grids.forEach(function(gridEl){
			if(gridEl.grid.node.isShown()){
				gridEl.grid.hideElements();
			}
		});
		var descriptions = this.menus[this.currentMagazin].node.getDescriptions();
		descriptions.forEach(function(desc, i){
			if(i === this.currentArticle) {
				desc.align.set(0,0,0, {duration: 1});
			}
			else{
				desc.align.set(-1,0,0);
			}
		}.bind(this));
	};
	function onReceive(event, payload){
		if(event ==="showMenu"){
			this.show();
			this.opacity.set(1,{duration:200});
			this.currentMagazin = payload.id;
			showAppropriateMagazin.call(this);
			this.changeDescription();
		}
		if(event === "changeArticle"){
			changeArticle.call(this);
		}
		if(event ===  "insideArticle"){
			this.menus[this.currentMagazin].node.grids[this.currentArticle].grid.showElements();
		}
		if(event ==="openArticleContent"){
			this.hide();
		}
	}



	function changeArticle(){
		this.currentArticle += 1;
		if(this.currentArticle >= this.data[this.currentMagazin].articles.length)
			this.currentArticle = 0;
		this.changeDescription();
	}
	function showAppropriateMagazin(){
		//this.menus[this.currentMagazin].node.show();
		this.menus.forEach(function(el, i){
			if(i !== this.currentMagazin){
				el.node.getGridsParent().hide();
				el.node.getDescriptionsParent().hide();
				this.footers[i].footer.node.hide();
			}
		}.bind(this));
		//this.menus[this.currentMagazin].node.getGridsParent().hide();
		this.menus[this.currentMagazin].node.getDescriptionsParent().show();
		this.footers[this.currentMagazin].footer.show();
		this.node.emit("showArticleBody",{currentMagazin: this.currentMagazin});
		/*this.magazines[this.currentArticle].node.setAlign(0,0,0, {duration:1});
		this.magazines[this.currentArticle].footer.setAlign(0,0,0, {duration:1});*/
	}

	function makeBg(node){
		this.backgroundColor = new DOMElement(node, {
            classes: ['bg','articleMenu']/*,
            properties:{
                backgroundColor: '#'+ this.data.bgColor
            }*/
        });
	}

	function _makeFooters(data, root){
		var result = [];
		var el = root.addChild();
		data.forEach(function(magazin, i){
			var childForAlign = el.addChild();
			var footer = makeFooter.call(this, childForAlign, magazin);
			var align = new Align(childForAlign);
            footer.gestures.on('drag', function(index, e) {
				//console.log(payload);
				//console.log(e);
                this.force.set(e.centerDelta.x, e.centerDelta.y, 0); // Add a force equal to change in X direction
                this.force.scale(20); // Scale the force up
                this.menus[index].box.applyForce(this.force); // Apply the force to the `Box` body
                this.menus[index].node.node.setOrigin(0.5,0.5, 0);
                //this.menus[index].rotation.set(0, 0, e.centerVelocity.x /1000);

                if (e.centerVelocity.x > this.threshold) {
                    if (this.draggedIndex === index && this.currentArticle === index) {
                        // Move index to left
                        this.node.emit('changeArticle', {direction: -1});
                    }
                }
                else if (e.centerVelocity.x < -this.threshold){
                    if (this.draggedIndex === index && this.currentArticle === index) {
                        this.node.emit('changeArticle', {direction: 1});
                    }
                }

                if (e.status === 'start') {
                    this.draggedIndex = index;
                }
        	}.bind(this, i));
		    footer.gestures.on('tap', function(e){
		        console.log(1);
		        this.node.emit("changeArticle");
		        //this.node.emit("applyForce", {e: e});
		    }.bind(this));


			result.push({
				align: align,
				footer:footer
			});
			//footer.node.hide();
        }.bind(this));

		return result;
	}

	function _makeMenus(data, root){
		var result = [];
		var el = root.addChild();
		data.forEach(function(magazin, i){
			var childForAlign = el.addChild();
			var node = makeHexMenuElements.call(this, childForAlign, magazin);

			var box = new Box({
	            mass: 100,
	            size: [100,100,100]
	        });

			result.push({
				align: new Align(childForAlign),
				node: node,
				box: box,
			});
			//node.node.hide();
		}.bind(this));
		return result;
	}

	function makeFooter(child, data){
		var footer = child.addChild()
				  	.setAlign(0.5, 1)
				  	.setMountPoint(0.5, 1)
				  	.setSizeMode(0, 1)
					.setAbsoluteSize(undefined, this.options.footerSize)
					.addChild();
		footer = new App.HexFooter(footer, data);
		return footer;
	}

	function makeHexMenuElements(child, data){

		var hexMenuEls = child.addChild()
							.setDifferentialSize(0, -this.options.footerSize)
							.addChild();
		return new App.HexMenu(hexMenuEls, data);
	}



	App.ArticleMenu  = ArticleMenu;
});
