function clearScreen() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
}
function clearScreenTimer(){
    timerContext.fillStyle = "black";
    timerContext.fillRect(0, 0, board.width, board.height);
}
function manageKeyEventsOnKeyDown(e) {
    if (e.key == "p") {
        key = "p";
    }
    else {
        key = "";
        if (e.key == "ArrowRight") {
            rightKeyDown = true;
        }
        if (e.key == "ArrowLeft") {
            leftKeyDown = true;
        }
        if (e.key == "ArrowDown") {
            downKeyDown = true;
        }
        if (e.key == "ArrowUp") {
            upKeyDown = true;
        }
        if (e.key == " ") {
            spaceKeyDown = true;
        }
    }
}
function manageKeyEventsOnKeyUp(e) {
    if (e.key == "ArrowRight") {
        rightKeyDown = false;
    }
    if (e.key == "ArrowLeft") {
        leftKeyDown = false;
    }
    if (e.key == "ArrowDown") {
        downKeyDown = false;
    }
    if (e.key == "ArrowUp") {
        upKeyDown = false;
    }
    if (e.key == " ") {
        //console.log(player.numberOfBullets);
        spaceKeyDown = false;
    }
}
function manageKeyEvents() {
    document.body.addEventListener('keydown', manageKeyEventsOnKeyDown);
    document.body.addEventListener('keyup', manageKeyEventsOnKeyUp);
}
function drawEnemies() {
    let i = 0;
    while (i < enemies.length) {
        if (enemies[i].health > 0) {
            enemies[i].draw(context);
        }
        else {
            enemies.splice(i,1);
        }
        i++;
    }
}
function addEnemies(n) {
    const numberOfColors = colors.length;
    let j = 0;
    let xi = 20;
    let yi = 10;
    let i = 0;
    while (i < n) {
        enemies.push(new Enemy(xi, yi, 50, colors[j]));
        if (j < numberOfColors) {
            j++;
        }
        else {
            j = 0;
        }
        xi += 30;
        i++;
    }
    yi += 30;
    i = 0;
    xi = 20;
    while (i < n) {
        enemies.push(new Enemy(xi, yi, 50, colors[j]));
        if (j < numberOfColors) {
            j++;
        }
        else {
            j = 0;
        }
        xi += 30;
        i++;
    }
}
function testBullets(test) {
    if(player.bullets.length==1){
        if (test.getDamages(player.bullets[0])) {
            player.bullets.splice(0, 1)
        }
    }
    else{
        let i = 0;
    while (i < player.bullets.length) {
        if (test.getDamages(player.bullets[i])) {
            player.bullets.splice(i, 1)
        }
        else {
            i++;
        }
    }
    }
}
function enemiesTakeDamage() {
    let i = 0;
    while (i < enemies.length) {
        if (enemies[i].health > 0) {
            player.testBullets(enemies[i]);
        }
        i++;

    }
}
function pauseTheGame() {
    context.shadowColor = "";
    context.shadowBlur = 0;
    context.lineJoin = "";
    context.lineWidth = 0;
    clearScreen();
    context.fillStyle = "white";
    context.font = "30px " + font;
    const pausex = width / 2;
    const pausey = height / 2;
    context.fillText("Pause", pausex - 40, pausey - 20);
    context.fillStyle = "red";
    context.font = "20px " + font;
    context.fillText("Press any key to continue", pausex - 90, pausey + 40);
}
function stopTheGame() {
    if(loop>0){
        loop=0;
    }
}
function winingTheGame() {
    if (enemies.length == 0 && timer> 0) {
        context.shadowColor = "";
        context.shadowBlur = 0;
        context.lineJoin = "";
        context.lineWidth = 0;
        clearScreen();
        context.fillStyle = "white";
        context.font = "40px " + font;
        const pausex = width / 2;
        const pausey = height / 2;
        context.fillText("You win", pausex - 60, pausey);
        delay=-1;
        //stopTheGame();
    }
}
function losingTheGame(){
    if (timer == 0) {
        //stopTheGame();
        context.shadowColor = "";
        context.shadowBlur = 0;
        context.lineJoin = "";
        context.lineWidth = 0;
        clearScreen();
        context.fillStyle = "red";
        context.font = "40px " + font;
        const pausex = width / 2;
        const pausey = height / 2;
        context.fillText("You lose", pausex - 60, pausey);
        stopTheGame();
    }
}
function manageTimer(){
    if(delay==0){
        timer--;
        delay=100;
    }
    else{
        if(delay>0){
            delay--;
        }
        else{
            stopTheGame();
        }
    }
}
function drawTime(){
    timerContext.font="80px "+font;
    const xt=timeArea.width/2;
    const yt=timeArea.height/2;
    if(timer>9){
        timerContext.fillStyle="white";
        timerContext.fillText(timer,xt-40,yt+30);
        timeArea.className="normal";
    }
    else{
        timerContext.fillStyle="red";
        timerContext.fillText(timer,xt-20,yt+30);
        timeArea.className="danger";
    }
}
function game() {
   if(loop>0){
    if (key == "p") {
        pauseTheGame();
    }
    else {
        clearScreen();
        clearScreenTimer();
        manageKeyEvents();
        player.draw(context);
        player.move(context, velocity, { rightKeyDown, upKeyDown, downKeyDown, leftKeyDown }, { width, height });
        player.fireBullet(spaceKeyDown,sound);
        enemiesTakeDamage();
        drawEnemies();
        winingTheGame();
        losingTheGame();
        manageTimer();
        drawTime();
    }
   }
}
function loopGame() {
    console.log("Working...");
    game();
    animation = requestAnimationFrame(loopGame);
    if (loop == 0) {
        cancelAnimationFrame(animation);
    }
}
function startGame() {
    timer=document.forms.configuration.count.value;
    document.getElementById('startbtn').disabled=true;
    loop = 100;
    delay=100;
    if(enemies.length==0){
        addEnemies(9);
    }
    loopGame();
}
function mainMenu(){
    clearScreen();
    clearScreenTimer();
    timer=document.forms.configuration.count.value;
    drawTime();
    context.shadowColor = "";
    context.shadowBlur = 0;
    context.lineJoin = "";
    context.lineWidth = 0;
    context.fillStyle = "white";
    context.font = "30px " + font;
    const pausex = width / 2;
    const pausey = height / 2;
    context.fillText("Shoot targets", pausex - 80, pausey - 20);
    context.fillStyle = "red";
    context.font = "20px " + font;
    context.fillText("Press start  to begin", pausex - 80, pausey + 40);
}
function endTheGame(){
    stopTheGame();
    mainMenu();
    document.getElementById('startbtn').disabled=false;
    enemies.splice(0,enemies.length);
    player=new Player(width/2,height-12);
}