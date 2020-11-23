function floatText(elm,value,curr){
	float=document.createElement('span')
	float.className="float"
	float.innerText="+"+value+" "+curr
	g(elm).appendChild(float)
	window.setTimeout(function(){g(elm).removeChild(g(elm).childNodes[1])},1000)
}
function floatTextDown(elm,value,curr){
	float=document.createElement('span')
	float.className="floatdown"
	float.innerText="-"+value+" "+curr
	g(elm).appendChild(float)
	window.setTimeout(function(){g(elm).removeChild(g(elm).childNodes[1])},1000)
}

g("auto1").onmouseover=function(){
	bg=window.setInterval(function(){
		if(player.chems.serotonin>=100){
			g("auto1price").style.backgroundColor="lightgreen"
		} else {
			g("auto1price").style.backgroundColor="lightcoral"
		}
	},100)
	g("auto1").onmouseout=function(){
		g("auto1price").style.backgroundColor="transparent"
		clearInterval(bg)
	}
}

g("auto2").onmouseover=function(){
	bg=window.setInterval(function(){
		if(player.chems.happiness>=100){
			g("auto2price").style.backgroundColor="lightgreen"
		} else {
			g("auto2price").style.backgroundColor="lightcoral"
		}
	},100)
	g("auto2").onmouseout=function(){
		g("auto2price").style.backgroundColor="transparent"
		clearInterval(bg)
	}
}

g("upgrade1").onmouseover=function(){
	bg=window.setInterval(function(){
		if(player.chems.dopamine>=player.upgrades.one.price){
			g("upgrade1price").style.backgroundColor="lightgreen"
		} else {
			g("upgrade1price").style.backgroundColor="lightcoral"
		}
	},100)
	g("upgrade1").onmouseout=function(){
		g("upgrade1price").style.backgroundColor="transparent"
		clearInterval(bg)
	}
}

g("upgrade2").onmouseover=function(){
	bg=window.setInterval(function(){
		if(player.chems.happiness>=player.upgrades.two.price){
			g("upgrade2price").style.backgroundColor="lightgreen"
		} else {
			g("upgrade2price").style.backgroundColor="lightcoral"
		}	
	},100)
	g("upgrade2").onmouseout=function(){
		g("upgrade2price").style.backgroundColor="transparent"
		clearInterval(bg)
	}
}

g("upgrade3").onmouseover=function(){
	bg=window.setInterval(function(){
		if(player.chems.serotonin>=player.upgrades.three.price){
			g("upgrade3price").style.backgroundColor="lightgreen"
		} else {
			g("upgrade3price").style.backgroundColor="lightcoral"
		}
	},100)
	g("upgrade3").onmouseout=function(){
		g("upgrade3price").style.backgroundColor="transparent"
		clearInterval(bg)
	}
}
