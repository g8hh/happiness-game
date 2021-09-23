upgrades=[]
for(n=0;n<document.querySelector('#mupgrade table tbody').childNodes.length/2;n++){upgrades.push(document.querySelector('#mupgrade tr:nth-child('+(n+1)+') td:nth-child(2)'))}

function getFriendTimer(){
	var base = player.friend.time
	if(player.experiences.upgrades.one) base/=(Math.pow((player.experiences.amount+1),0.35))

	return base
}

upgrades[0].onclick=function(){
	if(player.experiences.amount>=5){
		player.experiences.amount-=5
		floatTextDown("experiencefloat",5)
		update()
		player.experiences.upgrades.one=true
		g("mrow1").style.display="none"
	}
}