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
		$e = new ErrorController($e);
	}
	
	function view( $view ) {
		
		$data = $this->data;
		
		if( is_array( $data ) ) extract($data);
		
		require 'views/header.php';
		require 'views/' . $view . '.php';
		require 'views/footer.php';
		
	}
	
	function addMonthToItems() {
		
		if( is_array( $this->data ) ) {
			$len = sizeof( $this->data );
			$temp = array();
			
			for( $i = 0; $i < $len ; $i++ ){
				
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
		foreach( $this->data as &$post ) {

			// small posts don't have dedicated excerpts
			if( empty( $post[ 'excerpt' ] ) ) {
				$post[ 'excerpt' ] = $post[ 'contentHTML' ];
			}
		}
	}
	
	function getDateFromItem() {
		
		if( is_array( $this->data ) ) {
			$this->data['date'] = $this->getDate( $this->data['timestamp'] );
		}
		
		// print_r($item);
		
		// return $item;
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
	
	function redirect( $relativeUrl ) {
		
		header('Location: ' . SITE . $relativeUrl );
		
	}
	
}

?>