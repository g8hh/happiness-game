let Achievements = {
	criteria: [
			() => (quarkGenerator(1).bought()>0), () => (quarkGenerator(2).bought()>0),
			() => (quarkGenerator(3).bought()>0), () => (quarkGenerator(4).bought()>0),
			() => (quarkGenerator(5).bought()>0), () => (quarkGenerator(6).bought()>0),
			() => (quarkGenerator(7).bought()>0), () => (quarkGenerator(8).bought()>0),
			() => (Autobuyers.amount()>0), () => (Bosons.bought()>0),
			() => (Baryons.amount().gt(0)), () => (Autobuyers.amount()==9),
			() => (quarkGenerators.achievementCheck()), () => (Fermions.amount().gt(0)),
			() => (quarkGenerators.reversedCheck()), () => (player.progress.protonic),
	],
	names: [
		"First",
		"Doubles",
		"El Treble",
		"4's",
		"High Five",
		"666",
		"Lucky 7",
		"No 9 :(",
		"Automation",
		"Forcemediator",
		"Many Quarks",
		"Idle-quarks",
		"Infinite power",
		"Real mass",
		"Reversed",
		"Atomic!"
	],
	init() {
		g("toggle-ach-mult").innerText = "Achievement reward: " + (player.options.achievementmult ? 'Active' : 'Inactive'); 
		g("toggle-ach-visibility").innerText = "Show all achievements: " + (player.options.achievementvisibility ? 'On' : 'Off');
		updateOccasional();
	},
	giveAchievement(x) {
		if(!this.criteria[x]()) return;
		if(this.has(x)) return;
		player.achievements[x] = true;
		Notifications.createNotification('Achievement unlocked: ' + this.names[x]);
		updateOccasional();
	},
	has(x) {
		return player.achievements[x];
	},
	getName(i) {
		return this.isVisible(i) ? this.names[i] : '???'
	},
	isVisible(i) {
		if(player.options.achievementvisibility) return true
		if(this.has(i)) return true
		if(i==0 || i==1) return true
		if(this.has(i-2) || this.has(i-1)) return true
		if(this.highestUnlocked()>i) return true
		return false
	},
	totalUnlocked() {
		return player.achievements.filter((x) => (x==true)).length;
	},
	multiplier() {
		return (player.options.achievementmult ? Decimal.pow(2, this.totalUnlocked()/16) : new Decimal(1));
	},
	highestUnlocked() {
		return player.achievements.lastIndexOf(true);
	},
	toggleMultiplier() {
		player.options.achievementmult = !player.options.achievementmult
		g("toggle-ach-mult").innerText = "Achievement reward: " + (player.options.achievementmult ? 'Active' : 'Inactive'); 
		updateOccasional();
	},
	toggleVisiblity() {
		player.options.achievementvisibility = !player.options.achievementvisibility
		g("toggle-ach-visibility").innerText = "Show all achievements: " + (player.options.achievementvisibility ? 'On' : 'Off');
		updateOccasional();
	},
	checkForAchievements(criteria) {
		if(criteria=="quarkgenerators"){
			for(x=0;x<8;x++){
				this.giveAchievement(x);
			};
			Achievements.giveAchievement(12);
	    	Achievements.giveAchievement(14);
		};
	},
};