function save(){
	psave = JSON.stringify(player)
	localStorage.setItem("save", btoa(psave));
}

function reset(){
	localStorage.clear()
	window.location.reload()
}

window.setInterval(save,10000)

window.onload = function(){
	player=JSON.parse(atob(localStorage.getItem("save")))
	player={
		serotonin: {
			amount: new Decimal(player.serotonin.amount),
			gain: new Decimal(player.serotonin.gain)
		},
		dopamine: {
			amount: new Decimal(player.dopamine.amount),
			gain: new Decimal(player.dopamine.gain)
		},
		happiness: {
			amount: new Decimal(player.happiness.amount),
			gain: new Decimal(player.happiness.gain)
		},
		upgrades: {
			one: {
				level: new Decimal(player.upgrades.one.level),
				maxLevel: new Decimal(player.upgrades.one.maxLevel),
				cost: new Decimal(player.upgrades.one.cost)
			},
			two: {
				level: new Decimal(player.upgrades.two.level),
				maxLevel: new Decimal(player.upgrades.two.maxLevel),
				cost: new Decimal(player.upgrades.two.cost)
			},
			three: {
				level: new Decimal(player.upgrades.three.level),
				maxLevel: new Decimal(player.upgrades.three.maxLevel),
				cost: new Decimal(player.upgrades.three.cost)
			},
			four: {
				bought: player.upgrades.four.bought,
				cost: new Decimal(player.upgrades.four.cost),
				boost: new Decimal(1)
			},
			five: {
				bought: player.upgrades.five.bought,
				cost: new Decimal(player.upgrades.five.cost)
			}
		},
		friends: {
			amount: new Decimal(player.friends.amount)
		},
		memories: {
			amount: new Decimal(player.memories.amount),
			gain: new Decimal(player.memories.gain)
		}
	}

	u("upgrade1","["+player.upgrades.one.level+"/"+player.upgrades.one.maxLevel+"] ["+player.upgrades.one.cost.toFixed(1)+" happiness]")
	if(player.upgrades.one.level.eq(player.upgrades.one.maxLevel)){
		u("upgrade1","["+player.upgrades.one.level+"/"+player.upgrades.one.maxLevel+"]")
	}
	u("upgrade2","["+player.upgrades.two.level+"/"+player.upgrades.two.maxLevel+"] ["+player.upgrades.two.cost.toFixed(1)+" dopamine]")
	if(player.upgrades.two.level.eq(player.upgrades.two.maxLevel)){
		u("upgrade2","["+player.upgrades.two.level+"/"+player.upgrades.two.maxLevel+"]")
	}
	u("upgrade3","["+player.upgrades.three.level+"/"+player.upgrades.three.maxLevel+"] ["+player.upgrades.three.cost.toFixed(1)+" serotonin]")
	if(player.upgrades.three.level.eq(player.upgrades.three.maxLevel)){
		u("upgrade3","["+player.upgrades.three.level+"/"+player.upgrades.three.maxLevel+"]")
	}
}
