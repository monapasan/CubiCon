Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function DefaultTemplate(node, data, options){
		this.node = node;
        this.options = _.extend(this.DEFAULT_PROPERTIES, options);
        this.data = getData.call(this, data);
		setComponents.call(this,this.node);
		createBg.call(this, this.node);
        createImgHeader.call(this,this.node);
		createTitleWithLine.call(this, this.node);
        this.footer = createFooter.call(this, this.node.getParent());
		this.lastCord = 100;
    }

    DefaultTemplate.prototype.DEFAULT_PROPERTIES = {
        type: "text",
        includeImg: true,
    };

    DefaultTemplate.prototype.show = function show() {
        this.node.show();
    };
    DefaultTemplate.prototype.hide = function hide() {
        this.node.hide();
    };
    DefaultTemplate.prototype.emit = function emit(event, payload) {
        this.node.emit(event, payload);
    };
    function getData(data) {
        this.colorScheme = data.colorScheme;
        var newData = _.filter(data.sections,function(section){
            return section.type === this.options.type;
        }.bind(this));
        return _.first(newData).content;
    }

	function createBg(node){
		var bg = new DOMElement(node,{
			properties:{
				'background-color': '#f0f0f0',
				'overflow-y': 'scroll'
			}
		});
		node.addUIEvent('scroll');
		node.onReceive = handleScrollEvent.bind(this);
	}

	function handleScrollEvent(e, payload) {
		if(e != 'scroll'){
			return;
		}
		var cord = getScrollCord.call(this);

		if(this.footer.opacity.isActive()){
			this.footer.opacity.halt();
		}
		if((this.lastCord - cord) >= 0){
			this.footer.opacity.set(0,{duration:200},function(){
				this.footer.node.hide();
			}.bind(this));
		}
		else{
			if(!this.footer.node.isShown()) this.footer.node.show();
			this.footer.opacity.set(1,{duration:200});
		}
		this.lastCord = cord;
	}

	function getScrollCord() {
		var els = document.getElementsByClassName('scroll');
		els = Array.prototype.filter.call(els, function(element){
			return element.innerText == this.data.title;
		}.bind(this));
		var cord = _.first(els);
		cord = cord.getBoundingClientRect().bottom;
		return cord;
	}
    function setComponents(){
        var comps = {
            onReceive: onReceive.bind(this),
			//v0.6.2 onShow
			onShow: function(){
				this.lastCord = getScrollCord.call(this);
			}.bind(this)
        };
        this.node.addComponent(comps);
    }

    function onReceive(event, payload){
        //nothing yet
    }

    function createImgHeader(node){
        var lineAlign = this.options.includeImg ? 0.33 : 0;
        if(this.options.includeImg){
            var header = node.addChild().setProportionalSize(1, 0.33);
            new DOMElement(header,{
                tagName: 'img',
                classes: ['textTmpl','header'],
            }).setAttribute('src', this.data.headerImg);
        }
        var line = node.addChild()
                       .setSizeMode(0,1)
                       .setAbsoluteSize(undefined, 4)
                       .setAlign(0, lineAlign)
                       .setMountPoint(0,0);
		new DOMElement(line, {
			classes: ['scroll'],
	   		properties: {
			   'background-color': this.colorScheme
			   }
			});
		// maybe later. Set on header background opacity:
		// new DOMElement(header.addChild().setProportionalSize(1, 1), {
		// 	properties: {
		// 		'background-color': this.colorScheme,
		// 		'opacity': 0.5
		// 		}
		// 	});
    }

	function createTitleWithLine(node) {
        var yAlign = this.options.includeImg ? 0.48 : 0.15;
        var yLineAlign = 0.8;
		var title = node.addChild()
						.setProportionalSize(1, 0.1)
						.setAlign(0.5,yAlign)
						.setMountPoint(0.5, 1);
		var titleEl = new DOMElement(title,{
			content: this.data.title,
			classes:['article-description', 'name', 'scroll']
		});
		var line = title.addChild()
						.setSizeMode(1,1)
						.setAbsoluteSize(50,5)
						.setAlign(0.5,yLineAlign)
						.setMountPoint(0.5,0.5);
		new DOMElement(line, {
			properties: {
				'background-color':'#222229'
			}
		});
		return title;
	}

    function createFooter(node){

		var footer = node.addChild().setProportionalSize(1, 0.1)
								.setAlign(0, 1)
								.setMountPoint(0, 1);
		new DOMElement(footer,{
			classes: ['textTmpl', 'footer']
		});
		//button for closing Artticle Part
		var close = footer.addChild()
						.setSizeMode(1, 1)
						.setAbsoluteSize(35, 35)
						.setAlign(0.5, 0.5)
						.setMountPoint(0.5, 0.5);
		var closeEl = new DOMElement(close,{
			classes: ['textTmpl', 'close']
		});
		closeEl.setContent('<i class="fa fa-times"></i>');
		var gest = new GestureHandler(close);
		gest.on('tap', emitClosingContentView.bind(this));
		var footerOpacity = new Opacity(footer);
		var arrowRight = getArrow(footer, 1);
		var arrowLeft = getArrow(footer);
		return {
			node: footer,
			opacity: footerOpacity
		};

    }
	function emitClosingContentView() {
		this.emit('closeArticleContent');
	}
	function getArrow(node, direction){
		var content = direction ? '<i class="fa fa-caret-right"></i>' : '<i class="fa fa-caret-left"></i>';
		var align = direction ? 1 : 0;
		var position = direction ? -20 : 10;
		var arrow = node.addChild()
										.setSizeMode(1,1)
										.setAbsoluteSize(10, 30)
										.setPosition(position, 0)
										.setAlign(align, 0.5)
										.setMountPoint(0,0.5);
		new DOMElement(arrow,{
			classes: ["textTmpl", 'arrow'],
			content: content
		});
		return arrow;
	}


    App.DefaultTemplate = DefaultTemplate;

});
