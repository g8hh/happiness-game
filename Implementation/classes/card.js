class Card {
	constructor(id) {
		this.id = id;
		this.value = VALUES[id%13];
		this.suit = SUITS[Math.floor(id/13)];
		
		Object.defineProperty(this,'value',{writable:false});
		Object.defineProperty(this,'suit',{writable:false});
	}
	
	static repr(x) {
		return "<span style='color: " + (Math.floor(x/13)<2 ? "red" : "var(--text-color)") + "'>" + new Card(x).value + new Card(x).suit + "</span>";
	}
};
	