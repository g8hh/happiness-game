let Hotkeys = {
	callback(event) {
		if(!player.options.hotkeys) return;
 		switch(event.key) {
			case 'p':
				Elements.createElement('proton');
				break;
			case 'n':
				Elements.createElement('neutron');
				break;
			case 'e':
				Elements.createElement('electron');
				break;
			case 'h':
				Hydrogen.gain();
				break;
		};
	},
};