<?php
    // Declare an array  
    $results = array( 
        "name"=>"GFG", 
        "email"=>"abc@gfg.com"); 

    $verb = $_SERVER['REQUEST_METHOD'];

    if ($verb == "GET"){
        $results = "jordan a burroughs";
    }
        
    //this part is perhaps overkill but I wanted to set the HTTP headers and status code
    //making to this line means everything was great with this request
    header('HTTP/1.1 200 OK');
    //this lets the browser know to expect json
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: http://localhost:8080');
    // Use json_encode() function 
    echo json_encode($results); 
    
?>