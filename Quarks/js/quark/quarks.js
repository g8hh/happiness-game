let Quarks = {
	get amount() {
		return player.quarks;
	},
	get bestAmount() {
		return player.bestQuarks;
	},
	set amount(x) {
		player.quarks = new Decimal(x);
	},
	set bestAmount(x) {
		player.bestQuarks = new Decimal(x);
	},
	add(x) {
		player.quarks = player.quarks.plus(x).min(this.limit());
		player.bestQuarks = player.bestQuarks.max(player.quarks).min(this.limit());
		player.stats.totalQuarks = player.stats.totalQuarks.plus(x).min(this.limit());
	},
	minus(x) {
		player.quarks = player.quarks.minus(x);
	},
	limit() {
		return player.fusion ? Decimal.pow(2, Math.pow(2, 16)) : Decimal.pow(2, Math.pow(2, 8));
	},
	atLimit() {
		return this.amount.gte(this.limit());
	},
	init() {
		g("e58").checked = player.options.viewgens;
	},
	toggleViewGens() {
		player.options.viewgens = !player.options.viewgens;
		g("e58").checked = player.options.viewgens;
	},
	cannotSeeGens() {
		return this.atLimit() && !player.options.viewgens;
	},
};