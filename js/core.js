var blocked = false;
var speed = 1;
var g = (x => document.getElementById(x));

let player = {
	serotonin: new Decimal(0),
	dopamine: new Decimal(0),
	happiness: new Decimal(0),

	tab: 0,

	lastUpdate: Date.now(),
};

let gameLoop = function(){
	if(blocked) return;

	let now = Date.now();
	let diff = now - player.lastUpdate;
	player.lastUpdate = now;

	update();

	Serotonin.gain(diff);
};

let offlineLoop = function(diff) {
	Serotonin.gain(diff);
};

window.onload = function() {
	Saving.load();
	Tabs.init();
}