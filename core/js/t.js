var l = console.log
,	sql = require( '/config/mvr.me/sql.js' )
;

//						posts

sql.query('SELECT id, excerpt, contentHTML FROM post', function( err, rows, fields ) {
	if (err) throw err;
	
	var len = rows.length
	,	row
	,	excerpt
	,	t
	;
	while ( len-- ) {
		
		row = rows[len];
		
		if( row.excerpt === null && row.contentHTML.indexOf('<blockquote>') === -1 ) {
			
			// t = "<p>" + row.contentHTML + "</p>";
			
			l('UPDATE post SET contentHTML = ' + sql.escape(row.contentHTML.substr(0, row.contentHTML.length -4)) + ' WHERE id = ' + row.id + ';');
			
		}
		
		if( row.excerpt !== null ) {
			
			// t = "<p>" + row.excerpt + "</p>";
			
			l('UPDATE post SET excerpt = ' + sql.escape(row.excerpt.substr(0, row.excerpt.length -4)) + ' WHERE id = ' + row.id + ';');
		}
		
	}
		
});

