$(document).ready(function() {

    let score = 0;
    let answers = [];
    let $guessInput = $('#input');
    let rack = "";

    let showBlanks = function(words) {
        console.log(words);
    }

    $.ajax({
        method: "GET",
        data: {
            "function": "getRack"
        },
        dataType: "json",
        url: "api.php",
        success: data => { 
            $('#currentRack').append(data[0]['rack']);
        },
        error: data=>{
            console.log(data.responseText); 
            console.log("failed to get the rack from server");}
    }).then( data => {
            $.ajax({
            method: "GET",
            data: {
                "function": "getWords",
                "rack": data
            },
            dataType: "json",
            url: "api.php",
            success: data => {
                showBlanks(data);
            },
            error: data => {
                console.log(data.responseText); 
                console.log("failed to get the words from server");
            }
        })
        }   
    );

    

    $('button').click(function() {

        let data = {
            rack: rack,
            guess: $guessInput[0].value
        };

        $.ajax({
            method: "POST",
            data: data,
            dataType: "json",
            url: "api.php",
            success: data=>{ 
                score+=1;
                $("#score").html = score;
                alert(data);
            },
            error: data=>{
                alert(data.responseText); 
                
            }
        });

        $('#lastGuess').html('<p> Last Guess: ' + $guessInput[0].value +'</p>');
        $guessInput.val('');

    });
    
});