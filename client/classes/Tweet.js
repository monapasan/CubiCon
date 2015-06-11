Meteor.startup(function(){
	var Node = Famous.Node;
	var DOMElement = Famous.DOMElement;
	var data = App.data;
	function Tweet(data){
		Node.call(this);
		this.data = data;
		this.el = new DOMElement(this).setProperty('backgroundColor', getRandomColor())
									  .setProperty('boxSizing','border-box')
									  .setProperty('lineHeight','100px')
									  .setProperty('border','1px solid black')
									  .setProperty('fontSize','12px')
									  .setContent(getRandomMessage.call(this));
	}
	Tweet.prototype = Object.create(Node.prototype);

	function random(array){
		return array[(Math.random() * array.length)|0];
	}
	function getRandomColor(){
		    // trick to create a range.
	    return '#' + Array.apply(null, Array(6)).map(function (_, i) {
	        return random('0123456789ABCDEF');
	    }).join('');
	}

	function getRandomMessage(){
		var string = '<b>' + random(this.data.usernames) + ':</b>' + 	
	    random(this.data.begin) + random(this.data.middle) + random(this.data.end) +
       ' ' + random(this.data.hashtags) + ' ' + random(this.data.hashtags);
       return string;
	}
	App.Tweet = Tweet;
});