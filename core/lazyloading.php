<?php

// lcfirst is new since 5.3
// my (old) webhost does not support 5.3 yet
if(!function_exists( 'lcfirst' )) {
	function lcfirst( $str ) {
		$str{0} = strtolower( $str{0} );
		return $str;
	}
}

spl_autoload_register( 'lazyload' );

function lazyload( $class ) {
	
	$class = lcfirst( $class );
	
	//we check for classes in those dirs
	$dirs = array(
		// '', 
		'core/controllers/',
		'core/models/',
		'core/',
		// MODELS, 
		// CONTROLLERS,
		// CONTROLLERS . 'admin/',
		// APP,
		// HELPERS,
		// 'libs/'
	);
	
	$len = sizeof($dirs);
	for( $i = 0; $i < $len; ++$i ) {
		// echo ABSOLUTE_BASE . $dirs[ $i ]  . $class . '.php<br>';
		$file = ABSOLUTE_BASE . $dirs[ $i ]  . $class . '.php';
		if( file_exists($file) ) {
			require_once $file;
			return;
		}
	}
}

?>