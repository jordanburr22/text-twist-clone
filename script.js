$(document).ready(function() {

    let $guessInput = $('#input');
    let rack = "ACLLORS"; // TODO get random rack from server

    $.ajax({
        method: "GET",
        url: "http://localhost:8080",
        success: data => { 
            //console.log(data);
            $('#currentRack').html(data[0]['rack']);
        },
        error: data=>{alert(data.responseText);}
    });

    $('button').click(function() {

        let data = {
            rack: rack,
            guess: $guessInput[0].value
        };

        $.ajax({
            method: "POST",
            data: data,
            dataType: "json",
            url: "http://localhost:8080",
            success: data=>{ alert(data);},
            error: data=>{alert(data.responseText); }
        });

        $('#lastGuess').html('<p> Last Guess: ' + $guessInput[0].value +'</p>');
        $guessInput.val('');

    });
    
});