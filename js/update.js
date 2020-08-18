// update.js v1 - AnteSocial
// runs game loop (game updates 50x per second)

function loop(){
	if(player.happiness>0){
		g("happiness").style.display="block"
	}
	if(player.happiness>=5){
		g("upgrades").style.display="block"
	}
}

window.setInterval(loop,20)