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
			maxLevel: new Decimal(4),
			cost: new Decimal(50)
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
	u("serotonin","serotonin: "+format(player.serotonin.amount)+" (+"+format(player.serotonin.gain.times(player.upgrades.four.boost))+"/s)")
	u("dopamine","dopamine: "+format(player.dopamine.amount)+" (+"+format(player.dopamine.gain)+"/c)")
	u("convertmax","gain max happiness (+"+format(Decimal.min(player.dopamine.amount,player.serotonin.amount).div(5).floor().times(player.happiness.gain))+")")
	u("happiness","happiness: "+format(player.happiness.amount)+" (+"+format(player.happiness.gain)+"/c)")
	if(player.friends.amount.eq(1)) {u("friends","you have "+player.friends.amount+" friend")} else {u("friends","you have "+player.friends.amount+" friends")}
	u("memories","you have "+format(player.memories.amount)+" memories (+"+format(player.memories.gain)+"/s)")
	u("gainfriend", "["+format(player.friends.cost)+" happiness]")

	u("upgrade1","["+player.upgrades.one.level+"/"+player.upgrades.one.maxLevel+"] ["+format(player.upgrades.one.cost.div(player.memories.upgrades.two.level.plus(1)))+" happiness]")
	if(player.upgrades.one.level.eq(player.upgrades.one.maxLevel)){
		u("upgrade1","["+player.upgrades.one.level+"/"+player.upgrades.one.maxLevel+"]")
	}
	u("upgrade2","["+player.upgrades.two.level+"/"+player.upgrades.two.maxLevel+"] ["+format(player.upgrades.two.cost.div(player.memories.upgrades.two.level.plus(1)))+" dopamine]")
	if(player.upgrades.two.level.eq(player.upgrades.two.maxLevel)){
		u("upgrade2","["+player.upgrades.two.level+"/"+player.upgrades.two.maxLevel+"]")
	}
	u("upgrade3","["+player.upgrades.three.level+"/"+player.upgrades.three.maxLevel+"] ["+format(player.upgrades.three.cost.div(player.memories.upgrades.two.level.plus(1)))+" serotonin]")
	if(player.upgrades.three.level.eq(player.upgrades.three.maxLevel)){
		u("upgrade3","["+player.upgrades.three.level+"/"+player.upgrades.three.maxLevel+"]")
	}

	u("mupgrade1","["+player.memories.upgrades.one.level+"/10] ["+format(player.memories.upgrades.one.cost)+" memories]")
	if(player.memories.upgrades.one.level.eq(player.memories.upgrades.one.maxLevel)){
		u("mupgrade1","["+player.memories.upgrades.one.level+"/"+player.memories.upgrades.one.maxLevel+"]")
	}
	u("mupgrade2","["+player.memories.upgrades.two.level+"/10] ["+format(player.memories.upgrades.two.cost)+" memories]")
	if(player.memories.upgrades.two.level.eq(player.memories.upgrades.two.maxLevel)){
		u("mupgrade2","["+player.memories.upgrades.two.level+"/"+player.memories.upgrades.two.maxLevel+"]")
	}
	u("mupgrade3","["+player.memories.upgrades.three.level+"/5] ["+format(player.memories.upgrades.three.cost)+" memories]")
	if(player.memories.upgrades.three.level.eq(player.memories.upgrades.three.maxLevel)){
		u("mupgrade3","["+player.memories.upgrades.three.level+"/"+player.memories.upgrades.three.maxLevel+"]")
	}
}

function gain(x){
	switch(x){
		case 0:
			player.dopamine.amount=player.dopamine.amount.add(player.dopamine.gain)
			floatText("dopaminegain",format(player.dopamine.gain))
			break

		case 1:
			if(player.serotonin.amount.gte(5) && player.dopamine.amount.gte(5)){
				player.serotonin.amount=player.serotonin.amount.minus(5)
				floatText2("serotoninContainer","5")
				player.dopamine.amount=player.dopamine.amount.minus(5)
				floatText2("dopamineContainer","5")
				player.happiness.amount=player.happiness.amount.add(player.happiness.gain)
				floatText("convertdopamine",format(player.happiness.gain))
			}
			break
		case 2:
			if(player.happiness.amount.gte(player.friends.cost)){
				player.happiness.amount=player.happiness.amount.minus(player.friends.cost)
				floatText2("happinessContainer",format(player.friends.cost))
				player.friends.amount=player.friends.amount.plus(1)
				player.friends.cost=player.friends.cost.times(1.5)
			}
			break
		case 3:
			if(player.dopamine.amount.gte(5) && player.dopamine.amount.gte(5)){
				gained=Decimal.min(player.dopamine.amount,player.serotonin.amount).div(5).floor()
				player.happiness.amount=player.happiness.amount.plus(gained.times(player.happiness.gain))
				player.dopamine.amount=player.dopamine.amount.minus(gained*5)
				floatText2("dopamineContainer",format(new Decimal(gained*5)))
				player.serotonin.amount=player.serotonin.amount.minus(gained*5)
				floatText2("serotoninContainer",format(new Decimal(gained*5)))
				floatText("convertmaxbutton",format(gained.times(player.happiness.gain)))
			}
			break
		case 4:
			if(checkGfUnlock()){
				alert("hey! you've reached the end of the content i was arsed to implement. don't worry, more coming soon maybe hopefully")
			}
			break
	}
}

