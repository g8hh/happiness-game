let Game = {
	blocked: true,
	init() {
		Saving.load();
		Tabs.init();
		Theme.init();
		Hotkeys.init();
		this.setTimeFormat();
		Achievements.init();
		Autobuyers.init();
		Quarks.init();
	},
	start() {
		Update();
		Saving.save();
		g("offline-time").style.display = "none";
		g("game").style.display = "block";
		this.blocked = false;
		window.setInterval(function() {
			if(!Game.blocked) gameLoop();
		}, 64);
		window.setInterval(function() {
			Saving.save();
		}, 10000);
	},
	setTimeFormat() {
		g("timeformat-btn").innerHTML = 'Change time format: <br>' + player.options.timeFormat + this.timeFormatText();
	},
	changeTimeFormat() {
		if(player.options.timeFormat  == 'Seconds') player.options.timeFormat = 'Largest unit';
		else if(player.options.timeFormat == 'Largest unit') player.options.timeFormat = 'D:H:M:S';
		else if(player.options.timeFormat == 'D:H:M:S') player.options.timeFormat = 'Seconds';
		g("timeformat-btn").innerHTML = 'Change time format: <br>' + player.options.timeFormat + this.timeFormatText();
	},
	timeFormatText() {
		if(player.options.timeFormat  == 'Seconds') return ' (4.032e3 seconds)'
		if(player.options.timeFormat == 'Largest unit') return ' (45.643 minutes)'
		if(player.options.timeFormat == 'D:H:M:S') return ' (12:36:53)'
	},
	maxAll() {
		quarkGenerators.maxAll();
		Bosons.buyMax();
	},
	buySingle() {
		quarkGenerators.buySingle();
	},
};

window.onload = function() {
	Game.init();
}