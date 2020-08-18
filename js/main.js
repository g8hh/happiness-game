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
		three: false,
		four: false,
		five: false,
	},
	friends: {
		friends: 0,
		friendsBoost: 1,
		friendsCost: 125,
		memories: 1,
		mGain: 1,
	},
	visible: {
		happiness: false,
		upgrades: false,
		upgrade2: false,
		upgrade3: false,
		upgrade4: false,
		upgrade5: false,
		upgrade6: false,
		friends: false,
		memories: false
	}
}


function increment(){
	player.serotonin+=player.gain;
	
	uH()
}

function convert(x){
	if(player.serotonin>=10){
		player.serotonin-=player.hCost
		player.happiness+=player.hGain*player.friends.friendsBoost
		uH()
	}
	if(x==1){
		if(player.serotonin>=10){
			while(player.serotonin>=10){
				player.serotonin-=player.hCost
				player.happiness+=player.hGain*player.friends.friendsBoost
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
		case 3:
			if(player.happiness>=200){
				player.happiness-=200
				player.upgrades.three=true
				player.friends.friends+=1
				uH()
			}
		case 4:
			if(player.happiness>=500){
				player.happiness-=500
				player.upgrades.four=true
				player.friends.mGain=2
			}
		case 5:
			if(player.happiness>=500){
				player.happiness-=500
				player.upgrades.five=true
			}
	}
}

function addFriend(){
	if(player.happiness>=player.friends.friendsCost){
		player.happiness-=player.friends.friendsCost
		player.friends.friendsCost*=2
		player.friends.friends+=1
		u(g("addfriend"),"+1 friend: "+player.friends.friendsCost+" happiness")
		uH()
	}
}