let Upgrade = function(i) {
	if(Game.defined.upgrade) return Upgrades.get(i);
	return {
		get level() {
			return player.upgrades[i-1];
		},
		get maxLevel()  {
			return [1,1,1,10,10][i-1];
		},
		get currency() {
			return i === 5 ? player.protons : player.quarks;
		},
		get atMaxLevel() {
			return this.level === this.maxLevel;
		},
		baseCost() {
			return [new Decimal(1), new Decimal(50), new Decimal(250), new Decimal(500), new Decimal(0.25)][i-1];
		},
		costIncrease() {
			return [new Decimal(2), new Decimal(2), new Decimal(2), Decimal.pow(2, 1/2), new Decimal(2)][i-1];
		},
		cost() {
			return this.baseCost().times(this.costIncrease().pow(this.level))
		},
		costFor(n) {
			return this.cost().times(this.costIncrease().pow(n).minus(1)).div(this.costIncrease().minus(1));
		},
		canBuy(n) {
			return this.currency.gte(this.costFor(n)) && this.level+n <= this.maxLevel;
		},
		maxBuyable() {
			let num = Math.floor(Decimal.log(player.quarks.times(this.costIncrease().minus(1)).div(this.cost()).plus(1),this.costIncrease()))
			num = Math.max(Math.min(num, this.maxLevel - this.level), 0);
			return num;
		},
		buy(n) {
			if(!this.canBuy(n)) return;
			if(i !== 5) player.quarks = player.quarks.sub(this.costFor(n));
			if(i === 5) player.protons = player.protons.sub(this.costFor(n));
			player.upgrades[i-1]+=n;
		},
		effect() {
			return Upgrades.effects[i-1](this.level);
		},
		nextEffect() {
			return Upgrades.effects[i-1](this.level+1);
		},
	}
}

let Upgrades = {
	effects: [
		null,null,null,
		(x) => (player.protons.plus(1).times(x).pow(1/2).max(1)),
		(x) => (player.protons.plus(1).log2() * x + 1),
	],
	list: [...Array(5)].map((_,i) => Upgrade(i+1)),
	get(i) {
		return this.list[i-1];
	},
}

Game.defined.upgrade = true;