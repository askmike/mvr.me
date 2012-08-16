<?php

class ListController extends Controller {
	public $model;
	
	function __construct( $page = null ) {
		
		parent::__construct();
		
		$this->model = new ListModel();
		
		if( isset($page) ) { 
			$this->data = $this->model->getType( $page, 0, 25 );
			$this->data['title'] = $page;
			
		} else {
			
			$this->data = $this->model->getPosts( 0, 25 );
			
		}
		
		if( empty($this->data) ) {
			$this->error( 'empty' );
			return;
		}
		
		$this->addExcerpts();
		
		$this->data['pageType'] = 'list'; // list or post
		
		$this->addMonthToItems();
		
		$this->prepareExcerpts();
		
		$this->view( 'list' );
	}
	
	function prepareExcerpts() {
		
		$types = array(
			'blog' => '∞',
			'post' => '∞',
			'tweet' => '∞',
			'portfolio' => '⊛',
			'projects' => '⚛',
			// 'moby' => '⧉',
			'image' => '⧉'
		);
		
		foreach ( $this->data as &$item ) {
			if( is_array( $item ) ) {
			    $item[ 'excerpt' ] .= ' <a href="' . SITE . $item[ 'url' ] . '">' . $types[ $item[ 'type' ] ] . '</a>';
			}
		}
	}

}

?>