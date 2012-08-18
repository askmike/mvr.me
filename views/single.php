<?php if( !empty($title)) { if( !empty($titleURL)) { ?>
	<h2><a href='<?= $titleURL ?>'><?= $title ?></a></h2>
<?php } else { ?>
	<h2><?= $title ?></h2>
<?php } } ?>

<?= $contentHTML ?>