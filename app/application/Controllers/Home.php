<?php

namespace MyApp\Controller;

class Home extends \SlimController\SlimController
{

    public function indexAction()
    {
        /*$this->render('home/index', array(
            'someVar' => date('c')
        ));*/
        echo "dsfsdfsdf";
    }

    public function helloAction($name)
    {
        $this->render('home/hello', array(
            'name' => $name
        ));
    }
}