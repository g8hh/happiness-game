g("auto1").onmouseover=function(){
	if(player.chems.serotonin>=100){
		g("auto1price").style.backgroundColor="lightgreen"
	} else {
		g("auto1price").style.backgroundColor="lightcoral"
	}
}
g("auto1").onmouseout=function(){
	g("auto1price").style.backgroundColor="transparent"
}
g("auto2").onmouseover=function(){
	if(player.chems.happiness>=100){
		g("auto2price").style.backgroundColor="lightgreen"
	} else {
		g("auto2price").style.backgroundColor="lightcoral"
	}
}
g("auto2").onmouseout=function(){
	g("auto2price").style.backgroundColor="transparent"
}

g("upgrade1").onmouseover=function(){
	if(player.chems.happiness>=player.upgrades.one.price){
		g("upgrade1price").style.backgroundColor="lightgreen"
	} else {
		g("upgrade1price").style.backgroundColor="lightcoral"
	}
}
g("upgrade1").onmouseout=function(){
	g("upgrade1price").style.backgroundColor="transparent"
}

g("upgrade2").onmouseover=function(){
	if(player.chems.serotonin>=player.upgrades.two.price){
		g("upgrade2price").style.backgroundColor="lightgreen"
	} else {
		g("upgrade2price").style.backgroundColor="lightcoral"
	}
}
g("upgrade2").onmouseout=function(){
	g("upgrade2price").style.backgroundColor="transparent"
}