var l = console.log
,	sql = require( '/config/mvr.me/sql.js' )
,	request = require( 'request' )
,	events = require( 'events' )
,	_ = require( 'underscore' )
;

function Twitter( con ) {
	// this.tweetCount = 0;
	this.tweets = [];
	this.tweetRegister = { started: 0, finished: 0}
	this.con = con;

}

Twitter.prototype = new events.EventEmitter;

Twitter.prototype.init = function() {
	
	_.bindAll( this );
	
	this
		.fetch()
		.on( 'new fetch'		, function(t) { this.matchTweet(t) } )
		.on( 'new match'		, function(t) { this.checkIfTweetIsStored(t) } )
		.on( 'checked existence', function(t) { this.getTitle(t) } )
		.on( 'checked title'	, function(t) { this.finishUp(t) } )
	;
	
	return this;
}

Twitter.prototype.fetch = function( cb ) {
	var self = this
	,	me = 'mikevanrossum';
	
	request('http://api.twitter.com/1/statuses/user_timeline/' + me + '.json?count=30&include_rts=1&exclude_replies=1', function (error, response, r) {
		if (!error && response.statusCode == 200) {
			var tweets = JSON.parse( r )
			,	len = tweets.length
			;
			
			if( len ) {
				
				self.tweetRegister.started += len;
				
				for( ;len--; ) {
					
					self.emit('new fetch', {
							tweet: 	tweets[ len ]
						,	source: ''
						,	url: ''
						,	title: ''
						,	titleURL: ''
						,	contentHTML: ''
						,	timestamp: ''
					});
				}
			} else {
				self.emit('done');
			}
		} else {
			l('probably rate limited at ' + new Date() );
			self.emit('done');
		}
	});
	
	return this;
}

Twitter.prototype.signOutTweet = function() {
	this.tweetRegister.finished++;
	this.checkIfDone();
}

