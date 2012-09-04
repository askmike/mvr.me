<?php

class ListController extends Controller {
    public $model;
    
    function __construct( $search = null ) {
        
        parent::__construct();
        
        $this->model = new ListModel();
        
        $postsPerPage = 40;

        if( $search && array_key_exists( 's', $_GET ) ) {
            $this->data = $this->model->getSearch( $_GET[ 's' ] );
        } else {
            $this->data = $this->model->getPosts( 0, $postsPerPage );
        }

        if( empty($this->data) && !$search ) {
            $this->error( 'empty' );
            return;
        }
        
        $this->addExcerpts();
        $this->data['pageType'] = 'list'; // list or post
        $this->addMonthToItems();
        $this->prepareExcerpts();
        $this->markdownList();
        
        if( $search ) {
            $this->viewSearch( 'list' );
        } else
            $this->view( 'list' );
    }
    
    function viewSearch() {
        $data = $this->data;
        
        if( is_array( $data ) ) extract( $data );
        
        require 'views/header.php';
        require 'views/search.php';
        require 'views/list.php';
        require 'views/footer.php';
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