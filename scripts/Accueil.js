function Accueil(){

    this.start = null;
    this.button = null;
};
Accueil.prototype.preload = function(){

    this.game.load.image('start','asset/img/playstart.png');
}

Accueil.prototype.create = function() {
    
    

    this.button = game.add.button(this.game.world.centerX , this.game.world.centerY, 'start', this.actionOnClick, this, 2, 1, 0);
    this.button.anchor.set(0.5);
    this.button.scale.setTo(1.5,1.5);
 

    this.button.onInputDown.add(this.down, this);
    

    
}
Accueil.prototype.update = function() {
    
   
}
Accueil.prototype.render = function() {

}
Accueil.prototype.down = function (){

    this.game.state.start('terrain');
}