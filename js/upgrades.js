let Upgrade = function (i) {
	if(defined.upgrade) {
		return Upgrades.get(i);
	}
	return {
		baseCost() {
			return [
				new Decimal(10), new Decimal(20), new Decimal(30), 
				new Decimal(200), new Decimal(200), 
				new Decimal(1e3), new Decimal(1e3),
			][i];
		},
		costIncrease() {
			return [
				new Decimal(15), new Decimal(10), new Decimal(30), 
				new Decimal(150), new Decimal(150), 
				new Decimal(1e3), new Decimal(1e3),
			][i];
		},
		level() {
			return player.upgrades[i];
		},
		setlevel(x) {
			player.upgrades[i] = x;
		},
		cost() {
			return this.baseCost().plus(this.costIncrease().times(this.level()));
		},
		getCurrency() {
			return [
				Happiness, Serotonin, Dopamine, 
				Happiness, Happiness, 
				Serotonin, Dopamine
			][i];
		},
		baseEffect() {
			return [
				new Decimal(1), new Decimal(1), new Decimal(1),
				new Decimal(5), new Decimal(10),
				new Decimal(0), new Decimal(0),
			][i];
		},
		effectPer() {
			return [
				new Decimal(1), new Decimal(1), new Decimal(1),
				new Decimal(-0.5), new Decimal(-1),
				new Decimal(10), new Decimal(10),
			][i];
		},
		maxLevel() {
			return [
				ExperienceUpgrade(2).effect(), ExperienceUpgrade(2).effect(), ExperienceUpgrade(2).effect(),
				new Decimal(10), new Decimal(10),
				new Decimal(10), new Decimal(10),
			][i];
		},
		effect() {
			return this.currentEffect();
		},
		currentEffect() {
			return this.baseEffect().plus(this.effectPer().times(this.level()));
		},
		nextEffect() {
			return this.currentEffect().plus(this.effectPer());
		},
		atMaxLevel() {
			return this.maxLevel().eq(this.level());
		},
		buttonText() {
			return "(" + this.level() + " / " + this.maxLevel() + ")";
		},
		canBuy() {
			return this.maxLevel().gt(this.level()) && this.getCurrency().amount().gte(this.cost());
		},
		buy() {
			if(!this.canBuy()) return;
			this.getCurrency().addAmount(this.cost().neg());
			player.upgrades[i] += 1;
		},
	}
};

let Upgrades = {
	list: [...Array(7)].map((_, i) => Upgrade(i)),
	get(i) {
		return this.list[i];
	},
	reset() {
		player.upgrades = [0, 0, 0, 0, 0, 0, 0]
	},
};

let ExperienceUpgrade = function(i) {
	if(defined.experienceUpgrades) {
		return ExperienceUpgrades.get(i);
	}
	return {
		level() {
			return player.experienceupgrade[i];
		},
		addLevel() {
			player.experienceupgrade[i]++;
		},
		setLevel(n) {
			player.experienceupgrade[i] = n;
		},
		baseCost() {
			return [
				new Decimal(1),
				new Decimal(1),
				new Decimal(2),
			][i];
		},
		costIncrease() {
			return [
				new Decimal(2),
				new Decimal(2),
				new Decimal(1.5),
			][i];
		},
		cost() {
			return this.baseCost().times(this.costIncrease().pow(this.level()));
		},
		baseEffect() {
			return [
				new Decimal(1),
				new Decimal(1),
				new Decimal(10),
			][i];
		},
		effectPer() {
			return [
				new Decimal(0.250),
				new Decimal(0.125),
				new Decimal(1),
			][i];
		},
		effect() {
			return this.baseEffect().plus(this.effectPer().times(this.level()));
		},
		nextEffect() {
			return this.baseEffect().plus(this.effectPer().times(this.level()+1));
		},
		canBuy() {
			return Experiences.amount().gte(this.cost());
		},
		buy() {
			if(!this.canBuy()) return;
			Experiences.addAmount(this.cost().neg());
			this.addLevel();
 		},
	};
};

let ExperienceUpgrades = {
	list: [...Array(3)].map((_, i) => ExperienceUpgrade(i)),
	get(i) {
		return this.list[i];
	},
	totalLevel() {
		return player.experienceupgrade.reduce((a,b) => a+b);
	},
	totalLevelMultiplier() {
		return new Decimal(1).plus(this.totalLevel() / 8);
	},
};

defined.upgrade = true;
defined.experienceUpgrades = true;