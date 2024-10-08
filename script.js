function snakes() {
    let score,
        items,
        foodCord,
        snake = [],
        dir,
        pause = 0,
        over = 0,
        shitCount = [];

    const canvas = document.getElementById('canvas'),
        canBlock = document.querySelector('.canvas'),
        ctx = canvas.getContext("2d"),
        scoreEl = document.getElementById('score'),
        itemsEl = document.getElementById('items'),
        box = 32;

    const ground = new Image();
    ground.src = 'img/graund.png';

    const food = new Image();
    food.src = getFood();

    function getFood() {
        let arr = ["food0", "food1", "food2", "food3", "food4"];
        let item = Math.floor(Math.random() * arr.length);
        return "img/" + arr[item] + ".png";
    }

    function changeSpeed() {
        clearInterval(game);
        game = setInterval(drawGame, scoreTime());
    }

    const head = new Image();
    head.src = 'img/head.png';

    const body = new Image();
    body.src = 'img/body.png';

    const shite = new Image();
    shite.src = 'img/shit.png';

    score = 0;
    items = 0;

    function scoreTime() {
        return 500 - score * 10;
    }

    foodCord = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    snake[0] = {
        x: 9 * box,
        y: 9 * box
    };

    document.addEventListener('keydown', direction);

    function direction(event) {
        if (event.keyCode === 37 && dir !== 'right') {
            dir = 'left';
        } else if (event.keyCode === 38 && dir !== 'down') {
            dir = 'up';
        } else if (event.keyCode === 39 && dir !== 'left') {
            dir = 'right';
        } else if (event.keyCode === 40 && dir !== 'up') {
            dir = 'down';
        } else if (event.keyCode === 32) {
            if (pause === 0) {
                clearInterval(game);
                canBlock.classList.add('pause');
                pause = 1;
            } else if (pause === 1 && over !== 1) {
                canBlock.classList.remove('pause');
                game = setInterval(drawGame, scoreTime());
                pause = 0;
            }
        } else if (event.keyCode === 13) {
            canBlock.classList.remove('game-over');
            canBlock.classList.remove('pause');
            clearInterval(game);
            snakes();
        }
    }

    function drawGame() {
        scoreEl.innerText = score;
        itemsEl.innerText = items;
        ctx.drawImage(ground, 0, 0);
        ctx.drawImage(food, foodCord.x, foodCord.y);

        for (let i = 0; i < snake.length; i++) {
            if (i === 0) {
                ctx.drawImage(head, snake[i].x, snake[i].y);
            } else {
                ctx.drawImage(body, snake[i].x, snake[i].y);
            }
        }

        if (shitCount.count !== 0) {
            ctx.drawImage(shite, shitCount.x, shitCount.y);
            shitCount.count--;
        }

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        if (snakeX === foodCord.x && snakeY === foodCord.y && (food.src.split('/')[food.src.split('/').length - 1]) === 'food0.png') {
            foodCord = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };
            food.src = getFood();
            changeSpeed();
            shit();
        } else if (snakeX === foodCord.x && snakeY === foodCord.y) {
            items++;
            score++;
            foodCord = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };
            food.src = getFood();
            changeSpeed();
        } else {
            snake.pop();
        }

        if (dir === 'left') snakeX -= box;
        if (dir === 'right') snakeX += box;
        if (dir === 'up') snakeY -= box;
        if (dir === 'down') snakeY += box;

        if (snakeX < 0) {
            snakeX = 19 * box;
        } else if (snakeX > 19 * box) {
            snakeX = 0;
        }

        if (snakeY < 0) {
            snakeY = 19 * box;
        } else if (snakeY > 19 * box) {
            snakeY = 0;
        }

        // for (let i = 0; i < snake.length; i++) {
        //     if (snakeX === snake[i].x && snakeY === snake[i].y) {
        //         clearInterval(game);
        //         canBlock.classList.add('game-over');
        //         over = 1;
        //     }
        // }

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        snake.unshift(newHead);
    }

    function shit() {
        shitCount = {
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y,
            count: 120
        };

        snake.pop();
    }

    let game = setInterval(drawGame, scoreTime());
}

snakes();
