/*Router.route('main', {
  path: '/Twitterous',
  template: 'main'
});*/
Router.route('/', function () {
    Meteor.subscribe('articles');
  var data = Articles.find({}).fetch();
  this.render('main',{data:data});
});
/*
Router.route('/:_id', function () {
  var data = Articles.find({_id: this.params._id}).fetch()[0];
  this.render('article',{data:data);
});*/


// Router.route('/', function () {
//   this.render('MyTemplate');
// });

// Router.route('/items', function () {
//   this.render('Items');
// });

// Router.route('/items/:_id', function () {
//   var item = Items.findOne({_id: this.params._id});
//   this.render('ShowItem', {data: item});
// });
