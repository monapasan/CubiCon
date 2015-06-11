Meteor.startup(function(){
    // The nav button class will show the name of a section
    // and emit a click event when clicked
    var Node = Famous.Node;
    var DOMElement = Famous.DOMElement;
    function NavButton (id, status) {
        // Subclass node
        Node.call(this);
        this.addUIEvent('click');
        // make and style an element
        this.el = makeEl(this);

        // hold the id of the section
        // this NavButton points to.
        this.id = id;

        // set the content of the element
        // to the target section.
        this.el.setContent(id);
    }

    NavButton.prototype = Object.create(Node.prototype);

    // make and style an element
    function makeEl (node) {
        return new DOMElement(node, {
            properties: {
                textAlign: 'center',
                lineHeight: '100px',
                fontSize: '18px',
                cursor: 'pointer'
            },
            classes: ['navigation']
        });
    }
    // apply the on class
    NavButton.prototype.on = function on () {
        this.el.removeClass('off').addClass('on');
    };

    // apply the off class
    NavButton.prototype.off = function off () {
        this.el.removeClass('on').addClass('off');
    };
    NavButton.prototype.onReceive = function onReceive (event, payload) {
        if (event === 'changeSection') {
            // swap on/off depend if this button points
            // to the apps current section
            if (payload.to === this.getId())
                this.on();
            else 
                this.off();
        }
    };

    NavButton.prototype.getId = function getId () {
        return this.id;
    };
    App.NavButton = NavButton;
});