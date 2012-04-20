<?php

define( 'BASE', substr($_SERVER['PHP_SELF'],0,-9) );
define( 'SBASE',$_SERVER['DOCUMENT_ROOT'] . BASE );

require 'core/lazyloading.php';

Registery::set('starttime', microtime(true));

echo BASE;

require 'views/index.html';

?>