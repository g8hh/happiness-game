let Saving = {
	save() {
		data = btoa(JSON.stringify(player));
		localStorage.setItem('happiness-save', data);
	},
	load() {
		try {
			player = JSON.parse(atob(localStorage.getItem('happiness-save')));
		} catch (e) {
			// just json errors if localStorage object is empty, happens on reset or first load.
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

		player.upgrades = player.upgrades || [0, 0, 0];

		player.tab = player.tab || 0;
		player.theme = player.theme || 'Dark';
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