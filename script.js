$(document).ready(function() {

    let score = 0;
    let answers = [];
    let correct = [];
    let $guessInput = $('#input');

    let showBlanks = function(words) {
        $('#blanks').html('');
        words.map(word => {
            let newWord = "";
            for(let i = 0; i < word.length; i++) {
                newWord += "_ ";
            }
            $('#blanks').append(`<li><span id=${word} class="hidden">${newWord}</span></li>`);
        });
    }

    $.ajax({
        method: "GET",
        data: {
            "function": "getRack"
        },
        dataType: "json",
        url: "api.php",
        success: data => { 
            $('#currentRack').append(data);
        },
        error: data=>{
            console.log(data.responseText); 
            console.log("failed to get the rack from server");}
    }).then( data => {
            $.ajax({
            method: "GET",
            data: {
                "function": "getInfo",
                "rack": data
            },
            dataType: "json",
            url: "api.php",
            success: data => {
                data['words'].map(word => {
                    answers.push(word);
                })
                showBlanks(data['words']);          
            },
            error: data => {
                console.log(data.responseText); 
                console.log("failed to get the words from server");
            }
            });
        }   
    );

    

    $('button').click(function() {     
    
        const input = $guessInput[0].value.toUpperCase();
        if(correct.includes(input)) {
            console.log("you guessed this already!");
        } else if(answers.includes(input)) {
            correct.push(input);
            delete answers[answers.indexOf(input)];
            $('#'+input).text(input);
            score++;
            $('#score').text(score);
        } else {
            console.log("try again");
        }

        $('#lastGuess').html('<p> Last Guess: ' + $guessInput[0].value +'</p>');
        $guessInput.val('');

        if(answers.length == 0) 
            console.log("YOU WIN!");
    });
    
});