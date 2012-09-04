<?php


class ListModel extends DBModel {
	
	public $connection;
	
	function __construct(){ parent::__construct(); }
	
	function getType( $type, $from, $number ) {
		
		$q = '
		SELECT excerpt, contentHTML, titleURL, title, timestamp, url, type 
		FROM post 
		WHERE type = "' . $type . '" 
		ORDER BY timestamp DESC LIMIT ' . $from . ', ' . $number;
		
		return $this->query( $q );
		
	}

	function getSearch( $query ) {

		$q = '
		SELECT excerpt, contentHTML,  titleURL, title, timestamp, url, type 
		FROM post 
		WHERE title LIKE "% ' . $query . ' %"
		OR contentHTML LIKE "% ' . $query . ' %"
		ORDER BY timestamp DESC
		LIMIT 0, 30';
		// echo $q;
		return $this->query( $q );
		
	}
	
	function getPosts( $from, $number ) {
		
		$q = '
		SELECT excerpt, contentHTML, titleURL, title, timestamp, url, type 
		FROM post 
		ORDER BY timestamp DESC 
		LIMIT ' . $from . ', ' . $number;
		
		return $this->query( $q );
		
	}
	
}