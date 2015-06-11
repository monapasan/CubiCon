Meteor.startup(function () {
    Meteor.publish("articles", function () {
      return Articles.find({});
    });
});
