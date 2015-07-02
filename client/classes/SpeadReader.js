Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function SpeadReader(node, data, options){
		this.node = node;
        this.data = data;
        this.options = _.extend(this.DEFAULT_PROPERTIES, options);
		this.speadReader = createSpeadReader.call(this, this.node);
		this.wpmBox = createWpmBox.call(this, this.node);
		this.play = createPlayButton.call(this, this.node);
		this.pause = createPauseButton.call(this, this.node);
		this.wpm = this.options.startWpmValue;
		this.wpmDropboxValue = 0;
		this.dropMenu = createWpmDromMenu.call(this, this.wpmBox);
		this.isDropMenuShown = false;
		setComponents.call(this, this.node);
    }
	function createWpmBox(node){
		var box = node.addChild()
						.setSizeMode(1,1)
						.setAlign(0.2,0.3)
						.setAbsoluteSize(90, 35);
		var dom = new DOMElement(box,{
			classes:['wpmBox', 'withBorder'],
			content:  this.options.startWpmValue + ' wpm'
		});
		var gest = new GestureHandler(box);
		gest.on('tap', showWmpValues.bind(this, box, dom));
		return {
			node: box,
			dom: dom
		};
	}
	function setComponents(node) {
		var comp  = {
			onShow: function(){
				setTimeout(hideDropMenu.bind(this), 10);
			}.bind(this)
		};
		node.addComponent(comp);
	}
	function createWpmDromMenu(wpmBox) {
		var result = [], i = this.options.startWpmValue;
		var str = '<ul>', node,q = 0, gest, dom;
		var box = wpmBox.node;
		for(; i <= this.options.endWpmValue; i += 50, q++){
			node  = box.addChild().setPosition(-2, 35 * (q + 1));
			dom = new DOMElement(node,{
				classes: ['wpmBox'],
				content: i + ' wpm'
			});
			gest = new GestureHandler(node);
			gest.on('tap', chooseSpeed.bind(this, i, q));
			if(i === this.wpm) dom.setProperty('opacity', '0.6');
			result[q] = {
				node: node,
				dom: dom
			};
		}
		return result;
	}

	function showWmpValues() {
		if(this.isDropMenuShown){
			this.isDropMenuShown = false;
			chooseSpeed.call(this, this.wpm, this.wpmDropboxValue);
			return void 0;
		}
		this.wpmBox.dom.addClass('ifCollapsed');
		this.dropMenu.forEach(function(item){
			item.node.show();
		});
		this.isDropMenuShown = true;
	}
	function chooseSpeed(wpm, number) {
		this.selectWpmValue.call(this, wpm, number);
		hideDropMenu.call(this);
	}
	function hideDropMenu(){
		this.dropMenu.forEach(function(el){
			el.node.hide();
		});
	}

	function createSpeadReader(node) {
        var sr = node.addChild()
					.setAlign(0.5, 0.15)
					.setSizeMode(0,1)
					.setAbsoluteSize(null, 50)
					.setMountPoint(0.5,0)
					.setProportionalSize(0.8);
        var el = new DOMElement(sr,{
            content:'Interne<span class="spritz_pivot">t</span>suchtige',
			classes: ['speedReader']
        });
        this.sprayReader = new SpeedReader(this.data.text, el);
		new DOMElement(sr.addChild().setPosition(65,-20),{
			content: "▼",
			classes: ['arrow']
		});
		new DOMElement(sr.addChild().setPosition(65,20),{
			content: "▲",
			classes: ['arrow']
		});
		return sr;
	}

	function createPauseButton(node){
		var pauseButton = node.addChild()
							.setAlign(0.65, 0.3)
							.setMountPoint(0.5, 0)
							.setSizeMode(1,1)
							.setPosition(-this.options.margin, 0)
							.setAbsoluteSize(30,30);
		var pauseEl = new DOMElement(pauseButton, {
			classes:["audioButtons"],
			content: '<i class="fa fa-pause"></i>'
		});
		var gest = new GestureHandler(pauseButton);
		gest.on('tap', bindPauseEvent.bind(this));
		return {
			button: pauseButton,
			dom: pauseEl,
			gest: gest
		};
	}
	function bindPauseEvent() {
		this.sprayReader.stopSpritz();
		this.selectPause.call(this);
	}
	function createPlayButton(node){
		var playButton = node.addChild()
							.setAlign(0.65, 0.3)
							.setMountPoint(0.5, 0)
							.setSizeMode(1,1)
							.setPosition(this.options.margin, 0)
							.setAbsoluteSize(30,30);
		var playEl = new DOMElement(playButton, {
			classes:["audioButtons"],
			content: '<i class="fa fa-play"></i>'
		});
		var gest = new GestureHandler(playButton);
		gest.on('tap', bindPlayEvent.bind(this));
		return {
			button: playButton,
			dom: playEl,
			gest: gest
		};
	}

	function bindPlayEvent() {
		if(!this.sprayReader.running){
			this.sprayReader.setWpm(this.wpm);
			this.sprayReader.startSpritz();
			this.selectPlay.call(this);
		}
	}

	SpeadReader.prototype.setWpm = function(wpm){
		this.wpm = wpm;
	};

	SpeadReader.prototype.selectWpmValue = function(wpm, q){
		this.wpmBox.dom.setContent(wpm + ' wpm');
		this.wpmBox.dom.removeClass('ifCollapsed');
		this.dropMenu.forEach(function(item, i){
			if(q === i) item.dom.setProperty('opacity', '0.6');
			else item.dom.setProperty('opacity', '1');
		}.bind(this));
		this.wpmDropboxValue = q;
		this.setWpm(wpm);
	};
	SpeadReader.prototype.selectPlay = function () {
		this.play.dom.setProperty('color', this.options.colorScheme);
		this.pause.dom.setProperty('color', "#080908");
	};

	SpeadReader.prototype.selectPause = function () {
		this.play.dom.setProperty('color', "#080908");
		this.pause.dom.setProperty('color', this.options.colorScheme);
	};

    SpeadReader.prototype.DEFAULT_PROPERTIES = {
        margin: 25,
		startWpmValue:250,
		endWpmValue: 400,
        colorScheme: 'white'
    };
    App.SpeadReader = SpeadReader;
});
