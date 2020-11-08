function g(x){
	return document.getElementById(x)
}
function u(x,y){
	g(x).innerHTML=y
}
function float(a,b){
	c=document.createElement("div")
	c.id="float"
	c.innerHTML="+"+b
	g(a).appendChild(c)
	window.setTimeout(function(){g(a).removeChild(g(a).childNodes[0])},1000)
}
function floatdown(a,b){
	c=document.createElement("div")
	c.id="floatred"
	c.innerHTML="-"+b
	g(a).appendChild(c)
	window.setTimeout(function(){g(a).removeChild(g(a).childNodes[0])},1000)
}
function rng(a,b) {
  return Math.floor(Math.random()*(b-a+1))+a;
}
function checkUpgrade1(){
	if(player.chemicals.serotonin.gte(player.upgrades.one.price) ||
	   player.chemicals.dopamine.gte(player.upgrades.one.price) ||
	   player.chemicals.oxytocin.gte(player.upgrades.one.price) ||
	   player.chemicals.endorphins.gte(player.upgrades.one.price)){
		return true
	} else {
		return false
	}
}
function doubleGain(){
	if(player.chemicals.serotonin.gte(player.upgrades.one.price)){
		player.chemicals.serotonin=player.chemicals.serotonin.minus(player.upgrades.one.price)
	} else if (player.chemicals.dopamine.gte(player.upgrades.one.price)){
		player.chemicals.dopamine=player.chemicals.dopamine.minus(player.upgrades.one.price)
	} else if (player.chemicals.oxytocin.gte(player.upgrades.one.price)){
		player.chemicals.oxytocin=player.chemicals.oxytocin.minus(player.upgrades.one.price)
	} else if (player.chemicals.endorphins.gte(player.upgrades.one.price)){
		player.chemicals.endorphins=player.chemicals.endorphins.minus(player.upgrades.one.price)
	} else {
		console.log("i fucked up")
	}
	for(i=0;i<player.chemicals.gain.length;i++){
		player.chemicals.gain[i]=player.chemicals.gain[i].times(2)
	}
}