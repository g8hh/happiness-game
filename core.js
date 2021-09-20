var blocked = false;
var speed = 1;
var g = (x => document.getElementById(x));

let player = {
	serotonin: new Decimal(0),
	dopamine: new Decimal(0),
	happiness: new Decimal(0),

	lastUpdate: Date.now(),
};

let Serotonin = {
	amount() {
		return player.serotonin;
	},
	addAmount(n) {
		player.serotonin = player.serotonin.plus(n);
	},
	gain(diff) {
		this.addAmount(this.gainAmount().times(diff/1000));
	},
	gainAmount() {
		return new Decimal(1);
	},
};

let Dopamine = {
	gain() {

	},
};

let Happiness = {
	gain() {

	},
};

let gameLoop = function(){
	if(blocked) return;

	let now = Date.now();
	let diff = now - player.lastUpdate;
	player.lastUpdate = now;

	update();

	Serotonin.gain(diff);
};

let update = function(){
	g("e1").innerText = player.serotonin.format(true);
	g("e2").innerText = player.dopamine.format(true);
	g("e3").innerText = player.happiness.format(true);
	g("e4").innerText = player.serotonin.format(true);
	g("e5").innerText = Serotonin.gainAmount().format(true);
};

setInterval(gameLoop, 64);