Meteor.startup(function(){
	var Node = Famous.Node;
	var Align = Famous.Align;
	var DOMElement = Famous.DOMElement;
	var Opacity =  Famous.Opacity;
	var Transitionable = Famous.Transitionable;
	var GestureHandler = Famous.GestureHandler;


	function VideoTemplate(node, data){
		this.node = node.addChild();
        // this.data = getData.call(this, data);
        this.DefaultTemplate = createDefaultTemplate.call(this, this.node, data);
		//createBg.call(this, this.node);
        // createImgHeader.call(this,this.node);
		// createTitleWithLine.call(this, this.node);
		//createCore.call(this, this.node, this.data);
        //this.footer = createFooter.call(this, node);
		this.lastCord =100;
    }

    VideoTemplate.prototype.show = function show() {
        this.node.show();
    };

    VideoTemplate.prototype.hide = function hide() {
        this.node.hide();
    };

    function createDefaultTemplate(node, data){
        var options = {
            type:"video",
            includeImg: false
        };
        return new App.DefaultTemplate(node, data, options);
    }
    //
    // function getData(data) {
    //     this.colorScheme = data.colorScheme;
    //     data = _.filter(data.sections,function(section){
    //         return section.type ==="text";
    //     });
    //     return _.first(data).content;
    // }
    //
    // function createBg(node){
    //     var bg = new DOMElement(node,{
    //         properties:{
    //             'background-color': '#f0f0f0',
    //             'overflow-y': 'scroll'
    //         }
    //     });
    //     node.addUIEvent('scroll');
    // }
    // function createImgHeader(node){
    //     var header = node.addChild().setProportionalSize(1, 0.33);
    //     new DOMElement(header,{
    //         tagName: 'img',
    //         classes: ['textTmpl','header', 'scroll'],
    //     }).setAttribute('src', this.data.headerImg);
    //     var line = node.addChild()
    //                    .setSizeMode(0,1)
    //                    .setAbsoluteSize(undefined, 4)
    //                    .setAlign(0,0.33)
    //                    .setMountPoint(0,0);
    //    new DOMElement(line, {
    //        properties: {
    //            'background-color': this.colorScheme
    //            }
    //        });
    //     // maybe later. Set on header background opacity:
    //     // new DOMElement(header.addChild().setProportionalSize(1, 1), {
    //     // 	properties: {
    //     // 		'background-color': this.colorScheme,
    //     // 		'opacity': 0.5
    //     // 		}
    //     // 	});
    // }
    //
    // function createTitleWithLine(node) {
    //     var title = node.addChild()
    //                     .setProportionalSize(1, 0.1)
    //                     .setAlign(0.5,0.48)
    //                     .setMountPoint(0.5, 1);
    //     var titleEl = new DOMElement(title,{
    //         content: this.data.title,
    //         classes:['article-description', 'name']
    //     });
    //     var line = title.addChild()
    //                     .setSizeMode(1,1)
    //                     .setAbsoluteSize(50,5)
    //                     .setAlign(0.5,0.8)
    //                     .setMountPoint(0.5,0.5);
    //     new DOMElement(line, {
    //         properties: {
    //             'background-color':'#222229'
    //         }
    //     });
    //     return title;
    // }
    App.VideoTemplate = VideoTemplate;
});
