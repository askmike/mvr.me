<ul id='content'>
<?php if( is_array( $data ) ) { foreach( $data as $item ) { if( is_array( $item ) ) { ?>
	<li class='clear'>
		<div class='date'>
			<a href="<?= $item['url'] ?>">
				<?= $item[ 'date' ] ?>
			</a>
		</div>
	<?php if(!empty($item['title'])) { ?>
		<h2>
			<?= $item['title'] ?>
		</h2>
		<p class='body'>
	<?php } else {  ?>
		<p class='body titleless'>
	<?php } ?>
			<?= $item['excerpt'] ?>
		</p>
	</li>
<?php } } } ?>
</ul>