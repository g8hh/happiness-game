let player = {
	lastUpdate: Date.now(),
	quarks: new Decimal(2),
	protons: new Decimal(0),
	neutrons: new Decimal(0),
	bestQuarks: new Decimal(2),
	bestProtons: new Decimal(0),
	totalProtons: new Decimal(0),
	quarkGenerators: [...Array(8)].map(() => ({amount: new Decimal(0), bought: 0})),
	neutronGenerators: [...Array(8)].map(() => ({amount: new Decimal(0), bought: 0})),
	highestQuarkGenerator: 0,
	highestNeutronGenerator: 0,

	bosons: 0,
	baryons: new Decimal(0),
	fermions: new Decimal(0),

	autobuyers: [...Array(9)].map(() => ({active: true, mode: 0, unlocked: false, slow: true})),
	autobuyertimer: 0,
	slowautobuytimer: 16,

	fusion: false,
	protonic: 0,

	progress: {
		bosonic: false,
		baryonic: false,
		fermionic: false,
		protonic: false,
	},
	options: {
		tab: 0,
		theme: 'Dark',
		hotkeys: true,
		timeFormat: 'Seconds',
		achievementmult: true,
		achievementvisibility: false,
		autobuytime: 0,
		viewgens: false,
	},
	stats: {
		totalQuarks: new Decimal(2),
		totalBosons: 0,
		timeInBaryonic: 0,
		timeInFermionic: 0,
		timeInProtonic: 0,
		totalTime: 0,
		totalTimeWithOffline: 0,

		peakProtonsPerSecond: 0,
	},
	cheats: {
		speed: 1,
	},
	achievements: [...Array(16)].map(() => (false)),
};