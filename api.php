<?php
    
    //this is the basic way of getting a database handler from PDO, PHP's built in quasi-ORM
    $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
    if (!$dbhandle) die ($error);

    //this part is perhaps overkill but I wanted to set the HTTP headers and status code
    //making to this line means everything was great with this request
    header('HTTP/1.1 200 OK');
    //this lets the browser know to expect json
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: http://localhost:8080');
    
    $verb = $_SERVER['REQUEST_METHOD'];
    $result = array();
    $answers = array();
    $lengths = array();

    // Function to print all sub strings 
    function combinationUtil($words, $n, $r, $index, $data, $i) { 
        global $result;
        global $answers;
        global $dbhandle;
        global $lengths;
        // Current cobination 
        // is ready, print it 
        if ($index == $r) { 
            $currentWord = "";
            for ($j = 0; $j < $r; $j++) {
                $currentWord = $currentWord . $data[$j];
            }

            $statement = $dbhandle->prepare("SELECT * FROM racks WHERE rack=?");
            $statement->execute([$currentWord]);
            $subrack = $statement->fetchAll(PDO::FETCH_ASSOC);

            if($subrack && !in_array($currentWord, $result)) {
                array_push($result, $currentWord); 
                $statement = $dbhandle->prepare("SELECT * FROM racks WHERE rack=?");
                $statement->execute([$currentWord]);
                $subrack = $statement->fetchAll(PDO::FETCH_ASSOC);
                array_push($answers, explode("@@", $subrack[0]['words'])[0]);
                array_push($lengths, array((int)$subrack[0]['length'])[0]);
                //echo json_encode($lengths);
            }
            return; 
        } 
    
        // When no more elements are  
        // there to put in data[] 
        if ($i >= $n) 
            return; 
    
        // current is included, put 
        // next at next location 
        $data[$index] = $words[$i]; 
        combinationUtil($words, $n, $r, $index + 1, $data, $i + 1); 
    
        // current is excluded, replace  
        // it with next (Note that i+1  
        // is passed, but index is not changed) 
        combinationUtil($words, $n, $r, $index, $data, $i + 1); 
    } 
    
    if($verb == "GET") {
        if($_REQUEST["function"] == "getRack") {
            $query = "SELECT rack FROM racks WHERE length=7 order by random() limit 1";
            $statement = $dbhandle->prepare($query);
            $statement->execute();
            $rack = $statement->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($rack[0]['rack']);
        } else if($_REQUEST["function"] == "getInfo") {
            $words = str_split($str);
            $data = array();
            for($j=2; $j <8; $j++)
                combinationUtil($_REQUEST["rack"], strlen($_REQUEST["rack"]), $j, 0, $data, 0);
            //echo json_encode($result);
            $lengthsandwords = array();
            $lengthsandwords['lengths'] = $lengths;
            $lengthsandwords['words'] = $answers;
            echo json_encode($lengthsandwords);
        } 
    }
 
    
?>