function QTE () {
    this.pnj4 = null;
}

QTE.prototype.init = function(data) {
    this.qte = data.qte;
}

QTE.prototype.preload = function() {
    this.game.load.image('pnj_4', 'asset/img/pnj_pogba.png');
}
QTE.prototype.create = function() {
    this.pnj4 = this.game.add.sprite(500, 500, 'pnj_4');
}
QTE.prototype.update = function() {

}
QTE.prototype.render = function() {

}