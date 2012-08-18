<!doctype html>
<!--

			Insert coin(s)

		<Push any button to start>

-->
<?php if( !empty($language) ) { ?>
<html lang="<?= $language ?>">
<?php } else { ?>
<html lang="en">
<?php } ?>	
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<?php if( !empty($title) ) { ?>
	<title><?= $title . ' &#124; mvr.me' ?></title>
<?php } else { ?>
	<title>mvr.me</title>
<?php } 

	  if( !empty($excerpt) ) { ?>
	<meta name="description" content="<?= $excerpt ?>">
<?php } else { ?>
	<meta name="description" content="MVR.ME is the digital archive of all screams and rages from Mike van Rossum echoing through the internet.">
<?php } ?>
	<meta name="viewport" content="width=510">
	<link rel="stylesheet" href="<?= SITE ?>css/style.css">
</head>
<body class='<?= $pageType ?>'>
	<nav>
		<ul id='nav'>
			<li><a href='<?= SITE ?>'>Home</a></li>
			<li><a href='<?= SITE . 'portfolio/' ?>'>Portfolio</a></li>
			<li><a href='<?= SITE . 'projects/' ?>'>Projects</a></li>
			<li><a href='<?= SITE . 'blog/' ?>'>Blog</a></li>
		</ul>
	</nav>
	<a href='<?= SITE ?>'>
		<img id='logo' width='100' height='100' src='<?= SITE ?>img/logo.png' />
	</a>
	<p id='about'>
		Hello, I am Mike van Rossum <a href="http://mikevanrossum.nl/"><?= INFINITY ?></a>. I'm from Amsterdam and I'm currently studying 
		<a href='http://www.cmd-amsterdam.nl/english/'>CMD</a> where I focus on coding. I also work at <a href='http://mobypicture.com/'>Mobypicture</a>.
		This is my archive. 
	</p>