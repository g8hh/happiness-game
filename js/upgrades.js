let Upgrade = function (i) {
	return {
		baseCost() {
			return [10, 20, 30, 200, 200, 1e3, 1e3][i];
		},
		costIncrease() {
			return [15, 10, 30, 150, 150, 1e3, 1e3][i];
		},
		level() {
			return player.upgrades[i];
		},
		cost() {
			return this.baseCost() + (this.costIncrease() * this.level());
		},
		getCurrency() {
			currency = ['h', 's', 'd', 'h', 'h', 's', 'd'][i];
			if (currency == 'h') {
				return Happiness;
			} else if (currency == 's') {
				return Serotonin;
			} else if (currency == 'd') {
				return Dopamine;
			};
		},
		baseEffect() {
			return [1,1,1,5,10,0,0][i];
		},
		effectPer() {
			return [1,1,1,-0.5,-1,10,10][i];
		},
		maxLevel() {
			return [10,10,10,10,10,10,10][i];
		},
		effect() {
			return this.currentEffect();
		},
		currentEffect() {
			return this.baseEffect() + (this.effectPer() * this.level());
		},
		nextEffect() {
			return this.currentEffect() + this.effectPer();
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

