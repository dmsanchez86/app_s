<?php


// loadublic_html/control/slimcontroller-master/src/SlimController/Slim.php
require 'slimcontroller-master/src/SlimController/Slim.php';

// init app
$app = New Slim(array(
    'templates.path'             => '/templates',
    'controller.class_prefix'    => '/controllers',
    'controller.method_suffix'   => 'Action',
    'controller.template_suffix' => 'php',
));

$app->addRoutes(array(
    '/'            => 'Home:index',
    '/hello/:name' => 'Home:hello',
));

$app->run();