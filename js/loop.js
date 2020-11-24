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
	player.chems.serotonin+=getSerotoninGain()/20

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
	if(g("autoConvertHappiness").checked){
		player.options.autoConvertH=false
	} else {
		player.options.autoConvertH=true
	}
	g("upgrade4boost").innerHTML="x"+((Math.log(player.chems.happiness+1)/2)+1).toFixed(1)
}
 
window.setInterval(loop,50) 