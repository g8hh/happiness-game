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
		return new Decimal(Upgrade(0).currentEffect());
	},
};

let Dopamine = {
	amount() {
		return player.dopamine;
	},
	addAmount(n) {
		player.dopamine = player.dopamine.plus(n);
	},
	produce(diff) {
		this.addAmount(this.gainAmount().times(Upgrade(5).currentEffect()/100).times(diff/1000))
	},
	gain() {
		this.addAmount(this.gainAmount());
	},
	gainAmount() {
		return new Decimal(Upgrade(1).currentEffect());
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
		return new Decimal(Upgrade(2).currentEffect());
	},
	serotoninRequirement() {
		return new Decimal(Upgrade(3).currentEffect());
	},
	dopamineRequirement() {
		return new Decimal(Upgrade(4).currentEffect());
	},
};