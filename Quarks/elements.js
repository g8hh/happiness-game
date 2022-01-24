let Elements = {
	unlocked() {
		return player.elements.unlocked;
	},
	particlesUnlocked() {
		return player.elements.particlesUnlocked;
	},
	canUnlock() {
		return player.quarks.gte(10);
	},
	unlock() {
		if(!this.canUnlock()) return;
		player.elements.unlocked = true;
		player.quarks = player.quarks.minus(10);
		Achievements.give(0);
	},
	canSeeBtn() {
		return !this.unlocked() && player.quarks.gte(5);
	},
	canSeeParticleBtn() {
		return !this.particlesUnlocked() && elementUpgrades.allBought();
	},
	canUnlockParticles() {
		return this.canSeeParticleBtn() && this.totalElements().gte(this.particleRequirement());
	},
	particleRequirement() {
		return Decimal.pow(2, 16);
	},
	unlockParticles() {
		if(!this.canUnlockParticles()) return;
		player.elements.particlesUnlocked = true;
		Achievements.give(6);
	},
	setAutobuy(value) {
		if(!typeof value === 'bool') return;
		player.elements.elementUpgradeAutobuy = value;
	},
	createElement(type) {
		if(type === 'proton') {
			if(player.quarks.lt(3)) return;
			player.elements.protons = player.elements.protons.plus(this.elementGain('proton'));
			player.stats.totalProtons = player.stats.totalProtons.plus(this.elementGain('proton'));
			player.quarks = player.quarks.minus(3);
		} else if (type === 'neutron') {
			if(player.quarks.lt(3)) return;
			player.elements.neutrons = player.elements.neutrons.plus(this.elementGain('neutron'));
			player.stats.totalNeutrons = player.stats.totalNeutrons.plus(this.elementGain('neutron'));
			player.quarks = player.quarks.minus(3);
		} else if (type === 'electron') {
			if(player.quarks.lt(1)) return;
			player.elements.electrons = player.elements.electrons.plus(this.elementGain('electron'));
			player.stats.totalElectrons = player.stats.totalElectrons.plus(this.elementGain('electron'));
			player.quarks = player.quarks.minus(1);
		} else {
			console.error('Invalid element type: ' + type);
			return;
		}
	},
	multiplier(type) {
		// I included the new Decimal(1) at the start of each factor and powFactor list
		// to ensure a.times(b) works while reducing the lists.
		if(type === 'proton') {
			let factors = [
				new Decimal(1), player.elements.protons.plus(1).log2() / 16 + 1,
				this.multiplier('neutron'), neutronUpgrades.effect(0),
				Hydrogen.multiplier(),
			];
			let powFactors = [
				new Decimal(1),
				protonUpgrades.effect(2),
				neutronUpgrades.effect(1),
			];
			mult = factors.reduce((a,b) => (a.times(b)));
			return mult.pow(powFactors.reduce((a,b) => a.times(b)));
		} else if (type === 'neutron') {
			let factors = [
				new Decimal(1), player.elements.neutrons.plus(1).log2() / 16 + 1,
				Hydrogen.multiplier(),
			];
			let powFactors = [
				new Decimal(1),
				neutronUpgrades.effect(1),
			];
			mult = factors.reduce((a,b) => (a.times(b)));
			return mult.pow(powFactors.reduce((a,b) => a.times(b)));
		} else if(type === 'electron') {
			let factors = [
				new Decimal(1), player.elements.electrons.plus(1).log2() / 16 + 1,
				this.multiplier('neutron'), neutronUpgrades.effect(1), electronUpgrades.effect(0),
				Hydrogen.multiplier(),
			];
			let powFactors = [
				new Decimal(1),
				neutronUpgrades.effect(1),
			];
			mult = factors.reduce((a,b) => (a.times(b)));
			return mult.pow(powFactors.reduce((a,b) => a.times(b)));
		}
	},
	elementGain(type) {
		if(type === 'electron') {
			let factors = [
				Achievements.multiplier(),
				neutronUpgrades.effect(2),
				electronUpgrades.effect(2)(),
				hydrogenUpgrade(0).effect(),
			];
			return factors.reduce((a,b) => (a.times(b)));
		} else {
			let factors = [
				Achievements.multiplier(),
				this.multiplier('electron'),
				neutronUpgrades.effect(2),
				hydrogenUpgrade(0).effect(),
			];
			let powFactors = [
				electronUpgrades.effect(1),
			];
			let mult = factors.reduce((a,b) => a.times(b));
			return mult.pow(powFactors.reduce((a,b) => a.times(b)));
		}
	},
	resetElementCounts() {
		player.elements.protons = new Decimal(0);
		player.elements.neutrons = new Decimal(0);
		player.elements.electrons = new Decimal(0);
	},
	totalElements() {
		return player.elements.protons.plus(player.elements.neutrons).plus(player.elements.electrons);
	},
	quarksPerSecond() {
		let factors = [
			new Decimal(1),
			this.multiplier('proton'),
			protonUpgrades.effect(0),
		];
		let powFactors = [
			protonUpgrades.effect(1),
		];
		mult = factors.reduce((a,b) => (a.times(b)));
		return mult.pow(powFactors.reduce((a,b) => (a.times(b))));
	},
	elementPerSecond(type) {
		switch(type) {
			case 'proton':
				if(!protonUpgrades.has(3)) return new Decimal(0);
				return this.elementGain(type).times(hydrogenUpgrade(2).effect().div(100));
				break;
			case 'neutron':
				if(!neutronUpgrades.has(3)) return new Decimal(0);
				return this.elementGain(type).times(hydrogenUpgrade(2).effect().div(100));
				break;
			case 'electron':
				if(!electronUpgrades.has(3)) return new Decimal(0);
				return this.elementGain(type).times(hydrogenUpgrade(2).effect().div(100));
				break;
		}
	},
	autobuy() {
		if(!hydrogenUpgrade(3).atMaxLevel() || !player.elements.elementUpgradeAutobuy) return;
		elementUpgrades.buyAll();
	},
};

