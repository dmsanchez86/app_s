<?php

class MongoConect extends MongoClient{

    private $__conectionString;

    public function __construct($__conectionString) {
    	$this->__conectionString = $__conectionString;

    	@parent::__construct($this->getconectionString());
    }

    public getconectionString(){
    	return $this->__conectionString;
    }

?>