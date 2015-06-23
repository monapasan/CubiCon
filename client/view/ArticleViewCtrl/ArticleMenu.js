Meteor.startup(function(){


	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var Align = Famous.Align;
	var Header = App.Header;
	var Footer = App.Footer;
	var Swapper = App.Swapper;
	var ArticleSelectionBody = App.ArticleSelectionBody;
	var Transitionable = Famous.Transitionable;
	var Opacity = Famous.Opacity;
	var GestureHandler = Famous.GestureHandler;
	var PhysicsEngine = Famous.PhysicsEngine;
	var FamousEngine = Famous.FamousEngine;
	var Box = Famous.Box;
	var Quaternion = Famous.Quaternion;
	var RotationalSpring = Famous.RotationalSpring;
	function MenuView(data) {
		this.options = Object.create(MenuView.DEFAULT_PROPERTIES);
		Node.call(this);
	    this.currentMagazin = 0;
		this.currentArticle = 0;
	    this.articleAmount = data.length;
	    makeBg.call(this);
		this.magazines = [];
	    this.data = data;
	    this.opacity = new Opacity(this);
	    this.opacity.set(0,{duration:1});
        this.simulation = new PhysicsEngine();

    // .requestUpdate will call the .onUpdate method next frame, passing in the time stamp for that frame
    	//this.updater = {};
    	//this.updater.onUpdate = onUpdate.bind(this);
    	//FamousEngine.requestUpdate(this.updater);
    	this.force = new Famous.Vec3();
		//this.description = makeDescriptionView.call(this);
		//doControlsEvents();
		this.footers = _makeFooters.call(this, data);
		this.menus = _makeMenus.call(this, data);
	}
	MenuView.prototype = Object.create(Node.prototype);

	MenuView.prototype.constructor = MenuView;

	MenuView.prototype.onParentMount = function onParentMount(parent, parentId, index){
		this.mount(parent, parentId + '/' + index);
			this.hide();
		return this;
	};

/*	function onUpdate(time) {
	    this.simulation.update(time);

	    var page;
	    var physicsTransform;
	    var p;
	    var r;
	    for (var i = 0, len = this.menus.length; i < len; i++) {
	        page = this.menus[i];

	        // Get the transform from the `Box` body
	        physicsTransform = this.simulation.getTransform(page.box);
	        //p = physicsTransform.position;
	        r = physicsTransform.rotation;

	        // Set the `imageNode`'s x-position to the `Box` body's x-position
	        //page.node.setPosition(p[0] * this.pageWidth, 0, 0);

	        // Set the `imageNode`'s rotation to match the `Box` body's rotation
	        page.rotation.set(0, 0, 0, r[3]);
	        //console.log(r[0], r[1], r[2], r[3]);
	    }

	    FamousEngine.requestUpdateOnNextTick(this.updater);
	}*/

	MenuView.prototype.hideElementsFromAnotherMagazine = function hideElementsFromAnotherMagazine(){
/*		this.magazines.forEach(function(magazin){
				magazin.node.setAlign(-1, 0, 0, {duration:1});
			magazin.footer.setAlign(-1, 0, 0, {duration:1});
			magazin.node.hide();
			magazin.footer.hide();
		});*/

		this.footers.forEach(function(footerEl, i){
			footerEl.footer.hide();
			this.menus[i].node.hide();
		}.bind(this));

	};

	MenuView.prototype.changeDescription = function changeDescription(){
		this.menus[this.currentMagazin].node.getDescriptionsParent().show();
		var grids = this.menus[this.currentMagazin].node.grids;
		grids.forEach(function(gridEl){
			if(gridEl.grid.isShown()){
				gridEl.grid.hide();
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

	MenuView.prototype.onReceive = function onReceive(event, payload){
		if(event ==="showMenu"){
				this.show();
	   			this.opacity.set(1,{duration:200});

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
			this.menus[this.currentMagazin].node.grids[this.currentArticle].grid.show();
			this.menus[this.currentMagazin].node.grids[this.currentArticle].grid.showElements();
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
		//this.menus[this.currentMagazin].node.show();
		this.menus.forEach(function(el, i){
			if(i !== this.currentMagazin){
				el.node.getGridsParent().hide();
				el.node.getDescriptionsParent().hide();
				this.footers[i].footer.hide();
			}
		}.bind(this));
		//this.menus[this.currentMagazin].node.getGridsParent().hide();
		this.menus[this.currentMagazin].node.getDescriptionsParent().show();
		this.footers[this.currentMagazin].footer.show();
		this.emit("showArticleBody",{currentMagazin: this.currentMagazin});
		/*this.magazines[this.currentArticle].node.setAlign(0,0,0, {duration:1});
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
				menu: makeHexMenuElements.call(this, node.addChild(), magazin),
				menuAlign: menuAlign,
				footerAlign: footerAlign
			};
		}.bind(this));*/
	function _makeFooters(data){
		var result = [];
		var el = this.addChild();
		data.forEach(function(magazin, i){
			var childForAlign = el.addChild();
			var footer = makeFooter.call(this, childForAlign, magazin);
			var align = new Align(childForAlign);
/*			footer.onReceive = function(index, event, e){
				if(event == "applyForce"){
					e = e.e;
					//console.log(payload);
					//console.log(e.centerVelocity.x);
                    this.force.set(e.centerDelta.x, 0, 0); // Add a force equal to change in X direction
                    this.force.scale(20); // Scale the force up
                    this.menus[index].box.applyForce(this.force); // Apply the force to the `Box` body
                    this.menus[index].node.setOrigin(0.5,0.5, 0);
                    //this.menus[index].rotation.set(0, 0, e.centerVelocity.x /1000);

                    if (e.centerVelocity.x > this.threshold) {
                        if (this.draggedIndex === index && this.currentArticle === index) {
                            // Move index to left
                            this.emit('changeArticle', {direction: -1});
                        }
                    }
                    else if (e.centerVelocity.x < -this.threshold){
                        if (this.draggedIndex === index && this.currentArticle === index) {
                            this.emit('changeArticle', {direction: 1});
                        }
                    }

                    if (e.status === 'start') {
                        this.draggedIndex = index;
                    }
                }
            }.bind(this, i);*/
			// 	}
			// };
	        // var gestureHandler = new GestureHandler(footer);
         //    gestureHandler.on('drag', function(index, e) {

			result.push({
				align: align,
				footer:footer
			});
			footer.hide();
		}.bind(this));
		return result;
	}

	function _makeMenus(data){
		var result = [];
		var el = this.addChild();
		data.forEach(function(magazin, i){
			var childForAlign = el.addChild();
			var node = makeHexMenuElements.call(this, childForAlign, magazin);
			
			var box = new Box({
	            mass: 100,
	            size: [100,100,100]
	        });
	        // except for first image node
	        var quaternion = i === 0 ? new Quaternion() : new Quaternion().fromEuler(0, 0, -Math.PI/2);

	        // Attach an anchor orientation to the `Box` body with a `RotationalSpring` torque
	        var rotationalSpring = new RotationalSpring(null, box, {
	            period: 1,
	            dampingRatio: 0.2,
	            anchor: quaternion
	        });
	        var rotation = new Famous.Rotation(node);
	        //this.simulation.add(box, rotationalSpring);
			result.push({
				align: new Align(childForAlign),
				node: node,
				rotation: rotation,
				box: box,
				quaternion: quaternion,
				rotationalSpring: rotationalSpring
			});
			node.hide();
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
		//new GestureHandler(footer);
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
