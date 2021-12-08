class Player {
	constructor(cards) {
		this.cards = cards;
		this.name = 'player';
	}
	add_card(card) {
		this.cards.push(card);
	}
	remove_card(card) {
		this.cards.splice(this.cards.indexOf(card), 1);
	}
	sort_by_value() {
		let n = this.cards.length;
		let swapped = true;
		while( n >= 0 && swapped ) {
			swapped = false;
			for( let i=0; i<n-1; i++ ) {
				if( VALUES.indexOf(this.cards[i].value) > VALUES.indexOf(this.cards[i+1].value)) {
					let temp = this.cards[i];
					this.cards[i] = this.cards[i+1];
					this.cards[i+1] = temp;
					swapped = true
				}
			}
			n = n-1;
		}
		Game.renderer.draw(this.name, this.cards);
	}
	sort_by_suit() {
		let n = this.cards.length;
		let swapped = true;
		while( n >= 0 && swapped ) {
			swapped = false;
			for( let i=0; i<n-1; i++ ) {
				if(SUITS.indexOf(this.cards[i].suit) > SUITS.indexOf(this.cards[i+1].suit)) {
					let temp = this.cards[i];
					this.cards[i] = this.cards[i+1];
					this.cards[i+1] = temp;
					swapped = true
				}
			}
			n = n-1;
		}
		Game.renderer.draw(this.name, this.cards);
	}
	sort() {
		this.sort_by_suit();
		this.sort_by_value();
	}
	
	valid_runs() { 
		let completed_runs = this.raw_valid_runs();
		
		let run = completed_runs[0];
		let set = this.raw_valid_sets()[0];
		
		if(run == undefined || set == undefined) return completed_runs;
		if(run.length !== 5 || set.length !== 3) return completed_runs;
		if(!set.includes(run[0]) && !set.includes(run[4])) return completed_runs;
		
		for(let value of run) {
			if(!set.includes(value)) continue;
			run.splice(run.indexOf(value), 1);
		}
		
		return completed_runs;
	}
	
	valid_sets() { 
		let sets = this.raw_valid_sets();
		if(this.valid_runs().length == 0) {
			return sets;
		}
		
		if(!this.overlap()) return sets;
		
		for(let arr of sets) {
			let run_ids = this.valid_runs().flatten();
			for(let value of run_ids) {
				if(arr.includes(value)) {
					arr.splice(arr.indexOf(value),1);
				}
			}
		}
		
		sets = sets.filter(x => x.length>2);
		return sets;
	}
	
	overlap() {												// Return true if any card in sets is also in runs
		let runs = this.raw_valid_runs().flatten();			// Get all cards in runs	(flatten converts [[1,4,5], [2, 3]] to [1, 4, 5, 2, 3]
		let sets = this.raw_valid_sets().flatten();			// Get all cards in sets
		return runs.some(x => sets.includes(x)); 			// Return true if any card in runs is included in sets.
	}
	
	valid_meld() {
		if(this.cards.length != 7) return;
		let valid = 0;
		
		if(this.valid_runs().length !== 0) {
			this.valid_runs().forEach(x => valid+=x.length);
		}

		if(this.valid_sets().length !== 0) {
			this.valid_sets().forEach(x => valid+=x.length);
		}
		
		return valid == 7;
	}
	
	raw_valid_runs() {
		let ids = [...Array(7)].map((_, i) => (this.cards[i].id));
		let seperated_ids = [[], [], [], []];
		let completed_runs = [];
		for(let id of ids) seperated_ids[Math.floor(id/13)].push(id);
		seperated_ids = seperated_ids.filter(x => x.length>2);
		for(let arr of seperated_ids) {
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
						completed_runs.push(runs);
						runs = [];
					}
					previous = current;
				}
				completed_runs.push(runs);
		}
		completed_runs = completed_runs.filter(x => x.length>2);
		return completed_runs;
	}
	
	raw_valid_sets() {
		let values = [...Array(13)].map(() => []);
		for(let card of this.cards) {
			values[VALUES.indexOf(card.value)].push(card.id);
		}
		
		values = values.filter(x => x.length>2);
		return values;
	}
};