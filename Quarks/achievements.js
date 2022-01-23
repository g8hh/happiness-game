let Achievements = {
	criteria: [
		() => (player.elements.unlocked), () => (elementUpgrades.anyBought()),
		() => (player.stats.totalQuarks.gte(2**16)), () => (elementUpgrades.hasPassive(false)),
		() => (Elements.quarksPerSecond().gte(100)), () => (elementUpgrades.hasPassive(true)),
		() => (player.elements.particlesUnlocked), () => (player.elements.hydrogen.gt(0)),
		() => (hydrogenUpgrade(4).atMaxLevel()), () => (player.stats.totalHydrogen.gte(2**16)),
	],
	names: [
		'The beginning', 'Getting an upgrade', 'Start of an era', 'This is getting better', 'Real speed',
		'This is getting even better', 'Bye bye Heisenberg', 'Gasseous', 'Realer speed', 'You\'re cool',
	],
	unlocked() {
		return player.achievements.filter((x) => (x===true)).length;
	},
	has(i) {
		return player.achievements[i];
	},
	name(i) {
		return this.names[i];
	},
	visible(i) {
		return player.achievements.lastIndexOf(true)+player.options.viewAchievements >= i; 
	},
	give(i) {
		if(!this.criteria[i]() || this.has(i)) return;
		player.achievements[i] = true;
		if(Options.shouldNotify('achievement')) Notifications.notify('Achievement unlocked: ' + this.name(i));
		this.update();
	},
	multiplier() {
		// Have to return a decimal 1 here because some other factor list relies on the first
		// value being a decimal, which happens to be the achievement multiplier.
		return player.options.achievementMultiplier ? Decimal.pow(2, this.unlocked()/10) : new Decimal(1);
	},

	init() {
		this.container = document.getElementById('achievement-table').children[0];
		this.update();
	},
	update() {
		for(i=0;i<10;i++){
			this.has(i) ? this.container.children[0].children[i].classList.remove('locked') : this.container.children[0].children[i].classList.add('locked')
			this.visible(i) ? this.container.children[0].children[i].classList.remove('invisible') : this.container.children[0].children[i].classList.add('invisible')
			this.container.children[0].children[i].children[0].innerText = this.visible(i) ? this.name(i) : '???';
		}
	},
};