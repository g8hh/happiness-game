class Renderer {
	constructor(player, pile, opponent, text) {
		this.player = player;
		this.pile = pile;
		this.opponent = opponent;
		this.text = text;
		this.highlights = false;
		this.theme = 'Light';
	}
	draw(mode, cards, pickup) {
		if(Game.state==0) return;														// don't render anything if game hasn't started
		if(mode == "player") {															// drawing player cards.
			this.player.innerHTML = "";													// reset the drawing space
			for(let card of cards) {													// for each player card > 
				let ele = document.createElement("div");								// create the div element
				ele.classList.add("card");												// add card class for styling
				ele.classList.add("player-card");										// add player-card class for further styling 
				ele.classList.add(card.suit);											// add the suit for colouring
				if(card == Game.player.held_card) ele.classList.add('bold');
				ele.onclick = (() => Game.callback(card, 'player'));					// add a callback for when it is clicked	
				ele.oncontextmenu = (() => {Game.player.swap_card(card); return false});
				ele.innerHTML = card.suit + "<br>" + card.value;						// set the text to display what card it is 
				this.player.appendChild(ele);											// append it to the drawing space
			}
		} else if (mode == "pile") {
			this.pile.innerHTML = "";
			if(pickup[0] != undefined) {
				let ele = document.createElement("div");
				ele.classList.add("card");
				ele.classList.add("player-card");
				ele.classList.add("pickup-card");
				ele.classList.add(pickup[0].suit);
				ele.onclick = (() => Game.callback(pickup[0], 'pile', 1));
				ele.innerHTML = pickup[0].suit + "<br>" + pickup[0].value;
				this.pile.appendChild(ele);
			}
			
			let ele = document.createElement("div");
			ele.classList.add("pile-card");
			ele.classList.add("player-card");
			ele.onclick = (() => Game.callback(cards[0], 'pile', 2));
			ele.innerHTML = "- <br> -";
			this.pile.appendChild(ele);
		} else if (mode == "opponent") {
			this.opponent.innerHTML = "";
			for(let card of cards) {
				let ele = document.createElement("div");
				ele.classList.add("card");
				if(Game.state != 5) ele.classList.add("opponent-card");
				if(Game.state == 5) ele.innerHTML = card.suit + "<br>" + card.value;
				this.opponent.appendChild(ele);
			}
		} else if (mode == "text") {
			this.text.innerHTML = STATES[cards-1];															// update the sidebar text based on game state
			this.reset_highlights();																		// reset any highlights that are currently drawn
			if(this.highlights && Game.state < 4) {															// if highlights are enabled and game is still playing
				TITLES[cards-1].classList.add("highlighted");												// draw the appropriate highlight
			}
			g("valid-runs").innerHTML = "Valid runs: " + this.valid_format(Game.player.valid_runs());		// update players valid runs
			g("valid-sets").innerHTML = "Valid sets: " + this.valid_format(Game.player.valid_sets());		// update players valid sets
			
			g("highlights").innerText = "Card highlighting: " + (this.highlights ? "On" : "Off");			// update highlights button incase it hasn't already
			
			if(Game.player.overlap() && !Game.player.valid_meld()) {										// if runs/sets overlap, display message
				g("overlapping-runs").innerHTML = "Some of your sets and runs are overlapping, and therefore not being counted towards for a set.";
			} else {
				g("overlapping-runs").innerText = "";														// otherwise don't
			}
		}
	}
	valid_format(ids) {											// array.flatten() used as ids is a nested array
		let arr = [];											// initialise return array
		ids.flatten().forEach(x => arr.push(Card.repr(x)));		// for each id given, push the card representation to that array
		return arr;												// return the array
	}
	reset_highlights() {
		TITLES.forEach(x => x.classList.remove("highlighted"));
	}
	toggle_highlighting() {
		this.highlights = !this.highlights;
		g("highlights").innerText = "Card highlighting: " + (this.highlights ? "On" : "Off");
		this.reset_highlights();
		this.draw('text', Game.state);
	}
	draw_test(cards) {
		g("test").innerHTML = "";
		for(let card of cards) {
			let ele = document.createElement("div");
			ele.classList.add("card");
			ele.classList.add(card.suit);
			ele.innerHTML = card.suit + "<br>" + card.value;
			g("test").appendChild(ele);
		}
	}
};