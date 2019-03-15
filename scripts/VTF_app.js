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
let bricksGroup;
let timerText, timer = 0;

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = true;
    // game.stage.backgroundColor = '#eee';
};

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Création du groupe de briques
    bricksGroup = game.add.physicsGroup();

    // Génération des briques
    for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 10; x++) {
            let sprite = new Phaser.Sprite(game, x * 100 + (game.world.width - 1000) / 2, y * 33, 'brick_' + (x % 10 + 1));
            // sprite.scale.setTo(0.2604, 0.2604); 
            bricksGroup.add(sprite);
        }
    }
    bricksGroup.forEach(item => {
        item.body.immovable = true;
    });

    // Création de la balle
    ball = game.add.sprite(game.world.width / 2, game.world.height - 100, 'ball');
    ball.anchor.set(0.5);
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.velocity.set(300, -300);
    ball.body.bounce.set(1);

    ball_2 = game.add.sprite(game.world.width / 2, game.world.height , 'ball');
    ball_2.anchor.set(0.5);
    game.physics.arcade.enable(ball_2);
    ball_2.body.collideWorldBounds = true;
    ball_2.body.velocity.set(300, -300);
    ball_2.body.bounce.set(1.05);
    
    // Création du pad
    pad = game.add.sprite(game.world.width / 2, game.world.height - 5, 'pad');
    pad.anchor.set(0.5, 1);
    game.physics.arcade.enable(pad);
    pad.body.immovable = true;

    // La balle peut sortir en bas de l'écran
    game.physics.arcade.checkCollision.down = false;
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(function(){
        window.alert('Game over!');
        window.location.reload();
    }, this);

    // Timing
    timerText = game.add.text(5, 5, 'Temps: 0.0s', { font: '18px Arial', fill: '#ffff00' });
    setInterval(() => timer += 100, 100);
}

function update() {
    game.physics.arcade.collide(ball, bricksGroup, ballHitBrick);
    game.physics.arcade.collide(ball_2, bricksGroup, ballHitBrick);
    game.physics.arcade.collide(ball, pad, ballHitPad);
    game.physics.arcade.collide(ball_2, pad, ballHitPad);

    
    if (LEAP.connected === true) pad.x  =  LEAP.position.x ;
    else pad.x = game.input.x;
    timerText.setText('Temps: ' + (timer / 1000).toFixed(1) + 's');

   
}

function render() {

}

function ballHitBrick(ball, brick) {
    brick.kill();

    const remainingBalls = bricksGroup.children.reduce((total, brick) => brick.alive ? total + 1 : total, 0);
    if (remainingBalls === 0) {
        window.alert('Bravo!\nVous avez complété le jeu en '+ (timer / 1000).toFixed(1) +' secondes !');
        window.location.reload();
    }
}

function ballHitPad(ball, pad) {
    ball.body.velocity.x = -1 * 5 * (pad.x - ball.x);
}

function renderCircle(frame, gesture) {
    const centerPosition = get2dCoords(gesture.center, frame, canvas);
    const radius         = gesture.radius;

    context.strokeStyle  = 'pink';
    context.lineWidth    = 3;
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, radius, 0, Math.PI * 2);
    context.stroke();
    context.closePath();

}
