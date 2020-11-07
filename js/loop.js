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

	u("u1ps",player.upgrades.one.price+" serotonin")
	u("u1pd",player.upgrades.one.price+" dopamine")
	u("u1po",player.upgrades.one.price+" oxytocin")
	u("u1pe",player.upgrades.one.price+" endorphins")

	u("u1bs",player.upgrades.one.level[0]+" bought")
	u("u1bd",player.upgrades.one.level[1]+" bought")
	u("u1bo",player.upgrades.one.level[2]+" bought")
	u("u1be",player.upgrades.one.level[3]+" bought")
}	

window.setInterval(loop,50)