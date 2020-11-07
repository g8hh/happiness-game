function loop(){
	// chemical additions
	player.chemicals.serotonin=player.chemicals.serotonin.add(player.chemicals.sgain.div(50))
	player.chemicals.dopamine=player.chemicals.dopamine.add(player.chemicals.dgain.div(50))
	player.chemicals.oxytocin=player.chemicals.oxytocin.add(player.chemicals.ogain.div(50))
	player.chemicals.endorphins=player.chemicals.endorphins.add(player.chemicals.egain.div(50))

	u("serotonin",player.chemicals.serotonin.toFixed(1))
	u("dopamine",player.chemicals.dopamine.toFixed(1))
	u("oxytocin",player.chemicals.oxytocin.toFixed(1))
	u("endorphins",player.chemicals.endorphins.toFixed(1))
}

window.setInterval(loop,50)