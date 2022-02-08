let Theme = {
	init() {
		this.root = document.querySelector(":root");
		this.container = document.getElementById("theme-btn");
		this.theme = "Light";
		this.set(this.theme);
	},
	toggle() {
		this.theme = this.theme == "Dark" ? "Light" : "Dark";
		Game.renderer.theme = this.theme;
		this.set(this.theme);
	},
	set(theme) {
		this.theme = theme;
		this.container.innerText = "Theme: " + this.theme;
		if(this.theme == "Dark") {
			this.root.style.setProperty("--background-color", "black");
			this.root.style.setProperty("--text-color", "white");
			this.root.style.setProperty("--header-color", "#aaa");
			this.root.style.setProperty("--highlight-color", "#f0f");
		} else {
			this.root.style.setProperty("--background-color", "white");
			this.root.style.setProperty("--text-color", "black");
			this.root.style.setProperty("--header-color", "#eee");
			this.root.style.setProperty("--highlight-color", "#ff0");
		}
	}
};