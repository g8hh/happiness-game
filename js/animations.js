g("upgrade1").onmouseover=function(){
	if(checkUpgrade1()){
		g("upgrade1").style.backgroundColor="lightgreen"
	} else {
		g("upgrade1").style.backgroundColor="lightcoral"
	}
}
g("upgrade1").onmouseout=function(){
	g("upgrade1").style.backgroundColor=""
}