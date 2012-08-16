<a href='<?= BASE . 'admin/list' ?>'>Back to overview</a>
<form id='editPost' method='post'>
	<label for='id'>id:</label><input readonly="readonly" class='ro' name='id' id='id' value='<?= $id ?>'>
	<label class='select' for='type'>type:</label>
	<select id='type'>
		<option <?php if( $type === 'blog' ) echo 'selected="selected"' ?> value='blog'>blog</option>
		<option <?php if( $type === 'post' ) echo 'selected="selected"' ?> value='post'>post</option>
		<option <?php if( $type === 'tweet' ) echo 'selected="selected"' ?> value='tweet'>tweet</option>
		<option <?php if( $type === 'portfolio' ) echo 'selected="selected"' ?> value='portfolio'>portfolio</option>
		<option <?php if( $type === 'projects' ) echo 'selected="selected"' ?> value='projects'>projects</option>
		<option <?php if( $type === 'image' ) echo 'selected="selected"' ?> value='image'>image</option>
	</select>
	<label for='date'>date:</label><input readonly="readonly" class='ro' name='date' id='date' value='<?= $date ?>'>
	<label for='url'>url:</label><input readonly="readonly" class='ro' name='url' id='url' value='<?= SITE . $url ?>'>
	<label for='title'>title:</label><input name='title' id='title' value='<?= $title ?>'>
	<label for='titleURL'>titleURL:</label><input name='titleURL' id='titleURL' value='<?= $titleURL ?>'>
	<label class='textarea'>contentHTML:</label><textarea name='contentHTML'><?= $contentHTML ?></textarea>
	<label for='source'>source:</label><input name='source' id='source' value='<?= $source ?>'>
<?php if( !empty( $excerpt ) ) { ?>
	<label for='excerpt'>excerpt:</label><input name='excerpt' id='excerpt' value='<?= $excerpt ?>'>
<?php } ?>
	<!-- <label for='keywords'>keywords:</label><input name='keywords' id='keywords' value='<?= $keywords ?>'> -->
	<!-- <label for='category'>category:</label><input name='category' id='category' value='<?= $category ?>'> -->
	<!-- <label for='image'>image:</label><input name='image' id='image' value='<?= $image ?>'> -->
	<!-- <label for='language'>language:</label><input name='language' id='language' value='<?= $language ?>'> -->
	<label class='textarea'>script:</label><textarea name='script'><?= $script ?></textarea>
	
	
	<input class='submit' type='submit' value='update post'>
</form>