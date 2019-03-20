const game = new Phaser.Game(
    800,
    window.innerHeight,
    Phaser.AUTO,
    'game-root',
);

game.state.add('terrain', Terrain);
game.state.add('qte', QTE);

game.state.start('terrain');