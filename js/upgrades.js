let Upgrade = function (i) {
	return {
		baseCost() {
			return [5, 20, 50][i];
		},
		costIncrease() {
			return [10, 20, 25][i];
		},
		level() {
			return player.upgrades[i];
		},
		cost() {
			return this.baseCost() + (this.costIncrease() * this.level());
		},
		getCurrency() {
			currency = ['h', 's', 'd'][i];
			if (currency == 'h') {
				return Happiness;
			} else if (currency == 's') {
				return Serotonin;
			} else if (currency == 'd') {
				return Dopamine;
			};
		},
		baseEffect() {
			return [1,1,1][i];
		},
		effectPer() {
			return [1,1,1][i];
		},
		currentEffect() {
			return this.baseEffect() + (this.effectPer() * this.level());
		},
		nextEffect() {
			return this.currentEffect() + this.effectPer();
		},
		maxLevel() {
			return [10,10,10][i];
		},
		atMaxLevel() {
			return this.level() == this.maxLevel();
		},
		buttonText() {
			return "(" + this.level() + " / " + this.maxLevel() + ")";
		},
		canBuy() {
			return this.level()<this.maxLevel() && this.getCurrency().amount()>=this.cost();
		},
		buy() {
			if(!this.canBuy()) return;
			this.getCurrency().addAmount(-1 * this.cost());
			player.upgrades[i] += 1;
		},
	}
};

