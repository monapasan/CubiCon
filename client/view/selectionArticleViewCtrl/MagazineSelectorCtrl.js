Meteor.startup(function(){


	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var Align = Famous.Align;
	var Header = App.Header;
	var Footer = App.Footer;
	var Swapper = App.Swapper;
	var GestureHandler = Famous.GestureHandler;
	var ArticleSelectionBody = App.ArticleSelectionBody;
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
	function SelectionView(data) {
		Node.call(this);

	    this.currentMagazine = 0;
	    this.data = data;
	    //this.currentSection = data[this.currentMagazine]._id;
	    this.articleAmount = data.length;
		this.addComponent(getResizeComponent.call(this));
	    _makeBackground.call(this);
	    _makeHeader.call(this);
		_makeFooter.call(this);
		_bindEvents.call(this);
		this.magazines = _makeMagazines.call(this);
		_bindDragEvents.call(this);
		this.force = new Famous.Vec3();
		this.toogle = true;
		this.updater = {};
		this.updater.onUpdate = onUpdate.bind(this);
		this.force = new Vec3();
		FamousEngine.requestUpdate(this.updater);
	}

	SelectionView.prototype = Object.create(Node.prototype);
	SelectionView.prototype.constructor = SelectionView;
	var DISPLACEMENT_LIMIT = 50;
	var DISPLACEMENT_PEEK = 50;
	var DISPLACEMENT_THRESHOLD = 30;
	var VELOCITY_THRESHOLD = 3000;
    SelectionView.prototype.defineHeight = function defineHeight(size){
        this.pageHeight = size[1];
        console.log(this.pageHeight);
    };

    function getResizeComponent(){
        var resizeComponent = {
            onSizeChange: function(size) {
                this.defineHeight(size);
            }.bind(this)
        };
        return resizeComponent;
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
	        //r = physicsTransform.rotation;

	        // Set the `imageNode`'s x-position to the `Box` body's x-position
	        page.body.setPosition(0, p[1] * this.pageHeight, 0);

	        // Set the `imageNode`'s rotation to match the `Box` body's rotation
	        //page.setRotation(r[0], r[1], r[2], r[3]);
	    }

	    FamousEngine.requestUpdateOnNextTick(this.updater);
	}

	function _getComponent(position){
		return [{
			event: 'drag',
			callback: _getDragCallback.bind(this, position)
		}];
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
  //       		this.emit('changeMagazine', {direction: direction});
  //   		}
  //       	else if (currentPosition < -DISPLACEMENT_THRESHOLD || velocity < -VELOCITY_THRESHOLD){
  //       		direction = 1;
  //       		this.emit('changeMagazine', {direction: direction});
  //   		}
  //   		var shouldGoBack = getNextIndex.call(this,direction);
  //       	if(this.currentMagazine === shouldGoBack || !shouldGoBack){
  //       		position.set(0, 0, 0, { duration: 500, curve: 'easeOutBounce'}, getToogleCallback.bind(this));
  //   		}
  //       }

	}

	function getToogleCallback(){
		this.toogle = true;
	}

	function _bindDragEvents(){

		var trans = new Transitionable();
		this.magazines.forEach(function(magazine, i){
			var descriptionNode = magazine.body.description;
			var titleNode = magazine.body.titleNode;
			var hexNode = magazine.body.hexagon;

        	var position = new Famous.Position(magazine.body);
        	new GestureHandler(descriptionNode);
        	new GestureHandler(titleNode);
	        // new GestureHandler(descriptionNode, _getComponent.call(this, position));
	        // new GestureHandler(titleNode, _getComponent.call(this, position));
	        //new GestureHandler(hexNode, _getComponent.call(this, position));

		}.bind(this));
	}

	SelectionView.prototype.onReceive = function onReceive (event, payload) {
		var prefix = new Transitionable([1,1]);
		if(event === "goInsideMagazine"){
			this.hide();
			this.emit("showMenu",{id: this.currentMagazine});
		}
        this.receive(event, payload);
	};

	function _makeBackground(){
		this.backgroundColor = new DOMElement(this, {
            classes: ['bg']
        });
	}

	function _makeMagazines(articleNumber) {
		this.simulation = new PhysicsEngine();
	    var result = [];
	    this.data.forEach(function(dataItem, i){
	    	var child = this.addChild()
		        .setDifferentialSize(null, -100)
		        .setPosition(0, 80);
		        var align = new Align(child);
		        var body = child.addChild(new ArticleSelectionBody(this.data[i], i));
                var gestureHandler = new GestureHandler(body);
            	gestureHandler.on('drag', function(index, e) {
	                this.force.set(0, e.centerDelta.y, 0); // Add a force equal to change in X direction
			        this.force.scale(20); // Scale the force up
			        this.magazines[index].box.applyForce(this.force); // Apply the force to the `Box` body

			        if (e.centerVelocity.y > VELOCITY_THRESHOLD) {
			            if (this.draggedIndex === index && this.currentMagazine === index) {
			                // Move index to left
			                this.emit('changeMagazine', {direction: -1});
			            }
			        }
			        else if (e.centerVelocity.y < -VELOCITY_THRESHOLD){
			            if (this.draggedIndex === index && this.currentMagazine === index) {
			                this.emit('changeMagazine', {direction: 1});
			            }
			        }

			        if (e.status === 'start') {
			            this.draggedIndex = index;
			        }
		   		}.bind(this, i));
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
		        this.simulation.add(box, spring);
			result[i] = {
				align: align,
				body: body,
	            box: box,
	            anchor: anchor,
	            spring: spring
			};

	    }.bind(this));
	    return result;
	}

	function _makeHeader() {

	    this.header = this.addChild()
	        .setSizeMode('default', 'absolute')
	        .setAbsoluteSize(null, 50)
	        .setMountPoint(0.5, 0)
	        .setAlign(0.5, 0);
	    this.headerEl = new DOMElement(this.header, {
	    	classes: ['arrowUp', 'white']
	    });
	    this.header.direction = -1;
	    var gestures = new GestureHandler(this.header);
	    gestures.on("tap", _callEvents.bind(this.header));


	}

	function _callEvents(e, payload){
		this.emit('changeMagazine', {direction: this.direction});
	}

	function _makeFooter(){
		this.footer = this.addChild()
						.setSizeMode('default', 'absolute')
						.setAbsoluteSize(null, 50)
						.setMountPoint(0, 1)
						.setAlign(0, 1);
	    this.footerEl = new DOMElement(this.footer, {
	    	classes: ['arrowDown', 'white']
	    });
	    this.footer.direction = 1;
	    var gestures = new GestureHandler(this.footer);
	    gestures.on("tap", _callEvents.bind(this.footer));
	}

	function  _bindEvents(){
		this.addComponent({
			onReceive:function(e, payload){
				if(e === 'changeMagazine'){
					var newIndex = getNextIndex.call(this, payload.direction);
		            var oldIndex = this.currentMagazine;
		            if (oldIndex !== newIndex) {
			            this.changeMagazine(oldIndex, newIndex);
					}
				}
			}.bind(this)
		});
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

	SelectionView.prototype.changeMagazine = function changeMagazine (from, to) {
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
	        // this.pages[from].quaternion.fromEuler(0, Math.PI/2, 0);
	        this.magazines[to].anchor.set(0, 0, 0);
	        // this.pages[to].quaternion.set(1, 0, 0, 0);
	    } 
	    else if(from > to){
	        this.magazines[from].anchor.set(0, 1, 0);
	        // this.pages[from].quaternion.fromEuler(0, -Math.PI/2, 0);
	        this.magazines[to].anchor.set(0, 0, 0);
	        // this.pages[to].quaternion.set(1, 0, 0, 0);
	    }
		if(from === null){
			opacityChanger.set([1,0]);
	        // this.magazines[to].anchor.set(0, 0, 0);
		}
/*	    else if (from < to) {
	        this.magazines[from].anchor.set(0, -1, 0);
	        // this.pages[from].quaternion.fromEuler(0, Math.PI/2, 0);
	        this.magazines[to].anchor.set(0, 0, 0);
	        // this.pages[to].quaternion.set(1, 0, 0, 0);
	    } else if(from > to){
	        this.magazines[from].anchor.set(0, 1, 0);
	        // this.pages[from].quaternion.fromEuler(0, -Math.PI/2, 0);
	        this.magazines[to].anchor.set(0, 0, 0);
	        // this.pages[to].quaternion.set(1, 0, 0, 0);
	    }*/
/*
		if(from === null){
			for(var i = 0; i < this.articleAmount; i++){
				if(i == to){
					this.magazines[i].align.set(0, 0, 0, curve);
				}
				else{
					this.magazines[i].align.set(0, 1, 0, curve);
				}
			}
		}
		else if(from < to){
			this.magazines[from].align.set(0, -1, 0, curve, cb.bind(this.magazines[from].body));
			this.magazines[to].align.set(0, 0, 0, curve, getToogleCallback.bind(this));
		}
		else {
			this.magazines[from].align.set(0, 1, 0, curve, cb.bind(this.magazines[from].body));
			this.magazines[to].align.set(0, 0, 0, curve, getToogleCallback.bind(this));
		}*/
		// fading out the Arrows if the current article
		// is last or first one
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

	SelectionView.prototype.onParentMount = function onParentMount (parent, parentId, index) {
    	this.mount(parent, parentId + '/' + index);
    	this.changeMagazine(null, this.currentMagazine);
   		return this;
	};
	SelectionView.prototype.onMount = function onMount (parent, id) {
	   Node.prototype.onMount.call(this, parent, id);
	};


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

	App.SelectionView  = SelectionView;
});
