Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function SpritzTemplate(node, data, options){
		this.node = node.addChild();
		this.options = _.extend(this.DEFAULT_PROPERTIES, options);
        this.template = createDefaultTemplate.call(this, this.node, data);
        this.currentQuestion = 0;
		this.data = this.template.data;
		this.colorScheme = this.template.colorScheme;
        this.icon = createIcon.call(this, this.node);
		this.questionSwapper = questionSwapper.call(this, this.node);
		this.spritz = createSpritz.call(this, this.node);
        this.arrows = createArrows.call(this, this.node);
        this.questionAmount = this.data.questions.length;
    }
	SpritzTemplate.prototype = Object.create(App.DefaultTemplate.prototype);
	SpritzTemplate.prototype.DEFAULT_PROPERTIES = {
		text:true
	};

    SpritzTemplate.prototype.show = function show() {
        this.node.show();
    };

    SpritzTemplate.prototype.hide = function hide() {
        this.node.hide();
    };

    function createIcon(node) {
        var iconNode = node.addChild()
                .setAlign(0.5,0.2)
                .setSizeMode(1, 1)
                .setAbsoluteSize(50,50)
                .setMountPoint(0.5, 0);
        var iconDom = new DOMElement(iconNode,{
            classes: ['spritzTemplate','icon'],
            properties:{
                'background-color': this.colorScheme
            }
        });

    }

	function questionSwapper(node){
		var textNode = node.addChild()
							.setSizeMode(0, 2)
							.setAlign(0.5, 0.4)
							.setProportionalSize(0.7, 0.2)
							.setMountPoint(0.5, 0);
		var dom = new DOMElement(textNode,{
			classes: ['spritzTemplate', 'title'],
			content: this.data.questions[this.currentQuestion]
		});
        var gest = new GestureHandler(textNode);
        gest.on('tap', changeQuestions.bind(this, false));
        return {
            node: textNode,
            dom: dom
        };
	}

    function createArrows(node) {
        var arrowLeft = createArrow.call(this,node, true);
        var arrowRight = createArrow.call(this,node, false);
        return [arrowLeft, arrowRight];
    }

    function createArrow(node, direction) {
        var content = direction ? '<i class="fa fa-caret-left"></i>' : '<i class="fa fa-caret-right"></i>';
        var position = direction ? 15 : -15;
        var align = direction ? 0 : 1;
        var arrowNode = node.addChild()
                                    .setSizeMode(1,1)
                                    .setAbsoluteSize(40, 40)
                                    .setPosition(position, 0)
                                    .setAlign(align, 0.4)
                                    .setMountPoint(align, 0);
        new DOMElement(arrowNode,{
            classes:['spritzTemplate', 'arrow'],
            content: content
        });
        var gest = new GestureHandler(arrowNode);
        gest.on('tap', changeQuestions.bind(this, direction));
    }
    function changeQuestions(direction) {
        //direction is defined --> left arrow was taped
        if(this.spritz.isRunning()){
            this.spritz.stop();
        }
        var nextIndex = getNextIndex.call(this, direction ? -1 : 1);

        if(nextIndex === this.currentQuestion)
            return;
        var data = this.data.answers[nextIndex];
        this.spritz.setSelection(data, " ");
        this.questionSwapper.dom.setContent(data);
        this.currentQuestion = nextIndex;

    }

    function getNextIndex(direction, e){
		if(!direction){
			return false;
		}
		var oldIndex = this.currentQuestion;
	    var i = oldIndex + direction ;
	    var min = 0;
	    var max = this.questionAmount - 1;
        var newIndex = i > max ? max : i < min ? min : i;
        return newIndex;
	}


    function createSpritz(node) {
		var speedReadNode = node.addChild().setAlign(0, 0.4);
        var data = {
            text:this.data.questions[this.currentQuestion]
        };
		return new App.SpeadReader(speedReadNode, data, {colorScheme : this.colorScheme, intro:' '});
	}

    function createDefaultTemplate(node, data){
        var options = {
            type:"spritz",
            includeImg: false
        };
        return new App.DefaultTemplate(node, data, options);
    }

    App.SpritzTemplate = SpritzTemplate;
});
