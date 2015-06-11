Meteor.startup(function(){
	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var Tweet = App.Tweet;
	function Section(i, data){
		Node.call(this);
		this.data = data;
		this.el = new DOMElement(this).setProperty('overflow-x','hidden')
									  .setProperty('overflow-y','scroll');
		this.tweets = createTweets.call(this, i);
	}
	function createTweets(id){
		var result = [], tweet;
		var numberOfTweets = this.data.sections[id].tweetNumber;
		for (var i = 0; i < numberOfTweets; i++) {
			tweet = this.addChild().setSizeMode(0, 1)
								   .setAbsoluteSize(null, 100)
								   .setPosition(0, 100*i)
								   .addChild(new App.Tweet(this.data));
	   		result.push(tweet);
		}

	}
	Section.prototype = Object.create(Node.prototype);
	App.Section = Section;
});