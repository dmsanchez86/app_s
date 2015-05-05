<?php

class session extends ActiveRecord\Model{
   # explicit table name since our table is not "books" 
   static $table_name = 'session';
 
   # explicit pk since our pk is not "id" 
   static $primary_key = 'id';
 
   # explicit connection name since we always want our test db with this model
   static $connection = 'development';
 
}

?>