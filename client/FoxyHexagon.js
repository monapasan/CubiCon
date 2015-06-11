Template.main.rendered = function() {
    var scene;
    Famous.FamousEngine.init();
    scene = Famous.FamousEngine.createScene();

    scene.addChild(new App.FoxyHexagon(this.data));

};

/*Template.article.rendered = function() {
    var scene;
    Famous.FamousEngine.init();
    scene = Famous.FamousEngine.createScene();

    scene.addChild(new App.ArticleMenu(this.data));

};*/