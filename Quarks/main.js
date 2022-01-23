let Game = {
	start() {
		player.lastUpdate = Date.now();
		updateDisplayPageSetup();
		update();
		Notation.init();
		Options.init();
		Achievements.init();
		Tabs.showTab(player.tab);
		document.getElementById("loading").style.display = "none";
		document.getElementById("main").style.display = "";
		blocked = false;
		setInterval(() => (blockableGameLoop()), 64);
		setInterval(() => (Saving.save()), 10000);
		addEventListener('keydown', (e) => (Hotkeys.callback(e)));
	},
	defined: {},
};

window.onload = () => {
	Saving.load(false);
};