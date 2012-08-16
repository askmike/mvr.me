<?php

class ErrorController extends Controller {

	function __construct( $e ) {
		//this runs the construct of the class this class is extending
		parent::__construct();
		
		$this->data['type'] = 'error';
		
		switch ( $e ) {
			case 404:

				$this->notFound();

				break;
			case 403:

				$this->restricted();

				break;
			case 'empty':

				$this->noPosts();

				break;
			default:
				// 404

				new ErrorController(404);
		}
		
		$this->view('post');
		
	}
	
	function noPosts() {
		
		$this->data['title'] = 'No posts found';
		$this->data['content'] = '<p>No posts matched your critirea. If you feel this is a mistake on my part please let me know.</p>';
		
	}
	
	function notFound() {

		header("HTTP/1.0 404 Not Found"); 

		$this->data['title'] = '404 - File not found';
		$this->data['content'] = '<p>Nothing was found on this url. If you feel this is a mistake on my part please let me know.</p>';
		
		// $this->load->view('header');
		// $this->load->view('error/404');
		// $this->load->view('footer');
	}

	function restricted() {

		header("HTTP/1.0 403 Restricted"); 

		// $this->load->view('header');
		// $this->load->view('error/403');
		// $this->load->view('footer');
	}

	function sneaky() {

		header("HTTP/1.0 403 Restricted"); 

		// $this->load->view('header');
		// $this->load->view('error/sneaky');
		// $this->load->view('footer');
	}

	function __destruct() {
		//this runs the destruct of the class this class is extending
		parent::__destruct();
	}

}