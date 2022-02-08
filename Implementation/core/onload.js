window.onload = function() {				// When the window loads
	Theme.init();							// Initialise theme (color scheme)
	Tabs.init();							// Initialise tabs 
	Notifications.init();					// Initialise notifications
	Statistics.init();						// Initialise statistics.
	window.setInterval(function() { 		
		Statistics.update();				// Update statistics
		Statistics.saveStats();				// Save statistics
	}, 500);								// Every 0.5 seconds
	
	if(localStorage.getItem('rummy-game') == null) {	// If there isn't a saved game
		g("load-game").style.display = "none";			// Hide the load button
		g("start-game").innerText = "Start game";		// Change 'start new game' to 'start game'
	} else {											// Otherwise change load button text to show time started.
		g("load-game").innerText = "Load game - started " + new Date(Saving.get_load_time()).toString().substr(4,17);
	};
};