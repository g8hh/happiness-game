let Tabs = {
	names: ['main','options','statistics','achievements'],
	showTab(name) {
		if(!this.names.includes(name)) return;
		document.getElementById(player.tab + "-tab").style.display = "none";
		document.getElementById(name + "-tab").style.display = "";
		player.tab = name;
	},
};