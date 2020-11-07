player = {
	chemicals:{
		serotonin: new Decimal(0),
		dopamine: new Decimal(0),
		oxytocin: new Decimal(0),
		endorphins: new Decimal(0),
		gain: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)]
	},
	upgrades:{
		one: {
			level: [0,0,0,0],
			price: new Decimal(100)
		}
	}
}

g("gain").onclick=function(){
	a=rng(1,4)
	if(a==1){
		player.chemicals.serotonin=player.chemicals.serotonin.plus(1)
		float("sfloat",1)
	} else if (a==2){
		player.chemicals.dopamine=player.chemicals.dopamine.plus(1)
		float("dfloat",1)
	} else if (a==3){
		player.chemicals.oxytocin=player.chemicals.oxytocin.plus(1)
		float("ofloat",1)
	} else if (a==4){
		player.chemicals.endorphins=player.chemicals.endorphins.plus(1)
		float("efloat",1)
	} else {
		console.log("Something has gone horribly, horribly wrong.")
	}
}

function upgrade(x){
	if(x==1){
		if(player.chemicals.serotonin.gte(player.upgrades.one.price)){
			player.chemicals.serotonin=player.chemicals.serotonin.minus(player.upgrades.one.price)
			player.upgrades.one.price=player.upgrades.one.price.times(3)
			player.upgrades.one.level[0]+=1
			doubleGain()
		}
	} else if (x==2){
		if(player.chemicals.dopamine.gte(player.upgrades.one.price)){
			player.chemicals.dopamine=player.chemicals.dopamine.minus(player.upgrades.one.price)
			player.upgrades.one.price=player.upgrades.one.price.times(3)
			player.upgrades.one.level[1]+=1
			doubleGain()
		}
	} else if (x==3){
		if(player.chemicals.oxytocin.gte(player.upgrades.one.price)){
			player.chemicals.oxytocin=player.chemicals.oxytocin.minus(player.upgrades.one.price)
			player.upgrades.one.price=player.upgrades.one.price.times(3)
			player.upgrades.one.level[2]+=1
			doubleGain()
		}
	} else if (x==4){
		if(player.chemicals.endorphins.gte(player.upgrades.one.price)){
			player.chemicals.endorphins=player.chemicals.endorphins.minus(player.upgrades.one.price)
			player.upgrades.one.price=player.upgrades.one.price.times(3)
			player.upgrades.one.level[3]+=1
			doubleGain()
		}
	}
}

function doubleGain(){
	for(i=0;i<player.chemicals.gain.length;i++){
		player.chemicals.gain[i]=player.chemicals.gain[i].times(2)
	}
}