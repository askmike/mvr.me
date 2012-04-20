<?php

class Registery {
	
	private static $registery = array();
	
	public static function set( $key, $value ) {
		
		if( isset($key) ) {
			self::$registery[$key] = $value;
		} else {
			return false;
		}
		
	}
	
	public static function get( $key ) {
		
		if( isset(self::$registery[$key]) ) {
			return self::$registery[$key];
		} else {
			return false;
		}
		
	}
	
}


?>