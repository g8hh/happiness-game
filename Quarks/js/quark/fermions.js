let Fermions = {
	amount() {
		return player.fermions;
	},
	multiplier() {
		return this.amount().max(1);
	},
	addAmount(x) {
		player.fermions = player.fermions.plus(x);
	},
	setAmount(x) {
		player.fermions = new Decimal(0);
	},
	canGain() {
		if(Quarks.atLimit()) return false;
		return Quarks.bestAmount.gte(this.requirement());
	},
	requirement() {
		return Decimal.pow(2, Math.max(128, 96 + 16 * Decimal.log2(this.amount())))
	},
	text() {
		if(Quarks.atLimit()) return 'the universe to have not collapsed';
		return "atleast " + this.requirement().format(true) + " quarks";
	},
	extraText() {
		return this.amount().eq(0) ? '' : 'more';
	},
	totalGain() {
		return Decimal.pow(2, (player.bestQuarks.log2() - 96) / 16)
	},
	newGain() {
		return this.totalGain().minus(this.amount());
	},
	multGain() {
		return this.amount().eq(0) ? this.newGain() : this.totalGain().div(this.amount());
	},
	gain() {
		if(!this.canGain()) return;
		this.addAmount(this.newGain());
		quarkGenerators.fermionic();
		player.progress.fermionic = true;
		player.stats.timeInFermionic = 0;
		player.stats.timeInBaryonic = 0;
		Achievements.giveAchievement(13);
	},
};
