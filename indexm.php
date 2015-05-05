<?php
  // test for username/password
  if(($_SERVER['PHP_AUTH_USER'] == "herman") AND
    ($_SERVER['PHP_AUTH_PW'] == "zopp15feb"))
  {
    header("Location:415111911007422/page.html");
  }
  else
  {
    //Send headers to cause a browser to request
    //username and password from user
    header("WWW-Authenticate: " .
    "Basic realm=\"PHPEveryDay's Protected Area\"");
    
	header("HTTP/1.0 401 Unauthorized");

    //Show failure text, which browsers usually
    //show only after several failed attempts
    print("This page is protected by HTTP ");
  }
?>