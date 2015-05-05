<?php

class RainTplView extends \Slim\View
{
    public function render($template,$data=NULL)
    {
        raintpl::$tpl_dir = ROOT . DS . 'application'. DS . 'templates'. DS ;
        raintpl::$cache_dir = ROOT . DS . 'application'. DS . 'templates'. DS .'cache'. DS ;

    	$tpl = new RainTPL();
	$tpl->assign( "data", $this->data );
	$html = $tpl->draw( $template, $return_string = true );

        return $html;
    }
}