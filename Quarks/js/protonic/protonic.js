let Protonic = {
	canSee() {
		return player.progress.fermionic && !this.canGain();
	},
	time() {
		return player.stats.timeInProtonic;
	},
	amount() {
		return player.protonic;
	},
	multiplier() {
		return (this.amount() * 0.5) + 1
	},
	canGain() {
		return this.gain().gt(1);
	},
	requirement() {
		return Decimal.pow(2, Math.pow(2, 8));
	},
	gain() {
		return Decimal.pow(2, player.bestQuarks.log2() / 256).floor();
	},
	newAmount() {
		return Protons.amount().plus(this.gain());
	},
	gainMultiplier() {
		return Protons.amount().max(1).div(this.gain());
	},
	protonsPerSecond() {
		return this.gain().div(this.time()).toNumber().toFixed(3);
	},
	updatePeakProtonsPerSecond() {
		player.stats.peakProtonsPerSecond = Math.max(player.stats.peakProtonsPerSecond, this.protonsPerSecond());
	},
	peakProtonsPerSecond() {
		return player.stats.peakProtonsPerSecond;
	},
	reset() {
		if(!this.canGain()) return;
		Protons.addAmount(this.gain());
		Quarks.amount = new Decimal(2)
		Quarks.bestAmount = new Decimal(2);
		quarkGenerators.protonic();
		Bosons.setAmount(0);
		Baryons.setAmount(0);
		Fermions.setAmount(0);
		Autobuyers.resetSlow();
		Neutrons.setAmount(1);

		player.highestQuarkGenerator = 0;
		player.progress.protonic = true;
		player.protonic += 1;
		player.stats.timeInBaryonic = 0;
		player.stats.timeInFermionic = 0;
		player.stats.timeInProtonic = 0;
		Achievements.giveAchievement(15);
	},
};