// TODO:
// - rewrite
// - ...
// - profit!

var l = console.log
,   sql = require( '/config/mvr.me/sql.js' )
,   request = require( 'request' )
,   async = require( 'async' )

//          helper functions
,   trimFromChar = function( str, character ) {
    var pos = str.indexOf( character );
    if( pos + 1 )
        str = str.substr( 0, pos );
    
    return str;
}
,   twitterify = function( text ) {
    text = text.replace( /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i, "<a href='$1'>$1</a>" );
    text = text.replace( /(^|\s)#(\w+)/g, "$1<a href='http://search.twitter.com/search?q=%23$2'>#$2</a>" );
    text = text.replace( /(^|\s)@(\w+)/g, "$1<a href='http://www.twitter.com/$2'>@$2</a>" );
    return text;
}
// from: http://dense13.com/blog/2009/05/03/converting-string-to-slug-javascript/
,   stringToSlug = function( str ) {
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

//
//                           the following functions act as an async pipeline
//

,   createPost = function( cb ) {
    cb(null, {
            tweet:  this.tweet
        ,   source: ''
        ,   url: ''
        ,   title: ''
        ,   titleURL: ''
        ,   contentHTML: ''
        ,   timestamp: ''
    });
}
,   checkIfTweetIsStored = function( post, cb ) {
    sql.query('SELECT * FROM post WHERE fid = ?', [ post.tweet.id_str ], function( err, rows, fields ) {
        if (err) 
            throw err;

        if( rows.length )
            cb( 'tweet already exists' );
        else
            cb( null, post );
    });
}
,   checkTweetForHash = function( post, cb ) {
    var body = post.tweet.text
    ,   containsHash = body.indexOf( '#mvr' ) + 1;
    
    if( containsHash ) { 
        post.tweet.text = body.replace( /\ #mvr/, '' );
        cb( null, post );
    } else
        cb( 'no hash' );
}
,   checkTweetForURL = function( post, cb ) {
    var body = post.tweet.text
    ,   urls = body.match(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi);

    if( urls && urls.length === 1)
        cb( null, post, urls[0] );
    else
        cb( null, post, false );
}
,   followURL = function( post, url, cb ) {
    if( !url ) {
        cb( null, post, false, false );
        return;
    }

    request( url, function (e, response, html) {
        cb( null, post, html, response );
    });
}
,   extractTitle = function( post, html, response, cb) {
    if( typeof html !== 'string' ) {
        cb( null, post, false, false );
        return;
    }
    // first remove cdata and comments, safer way to regex html
    var limit = 100
    ,   str = (html.replace( /<!\[CDATA\[(.+?)\]\]>/g
    , function (_match, body) {
        return body.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    })
    .replace(/<!--.+?-->/g, '')
    .match(/<title>.+?<\/title>/ig) || [])
    .map(function (t) { return t.substring(7, t.length - 8) })
    .join(' ');
    
    str = trimFromChar( str, '|' );

    if( str.length > limit )
        str = trimFromChar( str, ':' );
    
    if( str.length < limit )
        cb( null, post, str, response );
    else
        cb( null, post, false, response );
}
,   addTitle = function( post, title, response, cb ) {
    if( typeof title === 'string' ) {
        post.tweet.text = post.tweet.text.replace( /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i, '' );
        post.title = title;
        post.titleURL = response.request.uri.href;
    }
    cb( null, post );
}
,   addSource = function( post, cb ) {
    var sourceTrigger = '/via '
    ,   body = post.tweet.text
    ,   triggerPos = body.indexOf( sourceTrigger );
    
    if( triggerPos + 1 ) {
        post.source = body.substr( triggerPos + sourceTrigger.length );
        post.tweet.text = body.substr( 0, triggerPos );
    } 
    
    cb( null, post );
}
,   addURL = function( post, cb ) {
    //          remove html entities
    var text = post.title.replace(/&#{0,1}[a-z0-9]+;/ig, "") || post.tweet.text;
    
    var str = ''
    
    ,   ar = text.split( ' ' )
    ,   words = ar.splice( 0, 7 ).join( ' ' )
    
    ,   date = new Date( post.tweet.created_at )
    ,   year = date.getFullYear()
    ,   month = date.getMonth() + 1;
    
    if( month < 10 )
        month = '0' + month;
    
    post.url = year + '/' + month + '/' + stringToSlug( words ) + '/';
    
    cb( null, post );
}
,   addHTML = function( post, cb ) {
    post.contentHTML = twitterify( post.tweet.text );
    cb( null, post );
}
,   addDate = function( post, cb ) {
    post.timestamp = Math.round( Date.parse( post.tweet.created_at ) / 1000 );
    cb( null, post )
}
,   storePost = function( post, cb ) {
    sql.query(
        'INSERT INTO `post` (`type`,`timestamp`,`url`,`title`,`titleURL`,`content`,`contentHTML`,`source`,`fid`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )'
    ,   [ 'tweet', post.timestamp, post.url, post.title, post.titleURL, post.tweet.text, post.contentHTML, post.source, post.tweet.id_str ]
    );

    cb( null, 'stored tweet: ' + post.tweet.text );
}

//
//      functions for the twitter streaming api
//


// this function is a `compose` of the whole async pipeline
,   insertTweetAsPost = function( t ) {
    this.tweet = t;

    async.waterfall([ 
        // need to bind since I can't have a global because of calling
        // this function x times and async doesn't support a parameter 
        // for the first function.
        //
        // see: https://github.com/caolan/async/issues/14
        createPost.bind( this )

    ,   checkIfTweetIsStored
    ,   checkTweetForHash
    ,   checkTweetForURL
    ,   followURL
    ,   extractTitle
    ,   addTitle 
    ,   addSource
    ,   addURL
    ,   addHTML
    ,   addDate
    ,   storePost
    ], function( err, m ) {
        err || l( m + '\t\t at ' + new Date() );
    }); 
}
,   insert = function( t ) {
    new insertTweetAsPost( t );
}

,   fetch = function() {
    request('http://api.twitter.com/1/statuses/user_timeline/mikevanrossum.json?count=10&include_rts=1&exclude_replies=1', function (error, response, r) {
        if ( !error && response.statusCode == 200 ) {
            var tweets = JSON.parse( r );
            tweets.forEach( insert );
        } else
            l('probably rate limited at ' + new Date() );
    });
}

fetch();
setInterval( fetch, 1000 * 60 * 5 ); // 5 min

