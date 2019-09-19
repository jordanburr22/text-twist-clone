<?php

    //this is the basic way of getting a database handler from PDO, PHP's built in quasi-ORM
   $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
    if (!$dbhandle) die ($error);
 
    //this is a sample query which gets some data, the order by part shuffles the results
    //the limit 0, 10 takes the first 10 results.
    // you might want to consider taking more results, implementing "pagination", 
    // ordering by rank, etc.
    $query = "SELECT rack FROM racks WHERE length=7 order by random() limit 1";
    
    //this next line could actually be used to provide user_given input to the query to 
    //avoid SQL injection attacks
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);


    $verb = $_SERVER['REQUEST_METHOD'];
    //$uri = $_SERVER['PATH_INFO'];
   // $routes = explode("/", $uri);

   
    if ($_REQUEST["rack"] && $_REQUEST["guess"]){
        $results = $_REQUEST["guess"] . " in " . $_REQUEST["rack"];
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