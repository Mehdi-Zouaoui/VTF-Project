function Game_over(){

    this.start = null;
    this.button = null;
};
Game_over.prototype.preload = function(){

    this.game.load.image('start','asset/img/gameover.png');
}

Game_over.prototype.create = function() {
    
    

    this.button = game.add.button(this.game.world.centerX , this.game.world.centerY, 'start', this.actionOnClick, this, 2, 1, 0);
    this.button.anchor.set(0.5);
    this.button.scale.setTo(1.5,1.5);
 

    this.button.onInputDown.add(this.down, this);
    

    
}
Game_over.prototype.update = function() {
    
   
}
Game_over.prototype.render = function() {

}
Game_over.prototype.down = function (){

    this.game.state.start('terrain');
}