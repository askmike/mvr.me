<footer id='footer'>
<?php if( !empty( $date ) ) { ?>
	<p>
		Posted on <?= $date ?>. 
		<?php if( !empty( $source ) ) { ?> 
			Source: <a href='http://twitter.com/<?= $sourceAccount ?>'><?= $source ?></a>.
		<?php } ?>
	</p>
<?php } elseif($pageType === 'list') { ?>
	
<?php } ?>	
<p>
	Copyleft, 
	<a class='email' href='https://www.google.nl/search?q=this+is+why+I+need+a+new+browser'>contact me</a>. <!-- js not working -->
</p>
</footer>
<script src="<?= SITE ?>js/vendor/script.js"></script>
<?php if( !empty( $script ) ) { ?>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="<?= SITE ?>js/vendor/jquery-1.7.2.min.js"><\/script>')</script>
<?= $script ?>
<?php } ?>

<script>
	var _gaq=[['_setAccount','UA-19313599-8'],['_trackPageview']];
	(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
	g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
	s.parentNode.insertBefore(g,s)}(document,'script'));
</script>
</body>
</html>
<!--

		GAME OVER

-->