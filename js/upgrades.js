function floatTextDown(elm,value,curr){
	float=document.createElement('span')
	float.className="floatdown"
	float.innerText="-"+value+" "+curr
	g(elm).appendChild(float)
	window.setTimeout(function(){g(elm).removeChild(g(elm).childNodes[1])},1000)
}

g("upgrade1").onclick=function(){
	if(player.chems.dopamine>=player.upgrades.one.price && player.upgrades.one.level<5){
		player.chems.dopamine-=player.upgrades.one.price
		floatTextDown("d",player.upgrades.one.price,"dopamine")
		player.upgrades.one.price=Math.ceil(player.upgrades.one.price*2.5)
		player.upgrades.one.level+=1
		player.chems.sGainMult*=2
		update()
	}
}

g("upgrade2").onclick=function(){
	if(player.chems.happiness>=player.upgrades.two.price && player.upgrades.two.level<5){
		player.chems.happiness-=player.upgrades.two.price
		floatTextDown("h",player.upgrades.two.price,"happiness")
		player.upgrades.two.price=Math.ceil(player.upgrades.two.price*2.5)
		player.upgrades.two.level+=1
		player.chems.dGain*=2
		update()
	}
}

g("upgrade3").onclick=function(){
	if(player.chems.serotonin>=player.upgrades.three.price && player.upgrades.three.level<5){
		player.chems.serotonin-=player.upgrades.three.price
		floatTextDown("s",player.upgrades.three.price,"serotonin")
		player.upgrades.three.price=Math.ceil(player.upgrades.three.price*2.5)
		player.upgrades.three.level+=1
		player.chems.hGain*=2
		update()
	}
}