$(document).ready(function() {
  $("#input").focus();
  $("#loading").hide();

  let score = 0;
  let winScore;
  let answers = [];
  let correct = [];
  let lengths = [];
  let rack = "";
  let $guessInput = $("#input");

  let showBlanks = function(lengths) {
    $("#blanks").html("");
    let wordNumber = 0;
    lengths.map(length => {
      let blank = "";
      for (let i = 0; i < length; i++) {
        blank += "_ ";
      }
      $("#blanks").append(
        //`<li><span id=word${wordNumber}>${blank}</span></li>`
        `<li id=word${wordNumber}>${blank}</li>`
      );
      wordNumber++;
    });
  };

  $.ajax({
    method: "GET",
    data: {
      function: "getRack"
    },
    dataType: "json",
    url: "api.php",
    success: data => {
      $("#currentRack").append(data);
      rack = data;
    },
    error: data => {
      console.log(data.responseText);
      console.log("failed to get the rack from server");
    }
  }).then(data => {
    $.ajax({
      method: "GET",
      data: {
        function: "getLengths",
        rack: data
      },
      dataType: "json",
      url: "api.php",
      success: data => {
        data.map(length => {
          lengths.push(length);
        });
        winScore = data.length;
        $("#score").html(0);
        $("#winScore").html(winScore);
        showBlanks(data);
      },
      error: data => {
        console.log(data.responseText);
        console.log("failed to get the words from server");
      }
    });
  });

  $("#input").keyup(function(event) {
    if (event.keyCode === 13) {
      $("button").click();
    }
  });

  $("button").click(function() {
    const input = $guessInput[0].value.toUpperCase();
    $("#message").text("Checking...");

    // if already guessed
    if (correct.includes(input)) {
      $guessInput.val("");
      $("#message").text("You already have this word!");
      return;
    }

    $.ajax({
      method: "GET",
      data: {
        function: "checkWord",
        rack: rack,
        input: input
      },
      dataType: "json",
      url: "api.php",
      success: data => {
        let word = data["word"];
        let successful = data["successful"];
        let index = data["index"];

        if (successful) {
          $("#word" + index).text(word);
          correct.push(word);
          $("#" + input).text(input);
          score++;
          $("#score").text(score);
          if(word.length == 7) {
            $("#message").text("YOU GOT A BINGO!");
          } else {
              $("#message").text("You got one!");
          }
        } else {
          $("#message").text("Nope! Try again");
        }
      }
    });

    /*
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
        */
    $guessInput.val("");
  });
});
