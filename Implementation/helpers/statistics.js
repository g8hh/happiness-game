let Statistics = {
	init() {
		this.elements = [...Array(8)].map((_, i) => (g("s"+(i+1))));
		this.lastUpdate = Date.now();
		this.loadStats();
		this.update();
	},
	stats: {
		timeTotal: 0,
		timeInGame: 0,
		fastestWin: 999*3600*1000,
		totalGames: 0,
		totalCards: 0,
		playerWins: 0,
		opponentWins: 0,
	},
	saveStats() {
		localStorage.setItem('stats', JSON.stringify(this.stats));
	},
	loadStats() {
		if(localStorage.getItem("stats") == null) this.saveStats();
		this.stats = JSON.parse(localStorage.getItem('stats'));
		if(localStorage.getItem('rummy-game') == null) this.stats.timeInGame = 0;
	},
	reset() {
		if(!confirm("Are you sure?")) return;
		this.stats = {
			timeTotal: 0,
			timeInGame: 0,
			fastestWin: 999*3600*1000,
			totalGames: 0,
			totalCards: 0,
			playerWins: 0,
			opponentWins: 0,
		};
		this.saveStats();
	},
	timeFormat(time) {
		let seconds = (time / 1e3).toFixed(0);
		let minutes = 0;
		let hours = 0;
		if(seconds >= 60) {
			minutes = Math.floor(seconds / 60)
			seconds = (seconds%60).toFixed(0);
		}
		if(minutes >= 60) {
			hours = Math.floor(minutes / 60)
			minutes = minutes%60;
		}
		if(hours<10) hours = "0" + hours;
		if(minutes<10) minutes = "0" + minutes;
		if(seconds<10) seconds = "0" + seconds;
		return hours + ":" + minutes + ":" + seconds;
	},
	
	winPercentage() {
		if(this.stats.playerWins == 0) return "0%";
		if(this.stats.totalGames == 0) return "0%";
		return (this.stats.playerWins/this.stats.totalGames*100).toFixed(1) + "%";
	},
	
	update() {
		let now = Date.now();
		let diff = now - this.lastUpdate;
		this.lastUpdate = now;
		
		if(Game.state != 0 && Game.state < 4) {
			this.stats.timeTotal += diff;
			Game.time_played += diff;
			this.stats.timeInGame = Game.time_played;
		}
		
		this.elements[0].innerText = this.timeFormat(this.stats.timeTotal);
		this.elements[1].innerText = Game.state == 0 ? this.timeFormat(0) : this.timeFormat(this.stats.timeInGame);
		this.elements[2].innerText = this.stats.totalGames;
		this.elements[3].innerText = this.stats.totalCards;
		this.elements[4].innerText = this.stats.playerWins;
		this.elements[5].innerText = this.stats.opponentWins;
		this.elements[6].innerText = this.timeFormat(this.stats.fastestWin);
		this.elements[7].innerText = this.winPercentage(); + "%";
	},
};