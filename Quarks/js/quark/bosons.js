let Bosons = {
	initialCost() {
		return Decimal.pow(2, Math.pow(2,6));
	},
	bought() {
		return player.bosons;
	},
	addBought(n) {
		player.bosons += n;
	},
	setAmount(n) {
		player.bosons = n;
	},
	costPower() {
		return 2;
	},
	costStart() {
		return 4;
	},
	costSkip() {
		return 2;
	},
	costSlowdown() {
		return 1;
	},
	costForOne(n) {
		return Decimal.pow(2, this.costSlowdown() * Math.pow(this.costSkip() * (this.bought() + this.costStart() + n - 1), this.costPower()));
	},
	costFor(n) {
	    let m = n;
	    let totalCost = new Decimal(0);
	    while (m > 0) {
	    	let newTotalCost = totalCost.plus(this.costForOne(m));
	      	if (totalCost.eq(newTotalCost)) {
	        	break;
	      	}
	      	totalCost = newTotalCost;
	      	m--;
	    }
	    return totalCost;
  	},
  	cost() {
  		return this.costFor(1);
  	},
  	maxBuyable() {
  		return Math.max(Math.floor(Math.pow(Quarks.amount.max(1).log(2) / this.costSlowdown(), 1 / this.costPower()) / this.costSkip() - this.costStart() + 1) - this.bought(), 1);
  	},
  	canBuy(n) {
  		n = (n===undefined) ? 1 : n;
		if(Quarks.atLimit()) return false;
  		return Quarks.amount.gte(this.costFor(n));
  	},
  	buy(n) {
  		if(!this.canBuy(n)) return;
  		if(Quarks.atLimit()) return;
  		Quarks.minus(this.costFor(n));
  		player.bosons += n;

  		player.stats.totalBosons += n;
  		player.progress.bosonic = true;
  		Achievements.giveAchievement(9);
  	},
  	buyMax() {
  		this.buy(this.maxBuyable());
  	},
  	multiplier() {
  		return Decimal.pow(this.multPer(), this.bought());
  	},
  	multPer() {
  		return new Decimal(2);
  	},
};
