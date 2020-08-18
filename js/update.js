// update.js v1 - AnteSocial
// runs game loop (game updates 50x per second)
counter=0
function loop(){
	if(player.happiness>0 || player.visible.happiness==true){
		g("happiness").style.display="block"
		player.visible.happiness=true
	}
	if(player.happiness>=5 || player.visible.upgrades==true){
		g("upgrades").style.display="block"
		player.visible.upgrades=true
	}
	if(player.upgrades.one==5 || player.visible.upgrade2==true){
		g("upgrade1").style.textDecoration="line-through"
		g("upgrade2").style.display="block"
		player.visible.upgrade2=true
	}
	if(player.upgrades.two==true || player.visible.upgrade3==true){
		g("upgrade2").style.textDecoration="line-through"
		g("upgrade3").style.display="block"
		player.visible.upgrade3=true
	}
	if(player.upgrades.two==true){
		counter+=1
		if(counter==50){
			convert(1)
			counter=0
		}
	}
	if(player.upgrades.three==true || player.visible.friends==true){
		g("upgrade3").style.textDecoration="line-through"
		g("upgrade4").style.display="block"
		g("friends").style.display="block"
		g("memories").style.display="block"
		player.visible.friends=true
		player.visible.memories=true
	}
	if(player.visible.friends==true && player.friends.friends >= 1){
		player.friends.memories+=(player.friends.friends/50)
		player.friends.friendsBoost=(Math.log10(player.friends.memories)+1)*(player.friends.mGain)
		u(g("memories"), "you have "+player.friends.memories.toFixed(1)+" memories")
		u(g("friendBoost"), "friends produce memories, which boost happiness gain (currently x"+player.friends.friendsBoost.toFixed(2)+")")
	}
	if(player.upgrades.four==true || player.visible.upgrade4==true){
		g("upgrade4").style.textDecoration="line-through"
		g("upgrade5").style.display="block"
		player.visible.upgrade4=true
	}
	if(player.upgrades.five || player.visible.upgrade5==true){
		g("upgrade5").style.textDecoration="line-through"
		g("upgrade6").style.display="block"
		player.visible.upgrade5=true
		player.serotonin+=(player.friends.memories/2)/50
	}
	uH()
}

window.setInterval(loop,20)