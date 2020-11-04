player={
	serotonin: {
		amount: new Decimal(0),
		gain: new Decimal(2)
	},
	dopamine: {
		amount: new Decimal(0),
		gain: new Decimal(1)
	},
	happiness: {
		amount: new Decimal(0),
		gain: new Decimal(1)
	},
	upgrades: {
		one: {
			level: new Decimal(0),
			maxLevel: new Decimal(4),
			cost: new Decimal(10)
		},
		two: {
			level: new Decimal(0),
			maxLevel: new Decimal(4),
			cost: new Decimal(100)
		},
		three: {
			level: new Decimal(0),
			maxLevel: new Decimal(3),
			cost: new Decimal(100)
		},
		four: {
			bought: false,
			cost: new Decimal(250),
			boost: new Decimal(1)
		},
		five: {
			bought: false,
			cost: new Decimal(1000)
		}
	},
	friends: {
		amount: new Decimal(0),
		gain: new Decimal(1),
		cost: new Decimal(100)
	},
	memories: {
		amount: new Decimal(0),
		gain: new Decimal(0),
		upgrades: {
			one: {
				cost: new Decimal(100),
				level: new Decimal(0),
				maxLevel: new Decimal(10)
			},
			two: {
				cost: new Decimal(250),
				level: new Decimal(0),
				maxLevel: new Decimal(10)
			},
			three: {
				cost: new Decimal(500),
				level: new Decimal(0),
				maxLevel: new Decimal(5)
			}
		}
	},
	options: {
		bg: true
	}
}

function updateHTML(){
	u("serotonin","serotonin: "+player.serotonin.amount.toFixed(1)+" (+"+player.serotonin.gain.times(player.upgrades.four.boost).toFixed(1)+"/s)")
	u("dopamine","dopamine: "+player.dopamine.amount.toFixed(1)+" (+"+player.dopamine.gain.toFixed(1)+"/c)")
	u("happiness","happiness: "+player.happiness.amount.toFixed(1)+" (+"+player.happiness.gain.toFixed(1)+"/c)")
	if(player.friends.amount.eq(1)) {u("friends","you have "+player.friends.amount+" friend")} else {u("friends","you have "+player.friends.amount+" friends")}
	u("memories","you have "+player.memories.amount.toFixed(1)+" memories (+"+player.memories.gain.toFixed(1)+"/s)")
	u("gainfriend", "["+player.friends.cost.toFixed(1)+" happiness]")

	u("upgrade1","["+player.upgrades.one.level+"/"+player.upgrades.one.maxLevel+"] ["+player.upgrades.one.cost.div(player.memories.upgrades.two.level.plus(1)).toFixed(1)+" happiness]")
	if(player.upgrades.one.level.eq(player.upgrades.one.maxLevel)){
		u("upgrade1","["+player.upgrades.one.level+"/"+player.upgrades.one.maxLevel+"]")
	}
	u("upgrade2","["+player.upgrades.two.level+"/"+player.upgrades.two.maxLevel+"] ["+player.upgrades.two.cost.div(player.memories.upgrades.two.level.plus(1)).toFixed(1)+" dopamine]")
	if(player.upgrades.two.level.eq(player.upgrades.two.maxLevel)){
		u("upgrade2","["+player.upgrades.two.level+"/"+player.upgrades.two.maxLevel+"]")
	}
	u("upgrade3","["+player.upgrades.three.level+"/"+player.upgrades.three.maxLevel+"] ["+player.upgrades.three.cost.div(player.memories.upgrades.two.level.plus(1)).toFixed(1)+" serotonin]")
	if(player.upgrades.three.level.eq(player.upgrades.three.maxLevel)){
		u("upgrade3","["+player.upgrades.three.level+"/"+player.upgrades.three.maxLevel+"]")
	}

	u("mupgrade1","["+player.memories.upgrades.one.level+"/10] ["+player.memories.upgrades.one.cost.toFixed(1)+" memories]")
	if(player.memories.upgrades.one.level.eq(player.memories.upgrades.one.maxLevel)){
		u("mupgrade1","["+player.memories.upgrades.one.level+"/"+player.memories.upgrades.one.maxLevel+"]")
	}
	u("mupgrade2","["+player.memories.upgrades.two.level+"/5] ["+player.memories.upgrades.two.cost.toFixed(1)+" memories]")
	if(player.memories.upgrades.two.level.eq(player.memories.upgrades.two.maxLevel)){
		u("mupgrade2","["+player.memories.upgrades.two.level+"/"+player.memories.upgrades.two.maxLevel+"]")
	}
	u("mupgrade3","["+player.memories.upgrades.three.level+"/5] ["+player.memories.upgrades.three.cost.toFixed(1)+" memories]")
	if(player.memories.upgrades.three.level.eq(player.memories.upgrades.three.maxLevel)){
		u("mupgrade3","["+player.memories.upgrades.three.level+"/"+player.memories.upgrades.three.maxLevel+"]")
	}
}

