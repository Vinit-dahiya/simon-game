let buttonColours=["red","blue","green","yellow"];
let userClickedPattern=[];
let gamePattern=[];

let started = false;

let level = 0;

function gameOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        gameOver();
        return;
    }

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(nextSequence, 1000);
    }
}


$(document).keypress(function() {
  if (!started) {
    started = true;
    nextSequence();
  }
});

$(".btn").on("click", function(){
    const userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text(`Level ${level}`);
    const randomNumber=Math.floor(Math.random()*4);
    const randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    const sound = new Audio("sounds/" + name + ".mp3");
    sound.play(); 
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

