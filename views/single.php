<?php if( !empty($title)) { if( !empty($titleURL)) { ?>
	<h2><a href='<?= $titleURL ?>'><?= $title ?></a></h2>
<?php } else { ?>
	<h2><?= $title ?></h2>
<?php } } ?>

<?= $content ?>

<!-- <p>In het kader van het tentamen voor het vak &#8216;Design for interaction: Models &amp; processes&#8217; (uit de V1) heb ik een</p> -->
<!-- <p>Strange meeting - met @Chelsey</p>
<img src='<?= BASE . 'img/image.jpg' ?>' width='500px'> -->