let Notifications = {
	list: [],
	createNotification(content) {
		let id = this.list.length;
		let elem = document.createElement("div")
		this.list.push(elem);
		elem.classList.add("notification")
		elem.id="notification"+id
		elem.innerText = content
		g("notifications").appendChild(elem)
		window.setTimeout(function(){ Notifications.removeNotification(id) }, 5000);
	},
	removeNotification(id) {
		g("notifications").removeChild(this.list[id]);
	},
};