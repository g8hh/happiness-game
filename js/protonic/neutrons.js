let Neutrons = {
	amount() {
		return player.neutrons;
	},
	addAmount(n) {
		player.neutrons = player.neutrons.plus(n);
	},
};