Meteor.startup(function(){
    var NavButton = App.NavButton;
    var Node = Famous.Node;
    var DOMElement = Famous.DOMElement;

    // the number of sections in the app

    // the footer will hold the nav buttons
    function HexFooter (data) {
        // subclass Node
        Node.call(this);
        this.data = data;
        this.numSections = data.sections.length;
        // object to store the buttons
        this.buttons = {};

        // for every section create a NavButton
        // and set its size and align
        /*data.sections.forEach(function (section, i) {
            this.buttons[section.id] = this.addChild(new App.NavButton(section.id))
                                           .setProportionalSize(1 / this.numSections)
                                           .setAlign(i / this.numSections);
        }.bind(this));*/
        makeBg.call(this);
    }
    function makeBg(){
        this.backgroundColor = new DOMElement(this,{
            classes: ['bg']
        });
    }
    // this.prototype.onReceive("changeSection", changeStateButtons);
    // function changeStateButtons(options){
    //     this.buttons[from].off();
    //     this.buttons[to].on();
    // }
    // subclass Node
    HexFooter.prototype = Object.create(Node.prototype);

    App.HexFooter = HexFooter;
});
