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
		let factors = [
			Emotion.multiplier(),
			Upgrade(0).currentEffect(),
		]
		return factors.reduce((a,b) => (a.times(b)));
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
		let factors = [
			Emotion.multiplier(),
			Upgrade(1).currentEffect(),
		]
		return factors.reduce((a,b) => (a.times(b)));
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
		return Decimal.min(Dopamine.amount().div(this.dopamineRequirement().max(1)), Serotonin.amount().div(this.serotoninRequirement().max(1))).times(this.gainAmount());
	},
	shouldDisplayProduceable() {
		if (Upgrade(3).atMaxLevel() && Upgrade(4).atMaxLevel()) return false
		if (Upgrade(6).level() == 0) return false
		return true
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
		let factors = [
			Emotion.multiplier(),
			Upgrade(2).currentEffect(),
		]
		return factors.reduce((a,b) => (a.times(b)))
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

let Emotion = {
	amount() {
		let factors = [
			Serotonin.amount().max(1).log2(),
			Dopamine.amount().max(1).log2(),
			Happiness.amount().max(1).log2(),
		];
		return new Decimal(factors.reduce((a,b) => (a+b)));
	},
	bestAmount() {
		return player.bestEmotion;
	},
	multiplier() {
		if(Upgrade(6).level() == 0) return new Decimal(1);
		return new Decimal(1).plus(Emotion.amount().log2()/4);
	},
	updateBest() {
		player.bestEmotion = player.bestEmotion.max(this.amount());
	},
	canSee() {
		return Upgrade(6).level() > 0;
	},
};