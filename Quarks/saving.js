let offlineSimulation = {
	active: false,
	tick: 0,
	ticks: 0,
	tickLength: 0,
	time: 0,
};

let Saving = {
	save(manual) {
		let data = btoa(JSON.stringify(player));
		localStorage.setItem("quark-save", data);
		if(Options.shouldNotify('save', manual)) Notifications.notify("Game saved!");
	},
	load(manual) {
		if(manual) {
			try {
				let data = prompt("Enter your save here:");
				if(data === null || data === '') return;
				player = JSON.parse(atob(data));
				this.fixSave();
				this.simulateTime();
				Notifications.notify("Save loaded!");
			} catch(e) {
				alert("Invalid save! (failed to decode)");
				return;
			}
		}
		if(!this.doesSaveExist()) {
			Game.start();
		} else {
			let data = JSON.parse(atob(localStorage.getItem("quark-save")));
			player = data;
			this.fixSave();
			offlineTime = (Date.now() - player.lastUpdate)/1e3;
			if(offlineTime < 120) {
				Game.start();
				return;
			};
			Options.init();
			this.simulateTime(offlineTime,true, () => (Game.start()));
		}
	},
	async export() {
		let data = localStorage.getItem('quark-save');
		try {
			await navigator.clipboard.writeText(data);
			Notifications.notify('Save copied to clipboard');
		} catch(err) {
			alert('Failed to copy: ' + err);
		}
	},
	reset() {
		if(!confirm("Are you sure?")) return;
		this.save = '';
		localStorage.clear();
		window.location.reload();
	},
	simulateTime(time,showSimulation,callback) {
		if(time === undefined) {
			time = (Date.now() - player.lastUpdate)/1e3;
		}
		if(callback === undefined) {
			callback = () => (true);
		}
		if(showSimulation === undefined) {
			showSimulation = true;
		}
		if(!player.options.simulateTime) {
			callback();
			return;
		}
		offlineSimulation = {
			active: true,
			tick: 0,
			ticks: player.options.offlineTicks,
			tickLength: time/player.options.offlineTicks,
			time: 0,
			startTime: Date.now(), 
			totalTime: time,
		};
		var lastUpdate = Date.now();
		if(showSimulation) {
			document.getElementById('loading').style.display = '';
			this.updateOfflineTime();
		}
		blocked = true;
		let interval = setInterval(() => {
			var initialTick = offlineSimulation.tick;
			while(offlineSimulation.tick < Math.min(offlineSimulation.ticks, initialTick + 32)) {
				gameLoop(offlineSimulation.tickLength, false, false)
				let time = (Date.now()-lastUpdate)/1e3;
				offlineSimulation.tick++;
				if(time > 1/8) {
					offlineSimulation.time += time;
					Saving.updateOfflineTime();
					lastUpdate = Date.now();
				}
			}
			if(offlineSimulation.tick == offlineSimulation.ticks) {
				offlineSimulation = {
					active: false,
					tick: 0,
					ticks: 0,
					tickLength: 0,
					time: 0,
				};
				clearInterval(interval);
				document.getElementById('loading').style.display = 'none';
				blocked = false;
				callback();
			}
		},1);
	},
	speedUpOfflineTime() {
		// In theory, this function should only be callable when time is being simulated unless called from console.
		// No negative effect if it is called out of time to be fair however, so this statement is almost unneccesary.
		if(!offlineSimulation.active) return;
		offlineSimulation.ticks -= Math.floor((offlineSimulation.ticks - offlineSimulation.tick)/2);
		offlineSimulation.tickLength = offlineSimulation.totalTime / offlineSimulation.ticks;
	},
	updateOfflineTime() {
		document.getElementById("offline-time").innerText = timeFormat(offlineSimulation.totalTime);
		document.getElementById("tick").innerText = offlineSimulation.tick;
		document.getElementById("ticks").innerText = offlineSimulation.ticks;
		document.getElementById("time").innerText = timeFormat(offlineSimulation.time);
		document.getElementById('offline-time-estimated').innerText = timeFormat((1/(Math.max(offlineSimulation.tick,1) / offlineSimulation.ticks)) * offlineSimulation.time - (Date.now() - offlineSimulation.startTime)/1e3);
		document.getElementById("inner-bar").style.width = offlineSimulation.tick / offlineSimulation.ticks * 100 + "%";
	},
	fixSave() {
		// Gives each player attribute its default value if it is undefined for some reason
		// Shouldn't technically happen because all of these variables have been added before
		// any kind of deployment or version control so should be present in every save
		player.quarks = new Decimal(player.quarks);
		player.upgrades = player.upgrades ?? [0,0,0,0,0];
		player.protons = new Decimal(player.protons);
		
		player.options = player.options ?? {};
		player.options.simulateTime = player.options.simulateTime ?? true;
		player.options.offlineTicks = player.options.offlineTicks ?? 4096;
		player.options.hotkeys = player.options.hotkeys ?? true;
		player.options.theme = player.options.theme ?? 'Dark';
		player.options.saveNotifications = player.options.saveNotifications ?? 'Manual saves only';
		player.options.achievementNotifications = player.options.achievementNotifications ?? 'Always';
		player.options.achievementMultiplier = player.options.achievementMultiplier ?? true;
		player.options.viewCompletedRows = player.options.viewCompletedRows ?? true;
		player.options.viewQuestionRows = player.options.viewQuestionRows ?? true;
		player.options.viewAchievements = player.options.viewAchievements ?? 2;
		player.options.autosave = player.options.autosave ?? true;
		player.options.autosaveTimer = player.options.autosaveTimer ?? 10;
		player.format = player.format ?? {};
		player.format.normalPrecision = player.format.normalPrecision ?? 3;
		player.format.higherPrecision = player.format.higherPrecision ?? 5;
		player.format.commasOnExponent = player.format.commasOnExponent ?? true;
		player.format.notation = player.format.notation ?? 'Scientific';
		player.format.timeFormat = player.format.timeFormat ?? 'D:H:M:S';
		player.format.notationOnTime = player.format.notationOnTime ?? false;
		player.stats = player.stats ?? {};
		player.stats.totalTime = player.stats.totalTime ?? 0;
		player.stats.onlineTime = player.stats.onlineTime ?? 0;
		player.stats.totalQuarks = new Decimal(player.stats.totalQuarks) ?? new Decimal(0);
		player.achievements = player.achievements ?? [...Array(8)].map((x) => false);
		player.tab = player.tab ?? 'main';
		player.lastUpdate = player.lastUpdate ?? Date.now();
	},
	doesSaveExist() {
		return localStorage.getItem("quark-save") != null;
	},
};