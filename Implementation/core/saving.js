let Saving = {
	save(notify) {
		if(notify == undefined) notify = false;					// game saves automatically, don't want notification every time.
		let data = JSON.stringify(Game);						// convert game object to JSON string
		localStorage.setItem("rummy-game", data);				// push JSON string to localStorage under 'rummy-game' key
		if(notify) Notifications.notify("Game saved!");			// notify if needed
	},
	load() {
		data = JSON.parse(localStorage.getItem("rummy-game"));	// fetch saved data from localStorage and parse the JSON string
		Game.load_game(data);									// initialise game with loaded data
	},
	start_new_game(notify) {									
		if(notify == undefined) notify = false;					// added to prevent errors if function called without passing an argument
		if(Game.state==0) return;								// can't start a new game if no game has started
		Game = new Rummy(Render);								// construct fresh object from class
		Game.start_game();										// automatically start that game
		this.clear_game();										// delete any saved game from storage		
		if(notify) Notifications.notify("New game started!");	// notify if need
	},
	get_load_time() {											// used in the load game button text
		data = JSON.parse(localStorage.getItem("rummy-game"));	// get saved data
		return data.time_started;								// return the time started
	},
	clear_game() {
		localStorage.removeItem("rummy-game");					// remove any saved game from localstorage
	},
};