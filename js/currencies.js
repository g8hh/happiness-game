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
	netPerSecond() {
		return this.gainAmount().plus(Happiness.serotoninPerSecond());
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
		this.addAmount(this.produceAmount().times(diff/1000))
	},
	produceAmount() {
		return this.gainAmount().times(Upgrade(5).currentEffect()/100)
	},
	gain() {
		this.addAmount(this.gainAmount());
	},
	gainAmount() {
		return new Decimal(Upgrade(1).currentEffect());
	},
	netPerSecond() {
		return this.produceAmount().plus(Happiness.dopaminePerSecond());
	},
};

let Happiness = {
	amount() {
		return player.happiness;
	},
	addAmount(n) {
		player.happiness = player.happiness.plus(n);
	},
	produce(diff) {
		if (!this.canProduce()) return;
		this.addAmount(this.gainAmount().times(Upgrade(6).effect()/100).times(diff/1000));
		Dopamine.addAmount(this.dopaminePerSecond().times(diff/1000));
		Serotonin.addAmount(this.serotoninPerSecond().times(diff/1000));
	},
	produceable() {
		return Decimal.min(Dopamine.amount().div(this.dopamineRequirement()), Serotonin.amount().div(this.serotoninRequirement())).times(this.gainAmount());
	},
	dopaminePerSecond() {
		return this.dopamineRequirement().times(Upgrade(6).effect()/100).neg()
	},
	serotoninPerSecond() {
		return this.serotoninRequirement().times(Upgrade(6).effect()/100).neg()
	},
	gain() {
		if (!this.canGain()) return;
		this.addAmount(this.gainAmount());
		Dopamine.addAmount(this.dopamineRequirement().neg());
		Serotonin.addAmount(this.serotoninRequirement().neg());
	},
	canGain() {
		return Dopamine.amount().gte(this.dopamineRequirement()) && Serotonin.amount().gte(this.serotoninRequirement());
	},
	canProduce() {
		if(Upgrade(6).level() == 0) return;
		return 	Dopamine.amount().times(Upgrade(6).currentEffect()/100).gte(this.dopamineRequirement().times(Upgrade(6).currentEffect()/100)) &&
				Serotonin.amount().times(Upgrade(6).currentEffect()/100).gte(this.serotoninRequirement().times(Upgrade(6).currentEffect()/100));
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
	netPerSecond() {
		return this.gainAmount().times(Upgrade(6).effect()/100);
	},
};