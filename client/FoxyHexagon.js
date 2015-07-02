data  = Magazines.find().fetch();
Template.main.rendered = function() {
 	if (screenfull.enabled) {
             //screenfull.request();
    }
    else{
    	window.scrollTo(0,1);
    }
    var scene;
    Famous.FamousEngine.init();
    scene = Famous.FamousEngine.createScene();
    new App.FoxyHexagon(scene.addChild(), this.data);

};

/*Template.article.rendered = function() {
    var scene;
    Famous.FamousEngine.init();
    scene = Famous.FamousEngine.createScene();

    scene.addChild(new App.ArticleMenu(this.data));

};*/
