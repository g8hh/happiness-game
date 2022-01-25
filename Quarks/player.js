let player = {
	quarks: new Decimal(1),
	upgrades: [0,0,0,0,0],
	protons: new Decimal(0),

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
		theme: 'Light',
		hotkeys: true,
		saveNotifications: 'Manual saves only',
		achievementNotifications: 'Always',
		viewAchievements: 2,
		achievementMultiplier: true,
		viewCompletedRows: true,
		viewQuestionRows: true,
		autosave: true,
		autosaveTimer: 10,
	},
	stats: {
		totalTime: 0,
		onlineTime: 0,
		totalQuarks: new Decimal(1),
	},
	achievements: [...Array(8)].map((x) => false),
	tab: 'main',
	lastUpdate: Date.now(),
};

let Statistics = {
	update(diff, isOnline) {
		player.stats.totalTime += diff;
		player.stats.onlineTime += (isOnline ? diff : 0);
	},
};