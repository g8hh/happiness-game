let Hotkeys = {
	keyList: [],
	init() {
		g("hotkey-btn").innerText = "Hotkeys: " + ((player.options.hotkeys) ? 'Enabled' : 'Disabled');
		window.addEventListener('keydown', function(e){ Hotkeys.callback(e) });
		window.addEventListener('keyup', function() { Hotkeys.keyList = [] });
	},
	toggleActive() {
		player.options.hotkeys = !player.options.hotkeys;
		g("hotkey-btn").innerText = "Hotkeys: " + ((player.options.hotkeys) ? 'Enabled' : 'Disabled');
	},
	callback(e) {
		this.keyList.push(e.keyCode);
		let operation = this.keyList[this.keyList.length-1]
		if(operation == 16) return

		if([49,50,51,52,53,54,55,56].includes(operation)) {
				if(this.keyList[0]==16) {
					quarkGenerator(operation - 48).buy(1);
				} else {
					quarkGenerator(operation - 48).buyMax();
				};
		};

		switch(operation) {
			case 65:
				Autobuyers.allToggle();
				break;
			case 66:
				if(this.keyList[0]==16) {
					Bosons.buyMax();
					break;
				} else {
					Baryons.gain();
					break;
				};
			case 70:
				Fermions.gain();
				break;
			case 77:
				if(this.keyList[0]==16) {
					Game.buySingle();
					break;
				} else {
					Game.maxAll();
					break;
				};
			case 80:
				Protonic.reset();
				break;
		};
	},
};