Twitter.prototype.matchTweet = function( tweet ) {
	
	var body = tweet.tweet.text
	,	pos = body.indexOf( '#mvr' );
	
	if( pos + 1 ) {	
		tweet.tweet.text = body.replace(/\ #mvr/,''); 
		this.emit( 'new match', tweet );
	} else {
		this.signOutTweet();
	}
	
	return this;
}

Twitter.prototype.checkIfTweetIsStored = function( tweet ) {
	
	var self = this;
	
	tweet = this.addDate( tweet );
	
	this.con.query('SELECT timestamp FROM post WHERE timestamp = ? AND type = ?', [ tweet.timestamp, 'tweet' ], function( err, rows, fields ) {
		if (err) throw err;
		
		if( rows.length ) {
			self.signOutTweet();
		} else {
			self.emit( 'checked existence', tweet );
		}

	});
	
	return this;
	
}

Twitter.prototype.addDate = function( tweet ) {
	tweet.timestamp = Math.round( Date.parse( tweet.tweet.created_at ) / 1000 );
	return tweet;
}

Twitter.prototype.twitterify = function( text ) {
    text = text.replace( /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i, "<a href='$1'>$1</a>" );
    text = text.replace( /(^|\s)#(\w+)/g, "$1<a href='http://search.twitter.com/search?q=%23$2'>#$2</a>" );
    text = text.replace( /(^|\s)@(\w+)/g, "$1<a href='http://www.twitter.com/$2'>@$2</a>" );
    return text;
}

Twitter.prototype.extractTitle = function( html ) {
	// first remove cdata and comments, safer way to regex html
	var limit = 75
	,	str = (html.replace( /<!\[CDATA\[(.+?)\]\]>/g
	, function (_match, body) {
		return body.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
	})
	.replace(/<!--.+?-->/g, '')
	.match(/<title>.+?<\/title>/ig) || [])
	.map(function (t) { return t.substring(7, t.length - 8) })
	.join(' ');
	
	str = this.trimFromChar( str, '|' );
	
	if( str.length > limit ) {
		str = this.trimFromChar( str, ':' );
	}
	
	if( str.length < limit ) {
		return str;
	}
}

Twitter.prototype.trimFromChar = function( str, character ) {
	
	var pos = str.indexOf( character );
	if( pos + 1 ) {
		str = str.substr( 0, pos );
	}
	
	return str;
	
}


Twitter.prototype.getTitle = function( tweet ) {
	
	var body = tweet.tweet.text
	,	urls = body.match(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi)
	,	self = this;
	
	if( urls && urls.length === 1 ) {
		
		request(urls[ 0 ], function (error, response, r) {
			if (!error && response.statusCode == 200) {
				
				var title = self.extractTitle( r );
				
				if( title ) {
					
					tweet.tweet.text = tweet.tweet.text.replace( /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i, '' );
					
					tweet.title = title;
					tweet.titleURL = response.request.uri.href;
					
				}

			}
			
			self.emit( 'checked title', tweet );
			
		});

	} else this.emit( 'checked title', tweet );
	
	return this;
}

Twitter.prototype.getSource = function( tweet ) {

	var sourceTrigger = '/via '
	,	body = tweet.tweet.text
	,	pos = body.indexOf( sourceTrigger );
	
	if( pos + 1 ) {
		tweet.source = body.substr( pos + sourceTrigger.length );
		tweet.tweet.text = body.substr( 0, pos );
	} 
	
	return tweet;
}

Twitter.prototype.checkIfDone = function() {
	
	var len = this.tweets.length
	,	tweetReg = this.tweetRegister
	,	done = tweetReg.finished + len
	;
	
	if( tweetReg.started === done ) {
		if( len ) {
			this.storeTweets();
		} else {
			this.emit('done');
		}
		
	} 
	
}

Twitter.prototype.addURLToTweet = (function( tweet ) {
	
	// from: http://dense13.com/blog/2009/05/03/converting-string-to-slug-javascript/
	function stringToSlug(str) {
		str = str.replace(/^\s+|\s+$/g, ''); // trim
		str = str.toLowerCase();

		// remove accents, swap ñ for n, etc
		var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to   = "aaaaeeeeiiiioooouuuunc------";
		for (var i=0, l=from.length ; i<l ; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}

		str = str
		.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes
		
		return str;
	}
	
	return function( tweet ) {
		
		//			remove html entities
		var text = tweet.title.replace(/&#{0,1}[a-z0-9]+;/ig, "") || tweet.tweet.text;
		
		var str = ''
		
		,	ar = text.split( ' ' )
		,	words = ar.splice( 0, 7 ).join( ' ' )
		
		,	date = new Date( tweet.tweet.created_at )
		,	year = date.getFullYear()
		,	month = date.getMonth() + 1;
		
		if( month < 10 ) {
			month = '0' + month;
		}
		
		tweet.url = year + '/' + month + '/' + stringToSlug( words ) + '/';
		
		return tweet;
	}
	
	
}());

Twitter.prototype.finishUp = function( tweet ) {
	
	tweet = this.getSource( tweet );
	tweet.contentHTML = '<p>' + this.twitterify( tweet.tweet.text );
	tweet = this.addURLToTweet( tweet );
	this.tweets.push( tweet );
	this.checkIfDone();
}

Twitter.prototype.storeTweets = function() {

	var self = this
	,	tweets = this.tweets
	,	len = tweets.length
	,	insert = 'INSERT INTO `post` (`type`,`timestamp`,`url`,`title`,`titleURL`,`content`,`contentHTML`,`source`,`fid`) VALUES ';
	
	while( len-- ) {
		
		var tweet = tweets[ len ];
		
		insert += '("tweet","' + tweet.timestamp;
		insert += '","' + tweet.url + '","' + tweet.title; 
		insert += '","' + tweet.titleURL + '","' + tweet.tweet.text;
		insert += '","' + tweet.contentHTML + '","' + tweet.source + '","' + tweet.tweet.id_str;
		insert += '"),';

	}
	
	insert = insert.slice( 0,-1 ) + ';';
	
	this.con.query(insert, function( err, result ) {
		if (err) throw err;
		
		self.emit('done', result);
		
	});
	
}

var timeout = 1000 * 60 * 5; // 5 min

function repeat() {
	new Twitter( sql ).init().once('done', function(d) {
		if( d ) {
			l( 'added ' + d.affectedRows + ' rows at ' + new Date() );
		} else {
			l( 'nothing new at ' + new Date() );
		}
		setTimeout( repeat, timeout );
	});
}

repeat();