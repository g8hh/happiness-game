let Notifications = {
	notify(content) {
		let div = document.createElement('div');
		div.innerText = content;
		div.classList.add('notification');
		div.onclick = () => (this.remove(div))
		document.getElementById('notifications').appendChild(div);
		setTimeout(() => (this.remove(div)), 5000);
	},
	remove(elem) {
		if(elem.parentElement === document.getElementById('notifications')) {
			document.getElementById('notifications').removeChild(elem)
		}
	}
};