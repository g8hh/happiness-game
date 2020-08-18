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
		oneCost: 5,
		two: false,
		twoCost: 100
	},
	visible: {
		happiness: false,
		upgrades: false,
		upgrade2: false,
		upgrade3: false
	}
}



function increment(){
	player.serotonin+=player.gain;
	uH()
}

function convert(x){
	if(player.serotonin>=10){
		player.serotonin-=player.hCost
		player.happiness+=player.hGain
		uH()
	}
	if(x==1){
		if(player.serotonin>=10){
			while(player.serotonin>10){
				player.serotonin-=player.hCost
				player.happiness+=player.hGain
				uH()
			}
		}
	}
}

function upgrade(x){
	switch(x){
		case 1:
			if(player.happiness>=5 && player.upgrades.one<5){
				player.happiness-=5
				player.gain*=1.3
				player.upgrades.one+=1
				player.upgrades.oneCost+=(Math.ceil(player.upgrades.oneCost/2))
				uH()
			}
		case 2:
			if(player.happiness>=100){
				player.happiness-=100
				player.upgrades.two=true
				uH()
			}
	}
}