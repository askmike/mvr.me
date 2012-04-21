<?php

define( 'BASE', substr($_SERVER['PHP_SELF'],0,-9) );
define( 'ABSOLUTE_BASE', $_SERVER['DOCUMENT_ROOT'] . BASE );

require 'core/lazyloading.php';
require '/config/mvr.me/config.php';

Registery::set( 'starttime', microtime(true) );

// some stuff I need everywhere
date_default_timezone_set(' Europe/Amsterdam' );

define( 'LIBS', SBASE . 'libs/' );
define( 'IMG', BASE . 'static/img/' );
define('MODIFIED_TIME', date("F d, Y \a\\t H:i:s", filemtime( ABSOLUTE_BASE . 'index.php')) );

ini_set('session.use_trans_sid', 0);
ini_set('session.use_only_cookies', 1);
session_start();

require 'views/index.html';

?>