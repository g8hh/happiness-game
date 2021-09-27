let Saving = {
	save() {
		data = btoa(JSON.stringify(player));
		localStorage.setItem('happiness-save', data);
	},
	load() {
		try {
			player = JSON.parse(atob(localStorage.getItem('happiness-save')));
		} catch (e) {
			this.save();
			this.load();
		}
		this.fixDecimals();
		this.doOfflineTime(function() {
			window.setInterval(gameLoop, 64);
			window.setInterval(function() { Saving.save() }, 10000);
			update();
			g("body").style.display = "block";
			blocked = false;
			return;
		});
	},
	reset() {
		if(confirm("Are you sure?")) {
			localStorage.clear();
			location.reload();
		};
	},
	fixDecimals() {
		player.serotonin = new Decimal(player.serotonin);
		player.dopamine = new Decimal(player.dopamine);
		player.happiness = new Decimal(player.happiness);
		player.bestEmotion = new Decimal(player.bestEmotion) || new Decimal(0);
		player.experiences = new Decimal(player.experiences) || new Decimal(0);

		player.upgrades = player.upgrades || [0, 0, 0, 0, 0, 0, 0];
		player.experienceupgrade = player.experienceupgrade || [0,0,0];

		player.stats.timeInExperience = player.stats.timeInExperience || 0;

		player.tab = player.tab || 0;
	},
	doOfflineTime(callback) {
		let now = Date.now();
		offlineTime = (now - player.lastUpdate)/1000;
		if (offlineTime < 120) {
			callback();
			return;
		}

		console.info("Offline time: " + offlineTime + " seconds");

		let ticks = 2048;
		let tick = 0;
		let tickLength = offlineTime / ticks;

		while (tick <= ticks) {
			tick++;
			offlineLoop(tickLength);
		};

		if(tick >= ticks) {
			callback();
		};
	},
};