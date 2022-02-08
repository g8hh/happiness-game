let Notifications = {
	init() {
		this.container = g("notifications");
	},
	notify(msg) {
		let ele = document.createElement("div");
		ele.classList.add("notification");
		ele.innerText = msg;
		this.container.appendChild(ele);
		setTimeout(() => (this.callback(ele)), 5000);
	},
	callback(ele) {
		this.container.removeChild(ele);
	}
};