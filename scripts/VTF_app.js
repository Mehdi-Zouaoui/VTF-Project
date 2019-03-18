

const game = new Phaser.Game(
    window.innerWidth,
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
    game.load.image('pnj_1', 'asset/img/pnj_giroud.png', 100 ,33);
    game.load.image('pnj_2', 'asset/img/pnj_kante.png');
    game.load.image('pnj_3', 'asset/img/pnj_koscieny.png');
    
};

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    
 

    // Création du groupe de briques
    PNJGroup = game.add.physicsGroup();

    // Génération des briques
    for (let y = 0; y < 1; y++) {
        for (let x = 0; x < 3; x++) {
            let sprite = new Phaser.Sprite(game, x * 100 + (game.world.width - 1000) / 2, y * Math.floor(Math.random() * (game.world.height - 100)) + 10 ,'pnj_' + (x % 10 + 1));
            // sprite.scale.setTo(0.2604, 0.2604); 
            PNJGroup.add(sprite);
        }
    }
    PNJGroup.forEach(item => {
        item.body.immovable = true;
    });

    // Création de la balle
    ball = game.add.sprite(game.world.width / 2, game.world.height - 100, 'ball');
    ball.anchor.set(0.5);
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.velocity.set(300, -300);
    ball.body.bounce.set(1);

    

    
    
    // Création du pad
    pad = game.add.sprite(game.world.width / 2, game.world.height - 5, 'ball');
    pad.scale.setTo(0.5,0.5);
    pad.anchor.set(0.5, 1);
    game.physics.arcade.enable(pad);
    pad.body.immovable = true;

    // La balle peut sortir en bas de l'écran
    game.physics.arcade.checkCollision.down = false;
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(function(){
      //  window.alert('Game over!');
       // window.location.reload();
    }, this);

    // Timing
    timerText = game.add.text(5, 5, 'Temps: 0.0s', { font: '18px Arial', fill: '#ffff00' });
    setInterval(() => timer += 100, 100);
}

function update() {
    
    let graphics = null;

  //  game.physics.arcade.collide(ball, PNJGroup, ballHitBrick);
    
    game.physics.arcade.collide(ball, pad, ballHitPad);
    
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

