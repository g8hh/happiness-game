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
}

window.setInterval(loop,20)