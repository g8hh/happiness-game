let quarkGenerator = function(i) {
	if(defined.quarkGenerator) {
		return quarkGenerators.get(i);
	};
	return {
		amount() {
			return player.quarkGenerators[i-1].amount;
		},
		setAmount(n) {
			player.quarkGenerators[i-1].amount = new Decimal(n);
		},
		addAmount(n) {
			player.quarkGenerators[i-1].amount = player.quarkGenerators[i-1].amount.plus(n);
		},
		bought() {
			return player.quarkGenerators[i-1].bought;
		},
		setBought(n) {
			player.quarkGenerators[i-1].bought = n;
		},
		addBought(n) {
			 player.quarkGenerators[i-1].bought += n;
		},
		baseCost() {
			return Decimal.pow(2, Math.pow(i, 2));
		},
		costIncreasePer() {
			return Decimal.pow(2, i);
		},
		cost() {
			return this.baseCost().times(this.costIncreasePer().pow(this.bought()));
		},
		multiplier() {
			let factors = [
				Decimal.pow(2, this.bought()/8), 
				Achievements.multiplier(),
				Bosons.multiplier(),
				(i==8) ? Baryons.multiplier() : 1,
				Fermions.multiplier(),
				Protonic.multiplier(),
				Neutrons.effect(),
			];

			return factors.reduce((a,b) => (a.times(b)));
		},
		perSecond() {
			return this.multiplier().times(this.amount());
		},
		canBuy(n) {
			n = (n===undefined) ? 1 : n;
			return Quarks.amount.gte(this.costFor(n)) && !Quarks.atLimit();
		},
		costFor(n) {
			return this.cost().times(Decimal.pow(this.costIncreasePer(), n).minus(1)).div(Decimal.minus(this.costIncreasePer(), 1));
		},
		maxBuyable(fraction) {
	      	if (fraction === undefined) { fraction = 1; }
	      	let num = Math.floor(Quarks.amount.times(fraction).div(this.cost()).times(Decimal.minus(this.costIncreasePer(), 1)).plus(1).log(this.costIncreasePer()));
	      	return Math.max(num, 0); 
	    },
	    buy(amount) {
	    	if(amount===undefined) amount=1;
	    	if(amount===0) return;
	    	if(!this.canBuy(amount)) return;
	    	Quarks.minus(this.costFor(amount));
	    	this.addAmount(amount);
	    	this.addBought(amount);

	    	Achievements.checkForAchievements("quarkgenerators");
	    	player.highestQuarkGenerator = Math.max(player.highestQuarkGenerator, i);
	    },
	    buyMax() {
	    	this.buy(this.maxBuyable());
	    },
	    reset() {
	    	this.setAmount(0);
	    	this.setBought(0);
	    },
	};
};

let quarkGenerators = {
	list: [...Array(8)].map((_, i) => quarkGenerator(i+1)),
	get(i) {
		return this.list[i-1];
	},
	maxAll() {
		for(i=8;i>0;i--) {
			quarkGenerator(i).buy(quarkGenerator(i).maxBuyable(1));
		};
	},
	buySingle() {
		for(i=1;i<9;i++) {
			quarkGenerator(i).buy(1);
		}
	},
	anyBuyable() {
		return this.list.some(x => x.canBuy());
	},
	baryonic() {
		this.list.forEach(x => x.setAmount(x.bought()));
	},
	fermionic() {
		Quarks.amount = new Decimal(2)
		Quarks.bestAmount = new Decimal(2)
		this.list.forEach(x => x.reset());
		player.highestQuarkGenerator = 0;
		Baryons.setAmount(0);
		Bosons.setAmount(0);
	},
	protonic() {
		this.list.forEach(x => x.reset());
	},
	produce(diff) {
		if(Quarks.atLimit()) return;
 		Quarks.add(quarkGenerator(1).perSecond().times(diff));
		for(i=1;i<8;i++){
			quarkGenerator(i).addAmount(quarkGenerator(i+1).perSecond().times(diff));
		};
	},
	achievementCheck() {
		return this.list.filter(x => (x.multiplier().gte(2**10))).length > 7;
	},
	reversedCheck() {
		list = [...Array(8)].map((_, i) => (this.list[i].multiplier())).reverse();
		return [...Array(8)].map((_, i) => i).every(i => list[i].gt(list[i+1]));
	},
};


defined.quarkGenerator = true;