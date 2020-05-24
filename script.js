
function main(){
    var points = 0;
    var timeLeft = 30;
    console.log(timeLeft);
    $(".timer").text("Timer: " + timeLeft);
    $(".points").text("Points: " + points);

    var xSize = 20;
    var ySize = 20;

    var rect = drawRect(xSize, ySize);
    var x = rect[0];
    var y = rect[1];


    if ($(".game-box")){
        $(".game-box").click(function(e){
            var canvas = document.getElementsByClassName('game-box');
            var position = getCursorPosition(canvas, e);
                if (position[0] >= x && position[0] <= x + 20 && position[1] >= y && position[1] <= y + 20)
                {
                    points += 1;
                    $(".points").text("Points: " + points);
                    if (points == 1){
                        var timer = setInterval(function(){
                            timeLeft -= 1;
                            $(".timer").text("Timer: " + timeLeft);
                            if (timeLeft == 0){
                                $(".timer").text("Timer: " + timeLeft);
                                clearInterval(timer);
                                alert("Game over.\nYou got " + points + " points.");
                                $(".lastscore").append("Last score: " + points + "<br>");
                                rect[2].clearRect(x, y, 20, 20);
                                main();
                            }
                            }, 1000);
                    }
                    console.log("x " + xSize + "y " + ySize);
                    rect[2].clearRect(x, y, 20, 20);
                    xSize -= Math.floor((0.025 * xSize) * 100) / 100;
                    ySize -= Math.floor((0.025 * ySize) * 100) / 100;
                    rect = drawRect(xSize, ySize);
                    x = rect[0];
                    y = rect[1];
                }
                else{
                    console.log("False position: " + position);
                }
        })
    }
}

function getCursorPosition(canvas, event){
    var box = canvas[0].getBoundingClientRect();
    var x = event.clientX - box.left;
    var y = event.clientY - box.top;
    return [x, y];
}

function drawRect(xSize, ySize){
    var rectX = xSize;
    var rectY = ySize;

    var x = getRandomX();
    var y = getRandomY();

    var c = document.getElementsByClassName("game-box");
    var ctx = c[0].getContext("2d");
    ctx.beginPath();
    ctx.fillRect(x, y, rectX, rectY);
    ctx.stroke();
    console.log(x, y);
    return [x, y, ctx];
}

function getRandomX(){
    var x = Math.ceil(Math.random() * 280) + 20;
    return x;
}

function getRandomY(){
    var y = Math.ceil(Math.random() * 570) + 10;
    return y;
}