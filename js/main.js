player = {
	chems: {
		serotonin:0,
		dGain: 1,
		dopamine:0,
		sGainBase: 1,
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
			price:10
		},
		two: {
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
function render(){
	g("serotonin").innerText="serotonin: "+player.chems.serotonin.toFixed(1)+" (+"+player.chems.sGainBase*player.chems.sGainMult+"/s)"
	g("dopamine").innerText="dopamine: "+player.chems.dopamine.toFixed(1)+" (+"+player.chems.dGain+"/c)"
	g("happiness").innerText="happiness: "+player.chems.happiness.toFixed(1)+" (+"+player.chems.hGain+"/c)"
}
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
g("save").onclick=function(){
	localStorage.setItem("save",btoa(JSON.stringify(player)))
	this.innerText="saved!"
	window.setTimeout(function(){g("save").innerText="save"},1000)
}
function save(){
	localStorage.setItem("save",btoa(JSON.stringify(player)))
}
window.setInterval(save,15000)
g("reset").onclick=function(){
	if(confirm("Are you sure?")){
		localStorage.clear()
		window.location.reload()
	}
}
window.onload=function(){
	if(localStorage.getItem("save")!==null){
		player=JSON.parse(atob(localStorage.getItem("save")))
	} else {
		save()
	}
	render()
	if(player.options.tooltips==false){
		g("tooltipOption").checked=true
	}
	if(player.options.animations==false){
		g("animationsOption").checked=true
	}
	if(player.automation.auto1){
		window.setInterval(automation,500)
		g("auto1row").style.display="none"
	}
	if(player.automation.auto2){
		g("auto2row").style.display="none"
	}

	g("html").style.display="block"
}

function options(x){
	if(x){
		g("main").style.display="none"
		g("options").style.display="block"
	} else {
		g("main").style.display="block"
		g("options").style.display="none"
	}
}
options(false)
function automation(){
	if(player.automation.auto1){
		g("gainDopamine").click()
	} 
	if(player.automation.auto2){
		setTimeout(function(){
			g("gainDopamine").click()
		}, 250)
	}
}
function loop(){
	render()
	player.chems.serotonin+=(player.chems.sGainBase*player.chems.sGainMult)/20


	if(g("tooltipOption").checked){
		g("tooltip").style.display="none"
		player.options.tooltips=false
	} else {
		g("tooltip").style.display="block"
		player.options.tooltips=true
	}
	if(g("animationsOption").checked){
		player.options.animations=false
		g("anims").href=""
	} else {
		player.options.animations=true
		g("anims").href="css/animation.css"
	}
}
 
window.setInterval(loop,50) 

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