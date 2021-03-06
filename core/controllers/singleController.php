<?php

class SingleController extends Controller {
	public $model;
	public $request;
	
	function __construct() {
		
		//this runs the construct of the class this class is extending
		parent::__construct();
		
		$this->model = new PostModel;
		
		$this->data = $this->model->getPost( Registery::get( 'fullRequest' ) );
		if( !$this->data ) {
			$this->error( 404 );
			return;
		}

		$this->getDateFromItem();
		$this->markdownPost();
		
		$type = $this->data['type'];
		
		$r = Registery::get( 'request' );
		
		if( $this->data['source'] ) {
			$this->data['sourceAccount'] = substr( $this->data['source'], 1 );
		}
		
		switch ( $r[0] ) {
			
			case 'blog':
			case 'portfolio':
			case 'projects':
				$this->data[ 'pageType' ] = 'longPost';
				$this->view( 'post' );
				
				break;
			default:
				$this->data[ 'excerpt' ] = $this->data['title'] . '. ' . $this->data['content'];
				$this->view( 'single' );
			
		}
		
	}

}