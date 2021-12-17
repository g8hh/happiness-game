let Protons = {
	amount() {
		return player.protons;
	},
	total() {
		return player.totalProtons;
	},
	addAmount(n) {
		player.protons = player.protons.plus(n);
		player.totalProtons = player.totalProtons.plus(n);
		player.bestProtons = player.bestProtons.max(player.protons);
	},
	minus(n) {
		player.protons = player.protons.minus(n);
	},
	setAmount(n) {
		player.protons = new Decimal(n);
	},
	multiplier() {
		return this.total().div(1024).min(1);
	},
};