function gain(x){
	switch(x){
		case 0:
			player.dopamine.amount=player.dopamine.amount.add(player.dopamine.gain)
			floatText("dopaminegain",player.dopamine.gain.toFixed(1),1000)
			break

		case 1:
			if(player.serotonin.amount.gte(5) && player.dopamine.amount.gte(5)){
				player.serotonin.amount=player.serotonin.amount.minus(5)
				player.dopamine.amount=player.dopamine.amount.minus(5)
				player.happiness.amount=player.happiness.amount.add(player.happiness.gain)
				floatText("convertdopamine",player.happiness.gain.toFixed(1),1000)
			}
			break
		case 2:
			if(player.happiness.amount.gte(player.friends.cost)){
				player.happiness.amount=player.happiness.amount.minus(player.friends.cost)
				player.friends.amount=player.friends.amount.plus(1)
				player.friends.cost=player.friends.cost.times(1.5)
			}
	}
}

function upgrade(x){
	switch(x){
		case 1:
			if(player.happiness.amount.gte(player.upgrades.one.cost.div(player.memories.upgrades.two.level.plus(1))) && player.upgrades.one.level.lt(player.upgrades.one.maxLevel)){
				player.happiness.amount=player.happiness.amount.minus(player.upgrades.one.cost.div(player.memories.upgrades.two.level.plus(1)))
				player.upgrades.one.level=player.upgrades.one.level.add(1)
				player.upgrades.one.cost=player.upgrades.one.cost.times(2)
				player.dopamine.gain=player.dopamine.gain.times(1.5)
				u("upgrade1","["+player.upgrades.one.level+"/"+player.upgrades.one.maxLevel+"] ["+player.upgrades.one.cost.div(player.memories.upgrades.two.level.plus(1)).toFixed(1)+" happiness]")
				if(player.upgrades.one.level.eq(player.upgrades.one.maxLevel)){
					u("upgrade1","["+player.upgrades.one.level+"/"+player.upgrades.one.maxLevel+"]")
				}
			}
			break
		case 2:
			if(player.dopamine.amount.gte(player.upgrades.two.cost.div(player.memories.upgrades.two.level.plus(1))) && player.upgrades.two.level.lt(player.upgrades.two.maxLevel)){
				player.dopamine.amount=player.dopamine.amount.minus(player.upgrades.two.cost.div(player.memories.upgrades.two.level.plus(1)))
				player.upgrades.two.level=player.upgrades.two.level.plus(1)
				player.upgrades.two.cost=player.upgrades.two.cost.times(2)
				player.serotonin.gain=player.serotonin.gain.times(1.5)
				u("upgrade2","["+player.upgrades.two.level+"/"+player.upgrades.two.maxLevel+"] ["+player.upgrades.two.cost.div(player.memories.upgrades.two.level.plus(1)).toFixed(1)+" dopamine]")
				if(player.upgrades.two.level.eq(player.upgrades.two.maxLevel)){
					u("upgrade2","["+player.upgrades.two.level+"/"+player.upgrades.two.maxLevel+"]")
				}
			}
			break
		case 3:
			if(player.serotonin.amount.gte(player.upgrades.three.cost.div(player.memories.upgrades.two.level.plus(1))) && player.upgrades.three.level.lt(player.upgrades.three.maxLevel)){
				player.serotonin.amount=player.serotonin.amount.minus(player.upgrades.three.cost.div(player.memories.upgrades.two.level.plus(1)))
				player.upgrades.three.level=player.upgrades.three.level.plus(1)
				player.upgrades.three.cost=player.upgrades.three.cost.times(2)
				player.happiness.gain=player.happiness.gain.times(1.5)
				u("upgrade3","["+player.upgrades.three.level+"/"+player.upgrades.three.maxLevel+"] ["+player.upgrades.three.cost.div(player.memories.upgrades.two.level.plus(1)).toFixed(1)+" serotonin]")
				if(player.upgrades.three.level.eq(player.upgrades.three.maxLevel)){
					u("upgrade3","["+player.upgrades.three.level+"/"+player.upgrades.three.maxLevel+"]")
				}
			}
			break
		case 4:
			if(player.happiness.amount.gte(player.upgrades.four.cost) && !player.upgrades.four.bought){
				player.happiness.amount=player.happiness.amount.minus(player.upgrades.four.cost)
				player.upgrades.four.bought=true;
				u("upgrade4","[1/1]")
			}
			break
		case 5:
			if(player.happiness.amount.gte(player.upgrades.five.cost) && player.serotonin.amount.gte(player.upgrades.five.cost) && player.dopamine.amount.gte(player.upgrades.five.cost)){
				player.upgrades.five.bought=true
				player.serotonin.amount=player.serotonin.amount.minus(1000)
				player.dopamine.amount=player.dopamine.amount.minus(1000)
				player.happiness.amount=player.happiness.amount.minus(1000)
				player.friends.amount=player.friends.amount.plus(1)
				u("upgrade5","[1/1]")
			}
			break
		case "m1":
			if(player.memories.amount.gte(player.memories.upgrades.one.cost) && player.memories.upgrades.one.level.lt(player.memories.upgrades.one.maxLevel)){
				player.memories.amount=player.memories.amount.minus(player.memories.upgrades.one.cost)
				player.memories.upgrades.one.cost=player.memories.upgrades.one.cost.times(1.8)
				player.memories.upgrades.one.level=player.memories.upgrades.one.level.plus(1)

				player.upgrades.one.maxLevel=player.upgrades.one.maxLevel.plus(1)
				player.upgrades.two.maxLevel=player.upgrades.two.maxLevel.plus(1)
				player.upgrades.three.maxLevel=player.upgrades.three.maxLevel.plus(1)
			}
			break
		case "m2":
			if(player.memories.amount.gte(player.memories.upgrades.two.cost) && player.memories.upgrades.two.level.lt(player.memories.upgrades.two.maxLevel)){
				player.memories.amount=player.memories.amount.minus(player.memories.upgrades.two.cost)
				player.memories.upgrades.two.cost=player.memories.upgrades.two.cost.times(1.5)
				player.memories.upgrades.two.level=player.memories.upgrades.two.level.plus(1)
			}
			break
		case "m3":
			if(player.memories.amount.gte(player.memories.upgrades.three.cost) && player.memories.upgrades.three.level.lt(player.memories.upgrades.three.maxLevel)){
				player.memories.amount=player.memories.amount.minus(player.memories.upgrades.three.cost)
				player.memories.upgrades.three.cost=player.memories.upgrades.three.cost.times(2)
				player.memories.upgrades.three.level=player.memories.upgrades.three.level.plus(1)
			}
			break
	}
}