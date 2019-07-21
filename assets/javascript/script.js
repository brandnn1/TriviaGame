    // Here we construct our URL
    var queryURL = "https://opentdb.com/api.php?amount=1";
    var options = []


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


    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#time").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }