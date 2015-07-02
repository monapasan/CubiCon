Meteor.startup(function(){


	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var Align = Famous.Align;
	var Opacity = Famous.Opacity;
	var Header = App.Header;
	var Footer = App.Footer;
	var Swapper = App.Swapper;
	var GestureHandler = Famous.GestureHandler;
	var MagazineSelectionBody = App.MagazineSelectionBody;
    var PhysicsEngine = Famous.PhysicsEngine;
    var FamousEngine = Famous.FamousEngine;
	var Transitionable = Famous.Transitionable;
    var math = Famous.math;
    var physics = Famous.Physics;
    var Box = physics.Box;
    var Spring = physics.Spring;
    var RotationalSpring = physics.RotationalSpring;
    var RotationalDrag = physics.RotationalDrag;
    var Quaternion = math.Quaternion;
    var Vec3 = math.Vec3;
    var Dispatch = famous.core.Dispatch;
	function MagazineSelectorCtrl(node, data) {
		//define states
	    this.currentMagazine = 0;
	    this.data = data;
	    this.node = node.addChild();
	    this.articleAmount = data.length;
		this.node.addComponent(getResizeComponent.call(this));
		// create elements
	    _makeBackground.call(this, this.node);
	    _makeHeader.call(this, this.node);
		_makeFooter.call(this, this.node);
		_bindEvents.call(this, this.node);
		this.magazines = _makeMagazines.call(this, this.node);

		this.force = new Famous.Vec3();
		this.toogle = true;
		this.updater = {};
		this.updater.onUpdate = onUpdate.bind(this);
		this.force = new Vec3();
		FamousEngine.requestUpdate(this.updater);
		this.opacity = new Opacity(this.node);
		//this.fullScreenElement = createFullscreenElement.call(this, this.node);
	}

	MagazineSelectorCtrl.prototype.constructor = MagazineSelectorCtrl;
	var DISPLACEMENT_LIMIT = 50;
	var DISPLACEMENT_PEEK = 50;
	var DISPLACEMENT_THRESHOLD = 30;
	var VELOCITY_THRESHOLD = 3000;

    MagazineSelectorCtrl.prototype.defineHeight = function defineHeight(size){
        // v.5.2.0
        //this.pageHeight = size[1];
        this.pageHeight = size;
        console.log(this.pageHeight);
    };
    MagazineSelectorCtrl.prototype.show = function show(){
        this.node.show();
    };
    MagazineSelectorCtrl.prototype.hide = function hide(){
        this.node.hide();
    };

/*    v5.2.0
	function getResizeComponent(){
        var resizeComponent = {
            onSizeChange: function(size) {
                this.defineHeight(size);
            }.bind(this)
        };
        return resizeComponent;
    }*/
   	function getResizeComponent(){
        var resizeComponent = {
            onSizeChange: function(width, height, deepth) {
                this.defineHeight(height || width[1]);
            }.bind(this)
        };
        return resizeComponent;
    }
	function createFullscreenElement(node){
		var fullNode = node.addChild().setSizeMode(1,1).setAbsoluteSize(100, 100);
		new DOMElement(fullNode,{
			content: 'Enable Full Screen mode',
			id: 'fullNode',
			properties: {
				'background-color': '#8b9dc4'
			}
		});
		// fullNode.addUIEvent('touchstart');
		// fullNode.onReceive = function(e){
		// 	if(e =='touchstart'){
		// 		screenfull.request();
		// 	}
		// };

	}

	function onUpdate(time) {
	    this.simulation.update(time);

	    var page;
	    var physicsTransform;
	    var p;
	    var r;
	    for (var i = 0, len = this.magazines.length; i < len; i++) {
	        page = this.magazines[i];

	        // Get the transform from the `Box` body
	        physicsTransform = this.simulation.getTransform(page.box);
	        p = physicsTransform.position;
	        yPos = Math.round(p[1] * this.pageHeight * 100) / 100;
	        // Set the `imageNode`'s x-position to the `Box` body's x-position
	        page.body.node.setPosition(0, yPos, 0);


	    }

	    FamousEngine.requestUpdateOnNextTick(this.updater);
	}

	function _getDragCallback(position, e) {
		// if(!this.toogle){
		// 	return;
		// }
  //       // this.force.set(e.centerDelta.x, 0, 0); // Add a force equal to change in X direction
  //       // this.force.scale(20); // Scale the force up
  //       // descriptionNode.box.applyForce(this.force); // Apply the force to the `Box` body
  //       var currentPosition = position.getY();
  //       var delta = e.centerDelta.y;
  //       if(currentPosition + e.centerDelta.y < DISPLACEMENT_LIMIT)
  //       	position.set(0, currentPosition + delta);
  //       else
  //       	position.set(0, DISPLACEMENT_LIMIT);

  //       if (currentPosition + delta < -DISPLACEMENT_PEEK)
  //       	position.set(0, -DISPLACEMENT_PEEK);
  //       if(e.status ==='end'){
		// 	this.toogle = false;
  //       	var velocity = e.centerVelocity.y;
  //       	var direction;
  //       	if(currentPosition > DISPLACEMENT_THRESHOLD || velocity > VELOCITY_THRESHOLD){
  //       		direction = -1;
  //       		this.node.emit('changeMagazine', {direction: direction});
  //   		}
  //       	else if (currentPosition < -DISPLACEMENT_THRESHOLD || velocity < -VELOCITY_THRESHOLD){
  //       		direction = 1;
  //       		this.node.emit('changeMagazine', {direction: direction});
  //   		}
  //   		var shouldGoBack = getNextIndex.call(this,direction);
  //       	if(this.currentMagazine === shouldGoBack || !shouldGoBack){
  //       		position.set(0, 0, 0, { duration: 500, curve: 'easeOutBounce'}, getToogleCallback.bind(this));
  //   		}
  //       }

	}
	function onReceive(event, payload){
		var prefix = new Transitionable([1,1]);
		if(event === 'changeMagazine'){
			var newIndex = getNextIndex.call(this, payload.direction);
            var oldIndex = this.currentMagazine;
            if (oldIndex !== newIndex) {
	            this.changeMagazine(oldIndex, newIndex);
			}
		}
		if(event === "goInsideMagazine"){
			this.opacity.set(0.2,{duration: 300}, function(){
			//magazines[this.currentMagazine].opacity.set(0.7,{duration: 300}, function(){
				this.node.hide();
				this.node.emit("showMenu",{id: this.currentMagazine});
			}.bind(this));
		}
        //this.receive(event, payload);
	}

	function _makeBackground(root){
		this.backgroundColor = new DOMElement(root, {
            classes: ['bg']
        });
	}

	function _makeMagazines(root) {
		this.simulation = new PhysicsEngine();
	    var result = [];
	    this.data.forEach(function(dataItem, i){
	    	var child = root.addChild()
		        .setDifferentialSize(null, -100)
		        .setPosition(0, 80);

		        var align = new Align(child);
		        //var body = child.addChild(new MagazineSelectionBody(this.data[i], i));
		        var body = new MagazineSelectionBody(child, this.data[i], i);
                var gestureHandler = new GestureHandler(body.node);
            	gestureHandler.on('drag',createDragHandler.bind(this, i));

	            var box = new Box({
		            mass: 100,
		            size: [100,100,100]
		        });
		        var anchor = i === 0 ? new Vec3(0, 0, 0) : new Vec3(0, 1, 0);
		        var spring = new Spring(null, box, {
		            period: 0.6,
		            dampingRatio: 0.5,
		            anchor: anchor
		        });
				var opacity = new Opacity(body.node);
		        this.simulation.add(box, spring);

			result[i] = {
				align: align,
				body: body,
	            box: box,
	            opacity: opacity,
	            anchor: anchor,
	            spring: spring
			};

	    }.bind(this));
	    return result;
	}

	function createDragHandler(index, e){
        this.force.set(0, e.centerDelta.y, 0); // Add a force equal to change in X direction
        this.force.scale(20); // Scale the force up
        this.magazines[index].box.applyForce(this.force); // Apply the force to the `Box` body
        if (e.centerVelocity.y > VELOCITY_THRESHOLD) {
            if (this.draggedIndex === index && this.currentMagazine === index) {
                // Move index to left
                _callEvents.call(this.node, -1);
                //this.node.emit('changeMagazine', {direction: -1});
                //App.Dispatch = new famous.core.Dispatch();
                //App.Dispatch.dispatchEvent('changeMagazine', {direction: -1});
            }
        }
        else if (e.centerVelocity.y < -VELOCITY_THRESHOLD){
            if (this.draggedIndex === index && this.currentMagazine === index) {
                _callEvents.call(this.node, 1);
                //this.node.emit('changeMagazine', {direction: 1});
            }
        }

        if (e.status === 'start') {
            this.draggedIndex = index;
        }
	}

	function _makeHeader(root) {

	    this.header = root.addChild()
	        .setSizeMode('default', 'absolute')
	        .setAbsoluteSize(null, 50)
	        .setMountPoint(0.5, 0)
	        .setAlign(0.5, 0);
	    this.headerEl = new DOMElement(this.header, {
	    	classes: ['arrowUp', 'white']
	    });
	    this.header.direction = -1;
	    var gestures = new GestureHandler(this.header);
	    gestures.on("tap", _callEvents.bind(this.header,this.header.direction));


	}

	function _callEvents(direction){
		this.emit('changeMagazine', {direction:direction});
		// v0.6.2 Dispatch.dispatch("body",event)
		//Dispatch.e
	}

	function _makeFooter(root){
		this.footer = root.addChild()
						.setSizeMode('default', 'absolute')
						.setAbsoluteSize(null, 50)
						.setMountPoint(0, 1)
						.setAlign(0, 1);
	    this.footerEl = new DOMElement(this.footer, {
	    	classes: ['arrowDown', 'white']
	    });
	    this.footer.direction = 1;
	    var gestures = new GestureHandler(this.footer);
	    gestures.on("tap", _callEvents.bind(this.footer, this.footer.direction));
	}

	function  _bindEvents(){
		this.node.addComponent({
			onReceive:onReceive.bind(this),
			//onShow v0.6.2
			onMount: function(){
    			this.changeMagazine(null, this.currentMagazine);
				//setTimeout(requestFullscrenFunction.bind(this),10);
			}.bind(this)
		});
	}

    function requestFullscrenFunction() {
        // var el = document.getElementsByClassName('transparentNode')[0];
        // el.onclick = function(){
        //     screenfull.request();
        // };
        // el.addEventListener('touchmove', function(event) {
        //     screenfull.request();
        // }, false);
		document.getElementById("fullNode").onclick = function(){
			screenfull.request();
		};
    }

	function getNextIndex(direction){
		if(!direction){
			return false;
		}
		var oldIndex = this.currentMagazine;
	    var i = oldIndex + direction ;
	    var min = 0;
	    var max = this.articleAmount - 1;
        var newIndex = i > max ? max : i < min ? min : i;
        return newIndex;
	}

	MagazineSelectorCtrl.prototype.changeMagazine = function changeMagazine (from, to) {
		var opacityChanger = new Transitionable([1, 0]);
    	var curve =  {duration: 700, curve: 'outBack'};
		Utils.fadingOut(this.header, opacityChanger, 1);
		Utils.fadingOut(this.footer, opacityChanger, 0);
		function cb(){
			console.log(true);
			this.setPosition(0,0);
		}

		if (from < to) {
	        this.magazines[from].anchor.set(0, -1, 0);
	        this.magazines[to].anchor.set(0, 0, 0);
	    }
	    else if(from > to){
	        this.magazines[from].anchor.set(0, 1, 0);
	        this.magazines[to].anchor.set(0, 0, 0);
	    }
		if(from === null){
			opacityChanger.set([1,0]);
		}
		// if the magazine the first remove header, if the last footer
	    if(to == this.articleAmount - 1){
			opacityChanger.set([0, 1], {duration:700});
	    }
	    else if(to === 0){
			opacityChanger.set([1, 0], {duration:700});

	    }else{
			opacityChanger.set([1, 1], {duration:700});
	    }
	    this.currentMagazine = to;
	};

	App.MagazineSelectorCtrl  = MagazineSelectorCtrl;
});
