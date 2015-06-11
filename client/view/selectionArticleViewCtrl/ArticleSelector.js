Meteor.startup(function(){


	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var Align = Famous.Align;
	var Header = App.Header;
	var Footer = App.Footer;
	var Swapper = App.Swapper;
	var GestureHandler = Famous.GestureHandler;
	var ArticleSelectionBody = App.ArticleSelectionBody;
	var Transitionable = Famous.Transitionable;
	function SelectionView(data) {
		Node.call(this);

	    this.currentArticle = 0;
	    this.data = data;
	    //this.currentSection = data[this.currentArticle]._id;
	    this.articleAmount = data.length;
		this.addUIEvent("click");
	    makeBackground.call(this);
	    makeHeader.call(this);
		makeFooter.call(this);
		this.articles = makeArticles.call(this);
	}

	SelectionView.prototype = Object.create(Node.prototype);
	SelectionView.prototype.constructor = SelectionView;
	SelectionView.prototype.onReceive = function onReceive (event, payload) {
		var prefix = new Transitionable([1,1]);
		var changeArticle = event === 'selectFooter' ? "down" : event === 'selectHeader' ? "up" : undefined;
		if (changeArticle) {
			var to;

		    if(changeArticle == 'down')
		     	to = this.currentArticle + 1;
		    else if(changeArticle == 'up')
		     	to = this.currentArticle - 1;
		    else
		    	this.emit('goToAnotherView',{href: payload.node.getParent().data._id});
		    if(to >= this.articleAmount || to < 0){
		     	return;
		    }
		    this.emit('changeArticle', {
		        from: this.currentArticle,
		        to: to
		    });
		}
		if(event ===  "changeArticle"){
			this.changeArticle(payload.to, payload.from);
		}
		if(event === "goInsideArticle"){
			//Utils.fadingOut(this, prefix);
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
			prefix.set([0.7, Utils.scaleMenuOut], { duration: Utils.selectionMenuChangeTime}, function(){
				this.emit("showMenu",{id: this.currentArticle});
				this.hide();
			}.bind(this));
			// this.setScale(1.5,1.5)
			// this.hide();
		}
        this.receive(event, payload);
	};
	// Overwrite on mount to emit the changeSection event the moment
	// twitter is added to the scene graph.
/*	SelectionView.prototype.onParentMount = function onMount(parent, id) {
   		Node.prototype.onParentMount.call(this, parent, id);
	   this.emit('changeArticle', {from: null, to: this.currentArticle});
	};*/
	SelectionView.prototype.onParentMount = function onParentMount (parent, parentId, index) {
    	this.mount(parent, parentId + '/' + index);
    	// do stuff
		this.emit('changeArticle', {from: null, to: this.currentArticle});
   		return this;
	};
	SelectionView.prototype.onMount = function onMount (parent, id) {
	   Node.prototype.onMount.call(this, parent, id);
	};


	function makeBackground(){
		this.backgroundColor = new DOMElement(this, {
            classes: ['bg']/*,
            properties:{
                backgroundColor: '#'+ this.data.bgColor
            } */
        });
	}
/*	function makeHeader(node) {
	    // the header will be positioned defaultly
	    // along the top of its parent.
	    // It will be the complete width of its parent
	    // and 100 pixels tall.
	    node.addChild()
	        .setSizeMode('default', 'absolute')
	        .setAbsoluteSize(null, 100)
	        .addChild(new Header());
	}
	        <div class="hexrow">
            <div>
                <span>Hex Text</span>
                <div></div>
                <div></div>
            </div>
        </div>
*/
	function makeArticles(articleNumber) {

	    var result = {};
	    this.data.forEach(function(dataItem, i){
	    	var child = this.addChild()
		        .setDifferentialSize(null, -100)
		        .setPosition(0, 50);
			result[i] = {
				align: new Align(child),
				artikel: child.addChild(new ArticleSelectionBody(this.data[i], i))
			};

	    }.bind(this));
	    return result;
	}
	SelectionView.prototype.changeArticle = function changeArticle (to, from) {
		var myOpacityChanger = new Transitionable([1, 1]);
		//var myOpacityChangerSecond = new Transitionable(1);
		var direction = from === null ? "first" : to > from ? true : false;
    	var curve =  {duration: 500, curve: 'easeIn'};
		Utils.fadingOut(this.header, myOpacityChanger, 1);
		Utils.fadingOut(this.footer, myOpacityChanger, 0);
		if(direction == "first"){
			for(var i = 0; i < this.articleAmount; i++){
				if(i == to){
					this.articles[i].align.set(0, 0, 0, curve);
				}
				else{
					this.articles[i].align.set(0, 1, 0, curve);
				}
			}
		}
		else if(direction){
			this.articles[from].align.set(0, -1, 0, curve);
			this.articles[to].align.set(0, 0, 0, curve);
		}
		else {
			this.articles[from].align.set(0, 1, 0, curve);
			this.articles[to].align.set(0, 0, 0, curve);
		}
		// fading out the Arrows if the current article
		// is last or first one
	    if(to == this.articleAmount - 1){
			myOpacityChanger.set([0, 1], {duration:700});
			//myOpacityChanger.set(0, { duration: 500});
			//myOpacityChangerSecond.set(1, { duration: 500});
	    }
	    else if(to === 0){
			myOpacityChanger.set([1, 0], {duration:700});
			//myOpacityChanger.set(1, { duration: 500});
			//myOpacityChangerSecond.set(0, { duration: 500});

	    } else{
			myOpacityChanger.set([1, 1], {duration:700});
			//myOpacityChanger.set(1, { duration: 500});
			//myOpacityChangerSecond.set(1, { duration: 500});

	    }
	    this.currentArticle = to;
	};

	function makeHeader() {

	    this.header = this.addChild()
	        .setSizeMode('default', 'absolute')
	        .setAbsoluteSize(null, 50)
	        .setMountPoint(0.5, 0)
	        .setAlign(0.5, 0);
	    this.headerEl = new DOMElement(this.header, {
	    	classes: ['arrowUp', 'white']
	    });
        this.header.addUIEvent('click');
		Utils.addClickComponent(this.header, "selectHeader");

	}

	function makeFooter(){
		this.footer = this.addChild()
						.setSizeMode('default', 'absolute')
						.setAbsoluteSize(null, 50)
						.setMountPoint(0, 1)
						.setAlign(0, 1);
	    this.footerEl = new DOMElement(this.footer, {
	    	classes: ['arrowDown', 'white']
	    });
        this.footer.addUIEvent('click');
		Utils.addClickComponent(this.footer, "selectFooter");
 /*   	var gestures = new GestureHandler(footer);
		function callback() { console.log('Gesture'); }
		gestures.on('tap', callback);*/
/*        var myComponent = {
    		onReceive: function(event, payload) {
	        console.log('Received ' + event + ' event!');
		    }
		};
		footer.addComponent(myComponent);*/
	}
	App.SelectionView  = SelectionView;
});
