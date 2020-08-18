// main.js v1 - AnteSocial
// all the code for now

player={
	serotonin: 0
}

function increment(){
	player.serotonin+=1;
	u(g("serotonin"),"you have "+player.serotonin+" serotonin")
}