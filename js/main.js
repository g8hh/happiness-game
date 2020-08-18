// main.js v1 - AnteSocial
// all the code for now

player={
	serotonin: 0,
	happiness: 0,
	gain: 1,
	hGain: 1,
	hCost: 10,
	upgrades: {
		one: 0,
		oneCost: 5
	}
}

function increment(){
	player.serotonin+=player.gain;
	u(g("serotonin"),"you have "+player.serotonin+" serotonin")
}

function convert(x){
	if(player.serotonin>=10){
		player.serotonin-=player.hCost
		player.happiness+=player.hGain
		u(g("serotonin"),"you have "+player.serotonin+" serotonin")
		u(g("happiness"),"you have "+player.happiness+" happiness")
	}
	if(x==1){
		if(player.serotonin>=10){
			while(player.serotonin>10){
				player.serotonin-=player.hCost
				player.happiness+=player.hGain
				u(g("serotonin"),"you have "+player.serotonin+" serotonin")
				u(g("happiness"),"you have "+player.happiness+" happiness")
			}
		}
	}
}

function upgrade(x){
	switch(x){
		case 1:
			if(player.happiness>=5 && player.upgrades.one<5){
				player.happiness-=5
				player.gain*=2
				player.upgrades.one+=1
				player.upgrades.oneCost+=(Math.ceil(player.upgrades.oneCost/2))
				if(player.upgrades.one<5){u(g("upgrade1"), "double serotonin gain: "+player.upgrades.oneCost+" happiness ["+player.upgrades.one+"/5]")} else {u(g("upgrade1"), "double serotonin gain: MAX ["+player.upgrades.one+"/5]")}
				u(g("happiness"),"you have "+player.happiness+" happiness")
			}
	}
}