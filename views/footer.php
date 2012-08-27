<footer id='footer'>
<?php if( !empty( $date ) ) { ?>
	<p>
		Posted on <?= $date ?>. 
		<?php if( !empty( $source ) ) { ?> 
			Source: <a href='http://twitter.com/<?= $sourceAccount ?>'><?= $source ?></a>.
		<?php } elseif( $type === 'tweet' && $fid !== '0' ) { ?>
			Posted on <a href='http://twitter.com/mikevanrossum/status/<?= $fid ?>'>Twitter</a>.
		<?php } ?>
	</p>
<?php } ?>
<p>
	Copyleft, 
	<a class='email' href='#'>contact me</a>.
</p>
</footer>
<script src="<?= SITE ?>js/vendor/script.min.js"></script>
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