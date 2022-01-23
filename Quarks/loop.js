let blocked = true;

let blockableGameLoop = function() {
	if(!blocked) {
		gameLoop(null, true, true);
	}
}

let gameLoop = function(diff, doUpdate, isOnline) {
	if(typeof diff !== 'number') {
		let now = Date.now();
		diff = (now - player.lastUpdate)/1e3;
		player.lastUpdate = now;
	}
	isOnline = isOnline ?? true;

	player.quarks = player.quarks.plus(Accelerator.quarksPerSecond() * diff);
	player.accelerator.protons = player.accelerator.protons.plus(Accelerator.elementPerSecond('proton').times(diff));
	player.accelerator.neutrons = player.accelerator.neutrons.plus(Accelerator.elementPerSecond('neutron').times(diff));
	player.accelerator.electrons = player.accelerator.electrons.plus(Accelerator.elementPerSecond('electron').times(diff));
	player.accelerator.hydrogen = player.accelerator.hydrogen.plus(Hydrogen.perSecond().times(diff));
	
	Accelerator.autobuy();

	Statistics.update(diff);

	Achievements.give(2);
	Achievements.give(4);

	if(doUpdate) update();
	if(isOnline) player.stats.onlineTime += diff;
}