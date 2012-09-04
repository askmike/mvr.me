<?php

class Request {
	
	function parse( $s ) {
		return explode( '/', $s );
	}
	
	function store( $s, $a ) {
		Registery::set( 'fullRequest', $s );
		Registery::set( 'request', $a );
	}

	function route() {
		$request = Registery::get( 'request' );

		//search
		if( array_key_exists( 's', $_GET ) || $request[0] === 's' ) {
			new ListController( true );
			return;
		}

		//backend
		if( $request[0] === 'admin' ) {
			
			switch( sizeof($request) ) {
				
				case 1:
					
					new adminController('list');
					
					break;
				default:
				
					new adminController('post');
				
			}
			
			return;
		}
		if( $request[ sizeof( $request ) - 2 ] === 'e' ) {
			new adminController('post');
			return;
		}
		
		switch ( sizeof($request) ) {
			case 1:
			
				// home
				new ListController();
			
				break;
			
			case 2:
			
				// menu item or shortlink
				switch ( $request[0] ) {
					
					case 'blog':
					case 'portfolio':
					case 'projects':
						
						new ListController( $request[0] ); // page
						
						break;
					default:
					
						new errorController( 404 ); // shortlink
					
				}
				
				break;
			
			case 3: // portfolio or project item
			case 4: // single item
			case 5: // blog post
				new SingleController();
				
				break;
			
			default:
				// echo 'a';
				// 404
				
				new ErrorController(404);
		}
	
	}
	
}