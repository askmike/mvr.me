<?php

// singleton db instance

class Database {
	
	public static $con;
	
	public static function get() {
		if(!isset(self::$con)) {
			self::$con = new Database;
		}
		
		return self::$con;
	}
	
	private $handle;
	
	private function __construct() {
		
		$this->handle = new mysqli(MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB);
		
		if (mysqli_connect_errno()) {
		    printf("Connect failed: %s\n", mysqli_connect_error());
		    exit();
		}
	}
	
	public function handle() {
		return $this->handle;
	}
	
	public function kill() {
		if(isset($this->handle)) {
			$this->handle->close();
		}
	}
	
}