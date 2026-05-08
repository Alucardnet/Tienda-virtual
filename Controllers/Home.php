<?php

class Home extends Controllers
{
    public function __construct()
    {
        parent::__construct();
    }

    public function home()
    {
        $data['page_id'] = 1;
        $data['page_tag'] = "Home";
        $data['page_title'] = "Página principal";
        $data['page_name'] = "Home";
        $data['page_content'] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
        $this->views->getView($this, "home", $data);
    }
}
