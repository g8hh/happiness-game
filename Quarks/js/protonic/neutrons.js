let Neutrons = {
	amount() {
		return player.neutrons;
	},
	addAmount(n) {
		player.neutrons = player.neutrons.plus(n);
	},
	setAmount(n) {
		player.neutrons = new Decimal(n);
	},
	effect() {
		return this.amount().pow(protonUpgrade(1).effect());
	},
};