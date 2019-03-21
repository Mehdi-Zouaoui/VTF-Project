function Terrain () {
    this.ball        = null;
    this.PNJGroup    = null;
    this.timerText   = 0;
    this.timer       = 0;
    this.counter     = 10;
    this.text        = 0;
    this.terrain     = null;
    this.counterLoop = 0;
    this.currentLevel = 0;
    this.test = 0;
    this.pnj4 = null;
    this.ball = {
        

        circle : null, 
        swipe : null,
        keyTap : null,

    }
    this.nb_occurence = 5;
    this.counter_keyTap = 0;
    this.counter_swipe = 0;
    this.lvl_done= 0;

    this.levels = [
                        [
                            { joueur : 'pnj_1', vitesse : 100, qte : 'circle' },
                        ],
                        [
                            { joueur : 'pnj_1', vitesse : 100, qte : 'circle' },
                            { joueur : 'pnj_2', vitesse : 100, qte : 'keyTap' },
                        ],
                        [
                            { joueur : 'pnj_3', vitesse : 200, qte : 'swipe' },
                        ],
                    ];

    //this.onPausedCallback = function() { console.log('PAUSED')}
}

Terrain.prototype.preload = function() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.load.image('ball', 'asset/img/ball.png');
    this.game.load.image('pnj_1', 'asset/img/pnj_giroud.png');
    this.game.load.image('pnj_2', 'asset/img/pnj_kante.png');
    this.game.load.image('pnj_3', 'asset/img/pnj_koscieny.png');
    this.game.load.image('pnj_4', 'asset/img/pnj_pogba.png');
    this.game.load.image('terrain' , 'asset/img/terrain.png');
}

Terrain.prototype.create = function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0,0, 800, window.innerHeight);
 
    // Création du terrain de jeu
    this.terrain = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'terrain');
    this.terrain.anchor.set(0.5);
    this.terrain.scale.setTo(1 , 0.9);

    // Création du groupe de joueurs
    this.PNJGroup = this.game.add.physicsGroup();
    this.initLevel(this.currentLevel);
    
    // Création du ball
    this.ball = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 5, 'ball');
    this.ball.scale.setTo(0.2,0.2);
    this.ball.anchor.set(0.5, 0,5);
    this.game.physics.arcade.enable(this.ball);
    this.ball.body.immovable = true;
    this.ball.body.collideWorldBounds = true;

    // Timing
    this.timerText = this.game.add.text(50, 5, 'Temps: 0.0s', { font: '18px Arial', fill: '#ffff00' });
    setInterval(() => this.timer += 100, 100);
   
  
    //this.counterLoop.position.x -= 1;
    this.game.state.onPausedCallback = () => {
            
        

        this.text = this.game.add.text(window.innerWidth / 2  - 25, window.innerHeight/2  - 50, 'Counter: 0', { font: "20px Arial", fill: "#ffffff", align: "center" });
        this.text.anchor.setTo(0.5, 0.5);
       
            this.pnj4 = this.game.add.sprite(500, 500, 'pnj_4');
           
            
            this.ball.circle = LEAP.nb_circles;
            this.ball.keyTap = LEAP.keyTap;
            this.ball.swipe  = LEAP.swipe;
            console.log("QTE");
           
    
            
    
            
    
    if (this.ball.circle == this.nb_occurence || this.counter_swipe == this.nb_occurence || this.counter_keyTap == this.nb_occurence){
       
        //this.game.paused = false;
        this.counter_keyTap = 0;
        this.counter_swipe = 0;
    }
    

    LEAP.keyTap = false ;
    LEAP.swipe = false ;
    //this.game.paused = false;
            console.log('circle :' + this.ball.circle);

    
    }
    this.game.state.onPauseUpdateCallback =() =>{
    this.counterLoop = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter.bind(this), this.text);
    this.ball.x = game.input.x;
    this.ball.y = game.input.y;
    this.test += 1;
    if(this.test == 100){
        this.test = 0 ;
        this.hited_pnj.kill();
        this.pnj4.kill();
        this.game.paused = false ;
    }
    
   
    if(this.ball.keyTap == true ){
        this.counter_keyTap += 1;
        
        console.log(this.counter_keyTap);
    }
    if(this.ball.swipe == true ){
        this.counter_swipe += 1;
        console.log(this.counter_swipe);
    }
    console.log(this.test);
    };
    
   
    this.game.state.onResumedCallback = () => {
        console.log('TERRAIN PLAY AGAIN!')
        
    }
}

Terrain.prototype.update = function() {
    // Ecoute des collisions entre la balle et les joueurs
    this.game.physics.arcade.collide(this.ball, this.PNJGroup, this.ballHitPNJ.bind(this));

    // Ecoute si un joueur atteint le bas de l'écran ==> le visiteur perd un point
    this.PNJGroup.forEach(item => {
        if (item.position.y + item.height > window.innerHeight) {
            // @todo : faire perdre un point
        }
    });

    // Mise à jour de la position de la balle en fonction du Leap Moption
    if (LEAP.connected === true) {
        this.ball.x      = LEAP.position.x;
        this.ball.y      = LEAP.position.y;
    
        //else this.game.state.start('terrain' , false );
    }
    else this.ball.x = game.input.x;
         this.ball.y = game.input.y;

    // Affichage du timer
    this.timerText.setText('Temps: ' + (this.timer / 1000).toFixed(1) + 's');

    if(this.levels[this.lvl_done].length == 0){
        this.lvl_done += 1;
        this.initLevel(this.lvl_done);
    
}
    
}

Terrain.prototype.render = function() {
    // Debug des joueurs
    this.PNJGroup.forEach(item => {
        this.game.debug.body(item);
    });

    // Debug de la balle
    this.game.debug.body(this.ball);
}

Terrain.prototype.initLevel = function(lvl) {
    // Suppression des éléments du groupe
    this.PNJGroup.forEach(item => {
        item.body = null;
        item.kill();
    });

    // Création des joueurs de ce niveau dans le groupe
    for (let x = 0; x < this.levels[lvl].length; x++) {
        let sprite = new Phaser.Sprite(this.game, Math.random() * this.game.world.width, -150, this.levels[lvl][x].joueur);
        sprite.scale.setTo(0.7,0.7);
        this.PNJGroup.add(sprite);
        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.velocity.y = this.levels[lvl][x].vitesse;
        sprite.body.movable = true;
        sprite.qte = this.levels[lvl][x].qte;
    }
}

Terrain.prototype.updateCounter = function() {
    this.counter--;
    this.text.setText('Counter: ' + this.counter);

    if (this.counter <= 0) {
        this.counter = 0;
        this.game.time.events.remove(this.counterLoop);
        this.text.setText('Counter: 0');
    }
}

Terrain.prototype.ballHitPNJ = function(ball, pnj) {
    // @todo : LANCER UN QTE sur "pnj.qte"

    this.game.paused = true;
    this.hited_pnj = pnj;
    
    return this.hited_pnj;
   // this.game.state.start('qte', true, true, { qte : pnj.qte });
}
