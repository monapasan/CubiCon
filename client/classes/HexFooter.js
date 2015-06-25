Meteor.startup(function(){
    var NavButton = App.NavButton;
    var Node = Famous.Node;
    var DOMElement = Famous.DOMElement;
    var GestureHandler = Famous.GestureHandler;
    // the number of sections in the app

    // the footer will hold the nav buttons
    function HexFooter (node, data) {
        // subclass Node
        this.node = node.addChild();
        this.data = data;
        setComponents.call(this, this.node);
        this.articleAmount = data.articles.length;
        //  this.numSections = data.articles.length;
        // object to store the buttons
        this.buttons = {};
        this.currentArticle = 0;


        makeBg.call(this, this.node);
    }
    HexFooter.prototype.show = function(){
        this.node.show();
    }
    HexFooter.prototype.hide = function hide(){
        this.node.hide();
    }
    function setComponents(root){
        var comp = {
            onReceive: onReceive.bind(this)
        };
        root.addComponent(comp);
    }
    function onReceive(event, payload){
        if(event === "changeArticle") {
            if(!this.node.isShown()){
                return;
            }
            console.log(event,this.currentArticle);
            this.currentArticle +=1;
            if(this.currentArticle >= this.articleAmount) this.currentArticle = 0;
            this.changeTitleAndBg();
        }
    }
    HexFooter.prototype.changeTitleAndBg = function changeTitleAndBg(){
        this.backgroundColor.setContent(this.data.articles[this.currentArticle].footerName);
        this.backgroundColor.setProperty('backgroundColor', this.data.articles[this.currentArticle].colorScheme);
    };
    function makeBg(node){
        var content = this.data.articles[this.currentArticle].footerName;
        var el = node.addChild().setAlign(0.5,0)
                                .setMountPoint(0.5,0)
                                .setProportionalSize(0.5,undefined);
/*        this.footer = new DOMElement(el,{
            content: "<div class='hexFooter'>" + content + "</div>"
        });*/
        this.backgroundColor = new DOMElement(el,{
            classes:['hexFooter'],
            content:content
        });
        //el.setP
        this.gestures = new GestureHandler(el);
        /*var gestures1 = new GestureHandler(this);
        gestures.on("tap", function(e){
            console.log(e)})*/

        
        this.backgroundColor.setProperty("backgroundColor", this.data.articles[this.currentArticle].colorScheme);
        var arrows = el.addChild().setProportionalSize(1,0.3).setAlign(0,0.5).setMountPoint(0,0.3);
        new DOMElement(arrows,{
            content:  '<i class="fa fa-caret-left "></i>&nbsp;<i class="fa fa-caret-right "></i>'
        });
    }
    // this.prototype.onReceive("changeSection", changeStateButtons);
    // function changeStateButtons(options){
    //     this.buttons[from].off();
    //     this.buttons[to].on();
    // }
    // subclass Node

    App.HexFooter = HexFooter;
});
