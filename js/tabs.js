let Tabs = {
	list: [],
	init() {
		this.list = document.getElementsByClassName('tab');
		this.showTab(player.tab);
	},
	showTab(x) {
		this.hideTabs();
		this.list[x].style.display = "block";
		player.tab = x;
	},
	hideTabs() {
		for(i=0; i<this.list.length; i++) {
			this.list[i].style.display = "none";
		}
	},
}