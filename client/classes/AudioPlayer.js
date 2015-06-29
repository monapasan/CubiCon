Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function AudioPlayer(node, data, options){
		this.node = node;
        this.data = data;
        this.options = _.extend(this.DEFAULT_PROPERTIES, options);
        this._componentId = setComponents.call(this,this.node);
        this.audio = createAudio.call(this, this.node);
        this.pause = createPauseButton.call(this, this.node);
        this.play = createPlayButton.call(this, this.node);
        this.selectPause();
        this.progressbar = createProgressbar.call(this, this.node);
        this.duration = createDuration.call(this, this.progressbar.durationNode);

    }

    AudioPlayer.prototype.DEFAULT_PROPERTIES = {
        margin: 25,
        colorScheme: "#8c9fad"
    };

    AudioPlayer.prototype.selectPlay = function () {
        this.play.dom.setProperty('color', this.options.colorScheme);
        this.pause.dom.setProperty('color', "#080908");
    };

    AudioPlayer.prototype.selectPause = function () {
        this.play.dom.setProperty('color', "#080908");
        this.pause.dom.setProperty('color', this.options.colorScheme);
    };

    AudioPlayer.prototype.setTime = function(time){
        this.duration.setContent(time);
    };

    function setComponents(){
        var comp = {
            onUpdate: this.updateAllStuff.bind(this)
        };
        return this.node.addComponent(comp);
    }
    // updating Progressbar, time, and kugel
    AudioPlayer.prototype.updateAllStuff = function(){
        var progress = this.audio.seek(this.currentAudio);
        var currentTime = getTimeString(progress);
        var duration = this.audio.duration();
        var prozent = progress / duration * 100;
        this.setProgress.call(this, prozent);
        this.setTime(currentTime);
        if (this._progressUpdater.isActive()) this.node.requestUpdate(this._componentId);
    };

    AudioPlayer.prototype.setProgress = function(prozent){
        var length = this.progressbar.duration.getSize()[0];
        var value = prozent * length / 100;
        this.progressbar.activeLine.setAbsoluteSize(value);
        this.progressbar.kugle.setPosition(value);
    };

    function createPauseButton(node){
        var pauseButton = node.addChild()
                            .setAlign(0.5, 0.15)
                            .setMountPoint(0.5, 0)
                            .setSizeMode(1,1)
                            .setPosition(-this.options.margin, 40)
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

    function createPlayButton(node){
        var playButton = node.addChild()
                            .setAlign(0.5, 0.15)
                            .setMountPoint(0.5, 0)
                            .setSizeMode(1,1)
                            .setPosition(this.options.margin, 40)
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

    function createAudio(node) {
        var audio = new Howl({
            src: [this.data.audio],
            html5: true,
            onend: function(){
                this.selectPause();
            }.bind(this)
        });
        return audio;
    }
    function bindPlayEvent() {
        this.selectPlay();
        if(!this.currentAudio){
            this.currentAudio = this.audio.play();
            this._progressUpdater = new Transitionable(0).set(10,{duration:this.audio.duration()});
            this.node.requestUpdate(this._componentId);

        }
        if(!this.audio.playing(this.currentAudio)){
            this.audio.play(this.currentAudio);
            this.node.requestUpdate(this._componentId);
            this._progressUpdater.resume();

        }
    }

    function bindPauseEvent() {
        this.selectPause();
        if(!this.currentAudio){
            return;
        }
        this.audio.pause(this.currentAudio);
        this._progressUpdater.pause();
    }

    function createProgressbar(node) {
        var durationNode = node.addChild()
                                .setSizeMode(0, 1)
                                .setProportionalSize(0.8, undefined)
                                .setAlign(0.1, 0.17)
                                .setAbsoluteSize(undefined, 5);
        new DOMElement(durationNode,{
            classes:['duration']
        });
        var gestDuration = new GestureHandler(durationNode);
        gestDuration.on('tap', setTimePeriod.bind(this));
        var activeLine = durationNode.addChild()
                                    .setPosition(0,-0.5)
                                    .setSizeMode(1,1)
                                    .setAbsoluteSize(1,6);
        new DOMElement(activeLine,{
            classes:['activeLine'],
            properties:{
                'background-color': this.options.colorScheme
            }
        });
        var kugle = durationNode.addChild()
                                .setSizeMode(1,1)
                                .setAbsoluteSize(15,15)
                                .setMountPoint(0.5, 0.35);
        new DOMElement(kugle,{
            classes:['kugle'],
            properties:{
                'background-color': this.options.colorScheme
            }
        });
        return {
            duration: durationNode,
            activeLine: activeLine,
            kugle: kugle
        };
    }

    function setTimePeriod(event, payload) {
        console.log(event, payload);
    }

    function createDuration(node) {
        var duration = this.audio.duration();
        var time = getTimeString(duration);
        var timeNode = this.progressbar.duration.addChild()
                            .setSizeMode(1,1)
                            .setAbsoluteSize(40,10)
                            .setAlign(1,1)
                            .setMountPoint(0.8,0);
        var el = new DOMElement(timeNode,{
            content: time
        });
        return el;
    }
    function getTimeString(time){
        var seconds = Math.floor(time%60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var minutes = Math.floor(time/60);
        return minutes + ":" + seconds;
    }
    App.AudioPlayer = AudioPlayer;
});
