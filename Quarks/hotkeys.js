let Hotkeys = {
	callback(event) {
		if(!player.options.hotkeys) return;
 		switch(event.key) {
			case 'p':
				Accelerator.createElement('proton');
				break;
			case 'n':
				Accelerator.createElement('neutron');
				break;
			case 'e':
				Accelerator.createElement('electron');
				break;
			case 'h':
				Hydrogen.gain();
				break;
		};
	},
};