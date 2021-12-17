let Tabs = {
	init() {
		this.tabList = document.querySelectorAll(".tab");
		this.showTab(player.options.tab);
	},
	hideTabs() {
		for(i=0;i<this.tabList.length;i++) {
			this.tabList[i].style.display = "none";
		};
	},
	showTab(x) {
		this.hideTabs();
		this.tabList[x].style.display = "block";
		player.options.tab = x;
	},
};