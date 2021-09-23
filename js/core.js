var blocked = true;
var g = (x => document.getElementById(x));

let player = {
	serotonin: new Decimal(0),
	dopamine: new Decimal(0),
	happiness: new Decimal(0),
	bestEmotion: new Decimal(0),
	experiences: new Decimal(0),

	upgrades: [0, 0, 0, 0, 0, 0, 0],

	tab: 0,

	stats: {
		timeInExperience: 0,
	},

	lastUpdate: Date.now(),
};

let gameLoop = function(){
	if(blocked) return;

	let now = Date.now();
	let diff = now - player.lastUpdate;
	player.lastUpdate = now;

	Serotonin.gain(diff);
	Dopamine.produce(diff);
	Happiness.produce(diff);
	Emotion.updateBest();

	player.stats.timeInExperience += (diff / 1000);

	update();
};

let offlineLoop = function(diff) {
	Serotonin.gain(diff);
	Dopamine.produce(diff);
	Happiness.produce(diff);
	Emotion.updateBest();

	player.stats.timeInExperience += (diff / 1000);
};

let timeFormat = function(time) {
	if (time / 60 >= 1) {
		if(time / (60*60) >= 1) {
			if(time / (60*60*24) >= 1) {
				time = time / (24*60*60)
				return time.toFixed(3) + " days";
			}
			time = time / (60*60)
			return time.toFixed(3) + " hours";
		}
		time = time / 60
		return time.toFixed(3) + " minutes";
	}
	return new Decimal(time).format(true) + " seconds";
};

window.onload = function() {
	Saving.load();
	Tabs.init();
}