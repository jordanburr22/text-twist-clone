$(document).ready(function() {

    let $guessInput = $('#input');

    $('button').click(function() {
        console.log($('#input'));
        $('#lastGuess').html('<p> Last Guess: ' + $guessInput[0].value +'</p>');
        $guessInput.val('');
    });
});