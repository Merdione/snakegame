var cvs;
var ctx;
var interval;
var start = 0;

window.onload = function() {
    cvs = document.getElementById('game');
    ctx = cvs.getContext('2d');
    document.addEventListener('keydown', keyPush);
    
   
}
var GameSize = 20;
var vX = vY = 0; //İlerleme değeri
var pX = pY = 10; //Yılanın anlık konumu
var aX = aY = 3; //Elmanın konumu
var trail = [];
var tail = 5;
var skorCount = document.getElementById('skor1');
var skor;
var skorList = [];


 
function loop() {
    interval = setInterval(Game, 1000 / 15)
}

function Game() {
  skor = 10*(tail - 5)
  skorCount.innerHTML = skor;
  skorList.push(skor);
  
    
  pX += vX;
  pY += vY;


  if (pX < 0 ) { //Yılan sol kenera çarparsa
    pX = GameSize - 1;
  }

  
  if (pX > GameSize - 1) { //Yılan sağ kenera çarparsa
    pX = 0;
  }

  
  if (pY < 0) { //Yılan üst kenera çarparsa
    pY = GameSize - 1;
  }

  
  if (pY > GameSize - 1) { //Yılan alt kenera çarparsa
    pY = 0;
  }

  draw();



  
  ctx.fillStyle = 'lime';
  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * GameSize, trail[i].y * GameSize, GameSize, GameSize);
    if(trail[i].x == pX && trail[i].y == pY) {
      stop();
     
    }
      
  }
  trail.push({x:pX, y:pY});

  while(trail.length > tail) {
    trail.shift();
  }

  if (aX == pX && aY == pY) { //Elmayı yeme durumu
    tail++;
    aX = Math.floor(Math.random() * GameSize);
    aY = Math.floor(Math.random() * GameSize);

    for (let i = 0; i < trail.length; i++) {
        if (aX == trail[i].x && aY== trail[i].y) {
            aX = Math.floor(Math.random() * GameSize);
            aY = Math.floor(Math.random() * GameSize);
        }
        }
  }
}


function draw() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0,0, cvs.width, cvs.height);


    //Izgarayı çizme
    for (let i = 0; i < GameSize; i++) {
      ctx.beginPath(); //Yatay Çizgiler
      ctx.moveTo(0,i *  GameSize);
      ctx.lineTo(cvs.width,i * GameSize);
      ctx.stroke();

      ctx.beginPath(); //Dikey Çizgiler
      ctx.moveTo(i *  GameSize, 0);
      ctx.lineTo(i * GameSize,cvs.height);
      ctx.stroke();
        
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(aX * GameSize, aY * GameSize, GameSize, GameSize)


}


function keyPush(e) {

    start = 1;
    
    if(e.keyCode == 87 && vY != 1) { //Yukarı git
        vX = 0;
        vY = -1;
   
    }

    if(e.keyCode == 68 && vX != -1) { //Sağ git
        vX = 1;
        vY = 0;
    }

    if(e.keyCode ==  65  && vX != 1) { //Sola git
        vX = -1;
        vY = 0;
    }

    if(e.keyCode == 83  && vY != -1) { //Aşağı git
        vX = 0;
        vY = 1;
    }
}

function stop() {
    if (start != 0) {
        clearInterval(interval);
        skorCount.style.display = 'none';
        cvs.style.display = 'none';
        document.getElementById('GameOver').style.display = 'block';
        document.getElementById('skor2').innerHTML = 'Scor:' +  skorList[skorList.length - 1];
       
    }
}

function restart() {
    skorCount.style.display = 'block';
    cvs.style.display = 'block';
    document.getElementById('GameOver').style.display = 'none';
    document.getElementById('entry').style.display = 'none';
    tail = 5;
    pX = 0;
    pY = 0;
    start = 0;
    loop();
}