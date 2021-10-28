let Baryons = {
	canGain() {
		return (quarkGenerator(8).bought()>0) && Quarks.bestAmount.gte(this.currentReq()) && this.newGain().gt(0);
	},
	amount() {
		return player.baryons;
	},
	addAmount(n) {
		player.baryons = player.baryons.plus(n);
	},
	setAmount(n) {
		player.baryons = new Decimal(n);
	},
	baseReq() {
		return Decimal.pow(2, Math.pow(2, 6));
	},
	currentReq() {
		return Decimal.pow(2, this.amount().times(this.divisor())).max(this.baseReq());
	},
	totalGain() {
		return new Decimal(Quarks.bestAmount.log2()/this.divisor());
	},
	newGain() {
		return this.totalGain().minus(this.amount());
	},
	divisor() {
		return 16;
	},
	gainText() {
		return this.amount().gt(0) ? this.currentReq().format(true) + " quarks" : 'one of Quark Generator 8';
	},
	extraText() {
		return this.amount().gt(0) ? 'more' : '';
	},
	multiplier() {
		return this.amount().gt(0) ? this.amount() : new Decimal(1);
	},
	gainMultiplier() {
		return this.amount().gt(0) ? this.totalGain().div(this.amount()) : this.newGain();
	},
	gain() {
		if(!this.canGain()) return;
		if(Quarks.atLimit()) return;
		this.addAmount(this.newGain());
		quarkGenerators.baryonic();
		Achievements.giveAchievement(10);
		player.stats.timeInBaryonic = 0;
		player.progress.baryonic = true;
 	},
};