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
		setAmount(n) {
			player.neutronGenerators[i-1].amount = new Decimal(n);
		},
		setBought(n) {
			player.neutronGenerators[i-1].bought = n;
		},
		addAmount(n) {
			player.neutronGenerators[i-1].amount = player.neutronGenerators[i-1].amount.plus(n);
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
		maxBuyable(fraction) {
			if (fraction === undefined) fraction = 1;
			let num = Math.floor(Quarks.amount.times(fraction).div(this.cost()).times(Decimal.minus(this.costIncreasePer(), 1)).plus(1).log(this.costIncreasePer()));
			return Math.max(num, 0);
		},
		buyMax() {
			this.buy(this.maxBuyable());
		},
		buy(amount) {
	    	if(amount===undefined) amount=1;
	    	if(amount===0) return;
	    	if(!this.canBuy(amount)) return;
	    	Protons.minus(this.costFor(amount));
	    	this.addAmount(amount);
	    	this.addBought(amount);

	    	player.highestNeutronGenerator = Math.max(player.highestNeutronGenerator, i);
	    },

	    reset() {
	    	this.setAmount(this.bought());
	    },
	};
};

let neutronGenerators = {
	list: [...Array(8)].map((_, i) => neutronGenerator(i+1)),
	get(i) {
		return this.list[i-1];
	},
	produce(diff) {
		Neutrons.addAmount(neutronGenerator(1).perSecond().times(diff));
		for(i=1;i<8;i++){
			neutronGenerator(i).addAmount(neutronGenerator(i+1).perSecond().times(diff));
		};
	},
	reset() {
		this.list.forEach(x => x.reset());
	},
};

defined.neutronGenerator = true;
