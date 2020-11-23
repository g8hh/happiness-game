player = {
	chems: {
		serotonin:0,
		dGain: 1,
		dopamine:0,
		sGainBase: 2,
		sGainMult: 1,
		happiness:0,
		hGain: 1
	},
	automation: {
		auto1: false,
		auto2: false
	},
	upgrades: {
		one: {
			level:0,
			price:50
		},
		two: {
			level:0,
			price:10
		},
		three: {
			level:0,
			price:50
		}
	},
	options: {
		tooltips: true,
		animations: true
	}
}

function g(x){
	return document.getElementById(x)
}

// Gain Buttons
g("gainDopamine").onclick=function(){
	player.chems.dopamine+=player.chems.dGain
	floatText("gainDopamine",player.chems.dGain,'dopamine')
	render()
}
g("gainHappiness").onclick=function(){
	if(player.chems.dopamine>=5 && player.chems.serotonin>=5){
		player.chems.dopamine-=5
		player.chems.serotonin-=5
		player.chems.happiness+=player.chems.hGain
		floatText("gainHappiness",player.chems.hGain,"happiness")
		floatTextDown("s",5,"serotonin")
		floatTextDown("d",5,"dopamine")
	}
}

// Automation Upgrades
g("auto1").onclick=function(){
	if(player.chems.serotonin>=100){
		player.chems.serotonin-=100
		floatTextDown("s",100,"serotonin")
		g("auto1row").style.display="none"
		player.automation.auto1=true;
		window.setInterval(automation,500)
	}
}
g("auto2").onclick=function(){
	if(player.chems.happiness>=100){
		player.chems.happiness-=100
		floatTextDown("h",100,"happiness")
		g("auto2row").style.display="none"
		player.automation.auto2=true;
	}
}