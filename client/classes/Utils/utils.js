Meteor.startup(function(){
	Utils.getHexHeight = function(width){
		var height = (screen.width * width) * 0.865;
		return height;
	};
	Utils.fadingOut = function(node, trans, i){
		var id = node.addComponent({
			onUpdate: function(time) {
				// Every frame, query transitionable state and set node opacity accordingly
				var newOpacity = i !== undefined ? trans.get()[i] : trans.get();
				node.setOpacity(newOpacity);
				if (trans.isActive()) node.requestUpdate(id);
			}
		});
		node.requestUpdate(id);
	};
	/**
	 * take a string a then emit it
	 * and stop following propagation
	 * @param  {[type]} el         [description]
	 * @param  {[type]} emitString [description]
	 * @return {[type]}            [description]
	 */
	Utils.addClickComponent = function(el, emitString){
		el.addComponent({
			onReceive: function(event, payload){
				if(event == "click"){
					payload.stopPropagation();
					el.emit(emitString, {payload: payload});
				}
			}.bind(this)
		});
	};
	Utils.scaleMenuOut = 1.3;
	Utils.scaleMenuIn = 1.3;
	Utils.selectionMenuChangeTime = 500;
});
