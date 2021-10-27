let gameLoop = function() {
	let now = Date.now();
	let diff = (now - player.lastUpdate)/1000 * player.cheats.speed;
	player.lastUpdate = now;

	quarkGenerators.produce(diff);

	Autobuyers.tick(diff);

	Update();

	player.stats.timeInBaryonic += diff;
	player.stats.timeInFermionic += diff;
	player.stats.timeInProtonic += diff;
	player.stats.totalTime += diff;
	player.stats.totalTimeWithOffline += diff;
};

let offlineGameLoop = function(diff) {
	quarkGenerators.produce(diff);
	Autobuyers.tick(diff);
}