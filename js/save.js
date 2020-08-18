// save.js v1 - AnteSocial
// Create & Load Save files

function save(){
	save = JSON.stringify(player)
	localStorage.setItem("save", btoa(save));
}

window.setInterval(save,500)

function load(){
	player = JSON.parse(atob(localStorage.getItem("save")))
	uH()
}

load()