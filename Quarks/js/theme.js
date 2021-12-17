let Theme = {
	init() {
		this.root = document.querySelector(":root");
		this.setTheme(player.options.theme);
	},
	setTheme(theme) {
		if(theme==undefined) {
			theme = (player.options.theme=='Dark') ? 'Light' : 'Dark';
			player.options.theme = theme;
		}
		this.root.style.setProperty('--background-color', (theme=='Dark') ? 'black' : 'white');
		this.root.style.setProperty('--text-color', (theme=='Dark') ? 'white' : 'black');
		g("theme-btn").innerText = "Theme: " + theme;
	},
};