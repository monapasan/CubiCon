Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function QuestionsTemplate(node, data){
		this.node = node.addChild();
		this.defaultTemplate = createDefaultTemplate.call(this,this.node, data);
        this.data = this.defaultTemplate.data;
        this.answers = [];
        this.currentQuestion = 0;
        this.questionsConent = this.data.questions;
        this.amountQuestions = this.questionsConent.length;
        this.results = this.data.results;
        this.colorScheme = this.defaultTemplate.colorScheme;
        this.questions = createQuestions.call(this, this.node);
        this.counter = createCounter.call(this, this.node);
        this.answerButtons = createAnswerbuttons.call(this, this.node);
    }


    QuestionsTemplate.prototype.show = function show() {
        this.node.show();
    };
    QuestionsTemplate.prototype.hide = function hide() {
        this.node.hide();
    };
    QuestionsTemplate.prototype.emit = function emit(event, payload) {
        this.node.emit(event, payload);
    };

    function createCounter(node) {
        var counterNode = node.addChild()
                                .setSizeMode(1,1)
                                .setAlign(0.5,0.6)
                                .setAbsoluteSize(75,30)
                                .setMountPoint(0.5,0);
        var dom = new DOMElement(counterNode,{
            classes: ['questionTemplate', 'counter'],
            content: 1 + this.currentQuestion +  ' | '  + this.amountQuestions
        });
        return {
            node:counterNode,
            dom: dom
        };
    }

    function createQuestions(node) {
        var questionsNode = node.addChild()
                                .setSizeMode(0,2)
                                .setProportionalSize(0.5, undefined)
                                .setAlign(0.5,0.20)
                                .setMountPoint(0.5,0);
        var dom = new DOMElement(questionsNode,{
            classes: ['questionTemplate', 'question'],
            content: this.questionsConent[this.currentQuestion]
        });
        return {
            node: questionsNode,
            dom: dom
        };
    }
    function createAnswerbuttons(node) {
        var parentNode = node.addChild()
                                .setSizeMode(0, 1)
                                .setAlign(0.5,0.7)
                                .setMountPoint(0.5, 0)
                                .setProportionalSize(0.5, null)
                                .setAbsoluteSize(null, 50);
        var yesButton = createButton.call(this, parentNode, true);
        var noButton = createButton.call(this, parentNode, false);
        return {
            parentNode: parentNode,
            yesButton: yesButton,
            noButton: noButton
        };

    }

    function createButton(parentNode, value) {
        var position = value ? -60 : 60;
        var content = value? 'ja' : 'nein';
        var buttonNode = parentNode.addChild()
                                .setSizeMode(1,1)
                                .setAlign(0.5, 0)
                                .setMountPoint(0.5, 0)
                                .setPosition(position, 0)
                                .setAbsoluteSize(80, 35);
        el = new DOMElement(buttonNode,{
            classes: ['questionTemplate','button'],
            content: content
        });
        var gest = new GestureHandler(buttonNode);
        gest.on('tap', answerQuestion.bind(this, value));
        return {
            node: buttonNode,
            dom: el
        };
    }

    function answerQuestion(value, e) {
        changeQuestion.call(this);
        saveAnswer.call(this, value);
    }
    function changeQuestion() {
        var number = this.currentQuestion + 1;
        if(number >= this.amountQuestions){
            giveResult.call(this);
            return;
        }
        var question = this.questionsConent[number];
        this.questions.dom.setContent(question);
        setCounter.call(this, number);
        this.currentQuestion = number;
    }

    function setCounter(number) {
        var content = 1 + number + ' | ' + this.amountQuestions;
        this.counter.dom.setContent(content);
    }

    function giveResult() {
        this.counter.node.hide();
        this.answerButtons.parentNode.hide();
        var amountYesAnswers = countAnswer.call(this);
        var result;
        if(amountYesAnswers >= 0){
            result = this.results[0];
        }
        this.questions.dom.setContent(result);
        this.questions.node.setProportionalSize(0.8,0);
    }

    function countAnswer() {
        var amountYesAnswers = this.answers.filter(function(answer){
            return answer === true;
        }).length;
        return amountYesAnswers;
    }

    function saveAnswer(value) {
        this.answers.push(value);
    }
	function createDefaultTemplate(node, data){
		var options = {
			type: "questions",
			includeImg: false
		};
		return new App.DefaultTemplate(node, data, options);
	}

    App.QuestionsTemplate = QuestionsTemplate;

});
