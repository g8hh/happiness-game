tooltips=document.getElementsByClassName("tooltip")
function toolTips(x){
	if(x){
		for(i=0;i<tooltips.length;i++){
			tooltips[i].style.display="block"
		}
	} else if (!x){
		for(i=0;i<tooltips.length;i++){
			tooltips[i].style.display="none"
		}
	}
}

function loop(){
	render()
	if(!player.upgrades.four.bought){
		player.chems.serotonin+=(player.chems.sGainBase*player.chems.sGainMult)/20
	} else if(player.upgrades.four.bought){
		player.chems.serotonin+=(player.chems.sGainBase*(player.chems.sGainMult*Math.log(player.chems.happiness)/2))/20
	}

	if(g("tooltipOption").checked){
		toolTips(false)
		player.options.tooltips=false
	} else {
		toolTips(true)
		player.options.tooltips=true
	}
	if(g("animationsOption").checked){
		player.options.animations=false
		g("anims").href=""
	} else {
		player.options.animations=true
		g("anims").href="css/animation.css"
	}
	g("upgrade4boost").innerHTML="x"+((Math.log(player.chems.happiness+1)/2)+1).toFixed(1)
}
 
window.setInterval(loop,50) 