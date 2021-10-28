let Autobuyer = function(i) {
	if(defined.autobuyer) {
		return Autobuyers.get(i);
	};
	return {
		cost() {
			return Decimal.pow(2, Math.pow(i+2, 2));
		},
		canBuy() {
			return Quarks.amount.gte(this.cost());
		},
		has() {
			return player.autobuyers[i-1].unlocked;
		},
		unlock() {
			if(!this.canBuy()) return;
			Quarks.minus(this.cost());
			player.autobuyers[i-1].unlocked = true;

			Achievements.giveAchievement(8);
			Achievements.giveAchievement(11);

			updateOccasional();
		},
		lock() {
			player.autobuyers[i-1].unlocked = false;

			updateOccasional();
		},
		slow() {
			return player.autobuyers[i-1].slow;
		},
		mode() {
			return player.autobuyers[i-1].mode;
		},
		toggleMode() {
			player.autobuyers[i-1].mode = (player.autobuyers[i-1].mode==1) ? 0 : 1;
			updateOccasional();
		},
		active() {
			return player.autobuyers[i-1].active;
		},
		toggleActive() {
			player.autobuyers[i-1].active = !player.autobuyers[i-1].active;
			updateOccasional();
		},
		setActive(bool) {
			player.autobuyers[i-1].active = bool;
			updateOccasional();
		},
		trigger(mode) {
			if(!this.has() || !this.active()) return;
			if(this.slow() != mode) return;
			if(i==9) {
				if(this.mode()==1) {
					Bosons.buy(1);
					return;
				} else {
					Bosons.buyMax();
					return;
				};
			} else {
				if(this.mode()==1) {
					quarkGenerator(i).buy(1);
					return;
				} else {
					quarkGenerator(i).buyMax();
					return;
				}
			};
		},
	};
};

let Autobuyers = {
	list: [...Array(9)].map((_, i) => (Autobuyer(i+1))),
	tick(diff) {
		if(!this.hasAny()) return;
		if(player.options.autobuytime==0) this.trigger(false);

		slowtimer = (player.options.autobuytime<16) ? 16 : player.options.autobuytime;

		if(player.autobuyertimer-diff<0) this.trigger(false);
		player.autobuyertimer = (player.autobuyertimer-diff<0) ? player.options.autobuytime : player.autobuyertimer-diff;

		if(player.slowautobuytimer-diff<0) this.trigger(true);
		player.slowautobuytimer = (player.slowautobuytimer-diff<0) ? slowtimer : player.slowautobuytimer-diff;
	},
	resetSlow() {
		this.list.forEach(x => x.lock())
	},
	trigger(mode) {
		this.list.forEach(x => x.trigger(mode));
	},
	updateTimer(value) {
		player.options.autobuytime = value;
		player.autobuyertimer = value;
		player.slowautobuytimer = (value<16) ? 16 : value;
		g("autobuy-timer").value = player.options.autobuytime;
	},
	get(i) {
		return this.list[i-1];
	},
	amount() {
		return this.list.filter(x => x.has()).length;
	},
	hasAny() {
		return this.amount()>0;
	},
	active() {
		return this.list.filter(x => x.active()).length;
	},
	allOn() {
		this.list.forEach((x) => (x.setActive(true)));
	},
	allOff() {
		this.list.forEach((x) => (x.setActive(false)));
	},
	allToggle() {
		this.list.forEach((x) => (x.toggleActive()));
	},
	allOnOff() {
		this.list.forEach((x) => (this.active()>this.amount()/2 ? this.allOff() : this.allOn()));
	},
	init() {
		g("autobuy-timer").value = player.options.autobuytime;
	},
};


defined.autobuyer = true;