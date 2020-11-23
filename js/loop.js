function loop(){
	render()
	player.chems.serotonin+=(player.chems.sGainBase*player.chems.sGainMult)/20

	if(g("tooltipOption").checked){
		g("tooltip").style.display="none"
		player.options.tooltips=false
	} else {
		g("tooltip").style.display="block"
		player.options.tooltips=true
	}
	if(g("animationsOption").checked){
		player.options.animations=false
		g("anims").href=""
	} else {
		player.options.animations=true
		g("anims").href="css/animation.css"
	}
}
 
window.setInterval(loop,50) 