let elementUpgradeCosts = [100, 500, 2500, 10000];

let elementUpgrades = {
	allBought() {
		return protonUpgrade(3).bought() && neutronUpgrade(3).bought() && electronUpgrade(3).bought();
	},
	anyBought() {
		for(i=0;i<4;i++){
			let bought = protonUpgrades.has(i) || neutronUpgrades.has(i) || electronUpgrades.has(i);
			if(bought === true) return bought;
		}
		return false;
	},
	hasPassive(all) {
		if(all) {
			return protonUpgrade(3).bought() && neutronUpgrade(3).bought() && electronUpgrade(3).bought();
		} else {
			return protonUpgrade(3).bought() || neutronUpgrade(3).bought() || electronUpgrade(3).bought();
		}
	},
	reset() {
		let passiveGain = hydrogenUpgrade(4).atMaxLevel();
		let upgradeGain = hydrogenUpgrade(5).atMaxLevel();
		player.elements.protonUpgrades = [upgradeGain,upgradeGain,upgradeGain,passiveGain];
		player.elements.neutronUpgrades = [upgradeGain,upgradeGain,upgradeGain,passiveGain];
		player.elements.electronUpgrades = [upgradeGain,upgradeGain,upgradeGain,passiveGain];
	},
	buyAll() {
		for(i=0;i<4;i++){
			protonUpgrade(i).buy();
			neutronUpgrade(i).buy();
			electronUpgrade(i).buy();
		}
	},
};

let protonUpgrade = function(i) {
	if(Game.defined.protonUpgrade) return protonUpgrades.get(i);
	return {
		bought() {
			return player.elements.protonUpgrades[i];
		},
		canSee() {
			if(i==0 && !this.bought()) return true;
			return !this.bought() && protonUpgrade(i-1).bought();
		},
		canBuy() {
			return player.elements.protons.gte(this.cost()) && !this.bought();
		},
		cost() {
			return elementUpgradeCosts[i];
		},
		buy() {
			if(!this.canBuy()) return;
			player.elements.protons = player.elements.protons.minus(this.cost());
			player.elements.protonUpgrades[i] = true;
			Achievements.give(1);
			Achievements.give(3);
			Achievements.give(5);
		},
	};
};

let protonUpgrades = {
	list: [...Array(4)].map((_,i) => protonUpgrade(i)),
	effects: [2, 1.2, 1.5],
	get(i) {
		return this.list[i];
	},
	has(i) {
		return this.get(i).bought();
	},
	multiplier() {
		factors = [
			new Decimal(1),
			this.has(0) ? 2 : 1,
		];
		powFactors = [
			new Decimal(1),
			this.has(1) ? 1.2 : 1,
		],
		mult = factors.reduce((a,b) => (a.times(b)));
		return mult.pow(powFactors.reduce((a,b) => a.times(b)));
	},
	effect(i) {
		if(!this.has(i)) return 1;
		return this.effects[i];
	},
};

let neutronUpgrade = function(i) {
	if(Game.defined.neutronUpgrade) return neutronUpgrades.get(i);
	return {
		bought() {
			return player.elements.neutronUpgrades[i];
		},
		canSee() {
			if(i==0 && !this.bought()) return true;
			return !this.bought() && neutronUpgrade(i-1).bought();
		},
		canBuy() {
			return player.elements.neutrons.gte(this.cost()) && !this.bought();;
		},
		cost() {
			return elementUpgradeCosts[i];
		},
		buy() {
			if(!this.canBuy()) return;
			player.elements.neutrons = player.elements.neutrons.minus(this.cost());
			player.elements.neutronUpgrades[i] = true;
			Achievements.give(1);
			Achievements.give(3);
			Achievements.give(5);
		},
	};
};

let neutronUpgrades = {
	list: [...Array(4)].map((_,i) => neutronUpgrade(i)),
	effects: [2, 1.05, 2],
	get(i) {
		return this.list[i];
	},
	has(i) {
		return this.get(i).bought();
	},
	effect(i) {
		if(!this.has(i)) return 1;
		return this.effects[i];
	},
};

