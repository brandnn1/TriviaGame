    // Here we construct our URL
    var queryURL = "https://opentdb.com/api.php?amount=1";
    var options = []
    var countCorrect = 0;
    var countIncorrect = 0;
    var countTimeout = 0;
    var timer = 15;

    function triviaGame(queryURL) {
     $.ajax({
         url: queryURL,
         method: "GET"
        }).then(function(response) {

        options = response.results
        console.log(options)
        });


    }


    triviaGame(queryURL)

    //reset code
    $("#reset").hide();

    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })


    //timer code
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
   

    function decrement() {
        $("#time").html("<h2>Time remaining: " + timer + "</h2>");
        timer --;
    

        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answers").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    

    function stop() {
        running = false;
        clearInterval(intervalId);
    }