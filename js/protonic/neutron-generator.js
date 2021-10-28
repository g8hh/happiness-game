let neutronGenerator = function (i) {
	if(defined.neutronGenerator) {
		return neutronGenerators.get(i);		
	};
	return {
		amount() {
			return player.neutronGenerators[i-1].amount;
		},
		bought() {
			return player.neutronGenerators[i-1].bought;
		},
		addAmount(n) {
			player.neutronGenerators[i-1].amount = player.neutronGenerators[i-1].amount.plus(x);
		},
		addBought(n) {
			player.neutronGenerators[i-1].bought += n;
		},
		multiplier() {
			let factors = [
				Decimal.pow(2, this.bought()/8),
				Protons.multiplier(), Achievements.multiplier(),
			];
			return factors.reduce((a, b) => a.times(b));
		},
		baseCost() {
			return Decimal.pow(2, Math.pow(i, 2));
		},
		costIncrease() {
			return Decimal.pow(2, i);
		},
		cost() {
			return this.baseCost().times(this.costIncrease().pow(this.bought()));
		},
		costFor(n) {
			return this.cost().times(Decimal.pow(this.costIncrease(), n).minus(1)).div(Decimal.minus(this.costIncrease(), 1));
		},
		perSecond() {
			return this.multiplier().times(this.amount());
		},
		canBuy(n) {
			n = (n===undefined) ? 1 : n;
			return Protons.amount().gte(this.costFor(n));
		},
	};
};

let neutronGenerators = {
	list: [...Array(8)].map((_, i) => neutronGenerator(i+1)),
	get(i) {
		return this.list[i-1];
	},
};

defined.neutronGenerator = true;