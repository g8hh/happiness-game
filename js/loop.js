function loop(){
	updateHTML()

	player.serotonin.amount=player.serotonin.amount.add(player.serotonin.gain.div(50).times(player.upgrades.four.boost))
	if(player.upgrades.four.bought){
		g("u5").style.display="block"
		player.upgrades.four.boost=Decimal.ln(player.happiness.amount.add(1)).add(2).div(2)
		u("upgrade4", "[1/1] (x"+player.upgrades.four.boost.toFixed(2)+")")
	}
	if(player.upgrades.five.bought){
		g("friend").style.display="block"
		player.memories.amount=player.memories.amount.add(player.memories.gain.div(50))
		player.memories.gain=player.friends.amount.pow(player.memories.upgrades.three.level.div(10).plus(2))
		u("upgrade5", "[1/1]")
	}
	if(checkGfUnlock()){
		g("girlfriend").style.display="block"
	}
}

window.setInterval(loop,20)