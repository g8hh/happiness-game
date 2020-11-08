function loop(){
	// chemical additions
	player.chemicals.serotonin=player.chemicals.serotonin.add(player.chemicals.gain[0].div(20))
	player.chemicals.dopamine=player.chemicals.dopamine.add(player.chemicals.gain[1].div(20))
	player.chemicals.oxytocin=player.chemicals.oxytocin.add(player.chemicals.gain[2].div(20))
	player.chemicals.endorphins=player.chemicals.endorphins.add(player.chemicals.gain[3].div(20))

	u("serotonin",player.chemicals.serotonin.toFixed(1))
	u("dopamine",player.chemicals.dopamine.toFixed(1))
	u("oxytocin",player.chemicals.oxytocin.toFixed(1))
	u("endorphins",player.chemicals.endorphins.toFixed(1))

	u("sgain","(+"+player.chemicals.gain[0]+"/s)")
	u("dgain","(+"+player.chemicals.gain[1]+"/s)")
	u("ogain","(+"+player.chemicals.gain[2]+"/s)")
	u("egain","(+"+player.chemicals.gain[3]+"/s)")

	u("u1p",player.upgrades.one.price+" s/d/o/e")
	u("u1b",player.upgrades.one.level+" bought")
}	

window.setInterval(loop,50)