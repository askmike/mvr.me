<?php


class PostModel extends DBModel {
	
	public $connection;
	
	function __construct(){ parent::__construct(); }
	
	function getPost( $url ) {
		
		$q = 'SELECT * FROM post WHERE url = "' . $url . '"';
		
		return $this->queryRow( $q );
		
	}
	
	function updatePost( $input ) {
		
		$str = "UPDATE post SET ";
		
		$blacklist = array(
			'id',
			'url',
			'timestamp',
			'date'
		);
		
		foreach( $input as $k => $v ) {
			
			if( !in_array( $k, $blacklist ) ) {
				$str .= $k . ' = "' . $v . '", ';
			}
		}
		
		$str = substr( $str, 0, -2 );
		
		$str .= " WHERE id = " . $input['id'];
		// echo $str;
		$this->update( $str );
		
	}
	
}