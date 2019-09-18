$(document).ready(function() {

    let $guessInput = $('#input');

    $('button').click(function() {
        /*
        $.ajax({
            url: "https://jordanburr22-1.paiza-user.cloud/~ubuntu/index.php",
            success: function(data) { alert(data); }
        });
        */

        $.ajax({
            method: "GET",
            url: "https://jordanburr22-1.paiza-user.cloud/~ubuntu/index.php",
            success: data=>{ alert(data);}
        });

        $('#lastGuess').html('<p> Last Guess: ' + $guessInput[0].value +'</p>');
        $guessInput.val('');

    });
});