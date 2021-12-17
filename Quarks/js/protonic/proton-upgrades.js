let protonUpgrade = function(i) {
	if(defined.protonUpgrade) {
		return protonUpgrades.get(i);
	}
	return {
		level() {
			return player.protonUpgrades[i-1];
		},
		baseEffect() {
			return [new Decimal(0.5), new Decimal(2), new Decimal(1)][i-1];
		},
		effectPer() {
			return [new Decimal(0.125), new Decimal(0.25), new Decimal(0.5)][i-1];
		},
		effect() {
			return this.baseEffect().plus(this.effectPer().times(this.level()));
		},
		nextEffect() {
			return this.effect().plus(this.effectPer());
		},
		baseCost() {
			return [new Decimal(8), new Decimal(16), new Decimal(32)][i-1];
		},
		costIncrease() {
			return [new Decimal(8), new Decimal(8), new Decimal(16)][i-1];
		},
		canBuy() {
			return Protons.amount().gte(this.cost());
		},
		cost() {
			return this.baseCost().times(this.costIncrease().pow(this.level()));
		},
		maxBuyable() {
			return Math.floor(Protons.amount().div(this.cost()).times(Decimal.minus(this.costIncrease(), 1)).plus(1).log(this.costIncrease()));
		},
		costFor(n) {
			return this.cost().times(Decimal.pow(this.costIncrease(), n).minus(1)).div(Decimal.minus(this.costIncrease(), 1));
		},
		buyMax() {
			this.buy(this.maxBuyable());
		},
		buy(amount) {
			if(amount===undefined) amount=1;
	    	if(amount===0) return;
	    	if(!this.canBuy(amount)) return;
			Protons.minus(this.costFor(amount));
			player.protonUpgrades[i-1] += amount;
		},
	}
};

let protonUpgrades = {
	list: [...Array(3)].map((_, i) => (protonUpgrade(i+1))),
	get(i) {
		return this.list[i-1];
	},
};

defined.protonUpgrade = true;