function upgrade(x){
	switch(x){
		case 1:
			if(player.happiness.amount.gte(player.upgrades.one.cost.div(player.memories.upgrades.two.level.plus(1))) && player.upgrades.one.level.lt(player.upgrades.one.maxLevel)){
				player.happiness.amount=player.happiness.amount.minus(player.upgrades.one.cost.div(player.memories.upgrades.two.level.plus(1)))
				floatText2("happinessContainer",player.upgrades.one.cost.div(player.memories.upgrades.two.level.plus(1)))
				player.upgrades.one.level=player.upgrades.one.level.add(1)
				player.upgrades.one.cost=player.upgrades.one.cost.times(2)
				player.dopamine.gain=player.dopamine.gain.times(1.8)
			}
			break
		case 2:
			if(player.dopamine.amount.gte(player.upgrades.two.cost.div(player.memories.upgrades.two.level.plus(1))) && player.upgrades.two.level.lt(player.upgrades.two.maxLevel)){
				player.dopamine.amount=player.dopamine.amount.minus(player.upgrades.two.cost.div(player.memories.upgrades.two.level.plus(1)))
				floatText2("dopamineContainer",player.upgrades.two.cost.div(player.memories.upgrades.two.level.plus(1)))
				player.upgrades.two.level=player.upgrades.two.level.plus(1)
				player.upgrades.two.cost=player.upgrades.two.cost.times(2)
				player.serotonin.gain=player.serotonin.gain.times(1.5)
			}
			break
		case 3:
			if(player.serotonin.amount.gte(player.upgrades.three.cost.div(player.memories.upgrades.two.level.plus(1))) && player.upgrades.three.level.lt(player.upgrades.three.maxLevel)){
				player.serotonin.amount=player.serotonin.amount.minus(player.upgrades.three.cost.div(player.memories.upgrades.two.level.plus(1)))
				floatText2("serotoninContainer",player.upgrades.three.cost.div(player.memories.upgrades.two.level.plus(1)))
				player.upgrades.three.level=player.upgrades.three.level.plus(1)
				player.upgrades.three.cost=player.upgrades.three.cost.times(2)
				player.happiness.gain=player.happiness.gain.times(1.5)
			}
			break
		case 4:
			if(player.happiness.amount.gte(player.upgrades.four.cost) && !player.upgrades.four.bought){
				player.happiness.amount=player.happiness.amount.minus(player.upgrades.four.cost)
				floatText2("happinessContainer",player.upgrades.four.cost)
				player.upgrades.four.bought=true;
			}
			break
		case 5:
			if(!player.upgrades.five.bought){
				if(player.happiness.amount.gte(player.upgrades.five.cost) && player.serotonin.amount.gte(player.upgrades.five.cost) && player.dopamine.amount.gte(player.upgrades.five.cost)){
					player.upgrades.five.bought=true
					player.serotonin.amount=player.serotonin.amount.minus(1000)
					player.dopamine.amount=player.dopamine.amount.minus(1000)
					player.happiness.amount=player.happiness.amount.minus(1000)
					floatText2("serotoninContainer","1e3")
					floatText2("dopamineContainer","1e3")
					floatText2("happinessContainer","1e3")
					player.friends.amount=player.friends.amount.plus(1)
				}
			}
			break
		case "m1":
			if(player.memories.amount.gte(player.memories.upgrades.one.cost) && player.memories.upgrades.one.level.lt(player.memories.upgrades.one.maxLevel)){
				player.memories.amount=player.memories.amount.minus(player.memories.upgrades.one.cost)
				floatText2("memoriesContainer",player.memories.upgrades.one.cost)
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
				floatText2("memoriesContainer",player.memories.upgrades.two.cost)
				player.memories.upgrades.two.cost=player.memories.upgrades.two.cost.times(1.5)
				player.memories.upgrades.two.level=player.memories.upgrades.two.level.plus(1)
			}
			break
		case "m3":
			if(player.memories.amount.gte(player.memories.upgrades.three.cost) && player.memories.upgrades.three.level.lt(player.memories.upgrades.three.maxLevel)){
				player.memories.amount=player.memories.amount.minus(player.memories.upgrades.three.cost)
				floatText2("memoriesContainer",player.memories.upgrades.three.cost)
				player.memories.upgrades.three.cost=player.memories.upgrades.three.cost.times(2)
				player.memories.upgrades.three.level=player.memories.upgrades.three.level.plus(1)
			}
			break
	}
}