let electronUpgrade = function(i) {
	if(Game.defined.electronUpgrade) return electronUpgrades.get(i);
	return {
		bought() {
			return player.elements.electronUpgrades[i];
		},
		canSee() {
			if(i==0 && !this.bought()) return true;
			return !this.bought() && electronUpgrade(i-1).bought();
		},
		canBuy() {
			return player.elements.electrons.gte(this.cost()) && !this.bought();;
		},
		cost() {
			return elementUpgradeCosts[i];
		},
		buy() {
			if(!this.canBuy()) return;
			player.elements.electrons = player.elements.electrons.minus(this.cost());
			player.elements.electronUpgrades[i] = true;
			Achievements.give(1);
			Achievements.give(3);
			Achievements.give(5);
		},
	};
};

let electronUpgrades = {
	list: [...Array(4)].map((_,i) => electronUpgrade(i)),
	effects: [2, 1.1, () => (Elements.multiplier('electron'))],
	get(i) {
		return this.list[i];
	},
	has(i) {
		return this.get(i).bought();
	},
	effect(i) {
		if(!this.has(i)) return (i===2) ? () => (1) : 1;
		return this.effects[i];
	},
};


Game.defined.protonUpgrade = true;
Game.defined.neutronUpgrade = true;
Game.defined.electronUpgrade = true;

let Hydrogen = {
	amount() {
		return player.elements.hydrogen;
	},
	perSecond() {
		if(!hydrogenUpgrade(6).atMaxLevel()) return new Decimal(0);
		return this.gainAmount().times(0.1);
	},
	gain() {
		if(!this.canGain()) return;
		player.elements.hydrogen = player.elements.hydrogen.add(this.gainAmount());
		player.stats.totalHydrogen = player.stats.totalHydrogen.add(this.gainAmount());
		Elements.resetElementCounts();
		elementUpgrades.reset();
		player.quarks = new Decimal(0);
		Achievements.give(7);
		Achievements.give(9);
	},
	canGain() {
		return Elements.particlesUnlocked() && elementUpgrades.allBought();
	},
	gainAmount() {
		return Decimal.times(Decimal.pow(Elements.totalElements().max(1).log2() / 8, 0.5), hydrogenUpgrade(1).effect());
	},
	gainMultiplier() {
		return Decimal.div(this.gainAmount(), this.amount().eq(0) ? 1 : this.amount());
	},
	multiplier() {
		return this.amount().plus(1).log2() + 1;
	},
};

let hydrogenUpgrade = function(i) {
	if(Game.defined.hydrogenUpgrade) return hydrogenUpgrades.get(i);
	return {
		bought() {
			return player.elements.hydrogenUpgrades[i];
		},
		visible() {
			// Only for hydrogen upgrade 4, 5, and 6
			if(![4,5,6].includes(i)) return;
			return hydrogenUpgrade(i-1).atMaxLevel() && !this.bought();
		},
		maxLevel() {
			return [Infinity, Infinity, 9, 1, 1, 1, 1][i];
		},
		atMaxLevel() {
			return this.bought() === this.maxLevel();
		},
		baseCost() {
			return [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(10),new Decimal(25),Decimal.pow(2,14),Decimal.pow(2,16)][i];
		},
		costIncrease() {
			return [new Decimal(2),new Decimal(4),new Decimal(4),new Decimal(10),new Decimal(10),new Decimal(10),new Decimal(10)][i];
		},
		cost() {
			return this.baseCost().times(this.costIncrease().pow(this.bought()));
		},
		costFor(n) {
			return this.cost().times(this.costIncrease().pow(n).minus(1)).div(this.costIncrease().minus(1));
		},
		maxBuyable() {
			return Math.min(Math.floor(Decimal.log(player.elements.hydrogen.times(this.costIncrease().minus(1)).div(this.cost()).plus(1),this.costIncrease())),this.maxLevel()-this.bought());
		},
		canBuy(n) {
			return player.elements.hydrogen.gte(this.costFor(n)) && this.bought()+n <= this.maxLevel();
		},
		buy(n) {
			if(!this.canBuy(n)) return;
			player.elements.hydrogen = player.elements.hydrogen.sub(this.costFor(n));
			player.elements.hydrogenUpgrades[i]+=n;
			Achievements.give(7);
		},
		buyMax() {
			this.buy(this.maxBuyable());
		},
		baseEffect() {
			return [new Decimal(1), new Decimal(1), new Decimal(10), 1, 1, 1, 1][i];
		},
		effectPerLevel() {
			return [new Decimal(0.5), new Decimal(1), new Decimal(10), 1, 1, 1, 1][i];
		},
		effect() {
			return this.baseEffect().plus(this.effectPerLevel().times(this.bought()));
		},
		nextEffect() {
			return this.effect().plus(this.effectPerLevel());
		},
	}
};

let hydrogenUpgrades = {
	list: [...Array(7)].map((_,i) => hydrogenUpgrade(i)),
	get(i) {
		return this.list[i];
	},
};

Game.defined.hydrogenUpgrade = true;