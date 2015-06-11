Meteor.startup(function(){
    var Node = Famous.Node;
    var DOMElement = Famous.DOMElement;
    var Align = Famous.Align;
    function Header () {
        Node.call(this);
        this.el = new DOMElement(this, {
            classes: ['header'],
            properties:{
                backgroundColor: '#548741'
            } 
        });

        this.title = this.addChild();
        this.titleEl = new DOMElement(this.title).setProperty('textAlign', 'center')
                                                 .setProperty('lineHeight', '100px')
                                                 .setProperty('fontSize', '30px');

        this.titlePosition = new Align(this.title);
    }

    Header.prototype = Object.create(Node.prototype);
    Header.prototype.onReceive = function onReceive (event, payload) {
        if (event === 'changeSection') 
            this.changeSection(payload.to);
    };
    Header.prototype.changeSection = function changeSection(to){
        this.titlePosition.set(0, -1, 0,{duration:250},function(){
            this.titleEl.setContent(to);
            this.titlePosition.set(0, 0, 0,{duration:250});
        }.bind(this));
    };
    App.Header = Header;
});