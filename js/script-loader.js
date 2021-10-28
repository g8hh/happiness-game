let g  = (x => document.getElementById(x));
let defined = {};

let scripts = [
		'decimal.min.js',
		'player.js',
		'format.js',
		'game.js',
		'saving.js',
		'loop.js',
		'tabs.js',
		'theme.js',
		'hotkeys.js',
		'autobuyers.js',
		'notifications.js',
		'achievements.js',

		'quark/quarks.js',
		'quark/quark-generator.js',
		'quark/bosons.js',
		'quark/baryons.js',
		'quark/fermions.js',

		'protonic/protons.js',
		'protonic/protonic.js',
		'protonic/neutron-generator.js',

		'update-display.js',
];

for (script in scripts) {
	let script_html = document.createElement('script');
	script_html.src = 'js/' + scripts[script];
	g("scripts").appendChild(script_html);
};

