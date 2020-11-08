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
			level: 0,
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
		if(checkUpgrade1()){
			player.upgrades.one.level+=1
			doubleGain()
			player.upgrades.one.price=player.upgrades.one.price.times(3)
		}
	}
}