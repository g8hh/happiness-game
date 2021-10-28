let Saving = {
	save(manual) {
		let save_data = btoa(JSON.stringify(player));
		localStorage.setItem("quarks-save", save_data);
		if (manual) {
			g("save-btn").innerText = "Saved!";
			window.setTimeout(this.saveBtnReset, 1000);
		}
	},
	saveBtnReset() {
		g("save-btn").innerText = "Save";
	},
	load() {
		if (localStorage.getItem("quarks-save") === null) this.save();
		let save_data = JSON.parse(atob(localStorage.getItem("quarks-save")));
		player = save_data;
		this.fixDecimals();
		this.doOfflineTime();
	},
	loadFromFile(x) {
		if(x===null) return;
		try {
			let save_data = JSON.parse(atob(x));
			player = save_data;
			this.fixDecimals();
			this.doOfflineTime();
		} catch(e) {
			alert("Save not valid!");
		};
	},
	export() {
		prompt("Copy + paste this save to elsewhere for safekeeping:", localStorage.getItem('quarks-save'));
	},
	reset() {
		if(!confirm("Are you sure?")) return
		localStorage.clear();
		location.reload();
	},
	fixDecimals() {
		player.quarks = new Decimal(player.quarks);
		player.bestQuarks = new Decimal(player.bestQuarks);
		player.quarkGenerators = [...Array(8)].map((_, i) => ({amount: new Decimal(player.quarkGenerators[i].amount), bought: player.quarkGenerators[i].bought}));
		player.baryons = new Decimal(player.baryons);
		player.fermions = new Decimal(player.fermions);
		player.protons = new Decimal(player.protons);
		player.neutrons = new Decimal(player.neutrons);
		player.bestProtons = new Decimal(player.bestProtons);
		player.totalProtons = new Decimal(player.totalProtons);
		player.neutronGenerators = [...Array(8)].map((_, i) => ({amount: new Decimal(player.neutronGenerators[i].amount), bought: player.neutronGenerators[i].bought}));
		player.stats.totalQuarks = new Decimal(player.stats.totalQuarks);
	},
	doOfflineTime() {
		let offlineTime = Math.min((Date.now() - player.lastUpdate)/1000, 24*60*60);
		if(offlineTime<120) Game.start();

		g("offline").innerText = (timeFormat(offlineTime));

		let ticks = 4096;
		let tickLength = offlineTime/ticks;
		let tick = 0;

		while(tick<=ticks) {
			offlineGameLoop(tickLength);
			g("bar-text").innerText = tick + "/" + ticks + " ticks simulated.";
			g("inner-bar").style.width = ((tick/ticks)*100) + "%";
			tick++;
		}

		player.stats.totalTimeWithOffline += offlineTime;

		if(ticks<tick) Game.start();
	},
};