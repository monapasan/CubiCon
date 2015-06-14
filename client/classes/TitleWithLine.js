Meteor.startup(function(){
	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	function TitleWithLine(options){
		this.options = Object.create(TitleWithLine.DEFAULT_PROPERTIES);
        Node.apply(this);
        this.setOptions(options);
		this.data = data;

        createElements.call(this);
	}
    TitleWithLine.prototype = Object.create(Node.prototype);
    TitleWithLine.prototype.constructor = TitleWithLine;

    TitleWithLine.DEFAULT_PROPERTIES= {
        string: "Titel",
        fontSize: "1.5em",
        depth: "60",
        height: "10"
    };
	 function createElements(){
         this.line = this.addChild()
                        .setSizeMode(1,1)
                        .setAbsoluteSize(this.options.depth,this.options.height)
                        .setAlign(0.5,0.75)
                        .setMountPoint(0.5,0.5);
        new DOMElement(this.line, {
            properties: {
                'background-color':'#19191b'
                }
            });
         var title = this.addChild().setSizeMode(0,0)
                        .setAlign(0.5,0)
                        .setMountPoint(0.5,0);
        var titleEl = new DOMElement(title,{
             content: this.options.string,
             properties:{
                 "font-size": this.options.fontSize
             }
         });
     }

     TitleWithLine.prototype.setOptions = function setOptions(options){
         if(options.string) this.options.string = options.string;
         if(options.fontSize) this.options.fontSize = options.fontSize;
         if(options.depth) this.options.depth = options.depth;
         if(options.height) this.options.height = options.height;
     };
     App.TitleWithLine = TitleWithLine;
});
