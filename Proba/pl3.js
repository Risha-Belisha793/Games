// основной экран
function goBack() {
    history.back();
  }
var GAME = {
    x: 0,
    y:0,
    width: 800,
    height: 600,
    count: 0,
}
function drawGame(GAME) {
    var img = new Image();
      // Создаём новый объект Image
    img.src = 'изображения/floor.png'; // Устанавливаем путь к источнику
    canvasContext.drawImage(img, GAME.x, GAME.y); //рисуем картинку в канвас
}
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");


// создание переменной таблетка
var TABLETKA = {
    x: Math.random() * (800 - 100) + 100,
    y: Math.random() * (800 - 100) + 100,
    size: 20,
    width: 40,
    height: 50,
}
// создание переменной вирус 
var VIRUS = {
    x: 100,
    y: 80,
    radius: 50,
    width: 40,
    height: 50,
    xDirection: 7,
    yDirection: 9,
    schet: 0,
}
// создание переменной больной 
var SICK = {
    x: Math.random() * (800 - 10) + 10,
    y: Math.random() * (800 - 10) + 10,
    height: 150,
    width: 90,
    speed: 80,
    chetchik: 0,
    
}
//рисуем больного
function drawSick(SICK) {
    var img = new Image();   // Создаём новый объект Image
    img.src = 'изображения/sick-Photoroom.png'; // Устанавливаем путь к источнику
    canvasContext.drawImage(img, SICK.x, SICK.y,SICK.width,SICK.height); //рисуем картинку в канвас
}

//рисуем вирус
function drawVirus(VIRUS) {
    var img = new Image();
    img.src = 'изображения/virus-Photoroom.png'; // Устанавливаем путь к источнику
    canvasContext.drawImage(img, VIRUS.x, VIRUS.y,VIRUS.width,VIRUS.height); //рисуем картинку в канвас
}
// рисуем таблетки 
function drawTabletka(TABLETKA) {
    var img = new Image();   // Создаём новый объект Image
    img.src = 'изображения/banochlka-Photoroom.png'; // Устанавливаем путь к источнику
    canvasContext.drawImage(img, TABLETKA.x, TABLETKA.y,TABLETKA.width,TABLETKA.height);
}

//функция отрисовки кадра
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawGame(GAME);
    drawTabletka(TABLETKA);
    drawSick(SICK);
    drawVirus(VIRUS);
    
}

//  если вирус столкнулся с больным
function updateVirus(VIRUS) {
    VIRUS.x += VIRUS.xDirection;
    VIRUS.y += VIRUS.yDirection;
    if ((VIRUS.y + VIRUS.radius > GAME.height) || (VIRUS.y - VIRUS.radius  < 0)) {
        VIRUS.yDirection = -VIRUS.yDirection;
    }

    if ((VIRUS.x + VIRUS.radius > GAME.width) || (VIRUS.x -VIRUS.radius < 0)) {
        VIRUS.xDirection = -VIRUS.xDirection;
    }

    var SickTopLineCollision = VIRUS.y + VIRUS.radius > SICK.y;
    var SickLeftLineCollision = VIRUS.x + VIRUS.radius > SICK.x;
    var SickRightLineCollision = VIRUS.x - VIRUS.radius < SICK.x + SICK.width;
    var SickBotonLineCollision = VIRUS.y - VIRUS.radius < SICK.y + SICK.height;
    

    if (SickTopLineCollision && SickLeftLineCollision && SickRightLineCollision && SickBotonLineCollision) {
        VIRUS.schet = VIRUS.schet + 1;
        VIRUS.yDirection = -VIRUS.yDirection;
        VIRUS.xDirection = -VIRUS.xDirection;
    }  
    if (VIRUS.schet >= 3) {
        var img = new Image();

        // Создаём новый объект Image
        img.src = 'изображения/Bg_gameover.webp'; // Устанавливаем путь к источнику
        canvasContext.drawImage(img,0,-90 );
        VIRUS.schet = 3;
    }
}

function updateTabletka(TABLETKA, SICK,VIRUS) {
    var SickTop = TABLETKA.y + TABLETKA.size / 2 >= SICK.y;
    var SickLeft = TABLETKA.x + TABLETKA.size / 2 >= SICK.x;
    var SickRight = TABLETKA.y - TABLETKA.size / 2 <= SICK.y + SICK.height;
    var SickBottom = TABLETKA.x - TABLETKA.size / 2 <= SICK.x + SICK.width;


    if ((TABLETKA.y - TABLETKA.size / 2 < 0) || (TABLETKA.y + TABLETKA.size / 2 > GAME.height)) {
        TABLETKA.y = Math.random() * (800 - 100) + 100;       
    }

    if ((TABLETKA.x + TABLETKA.size / 2 > GAME.width) || (TABLETKA.x - TABLETKA.size / 2 <= 0)) {
        TABLETKA.x = Math.random() * (800 - 100) + 100;
        
    }
   
    if (SickTop && SickLeft && SickRight && SickBottom) {
        GAME.count = GAME.count + 1;
        VIRUS.speed = VIRUS.speed +100;
        TABLETKA.x = Math.random() * (800 - 100) + 100;
        TABLETKA.y = Math.random() * (800 - 100) + 100;
        SICK.chetchik += 1;
        console.log("Счёт: ",SICK.chetchik);
    }

    if (GAME.count >= 5){
        var img = new Image();
        GAME.count = 5;
        // Создаём новый объект Image
        img.src = 'изображения/victory.jpg'; // Устанавливаем путь к источнику
        canvasContext.drawImage(img,0,-90,800,700);
        GAME.count = 5; 
    }
    
}

function initEventsListeners() {
    window.addEventListener("keydown", onCanvasKeyDown,);
}

function clampSickPosition() {
    if (SICK.x < 0) {
        SICK.x = 0;
    }
    if (SICK.x + SICK.width > GAME.width) {
        SICK.x = GAME.width - SICK.width;
    }
    if (SICK.y < 0) {
        SICK.y = 0;
    }
    if (SICK.y + SICK.height > GAME.height) {
        SICK.y = GAME.height - SICK.height;
    }
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        SICK.x = SICK.x - SICK.speed;
    }
    if (event.key === "ArrowRight") {
        SICK.x = SICK.x + SICK.speed;
    }
    if (event.key === "ArrowDown") {
        SICK.y = SICK.y + SICK.speed;
        }
    if (event.key === "ArrowUp") {
        SICK.y = SICK.y - SICK.speed;
        }
    clampSickPosition();
}

function aptechka() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "30px serif";
    ctx.fillStyle = 'black';
    ctx.fillText("В аптечке: " + GAME.count, 500, 50);
}
function zarazen() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "30px serif";
    ctx.fillStyle = 'black';
    ctx.fillText("Вас заразили: " + VIRUS.schet, 10, 50);
}
//объявляем функцию перелистывания кадров
function play() {
    drawFrame();
    drawSick(SICK);
    updateVirus(VIRUS);
    updateTabletka(TABLETKA,SICK,VIRUS);
    aptechka();
    zarazen()
    requestAnimationFrame(play);
    }


initEventsListeners();
play();