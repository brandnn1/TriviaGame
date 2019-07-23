    // Here we construct our URL
    var queryURL = "https://opentdb.com/api.php?amount=20";
    var options = []
    var countCorrect = 0;
    var countIncorrect = 0;
    var countTimeout = 0;
    var timer = 15;
    var running = false;
    var pick;
    var randomQ;
    var placeholder = [];
//make api call to get trivia questions
    function triviaGame(queryURL) {
     $.ajax({
         url: queryURL,
         method: "GET"
        }).then(function(response) {

        options = response.results
        console.log(options)
        });


    }

    // function shuffle(arr) {
    //     var m = arr.length,
    //         t, i;
    //     While there remain elements to shuffle…
    //     while (m) {
    //         Pick a remaining element…
    //         i = Math.floor(Math.random() * m--);
    //         And swap it with the current element.
    //         t = arr[m];
    //         arr[m] = arr[i];
    //         arr[i] = t;
    //     }
    //     return arr;
    // }




    triviaGame(queryURL)

    //reset code
    $("#reset").hide();

    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        placeholder.push(options[i]);
    }
        })

        
function checkEnd () {
	
	options.splice(randomQ,1);

	var wait = setTimeout(function() {
		$("#answers").empty();
		timer= 15;

	//run the score screen if all questions answered
	if ((countIncorrect + countCorrect + countTimeout) === 10) {
		$("#questions").empty();
		$("#questions").html("<h3>Game Over! See your results below: </h3>");
		$("#answers").append("<h4> Correct Responses: " + countCorrect + "</h4>" );
		$("#answers").append("<h4> Incorrect Responses: " + countIncorrect + "</h4>" );
		$("#answers").append("<h4> Unanswered Responses: " + countTimeout + "</h4>" );
		$("#reset").show();
		countCorrect = 0;
		countIncorrect = 0;
		countTimeout = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

    //timer code
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        $("#time").html("<h2>Time remaining: " + timer + "</h2>");
        }
    }
   

    function decrement() {
        timer --;
        $("#time").html("<h2>Time remaining: " + timer + "</h2>");
        
    

        if (timer === 0) {
            countTimeout++;
            stop();
            $("#answers").html("<p>Time ran out! The answer was: " + pick.correct_answer + "</p>");
            checkEnd();
        }	
    }
    

    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //reset 

    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answers").empty();
        $("#questions").empty();
        for(var i = 0; i < placeholder.length; i++) {
            options.push(placeholder[i]);
        }
        triviaGame(queryURL);
        runTimer();
        displayQuestion();
    });

    function displayQuestion() {
        //generate random index in array
        randomQ = Math.floor(Math.random()*options.length);
        pick = options[randomQ];
        answers = pick.incorrect_answers;
        answers.push(pick.correct_answer);
        console.log(answers);
        function shuffle(arr) {
            var m = arr.length,
                t, i;
            // While there remain elements to shuffle…
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);
                // And swap it with the current element.
                t = arr[m];
                arr[m] = arr[i];
                arr[i] = t;
            }
            return arr;
        }
        shuffle(answers);
        console.log(answers);
        
    //     randQuestion = pick.incorrect_answers
    //     reorderQuestion = [];


    //     const formRandom = (arr) => {
    //     while (arr.length !== 0){
    //         if (reorderQuestion.length < arr.length){
    //             let qs = arr[Math.floor(Math.random() * arr.length)];
    //             reorderQuestion.push(qs);
    //             arr.splice(arr.indexOf(qs), 1);
    //     }}
    // }
    //    formRandom(randQuestion)
    //     console.log(randQuestion)
    //     console.log(reorderQuestion)

    //console.log (pick);
            $("#questions").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < answers.length + 1; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("possibleanswer");
                userChoice.html(answers[i]);
                
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);


                $("#answers").append(userChoice);
    //		}
    }
    
//click function to select answer and outcomes
$(".possibleanswer").on("click", function () {
	//grab array position from userGuess
    userGuess = $(this).html();
    console.log(userGuess);
    console.log(pick.correct_answer);
	//correct guess or wrong guess outcomes
	if (userGuess === pick.correct_answer) {
		stop();
		countCorrect++;
		userGuess="";
		$("#answers").html("<p>That's the right answer!</p>");
		checkEnd();

	} else {
		stop();
		countIncorrect++;
		userGuess="";
        $("#answers").html("<p>Oops, that's incorrect. The answer was: " + pick.correct_answer + "</p>");
		checkEnd();
	}
})


}