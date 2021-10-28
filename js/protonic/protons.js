let Protons = {
	amount() {
		return player.protons;
	},
	total() {
		return player.totalProtons;
	},
	addAmount(n) {
		player.protons = player.protons.plus(n);
	},
	setAmount(n) {
		player.protons = new Decimal(n);
	},
	multiplier() {
		return this.total().div(512).min(1);
	},
};