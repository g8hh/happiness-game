class Rummy {
	constructor(renderer) {
		this.renderer = renderer
		this.state = 0;
	}
	start_game() {
		this.generate_cards();
		this.update_html();
		this.increment_state();
		this.render();
		this.time_started = Date.now();
		this.time_played = 0;
		Statistics.stats.totalGames++;
		Saving.clear_game();
	}
	load_game(data) {
		this.player = new Player(data.player.cards.map((x) => (new Card(x.id))));
		this.opponent = new Opponent(data.opponent.cards.map((x) => (new Card(x.id))));
		this.pickup = data.pickup.map((x) => (new Card(x.id)));
		this.pile = data.pile.map((x) => (new Card(x.id)));
		this.state = data.state;
		this.time_started = data.time_started;
		this.time_played = data.time_played;
		this.renderer.highlights = data.renderer.highlights;
		this.renderer.theme = data.renderer.theme;
		if(this.state == 3) {
			if(this.opponent.cards.length != 7) {
				this.opponent.discard();
			} else {
				this.opponent.generate_move();
			} 
		}
		this.render();
		this.update_html();
	}
	update_html() {
		g("start-game").style.display = "none";
		g("load-game").style.display = "none";
		g("cards").style.display = "block";
		g("help-text").style.display = "inline";
		g("save-game").style.display = "inline-block";
		g("new-game").style.display = "inline-block";
		Theme.set(this.renderer.theme);
	}
	generate_cards() {
		let deck = GENERATE_DECK().sort(() => (Math.random()-0.5));
		this.player = new Player(deck.splice(0,7));
		this.opponent = new Opponent(deck.splice(0,7));
		this.pickup = deck.splice(0,1);
		this.pile = deck;
	}
	increment_state() {
		this.state = this.state>=3 ? 1 : this.state+1;
		if(this.player.valid_meld()) {
			this.state = 4;
			this.render();
			Statistics.stats.playerWins++;
			Statistics.stats.fastestWin = Math.min(Statistics.stats.fastestWin, this.time_played);
		} else if(this.opponent.valid_meld()) {
			this.state = 5;
			this.opponent.sort();
			this.render();
			Statistics.stats.opponentWins++;
		}
		if(this.pile.length == 0) {
			this.pile = this.pickup.reverse();
			this.pickup = this.pile.splice(0,1);
			this.render();
		}
		Saving.save();
	}
	render() {
		this.renderer.draw("player", this.player.cards);
		this.renderer.draw("pile", this.pile, this.pickup);
		this.renderer.draw("opponent", this.opponent.cards);
		this.renderer.draw("text", this.state);
	}
	callback(card, place, extra) {
		if(place == 'pile') {
			if(this.state != 1) return;
			this.player.add_card(card)
			if(extra == 1) this.pickup.splice(0,1);
			if(extra == 2) this.pile.splice(0,1);
			this.increment_state()
			this.render()
			Statistics.stats.totalCards++;
		} else if (place == 'player') {
			if(this.state != 2) return;
			this.pickup.unshift(card);
			this.player.remove_card(card)
			this.increment_state()
			this.render()
			this.opponent.generate_move();
			Statistics.stats.totalCards++;
			if(!Game.player.cards.includes(Game.player.held_card)) Game.player.held_card = '';
		}
	}
};