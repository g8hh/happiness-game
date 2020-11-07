g("upgrade1s").onmouseover=function(){
	if(player.chemicals.serotonin.lt(player.upgrades.one.price)){
		g("upgrade1s").style.backgroundColor="lightcoral"
	} else {
		g("upgrade1s").style.backgroundColor="lightgreen"
	}
}
g("upgrade1s").onmouseout=function(){
	g("upgrade1s").style.backgroundColor=""
}

g("upgrade1d").onmouseover=function(){
	if(player.chemicals.dopamine.lt(player.upgrades.one.price)){
		g("upgrade1d").style.backgroundColor="lightcoral"
	} else {
		g("upgrade1d").style.backgroundColor="lightgreen"
	}
}
g("upgrade1d").onmouseout=function(){
	g("upgrade1d").style.backgroundColor=""
}

g("upgrade1o").onmouseover=function(){
	if(player.chemicals.oxytocin.lt(player.upgrades.one.price)){
		g("upgrade1o").style.backgroundColor="lightcoral"
	} else {
		g("upgrade1o").style.backgroundColor="lightgreen"
	}
}
g("upgrade1o").onmouseout=function(){
	g("upgrade1o").style.backgroundColor=""
}

g("upgrade1e").onmouseover=function(){
	if(player.chemicals.endorphins.lt(player.upgrades.one.price)){
		g("upgrade1e").style.backgroundColor="lightcoral"
	} else {
		g("upgrade1e").style.backgroundColor="lightgreen"
	}
}
g("upgrade1e").onmouseout=function(){
	g("upgrade1e").style.backgroundColor=""
}