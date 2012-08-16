var l = console.log
,	mvr = require( '/config/mvr.me/sql-temp.js' )
,	mvrme = require( '/config/mvr.me/sql.js' )
,	request = require( 'request' )
,	events = require('events')
,	insert = 'INSERT INTO  `mvr.me`.`post` (`type`,`timestamp`,`content`,`contentHTML`,`excerpt`, `url`, `title`,`keywords`) VALUES '
;
/*
//						posts

mvr.query('SELECT * FROM post', function( err, rows, fields ) {
	if (err) throw err;
	
	mvr.end();
	
	var len = rows.length
	,	row
	,	excerpt
	;
	while ( len-- ) {
		
		row = rows[len]
		excerpt = row.excerpt.replace('(&hellip;)','').replace('(&#8230;)','').trim();
		
		insert += '("blog","' + row.date;
		insert += '",' + mvr.escape(row['body-md']) + ',' + mvr.escape(row['body-html']); 
		insert += ',' + mvr.escape(excerpt) + ',"' + row.url;
		insert += '",' + mvr.escape(row.titel) + ',' + mvr.escape(row.tags);
		insert += '),';
		
	}
	
	insert = insert.slice( 0,-1 ) + ';';
	
	mvrme.query( insert, function( err, rows, fields ) {
		if (err) throw err;
		
			l(rows);
			
			mvrme.end();
			
		})
	
});

*/
//						portfolio

mvr.query('SELECT * FROM portfolio', function( err, rows, fields ) {
	if (err) throw err;
	
	mvr.end();
	
	
	
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
	
	function titleToURL(str, ts) {
		
		var date = new Date( ts * 1000 )
		,	year = date.getFullYear()
		,	month = date.getMonth() + 1;
		
		if( month < 10 ) {
			month = '0' + month;
		}
		
		str = 'portfolio/' + year + '/' + month + '/' + stringToSlug( str ) + '/';
		
		return str;
	}
	
	
	
	var len = rows.length;
	
	while ( len-- ) {
		
		var row = rows[len]
		,	md = row['body-md']
		,	content = row['body-html']
		,	excerpt = content.replace(/<[^>]+>/ig,"").replace(/\s+/g, " ").replace(/(([^\s]+\s\s*){20})(.*)/,"$1").trim()
		,	url = titleToURL( row.name, row.date );
		;

		md = '<img src="/content/portfolio/' + row.image +  '" alt="Image of ' + row.name + '">' + md + "\nTechniques: " + row.tech;
		content = '<img src="/content/portfolio/' + row.image +  '" alt="Image of ' + row.name + '">' + content + "\nTechniques: " + row.tech;

		insert += '("portfolio","' + row.date;
		insert += '",' + mvr.escape(md) + ',' + mvr.escape(content); 
		insert += ',' + mvr.escape(excerpt) + ',"' + url;
		insert += '",' + mvr.escape(row.name) + ',' + mvr.escape(row.tags);
		insert += '),';
		
	}
	
	insert = insert.slice( 0,-1 ) + ';';
	// l(row);
	// l( insert );
	// l(excerpt);
	
	mvrme.query( insert, function( err, rows, fields ) {
		if (err) throw err;
		
		l(rows);
			
		mvrme.end();
			
	});
	
});




//						projects
/*
'INSERT INTO  `mvr.me`.`post` (`type`,`timestamp`,`content`,`contentHTML`,`excerpt`, `url`, `title`,`keywords`) VALUES '

mvr.query('SELECT * FROM project', function( err, rows, fields ) {
	if (err) throw err;
	
	mvr.end();
	
	var len = rows.length;
	
	while ( len-- ) {
		
		var row = rows[len];
		
		insert += '("projects","' + row.date;
		insert += '",' + mvr.escape(row['body-md']) + ',' + mvr.escape(row['body-html']); 
		insert += ',' + mvr.escape(row.excerpt) + ',"' + row.url;
		insert += '",' + mvr.escape(row.titel) + ',' + mvr.escape(row.tags);
		insert += '),';
		
	}
	
	// l(row);
	
	insert = insert.slice( 0,-1 ) + ';';
	
	// l(insert);
	
	mvrme.query( insert, function( err, rows, fields ) {
		if (err) throw err;
		
			l(rows);
			
			mvrme.end();
			
		});
	
});*/

