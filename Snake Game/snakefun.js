//Game constants & variables
let inputDir = {x:0, y:0};
const foodsound = new Audio('Eatingsound.mp3');
const gameover = new Audio('gameover.mp3');
const directionsound = new Audio('directionchange.mp3');
const musicsound = new Audio('Bgsong.mp3');
let speed = 5;
let Score = 0;
let lastPlayTime =0;
let SnakeArr = [
    {x:13,y:15}
]
food ={x:6,y:7};

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPlayTime)/1000 < 1/speed){
        return;
    }
    lastPlayTime= ctime;
    GameEngine();
}

function isCollide(snake) {
    // //If you bump into yourself
    // for (let i = 1; i < SnakeArr.length; i++){
    //     if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
    //         return true;
    //     }
    // }
    //If you bump into the wall 
    if(snake[0].x>=18 ||snake[0].x<=0 || snake[0].y>=18 ||snake[0].y<=0){
        return true;
    }
}
    

function GameEngine(){
    //Updating the snake variable/ array & food
    if(isCollide(SnakeArr)){
        gameover.play();
        musicsound.pause();
        inputDir ={x:0, y:0};
        alert("Game Over!! Press any key to play again.");
        SnakeArr= [{x:13,y:15}];
        musicsound.play();
        Score =0;
    }

    //If snake have eaten the food then increment the score and generate new food
    if(SnakeArr[0].y === food.y && SnakeArr[0].x ===food.x){
        foodsound.play();
        Score+=1;
        ScoreBox.innerHTML = "Score:"+Score;
        SnakeArr.unshift({x:SnakeArr[0].x + inputDir.x , y:SnakeArr[0].y + inputDir.y});
        let a=2 ;
        let b= 16;
        food = {x : Math.round(a + (b-a)*Math.random()), y : Math.round(a + (b-a)*Math.random())}
    }

    //Moving the snake
    for (let i = SnakeArr.length-2; i >=0; i--) {
        SnakeArr[i+1] = {...SnakeArr[i]}
    }

    SnakeArr[0].x +=inputDir.x;
    SnakeArr[0].y +=inputDir.y;


    //Displaying the snake
    board.innerHTML ="";
    SnakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    //Display the food
    FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart = food.y;
    FoodElement.style.gridColumnStart = food.x;
    FoodElement.classList.add('food');
    board.appendChild(FoodElement);



}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x:0,y:1}; //Start the Game 
    directionsound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x =0 ;
            inputDir.y = -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x =0 ;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x =1 ;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }

});


