let Notifications = {
	init() {
		this.container = g("notifications");
	},
	notify(msg) {
		let ele = document.createElement("div");
		ele.classList.add("notification");
		ele.innerText = msg;
		this.container.appendChild(ele);
		setTimeout(function() { Notifications.callback(ele) }, 2000);
	},
	callback(ele) {
		this.container.removeChild(ele);
	}
};