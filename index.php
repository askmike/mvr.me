<?php

require '/config/mvr.me/config.php';

// server paths
if(!defined('BASE')) define( 'BASE', substr($_SERVER['PHP_SELF'],0,-9) );

define( 'PHPBASE', substr($_SERVER['PHP_SELF'],0,-9) );
define( 'ABSOLUTE_BASE', $_SERVER['DOCUMENT_ROOT'] . PHPBASE );

//site paths
define( 'DOMAIN', $_SERVER['HTTPS'] ? 'https://' : 'http://' . $_SERVER['SERVER_NAME'] );
define( 'SITE', DOMAIN . BASE );

// force trailing slash
if( substr($_GET['r'], -1) !== '/' && strlen($_GET['r']) !== 0) {
	header('HTTP/1.1 301 Moved Permanently');
  	header('Location: ' . SITE . $_GET['r'] . '/');
  	die();
}

require 'core/lazyloading.php';

date_default_timezone_set( 'Europe/Amsterdam' );

$request = $_GET['r'];

$requestHandler = new Request;
$requestHandler->store( $request, $requestHandler->parse( $request ));

define( 'IMG', BASE . 'static/img/' );

ini_set( 'session.use_trans_sid', 0 );
ini_set( 'session.use_only_cookies', 1 );
session_start();

define( 'INFINITY', '∞' );

// start it up
$requestHandler->route();

// break it down
Database::get()->kill();
