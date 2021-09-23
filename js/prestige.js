let Prestige = {
	canSee() {
		return Upgrade(6).level() > 0 && !this.canGain();
	},
	canGain() {
		return Emotion.bestAmount().gte(40);
	},
	gain() {
		return new Decimal(1).plus(Emotion.bestAmount().minus(39).log2());
	},
	amount() {
		return player.experiences;
	},
	newAmount() {
		return this.gain().plus(this.amount());
	},
	timesTotal() {
		return this.amount().eq(0) ? this.gain() : this.amount().div(this.gain());
	},
	perSecond() {
		return this.gain().div(player.stats.timeInExperience);
	},
};