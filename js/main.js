// main.js v1 - AnteSocial
// all the code for now

player={
	serotonin: 0,
	happiness: 0
}

function increment(){
	player.serotonin+=1;
	u(g("serotonin"),"you have "+player.serotonin+" serotonin")
}

function convert(){
	if(player.serotonin>=10){
		player.serotonin-=10
		player.happiness+=1
		u(g("serotonin"),"you have "+player.serotonin+" serotonin")
		u(g("happiness"),"you have "+player.happiness+" happiness")
	}
}