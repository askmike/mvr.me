<?php

class ListController extends Controller {
	public $model;
	
	function __construct( $page = null ) {
		
		parent::__construct();
		
		$this->model = new ListModel();
		
		$postsPerPage = 40;
		
		if( isset($page) ) { 
			$this->data = $this->model->getType( $page, 0, $postsPerPage );
			$this->data['title'] = $page;
			
		} else {
			
			$this->data = $this->model->getPosts( 0, $postsPerPage );
			
		}
		
		if( empty($this->data) ) {
			$this->error( 'empty' );
			return;
		}
		
		$this->addExcerpts();
		$this->data['pageType'] = 'list'; // list or post
		$this->addMonthToItems();
		$this->prepareExcerpts();
		$this->markdownList();
		
		$this->view( 'list' );
	}
	
	function prepareExcerpts() {

		$types = array(
			'blog' => '∞',
			'post' => '∞',
			'tweet' => '∞',
			'portfolio' => '⊛',
			'projects' => '⚛',
			'image' => '⧉'
		);
		
		foreach ( $this->data as &$item ) {
			if( is_array( $item ) ) {
			    $item[ 'excerpt' ] .= "\n" . ' <a href="' . SITE . $item[ 'url' ] . '">' . $types[ $item[ 'type' ] ] . '</a>';
			}
		}
	}

}

?>