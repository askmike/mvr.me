<?php

class Controller {
	//create public vars for the loader, the model and the request
	public $load;
	public $model;
	public $request;
	public $data;
	
	function __construct() {
		//
	}
	
	function __destruct() {
		//
	}
	
	function error( $e ) {
		$e = new ErrorController( $e );
	}
	
	function view( $view ) {
		$data = $this->data;
		
		if( is_array( $data ) ) extract( $data );
		
		require 'views/header.php';
		require 'views/' . $view . '.php';
		require 'views/footer.php';
	}
	
	function addMonthToItems() {
		
		if( is_array( $this->data ) ) {
			$len = sizeof( $this->data );
			$temp = array();
			
			for( $i = 0; $i < $len ; $i++ ) {
				$ts = $this->data[ $i ][ 'timestamp' ];
				$month = $this->getMonth( $ts );
				
				if( !in_array( $month, $temp ) && is_array( $this->data[ $i ] ) ) {
					$temp[] = $month;
					$this->data[ $i ][ 'month' ] = $month;
				}
			}
		}
	}

	function addExcerpts() {
		if( is_array( $this->data ) ) {
			foreach( $this->data as &$post ) {
				// small posts don't have dedicated excerpts
				if( empty( $post[ 'excerpt' ] ) ) {
					$post[ 'excerpt' ] = $post[ 'contentHTML' ];
				}
			}
		}
	}
	
	function getDateFromItem() {
		if( is_array( $this->data ) ) {
			$this->data['date'] = $this->getDate( $this->data['timestamp'] );
		}
	}
	
	function getDateFromItems() {
		
		foreach( $this->data as &$item ) {
			if( is_array( $item ) ) {
				$item['date'] = date( 'j-n-Y', $item['timestamp'] );
			}
		}
		
	}

	function getDate( $ts ) {

		// if its this year, skip the year
		if(date('Y', $ts) === date('Y', time())) {
			return date('l, F j\t\h', $ts);
		}

		return date('l, F j\t\h &#96;y', $ts);
	}
	
	function getMonth( $ts ) {
		// if its this year, skip the year
		if(date('Y', $ts) == date('Y', time())) {
			return date('F', $ts);
		}

		return date('F &#96;y', $ts);
	}
	
	function redirect( $url ) {
		
		// not really safe test, could be improved with regex
		if( substr( $url, 0, 4 ) !== 'http' ) {
			$url = SITE . $url;
		}

		header('Location: ' . $url );
	}

	function markdownList() {
		// print_r($this->data);
		foreach( $this->data as &$item ) {
			$item[ 'excerpt' ] = $this->markdown( $item['excerpt'] );
		}
	}

	function markdownPost() {
		$this->data[ 'contentHTML' ] = $this->markdown( $this->data[ 'contentHTML' ] );
	}

	function markdown( $text ) {
		require_once ABSOLUTE_BASE . 'core/libs/markdown.php';
		return Markdown( $text );
	}
	
}

?>