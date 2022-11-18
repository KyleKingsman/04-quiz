
/*Define variables*/
    //Assignment Code to each section
    var welcome = document.querySelector("#introduction");
    var startBtn = document.querySelector("#start_button");
    var introPage =document.querySelector("#intro_page");
    
    var questionPage = document.querySelector("#question_page");
    var askQuestion = document.querySelector("#ask_question");
    
    var reactButtons = document.querySelectorAll(".choices");
    var answerBtnA = document.querySelector("#a_btn");
    var answerBtnB = document.querySelector("#b_btn");
    var answerBtnC = document.querySelector("#c_btn");
    var answerBtnD = document.querySelector("#d_btn");
    
    var checkLine = document.querySelector("#check_line");
    var scoreBoard = document.querySelector("#submit_page");
    var finalScore = document.querySelector("#final_score");
    var userInitial = document.querySelector("#initial");
    var btnB = document.querySelector("#btn_B");
    var btnC = document.querySelector("#btn_C");
    var submitBtn = document.querySelector("#submit_btn");
    var highScorePage = document.querySelector("#highscore_page");
    var scoreRecord = document.querySelector("#score_record");
    var scoreCheck = document.querySelector("#score_check");
    var finish = document.querySelector("#finish");
    // How do they keep trake of so many variables?
   
    
        //Define questions (Object)
    var questionSource = [
        {
            question: "Inside which HTML element do we put the JavaScript?",
            choices: ["a. <script>", "b. <js>", "c. <javascript>", "d. <scripting>"],
            answer: "a"
        },
        {
            question: "Where is the correct place to insert a JavaScript?",
            choices: ["a. The <body> section", "b. The <head> section", "c. Both the <head> section and the <body> section are correct", "d. Neither answer is correct"],
            answer: "c"
        },
        {
            question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
            choices: ["a. <script href= 'xxx.js'>", "b. <script src='xxx.js'>", "c. <script name='xxx.js'>", "d. <script url='xxx.js'>"],
            answer: "b"
        },
        {
            question: "How do you write 'Hello World' in an alert box?",
            choices: ["a. msg('Hello World';", "b. msgBox('Hello World');", "c. alert('Hello World')", "d. alert('Hello World');"],
            answer: "d"
        },
        {
            question: "How do you create a function in JavaScript?",
            choices: ["a. function => myFunction()", "b. function myFunction() ", "c. function = myFunction()", "d. function:myFunction()"],
            answer: "b"
        },
        {
            question: "The first index of an array is ____.",
            choices: ["a. 0", "b. 1", "c. 8", "d. any"],
            answer: "a"
        },
        {
            question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
            choices: ["a. if (i <> 5)", "b. if (i != 5)", "c. if i <> 5", "d. if i =! 5 then"],
            answer: " b"
        },
        {
            question: "What is the correct way to write a JavaScript array?",
            choices: ["a. var colors = 'red', 'green', 'blue'", "b. var colors = ['red', 'green', 'blue'] ", "c. var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", "d. var colors = (1:'red', 2:'green', 3:'blue')"],
            answer: "a"
        }
    ];
        
    // VARIABLES BABY!!
    var timeLeft = document.getElementById("timer");
    
    var secondsLeft = 60;
    var questionNumber = 0;
    var totalScore = 0;
    var questionCount = 1;
    /*Functions*/
        //WHEN I click the start button, THEN a timer starts(The setInterval() Method)
    function countdown() {
            
            var timerInterval = setInterval(function () {
    
              secondsLeft--;
              timeLeft.textContent = "Time left: " + secondsLeft + " s";
        
                if (secondsLeft <= 0){
                    clearInterval(timerInterval);
                    timeLeft.textContent = "OUT OF TIME!"; 
                    // if time is up, show on score board content instead of "all done!"
                    finish.textContent = "OUT OF TIME!";
                    gameOver();
    
                } else  if(questionCount >= questionSource.length +1) {
                    clearInterval(timerInterval);
                    gameOver();
                    } 
        }, 1000);
    }
    
        //Click the button to start the quiz
    function startQuiz () {
            introPage.style.display = "none";
            questionPage.style.display = "block";
            questionNumber = 0
            countdown();
            showQuestion(questionNumber);
          
    }
        //present the questions and answers
    function showQuestion (n) {
            askQuestion.textContent = questionSource[n].question;
            answerBtnA.textContent = questionSource[n].choices[0];
            answerBtnB.textContent = questionSource[n].choices[1];
            answerBtnC.textContent = questionSource[n].choices[2];
            answerBtnD.textContent = questionSource[n].choices[3];
            questionNumber = n;
        }
    
        //WHEN I answer a question,Show if answer is correct or wrong 
    function checkAnswer(event) {
        event.preventDefault();
        //make it display
        checkLine.style.display = "block";
        setTimeout(function () {
            checkLine.style.display = 'none';
        }, 1000);
    
        // answer check
        if (questionSource[questionNumber].answer == event.target.value) {
            secondsLeft = secondsLeft + 5;
            checkLine.textContent = "You got it!"; 
            totalScore = totalScore + 1;
    
        } else {
            secondsLeft = secondsLeft - 10;
            checkLine.textContent = "Um actually it's " + questionSource[questionNumber].answer + " .";
        }
             //THEN I am presented with another question
        if (questionNumber < questionSource.length -1 ) {
        // call showQuestions to bring in next question when any reactBtn is clicked
            showQuestion(questionNumber +1);
        } else {
        gameOver();
    }
    questionCount++;
    }
        //WHEN all questions are answered or the timer reaches 0, Game is over
    function gameOver() {
    
            questionPage.style.display = "none";
            scoreBoard.style.display = "block";
            console.log(scoreBoard);
            // show final score
            finalScore.textContent = "Your final score is :" + totalScore ;
            // clearInterval(timerInterval);  
            timeLeft.style.display = "none"; 
    };
    
    // get current score and initials from local storage
    function getScore () {
        var currentList =localStorage.getItem("ScoreList");
        if (currentList !== null ){
            freshList = JSON.parse(currentList);
            return freshList;
        } else {
            freshList = [];
        }
        return freshList;
    };
    
    
    // render score to the score board
    function renderScore () {
        scoreRecord.innerHTML = "";
        scoreRecord.style.display ="block";
        var highScores = sort();   
        // Slice the high score array to only show the top five high scores. 
        var topFive = highScores.slice(0,5);
        for (var i = 0; i < topFive.length; i++) {
            var item = topFive[i];
        // Show the score list on score board
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
        }
    };
    
    // sort score and ranking the highscore list
    function sort () {
        var unsortedList = getScore();
        if (getScore == null ){
            return;
        } else{
        unsortedList.sort(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }};
    
    // push new score and initial to the local storage
    function addItem (n) {
        var addedList = getScore();
        addedList.push(n);
        localStorage.setItem("ScoreList", JSON.stringify(addedList));
    };
    
    function saveScore () {
        var scoreItem ={
            user: userInitial.value,
            score: totalScore
        }
        addItem(scoreItem);
        renderScore();
    }
    
    /* Add event listeners*/
    // startbtn to start the quiz
    startBtn.addEventListener("click", startQuiz);
    
    //click any choices button, go to the next question
    reactButtons.forEach(function(click){
    
        click.addEventListener("click", checkAnswer);
    });
    
    //save information and go to next page
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        saveScore();
    });
    
    // check highscore ranking list
    scoreCheck.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        renderScore();
    });
    
    //go back to main page
    btnB.addEventListener("click",function(event){
            event.preventDefault();
            scoreBoard.style.display = "none";
            introPage.style.display = "block";
            highScorePage.style.display = "none";
            questionPage.style.display ="none";
            location.reload();
    });
    
    //clear local storage and clear page shows
    btnC.addEventListener("click",function(event) {
        event.preventDefault();
        localStorage.clear();
        renderScore();
    });
    console.log(
       ('https://www.omfgdogs.com/#')
    )