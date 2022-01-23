let Options = {
	init() {
		document.getElementById('simulate-time-setting').checked = player.options.simulateTime;
		document.getElementById('simulate-time-ticks').value = player.options.offlineTicks;
		document.getElementById("notification-options-saving").value = player.options.saveNotifications;
		document.getElementById("notification-options-achievements").value = player.options.achievementNotifications;
		document.getElementById("achievement-view").value = player.options.viewAchievements;
		document.getElementById('hotkeys-btn').innerText = "Hotkeys: " + (player.options.hotkeys ? 'Enabled' : 'Disabled');
		document.getElementById("theme-btn").innerText = "Theme: " + player.options.theme;
		this.rootElement.style.setProperty('--background-color', player.options.theme === 'Light' ? 'white' : 'black');
		this.rootElement.style.setProperty('--text-color', player.options.theme === 'Light' ? 'black' : 'white');
	},
	rootElement: document.querySelector(':root'),
	setOfflineTime(bool) {
		if(typeof bool !== 'boolean') return;
		player.options.simulateTime = bool;
	},
	setOfflineTicks(value) {
		if(typeof value !== 'string') return;
		player.options.offlineTicks = Math.min(Math.max(16, value), 65536);
	},
	setTheme(value) {
		if(typeof value !== 'string') return;
		value = value.replace("Theme: ", "");
		player.options.theme = value === 'Dark' ? 'Light' : 'Dark';
		document.getElementById("theme-btn").innerText = "Theme: " + player.options.theme;
		this.rootElement.style.setProperty('--background-color', player.options.theme === 'Light' ? 'white' : 'black');
		this.rootElement.style.setProperty('--text-color', player.options.theme === 'Light' ? 'black' : 'white');
	},
	setHotkeys(value) {
		if(typeof value !== 'string') return;
		value = value.replace("Hotkeys: ","");
		player.options.hotkeys = value === "Enabled" ? false : true;
		document.getElementById('hotkeys-btn').innerText = "Hotkeys: " + (player.options.hotkeys ? 'Enabled' : 'Disabled');
	},
	setSavingNotifications(value) {
		if(typeof value !== 'string') return;
		player.options.saveNotifications = value;
	},
	setAchievementNotifications(value) {
		if(typeof value !== 'string') return;
		player.options.achievementNotifications = value;
	},
	setAchievementVisibility(value) {
		if(typeof value !== 'string') return;
		player.options.viewAchievements = Math.max(0,value);
		Achievements.update();
	},
	shouldNotify(type, manualSave) {
		if(type === 'save') {
			if(player.options.saveNotifications === 'Never notify') return false;
			if(player.options.saveNotifications === 'Always notify') return true;
			if(player.options.saveNotifications === 'Manual saves only' && manualSave) return true;
		} else if (type === 'achievement') {
			if(player.options.achievementNotifications === 'Never') return false;
			if(player.options.achievementNotifications === 'Always') return true;
		}
	},
};