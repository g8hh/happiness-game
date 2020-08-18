// update.js v1 - AnteSocial
// runs game loop (game updates 50x per second)

function loop(){
	if(player.serotonin>=10){
		g("happiness").style.display="block"
	}
}

window.setInterval(loop,20)