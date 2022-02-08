const g = (i => document.getElementById(i));
const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const SUITS  = ['♥', '♦', '♠', '♣'];
const STATES = ['Choose a card to pick up..',
				'Choose a card to discard..',
				'Opponent is making a move..',
				'Congratulations, you have won! <br> <button onclick="Saving.start_new_game(true)">Start new game</button>',
				'You lost! Try again? <br> <button onclick="Saving.start_new_game(true)">Start new game</button>'];
const TITLES = [g("pile-title"), g("player-title"), g("opponent-title")];
const GENERATE_DECK = () => [...Array(52)].map((_, i) => (new Card(i)));
const sleep = function(ms) {  return new Promise(resolve => setTimeout(resolve, ms)); }

// For testing purposes
const GENERATE_HAND = () => new Player(GENERATE_DECK().sort(() => (Math.random()-0.5)).splice(0,7));
const DRAW_TEST_HAND = (x) => Game.renderer.draw_test(x.cards);

// Stack overflow magic

// https://stackoverflow.com/questions/27266550/how-to-flatten-nested-array-in-javascript 
// Taken 17/11

Array.prototype.flatten = function() {
    var ret = [];
    for(var i = 0; i < this.length; i++) {
        if(Array.isArray(this[i])) {
            ret = ret.concat(this[i].flatten());
        } else {
            ret.push(this[i]);
        }
    }
    return ret;
};