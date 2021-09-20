var blocked = false;
var speed = 1;
var g = (x => document.getElementById(x));

let player = {
	serotonin: new Decimal(0),
	dopamine: new Decimal(0),
	happiness: new Decimal(0),

	lastUpdate: Date.now(),
};

let Saving = {
	save() {
		data = btoa(JSON.stringify(player));
		localStorage.setItem('happiness-save', data);
	},
	load() {
		try {
			player = JSON.parse(atob(localStorage.getItem('happiness-save')));
		} catch (e) {
			return;
		}
		this.fixDecimals();
	},
	fixDecimals() {
		player.serotonin = new Decimal(player.serotonin);
		player.dopamine = new Decimal(player.dopamine);
		player.happiness = new Decimal(player.happiness);
	},
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
	amount() {
		return player.dopamine;
	},
	addAmount(n) {
		player.dopamine = player.dopamine.plus(n);
	},
	gain() {
		this.addAmount(this.gainAmount());
	},
	gainAmount() {
		return new Decimal(1);
	},
};

let Happiness = {
	amount() {
		return player.happiness;
	},
	addAmount(n) {
		player.happiness = player.happiness.plus(n);
	},
	gain() {
		if (!this.canGain()) return;
		this.addAmount(this.gainAmount());
		Dopamine.addAmount(this.dopamineRequirement()*-1);
		Serotonin.addAmount(this.serotoninRequirement()*-1);
	},
	canGain() {
		return Dopamine.amount().gte(this.dopamineRequirement()) && Serotonin.amount().gte(this.serotoninRequirement());
	},
	buttonAmount() {
		return this.canGain() ? this.gainAmount() : new Decimal(0);
	},
	gainAmount() {
		return new Decimal(1);
	},
	serotoninRequirement() {
		return 5;
	},
	dopamineRequirement() {
		return 10;
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
	g("e1").innerText = Serotonin.amount().format(true);
	g("e2").innerText = Dopamine.amount().format(true);
	g("e3").innerText = Happiness.amount().format(true);
	g("e4").innerText = Serotonin.amount().format(true);
	g("e5").innerText = Serotonin.gainAmount().format(true);
	g("e6").innerText = Dopamine.amount().format(true);
	g("e7").innerText = Dopamine.gainAmount().format(true);
	g("e8").innerText = Happiness.amount().format(true);
	g("e9").innerText = Happiness.gainAmount().format(true);

	g("e13").innerText = Dopamine.gainAmount().format(true);
	g("e14").innerText = Happiness.buttonAmount().format(true);
	g("e15").style.backgroundColor = Happiness.canGain() ? '#ddd' : '#444';
};

window.onload = function() {
	update();
	Saving.load();
	setInterval(gameLoop, 64);
	setInterval(function() {Saving.save()}, 10000);
}