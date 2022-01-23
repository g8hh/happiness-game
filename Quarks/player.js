let player = {
	quarks: new Decimal(0),
	accelerator: {
		unlocked: false,
		particlesUnlocked: false,
		protons: new Decimal(0),
		neutrons: new Decimal(0),
		electrons: new Decimal(0),
		hydrogen: new Decimal(0),
		protonUpgrades: [false,false,false,false],
		neutronUpgrades: [false,false,false,false],
		electronUpgrades: [false,false,false,false],
		hydrogenUpgrades: [0,0,0,0,0,0],
		elementUpgradeAutobuy: true,
	},
	format: {
		normalPrecision: 3,
		higherPrecision: 5,
		commasOnExponent: true,
		notation: 'Scientific',
		timeFormat: 'D:H:M:S',
		notationOnTime: false,
	},
	options: {
		simulateTime: true,
		offlineTicks: 4096,
		theme: 'Dark',
		hotkeys: true,
		saveNotifications: 'Manual saves only',
		achievementNotifications: 'Always',
		viewAchievements: 2,
		achievementMultiplier: true,
		viewCompletedRows: true,
		viewQuestionRows: true,
	},
	stats: {
		totalTime: 0,
		onlineTime: 0,
		totalQuarks: new Decimal(0),
		totalProtons: new Decimal(0),
		totalNeutrons: new Decimal(0),
		totalElectrons: new Decimal(0),
		totalHydrogen: new Decimal(0),
	},
	achievements: [...Array(8)].map((x) => false),
	tab: 'main',
	lastUpdate: Date.now(),
};

let Statistics = {
	update(diff) {
		player.stats.totalQuarks = player.stats.totalQuarks.plus(Accelerator.quarksPerSecond() * diff);
		player.stats.totalProtons = player.stats.totalProtons.plus(Accelerator.elementPerSecond('proton').times(diff));
		player.stats.totalNeutrons = player.stats.totalNeutrons.plus(Accelerator.elementPerSecond('neutron').times(diff));
		player.stats.totalElectrons = player.stats.totalElectrons.plus(Accelerator.elementPerSecond('electron').times(diff));
		player.stats.totalTime += diff;
	},
};