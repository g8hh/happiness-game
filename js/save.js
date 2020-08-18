// save.js v1 - AnteSocial
// Create & Load Save files

function save(){
	psave = JSON.stringify(player)
	localStorage.setItem("save", btoa(psave));
}
function saved(){
	document.getElementById("save").innerHTML="saved!"
	window.setTimeout(function(){document.getElementById("save").innerHTML="save"},1000)
}

window.setInterval(save,500)

function load(){
	player=JSON.parse(atob(localStorage.getItem("save")))
	uH()
}

load()