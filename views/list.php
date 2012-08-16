<ul id='content'>
	<?php if( is_array( $data ) ) { foreach( $data as $item ) { if( is_array( $item ) ) { ?>
		<?php if( isset( $item[ 'month' ] ) ) { ?>
			<li class='clear'>
				<div class='date'>
					<?= $item[ 'month' ] ?>
				</div>
		<?php } else { ?>
			<li class='clear dateless'>
		<?php } ?>
			<?php if( !empty( $item[ 'title' ] ) ) { ?>
				<h2>
					<?php if( isset( $item[ 'titleURL' ] ) ) { ?>
						<a href='<?= $item[ 'titleURL' ]?>'>
					<?php } else { ?>
						<a href='<?= SITE . $item[ 'url' ]?>'>
					<?php } ?>
						<?= $item[ 'title' ] ?>
					</a>
				</h2>
				<p class='body'>
			<?php } else { ?>
				<p class='body titleless'>
			<?php } ?>
					<?= $item[ 'excerpt' ] ?>
				</p>
			</li>
	<?php } } } ?>
</ul>