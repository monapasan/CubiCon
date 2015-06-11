Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Section = App.Section;
	var data = App.data;

	function SectionPreview(data){
		Node.call(this);
	    // create a new dom element
	    this.el = new DOMElement(this);
	    this.data = data;
	    // store the current section
	    this.currentSection = null;

	    // create the sections
	    //this.sections = createSections.call(this);
	}
    SectionPreview.prototype = Object.create(Node.prototype);
    SectionPreview.prototype.onReceive = function onReceive(event, payload){
	};
/*    SectionPreview.prototype.changeSection = function changeSection (to) {
	    // Swap out any section that isn't the new section
	    // and swap in the new section
	    this.data.sections.forEach(function (section) {
	        if (section.id === to)
	            // 500 millisecond transition
	            this.sections[section.id].align.set(0, 0, 0, {
	                duration: 500, curve: 'easeOut'
	            });
	        else
	            // 1 in x will put the top left corner of the
	            // section directly off the screen
	            this.sections[section.id].align.set(1, 0, 0, {
	                 duration: 500, curve: 'easeIn'
	            });
	    }.bind(this));

	    this.currentSection = to;
	};*/
	// function createSections(){
	// 	var result = {};
	//     // iterate over all the sections in our data
	//     this.data.sections.forEach(function (section, i) {
	//         var child = this.addChild();
	//         result[section.id] = {
	//             align: new Align(child),
	//             section: child.addChild(new Section(i, this.data))
	//         };
	//     }.bind(this));
    //
	//     return result;
	// }

	App.SectionPreview = SectionPreview;
});
