<?php

class DBModel {
	
	public $connection;
	
	function __construct(){
		$this->connection = Database::get()->handle();
	}
	
	function __destruct() {}
	
	function assocResults($results) {
		
		if( !empty($results) ) {
			
			while ($row = $results->fetch_assoc()) {
				$rows[] = $row;
			}
		
		}
		return $rows;
	}
	
	public function query($query) {
		//run the query on the connection
		$q = $this->connection->query($query);
		
		//return the results in a associative array
		return $this->assocResults($q);
		
	}
	
	public function update($query) {
		$this->connection->query($query);
	}
	
	public function queryRow($query) {
		$r = $this->query($query);
		
		return $r[0];
	}
	
	public function querySingle($query, $var) {
		$r = $this->queryRow($query);
		
		return $r[$var];
	}
}