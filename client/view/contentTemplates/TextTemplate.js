Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function TextTemplate(node, data){
		this.node = node;
        this.data = getData.call(this, data);
		setComponents.call(this,this.node);
		createBg.call(this, this.node);
        createImgHeader.call(this,this.node);
		createTitleWithLine.call(this, this.node);
		createCore.call(this, this.node, this.data);
        createFooter.call(this, this.node);
    }


    TextTemplate.prototype.show = function show() {
        this.node.show();
    };
    TextTemplate.prototype.hide = function hide() {
        this.node.hide();
    };
    TextTemplate.prototype.emit = function emit(event, payload) {
        this.node.emit(event, payload);
    };
    function getData(data) {
        this.colorScheme = data.colorScheme;
        data = _.filter(data.sections,function(section){
            return section.type ==="text";
        });
        return _.first(data).content;
    }

	function createBg(node){
		new DOMElement(node,{
			properties:{
				'background-color': '#f0f0f0'
			}
		});
	}


    function setComponents(){
        var comps = {
            onReceive: onReceive.bind(this)
        };
        this.node.addComponent(comps);
    }

    function onReceive(event, payload){
        //nothing yet
    }

    function createImgHeader(node){
        var header = node.addChild().setProportionalSize(1, 0.33);
        new DOMElement(header,{
            tagName: 'img',
            classes: ['textTmpl','header'],
        }).setAttribute('src', this.data.headerImg);
        var line = node.addChild()
                       .setSizeMode(0,1)
                       .setAbsoluteSize(undefined, 4)
                       .setAlign(0,0.33)
                       .setMountPoint(0,0);
       new DOMElement(line, {
           properties: {
               'background-color': this.colorScheme
               }
           });
    }

	function createTitleWithLine(node) {
		var title = node.addChild()
						.setProportionalSize(1, 0.1)
						.setAlign(0.5,0.48)
						.setMountPoint(0.5, 1);
		var titleEl = new DOMElement(title,{
			content: this.data.title,
			classes:['article-description', 'name']
		});
		var line = title.addChild()
						.setSizeMode(1,1)
						.setAbsoluteSize(50,5)
						.setAlign(0.5,0.8)
						.setMountPoint(0.5,0.5);
		new DOMElement(line, {
			properties: {
				'background-color':'#222229'
			}
		});
		return title;
	}

	function createCore(node, data) {
		var textSwapperNode = node.addChild().setAlign(0, 0.5);
		return new App.TextSwapper(textSwapperNode, data, {colorScheme:this.colorScheme});
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

		var arrowRight = getArrow(footer, 1);
		var arrowLeft = getArrow(footer);

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


    App.TextTemplate = TextTemplate;

});
