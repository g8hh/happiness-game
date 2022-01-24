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

	player.quarks = player.quarks.plus(Elements.quarksPerSecond() * diff);
	player.elements.protons = player.elements.protons.plus(Elements.elementPerSecond('proton').times(diff));
	player.elements.neutrons = player.elements.neutrons.plus(Elements.elementPerSecond('neutron').times(diff));
	player.elements.electrons = player.elements.electrons.plus(Elements.elementPerSecond('electron').times(diff));
	player.elements.hydrogen = player.elements.hydrogen.plus(Hydrogen.perSecond().times(diff));
	
	Elements.autobuy();

	Statistics.update(diff);

	Achievements.give(2);
	Achievements.give(4);

	if((now - lastSave)/1e3 > player.options.autosaveTimer && player.options.autosave) {
		Saving.save(false);
		lastSave = now;
	}
	if(doUpdate) update();
	if(isOnline) player.stats.onlineTime += diff;
}