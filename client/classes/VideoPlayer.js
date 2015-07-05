Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function VideoPlayer(node, data, options){
		this.node = node;
        this.data = data;
        this.options = _.extend(this.DEFAULT_PROPERTIES, options);
        this._componentId = setComponents.call(this,this.node);
        this.audio = createVideo.call(this, this.node);
        this.pause = createPauseButton.call(this, this.node);
        this.play = createPlayButton.call(this, this.node);
        this.selectPause();
        this.progressbar = createProgressbar.call(this, this.node);
        // this.duration = createDuration.call(this, this.progressbar.durationNode);
    }

    VideoPlayer.prototype.DEFAULT_PROPERTIES = {
        margin: 25,
        colorScheme: "#8c9fad",
        timeToogle: true
    };

    VideoPlayer.prototype.selectPlay = function () {
        this.play.dom.setProperty('color', this.options.colorScheme);
        this.pause.dom.setProperty('color', "#080908");
    };

    VideoPlayer.prototype.selectPause = function () {
        this.play.dom.setProperty('color', "#080908");
        this.pause.dom.setProperty('color', this.options.colorScheme);
    };

    // VideoPlayer.prototype.setTime = function(time){
    //     this.duration.setContent(time);
    // };

    function setComponents(){
        var comp = {
            onUpdate: this.updateAllStuff.bind(this),
            onMount: function() {
                setTimeout(getVideoEl.bind(this),500);
            }.bind(this)
        };
        return this.node.addComponent(comp);
    }
    // updating Progressbar, time, and kugel
    VideoPlayer.prototype.updateAllStuff = function(){
        var progress = this.video.currentTime;
        var duration = this.video.duration;
        var currentTime = this.options.timeToogle ? progress : duration - progress;
        currentTime = getTimeString.call(this, currentTime);
        var prozent = progress / duration * 100;
        this.setProgress.call(this, prozent);
        //this.setTime(currentTime);
        if (this._progressUpdater.isActive() || !this._progressUpdater.isPaused()) this.node.requestUpdate(this._componentId);
    };
    //
    VideoPlayer.prototype.setProgress = function(prozent){
        var length = this.progressbar.duration.getSize()[0];
        var value = prozent * length / 100;
        this.progressbar.activeLine.setAbsoluteSize(value);
        this.progressbar.kugle.setPosition(value);
    };

    function createPauseButton(node){
        var pauseButton = node.addChild()
                            .setAlign(0.5, 0.45)
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
                            .setAlign(0.5, 0.45)
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
    function getVideoEl(){
        this.video = _.first(document.getElementsByClassName("videoHtml"));
    }
    function createVideo(node) {
        var videoNode = node.addChild().setProportionalSize(1, 0.5);
        var content = '<video  class="videoHtml">' +
						  '<source src="' + this.data.video + '" type="video/mp4">' +
						  'Your browser does not support the video tag.' +
						'</video>';
		var videoEl = new DOMElement(videoNode,{
			classes: ['videoTemplate', 'videoholder'],
			content: content
		});
        var gest = new GestureHandler(videoNode);
        gest.on('tap', handleTapsOnVideo.bind(this));
        videoEl.onShow = function(){
            this.video = _.first(document.getElementsByClassName("videoHtml"));
        }.bind(this);
    }

    function handleTapsOnVideo(e, payload) {
        console.log(e, payload);
        if(e.taps === 2){
            if (this.video.requestFullscreen) {
              this.video.requestFullscreen();
          } else if (this.video.mozRequestFullScreen) {
              this.video.mozRequestFullScreen(); // Firefox
          } else if (this.video.webkitRequestFullscreen) {
              this.video.webkitRequestFullscreen(); // Chrome and Safari
            }
        }
        if(this.video.paused){
            this.video.play();
        }else{
            this.video.pause();
        }
    }
    function bindPlayEvent() {
        this.selectPlay();
        if(!this._progressUpdater){
            this.video.play();
            this._progressUpdater = new Transitionable(0).set(10,{duration:this.video.duration});
        }
        if(this.video.paused){
            this.video.play();
            this._progressUpdater.resume();
        }
            this.node.requestUpdate(this._componentId);
    }

    function bindPauseEvent() {
        this.selectPause();
        // if(!this.currentAudio){
        //     return;
        // }
        this.video.pause();
        this._progressUpdater.pause();
    }

    function createProgressbar(node) {
        var durationNode = node.addChild()
                                .setSizeMode(0, 1)
                                .setProportionalSize(0.8, undefined)
                                .setAlign(0.1, 0.5)
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
        var gestActive = new GestureHandler(activeLine);
        gestDuration.on('tap', setTimePeriod.bind(this));
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

    function setTimePeriod(e, payload) {
        var area = this.getVideoArea.call(this);
        if(e.center.x < area[0] || e.center.x > area[1]){
            return;
        }
        var point = e.center.x - area[0];
        var prozent = point * 100 /this.progressbar.duration.getSize()[0];
        var progressInSeconds = prozent * this.video.duration / 100;
        this.setProgress.call(this, prozent);
        this.video.currentTime = progressInSeconds;
		this._progressUpdater.set(10,{duration:this.video.duration - progressInSeconds});

    }

    function createDuration(node) {
        // var duration = this.audio.duration();
        // var time = getTimeString.call(this, duration);
        // var timeNode = this.progressbar.duration.addChild()
        //                     .setSizeMode(1,1)
        //                     .setAbsoluteSize(40,10)
        //                     .setAlign(1,1)
        //                     .setMountPoint(0.8,0)
        //                     .setPosition(0, 10);
        // var el = new DOMElement(timeNode,{
        //     content: time,
		// 	classes: ['durationTime']
        // });
		// timeNode.addUIEvent('touchstart');
		// timeNode.onReceive = changeTimeArt.bind(this);
        // return el;
    }
    function changeTimeArt(e, payload) {
		// if(e != "touchstart"){
		// 	return;
		// }
        // if(this.options.timeToogle) this.options.timeToogle = false;
        // else this.options.timeToogle = true;
		// payload.stopPropagation();
    }

    function getTimeString(time){
        var seconds = Math.floor(time%60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var minutes = Math.floor(time/60);
        var str = minutes + ":" + seconds;
        if(!this.options.timeToogle) str = '-' + str;
        return str;
    }

    VideoPlayer.prototype.getVideoArea = function(){
        var videoWidth = this.progressbar.duration.getSize()[0];
        var area = window.screen.width - videoWidth;
        var result = [];
        result.push(area/2);
        result.push(window.screen.width - area/2);
        return result;
    };
    App.VideoPlayer = VideoPlayer;
});
