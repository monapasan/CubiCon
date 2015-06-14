Meteor.startup(function () {
    Meteor.publish("magazines", function () {
      return Magazines.find({});
    });
});
