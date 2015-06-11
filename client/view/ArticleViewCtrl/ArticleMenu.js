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
		Node.call(this);
	    this.currentArtikel = 0;
	    this.data = data[this.currentArtikel];
	    this.articelAmount = data.length;
	    makeBg.call(this);
		makeFooter.call(this);
		makeBody.call(this);

	}
	MenuView.prototype = Object.create(Node.prototype);
	MenuView.prototype.constructor = MenuView;
	MenuView.prototype.onParentMount = function onParentMount(parent, parentId, index){
		this.mount(parent, parentId + '/' + index);
			// do stuff
			this.hide();
		return this;
	};

	MenuView.prototype.onReceive = function onReceive(event, payload){
		if(event ==="showMenu"){
				this.show();
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
				this.currentArtikel = payload.id;
		}
	};
	function makeBg(){
		this.backgroundColor = new DOMElement(this, {
            classes: ['bg','articleMenu']/*,
            properties:{
                backgroundColor: '#'+ this.data.bgColor
            }*/
        });
	}
	function makeFooter(){
		this.addChild()
				  	.setAlign(0.5, 1)
				  	.setMountPoint(0.5, 1)
				  	.setSizeMode(0, 1)
					.setAbsoluteSize(undefined, 50)
					.addChild(new App.HexFooter(this.data));
	}
	function makeBody(){
		this.addChild()
					.setDifferentialSize(0, -50)
					.addChild(new App.HexMenu());
	}

	App.MenuView  = MenuView;
});
