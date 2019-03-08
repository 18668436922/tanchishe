var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var scoreBox = document.getElementById('score');
var lose = document.getElementById('lose');
var loserScore = document.getElementById('loserScore');
var snakeMove;
var close = document.getElementById('close');
var startBtn = document.getElementById('startBtn');
var speed = 200;
var pause = document.getElementById('pause');
var gamePause = false; //设置暂停开始的控制锁

function init() { //初始化地图
    //地图大小设置
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //食物大小设置
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ];
    //游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.score = 0;

}
//点击开始游戏
startBtn.onclick = function () {
    startPage.style.display = 'none';
    startBtn.style.display = 'block';
    pause.style.display = 'block';
    init();
    food();
    snake();
    snakeMove = setInterval(function () {
        move();
    }, speed);
    bindEvent();
}

function food() { //随机生成苹果。
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}
//初始化蛇出生的位置
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
    }
}
//蛇运动
function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();
    //吃到食物 蛇身+1 分数+1
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        this.score += 1;
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            default:
                break;
        }
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    //失败规则
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        relodGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        relodGame();
    }
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]) {
            relodGame();
        }
    }
}
//重启游戏
function relodGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    this.snakeBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    lose.style.display = 'block';
    loserScore.innerHTML = '最终分数: ' + this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;

}

function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}
//绑定蛇运动方向规则
function setDirect(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;

    }
}
//给蛇绑定键盘事件
function bindEvent() {
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setDirect(code);
    }
    close.onclick = function () {
        lose.style.display = 'none';
        startPage.style.display = 'block';
        pause.style.display = 'none';
    }
}
//开始和暂停
pause.onclick = function () {
    if (!gamePause) {
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        }
        pause.setAttribute('src', './css/img/pause.png');
        gamePause = true;
    } else {
        pause.setAttribute('src', './css/img/start.png');
        snakeMove = setInterval(function () {
            move();
        }, speed);
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDirect(code);
        }
        gamePause = false;
    }
}