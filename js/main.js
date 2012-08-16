/* Author: Mike van Rossum */

(function(doc){
	
	var emailElems = doc.getElementsByClassName( 'email' )
	,	len = emailElems.length
	,	elem
	;
	while( len-- ) {
		elem = emailElems[len];
		
		if(elem.tagName === 'A') {
			elem.setAttribute( 'hr' + 'ef', 'mai' + 'lto' + ':mi' + 'ke@' + 'mikevanross' + 'um.nl' );
		}
	}
	
}(document));