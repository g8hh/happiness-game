let Tabs = {
	init() {
		this.tabs = document.querySelectorAll(".tab");
		this.set(0);
	},
	set(tab) {
		this.hide();
		this.tabs[tab].style.display = "block";
	},
	hide() {
		this.tabs.forEach(x => x.style.display = "none");
	}
};