class Opponent extends Player {
	constructor(cards) {
		super(cards);
		this.name = 'opponent';
	}
	generate_move() {
		if(Game.state == 4) return;
		sleep(1000).then(() => {
			let choice = Math.random();
			if(choice > 0.5) {
				this.add_card(Game.pickup[0])
				Game.pickup.splice(0,1);
			} else {
				this.add_card(Game.pile[0])
				Game.pile.splice(0,1);
			}
			Game.render();
				
			this.discard();
		});
	}
	
	partial_sets() {
		let values = [...Array(13)].map(() => []);
		for(let card of this.cards) {
			values[VALUES.indexOf(card.value)].push(card.id);
		}
		
		values = values.filter(x => x.length>1);
		return values;
	}
	
	partial_runs() {
		let ids = [...Array(7)].map((_, i) => (this.cards[i].id));
		let seperated_ids = [[], [], [], []];
		let partial_runs = [];
		for(let id of ids) seperated_ids[Math.floor(id/13)].push(id);
		for(let arr of seperated_ids) {
				if(arr.length<3) continue;
				arr.sort((a,b) => (a-b));
				let runs = [];
				let previous = arr[0];
				for(let i=1; i<arr.length; i++) {
					let current = arr[i];
					let difference = Math.abs(current-previous);
					if(difference == 1) {
						runs.push(previous);
						runs.push(current);
						runs = [...new Set(runs)];
					}
					if(difference != 1) {
						partial_runs.push(runs);
						runs = [];
					}
					previous = current;
				}
				partial_runs.push(runs);
		}
		partial_runs = partial_runs.filter(x => x.length>1);
		return partial_runs;
	}
	
	discard_card() {
		this.sort();
		let runs = this.partial_runs().flatten();
		let sets = this.partial_sets().flatten();

		for(let card of this.cards) {
			if(runs.includes(card.id)) continue;
			if(sets.includes(card.id)) continue;
			return card;
		}
			
		return this.cards[Math.floor(Math.random()*7)];
	}
	discard() {
		sleep(1000).then(() => {
			let discard_card = this.discard_card();
			Game.pickup.unshift(discard_card);
			this.remove_card(discard_card);
			Game.increment_state();
			Game.render();
		});
	}
}