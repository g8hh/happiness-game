let Saving = {
	save() {
		data = btoa(JSON.stringify(player));
		localStorage.setItem('happiness-save', data);
	},
	load() {
		try {
			player = JSON.parse(atob(localStorage.getItem('happiness-save')));
		} catch (e) {
			return;
		}
		this.fixDecimals();
		this.doOfflineTime(function() {
			window.setInterval(gameLoop, 64);
			window.setInterval(function() { Saving.save() }, 10000);
			update();
			g("body").style.display = "block";
			return;
		});
	},
	fixDecimals() {
		player.serotonin = new Decimal(player.serotonin);
		player.dopamine = new Decimal(player.dopamine);
		player.happiness = new Decimal(player.happiness);

		player.tab = player.tab || 0;
	},
	doOfflineTime(callback) {
		let now = Date.now();
		offlineTime = (now - player.lastUpdate)/1000;
		if (offlineTime < 120) callback();

		console.info("Offline time: " + offlineTime + " seconds.");

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