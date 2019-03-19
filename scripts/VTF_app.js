


const game = new Phaser.Game(
    800,
    window.innerHeight,
    Phaser.AUTO,
    'game-root',
    {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
);

let ball;
let pad;
let PNJGroup;
let timerText, timer = 0;

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = true;
    // game.stage.backgroundColor = '#eee';
    game.load.image('ball', 'asset/img/ball.png');
    game.load.image('pnj_1', 'asset/img/pnj_giroud.png')    ;
    game.load.image('pnj_2', 'asset/img/pnj_kante.png');
    game.load.image('pnj_3', 'asset/img/pnj_koscieny.png');
    game.load.image('pnj_4', 'asset/img/pnj_pogba.png');
    game.load.image('terrain' , 'asset/img/terrain.png');
    
};

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0,0, 800, window.innerHeight);
    
    
    const terrain = game.add.image(game.world.centerX, game.world.centerY, 'terrain');
    terrain.anchor.set(0.5);
    terrain.scale.setTo(1 , 0.9);

    // Création du groupe de briques
    PNJGroup = game.add.physicsGroup();

    // Génération des briques
    for (let y = 0; y < 1; y++) {
        for (let x = 0; x < 4; x++) {
            let sprite = new Phaser.Sprite(game, x * game.world.width/4 + 100, Math.floor(Math.random(20 - 0))    ,'pnj_' + (x % 10 + 1));
            sprite.scale.setTo(0.7,0.7);
             //sprite.createMultiple(200, 'pnj_' + ( x % 10 + 1), 0, false);

            // sprite.scale.setTo(0.2604, 0.2604); 
            PNJGroup.add(sprite);
            game.physics.enable(sprite, Phaser.Physics.ARCADE);
           // sprite.body.velocity.x = game.rnd.integerInRange(-200, 200);
            sprite.body.velocity.y = game.rnd.integerInRange(200, 1000);
            
          
                checkBounds(PNJGroup);

            
        }
    }
    PNJGroup.forEach(item => {
        item.body.movable = true;

    });
    
    

    // Création de la balle
    /** ball = game.add.sprite(game.world.width / 2, game.world.height - 100, 'ball');
    ball.anchor.set(0.5);
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.velocity.set(300, -300);
    ball.body.bounce.set(1);

    */

    
    
    // Création du pad
    pad = game.add.sprite(game.world.width / 2, game.world.height - 5, 'ball');
    pad.scale.setTo(0.2,0.2);
    pad.anchor.set(0.5, 0,5);
    game.physics.arcade.enable(pad);
    pad.body.immovable = true;
    pad.body.collideWorldBounds = true;
    // La balle peut sortir en bas de l'écran
  /**   game.physics.arcade.checkCollision.down = false;
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(function(){
      //  window.alert('Game over!');
       // window.location.reload();
    }, this);
*/
    // Timing
    timerText = game.add.text(5, 5, 'Temps: 0.0s', { font: '18px Arial', fill: '#ffff00' });
    setInterval(() => timer += 100, 100);
}

function update() {
   

    //console.log(PNJGroup);
    PNJGroup.forEach(item => {
       //console.log(item.position.y);
       if(item.position.y > window.innerHeight){

        item.position.y = 0;
        //item.body.velocity.y += 1;

       }

      // game.physics.arcade.collide(item, collisionHandler, null, this);
        
    });
    
    
    let graphics = null;
    //PNJGroup.angle += 1;
   // pad.angle +=50;
    //ball.angle += 10;
    
  //  game.physics.arcade.collide(ball, PNJGroup, ballHitBrick);
    
   // game.physics.arcade.collide(ball, pad, ballHitPad);
    
    if (LEAP.connected === true){

    pad.x  =  LEAP.position.x ;
    pad.y  = LEAP.position.y ; 
    pad.radius = LEAP.position.radius;
   
    
    
    graphics = game.add.graphics();
   
   // graphics.clear(); 
    
}

   
        

   // else pad.x = game.input.x;
    timerText.setText('Temps: ' + (timer / 1000).toFixed(1) + 's');

  
   

    
   
}


function checkBounds(PNJGroup) {

    if (PNJGroup.y > 500)
    {
        PNJGroup.kill();
    }

}

function render() {

}

function ballHitBrick(ball, brick) {
    brick.kill();

    const remainingBalls = PNJGroup.children.reduce((total, brick) => brick.alive ? total + 1 : total, 0);
    if (remainingBalls === 0) {
        window.alert('Bravo!\nVous avez complété le jeu en '+ (timer / 1000).toFixed(1) +' secondes !');
        window.location.reload();
    }
}

function ballHitPad(ball, pad) {
    ball.body.velocity.x = -1 * 5 * (pad.x - ball.x);
}

