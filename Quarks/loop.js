let blocked = true;
let lastSave = Date.now();

let blockableGameLoop = function() {
	if(!blocked) {
		gameLoop(null, true, true);
	}
}

let gameLoop = function(diff, doUpdate, isOnline) {
	if(typeof diff !== 'number') {
		var now = Date.now();
		diff = (now - player.lastUpdate)/1e3;
		player.lastUpdate = now;
	}
	isOnline = isOnline ?? true;

	player.quarks = player.quarks.plus(Quarks.perSecond().times(diff));
	player.protons = player.protons.plus(Protons.perSecond().times(diff));

	Statistics.update(diff, isOnline);

	if((now - lastSave)/1e3 > player.options.autosaveTimer && player.options.autosave) {
		Saving.save(false);
		lastSave = now;
	}
	if(doUpdate) update();
}