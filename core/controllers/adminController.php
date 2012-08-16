<?php

class AdminController extends Controller {
	public $model;
	public $request;
	
	function __construct() {
		
		parent::__construct();
		
		$this->data['title'] = 'backend';
		
		$this->logIn();
		
		$request = Registery::get( 'request' );
		
		if( sizeof( $request ) === 2 ) {
			
			$this->redirect('admin/list');
			
		} elseif( $request[ 1 ] === 'list' ) {
			
			$this->getList( $request[ 2 ] );
			
		} else {
			
			$this->editPost( $request );
			
		}
		
		
	}
	
	function logIn() {
		
		if( !$this->isLoggedIn()) {
			if( isset( $_POST[ 'password' ] ) ) {
				$_SESSION[ 'password' ] = hash( 'sha512', $_POST[ 'password' ] );
			} else {
				$this->logInForm();
			}
		}
		
	}
	
	function isLoggedIn() {
		
		$pw = $_SESSION['password'];
		
		if( !empty( $pw ) && $pw === HASHEDPW ) {
			return true;
		}
		
	}
	
	function logInForm() {
		$this->view('admin/login');
		exit();
	}
	
	function getList( $page = 0 ) {
		
		$this->model = new ListModel();
		
		$this->data = $this->model->getPosts( 0, 100 );
		$this->addEditLinks();
		$this->getDateFromItems();
		$this->addExcerpts();
		
		$this->view('admin/list');
		
	}
	
	function addEditLinks() {
		foreach( $this->data as &$post ) {
			$post['url'] = SITE . 'admin/' . $post['url'];
		}
	}
	
	function editPost( $r ) {
		
		$this->model = new PostModel;
		
		if( isset( $_POST['date'] ) ) {
			$this->updatePost( $_POST );
			return;
		}
		
		// remove 'admin/'
		array_shift( $r );
		
		$this->data = $this->model->getPost( implode( '/', $r ) );
		
		if( empty( $this->data ) ) {
			$this->error(404);
			return;
		}
		
		$this->getDateFromItem();
		$this->escapeForInput();
		
		
		$this->view( 'admin/edit' );
		
	}
	
	function escapeForInput() {
		
		foreach( $this->data as &$var ) {
			if( is_string( $var ) ) {
				$var = htmlspecialchars( $var, ENT_QUOTES );
			}
		}
	}
	
	function updatePost( $input ) {
		
		// print_r($input);
		
		$this->model->updatePost( $input );
		
		$this->redirect('admin/list');
		
	}
	
	
}