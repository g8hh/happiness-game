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
		auto2: false,
		auto3: false,
		auto4: false
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
		},
		four: {
			bought:false,
			price:50000
		}
	},
	options: {
		tooltips: true,
		animations: true,
		autoConvertH: true
	},
	friends: false
}
var bplayer = player;
var tooltips = document.getElementsByClassName("tooltip")
window.onload=function(){
	if(localStorage.getItem("save")!==null){
		splayer=JSON.parse(atob(localStorage.getItem("save")))
		player={...bplayer,...splayer}
	} else {
		save()
	}
	update()
	render()
	loop()

	if(player.automation.auto1 || player.automation.auto4){
		window.setInterval(automation,500)
	}

	g("html").style.display="block"
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
function reset(){
	loaclStorage.clear()
}
function g(x){
	return document.getElementById(x)
}
function floatText(elm,value,curr){
	let float;
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
function toolTips(x){
	if(x){
		for(i=0;i<tooltips.length;i++){
			tooltips[i].style.opacity="100%"
		}
	} else if (!x){
		for(i=0;i<tooltips.length;i++){
			tooltips[i].style.opacity="0%"
		}
	}
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
function getSerotoninGain(){
	mult=player.chems.sGainBase*player.chems.sGainMult
	if(player.upgrades.four.bought){ mult*=Math.log(player.chems.happiness)/2 }

	return mult
}

// Gain Buttons
g("gainDopamine").onclick=function(){
	player.chems.dopamine+=player.chems.dGain
	floatText("gainDopamine",player.chems.dGain,'dopamine')
	render()
}
g("gainHbtn").onclick=function(){
	if(player.chems.dopamine>=5 && player.chems.serotonin>=5){
		player.chems.dopamine-=5
		player.chems.serotonin-=5
		player.chems.happiness+=player.chems.hGain
		floatText("gainH",player.chems.hGain,"happiness")
		floatTextDown("s",5,"serotonin")
		floatTextDown("d",5,"dopamine")
	}
}
g("gainMaxH").onclick=function(){
	if(player.chems.dopamine>=5 && player.chems.serotonin>=5){
		let gained;
		gained=Math.floor(Math.min(player.chems.dopamine,player.chems.serotonin)/5)*player.chems.hGain
		player.chems.dopamine-=gained*5/player.chems.hGain
		player.chems.serotonin-=gained*5/player.chems.hGain
		floatTextDown("s",gained*5/player.chems.hGain,"serotonin")
		floatTextDown("d",gained*5/player.chems.hGain,"dopamine")
		player.chems.happiness+=gained
		floatText("convertMax",gained,"happiness")
	}
}

// Automation Upgrades
g("auto1").onclick=function(){
	if(player.chems.serotonin>=100){
		player.chems.serotonin-=100
		floatTextDown("s",100,"serotonin")
		g("auto1row").style.display="none"
		player.automation.auto1=true
		window.setInterval(automation,500)
		update()
	}
}
g("auto2").onclick=function(){
	if(player.chems.happiness>=100){
		player.chems.happiness-=100
		floatTextDown("h",100,"happiness")
		g("auto2row").style.display="none"
		player.automation.auto2=true
		update()
	}
}
g("auto3").onclick=function(){
	if(player.chems.happiness>=1000){
		player.chems.happiness-=1000
		floatTextDown("h",1000,"happiness")
		g("auto3row").style.display="none"
		g("gainMaxH").style.display="block"
		player.automation.auto3=true
		update()
	}
}
g("auto4").onclick=function(){
	if(player.chems.serotonin>=10000){
		player.chems.serotonin-=10000
		floatTextDown("s","10k","happiness")
		g("auto4row").style.display="none"
		player.automation.auto4=true
		update()
	}
}

// Regular Upgrades
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
g("upgrade4").onclick=function(){
	if(player.chems.happiness>=player.upgrades.four.price && !player.upgrades.four.bought){
		player.chems.happiness-=player.upgrades.four.price
		floatTextDown("h",player.upgrades.four.price,"happiness")
		player.upgrades.four.bought=true
		update()
	}
}
g("friendsUnlock").onclick=function(){
	if(player.chems.happiness>=100000){
		player.chems.happiness-=100000
		player.friends=true
		floatTextDown("h",100000,"happiness")
		update()
	}
}

// Upgrade Hovers
function hoverInit(){
	var p=[100,100,1000,10000]
	var c=["s","h","h","s"]
	var e=[]
	var f=[]

	for(x=1;x<=4;x++){
		e.push(g("auto"+x))
	}
	for(x=1;x<=4;x++){
		f.push(g("auto"+x+"price"))
	}
	for(x=0;x<4;x++){
		e[x].onmouseover=function(){
			n=this.id.substring(this.id.length-1,this.id.length)-1
			if(c[n]==="s"){
				if(player.chems.serotonin>=p[n]){
					f[n].style.backgroundColor="lightgreen"
				} else {
					f[n].style.backgroundColor="lightcoral"
				}
			} else if(c[n]==="h"){
				if(player.chems.happiness>=p[n]){
					f[n].style.backgroundColor="lightgreen"
				} else {
					f[n].style.backgroundColor="lightcoral"
				}
			}
		}
		e[x].onmouseout=function(){
			g(this.id+"price").style.backgroundColor="transparent"
		}
	}
}
hoverInit()
function upgradeHover(){
	var c=["d","h","s","h"]
	var e=[]
	var f=[]

	for(x=1;x<=4;x++){
		e.push(g("upgrade"+x))
	}
	for(x=1;x<=4;x++){
		f.push(g("upgrade"+x+"price"))
	}
	for(x=0;x<4;x++){
		e[x].onmouseover=function(){
			var p = [player.upgrades.one.price,player.upgrades.two.price,player.upgrades.three.price,player.upgrades.four.price]
			n=this.id.substring(this.id.length-1,this.id.length)-1
			if(c[n]==="s"){
				if(player.chems.serotonin>=p[n]){
					f[n].style.backgroundColor="lightgreen"
				} else {
					f[n].style.backgroundColor="lightcoral"
				}
			} else if(c[n]==="h"){
				if(player.chems.happiness>=p[n]){
					f[n].style.backgroundColor="lightgreen"
				} else {
					f[n].style.backgroundColor="lightcoral"
				}
			} else if(c[n]==="d"){
				if(player.chems.dopamine>=p[n]){
					f[n].style.backgroundColor="lightgreen"
				} else {
					f[n].style.backgroundColor="lightcoral"
				}
			}
		}
		e[x].onmouseout=function(){
			g(this.id+"price").style.backgroundColor="transparent"
		}
	}
}
upgradeHover()

function loop(){
	render()
	player.chems.serotonin+=getSerotoninGain()/20

	if(g("tooltipOption").checked){
		toolTips(false)
		player.options.tooltips=false
	} else if(!g("tooltipOption").checked) {
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
function render(){
	g("serotonin").innerText="serotonin: "+player.chems.serotonin.toFixed(1)+" (+"+getSerotoninGain().toFixed(1)+"/s)"
	g("dopamine").innerText="dopamine: "+player.chems.dopamine.toFixed(1)+" (+"+player.chems.dGain+"/c)"
	g("happiness").innerText="happiness: "+player.chems.happiness.toFixed(1)+" (+"+player.chems.hGain+"/c)"
}
function update(){
	if(player.options.tooltips===false){
		g("tooltipOption").checked=true
	}
	if(player.options.animations===false){
		g("animationsOption").checked=true
	}
	if(player.options.autoConvertH===false){
		g("autoConvertHappiness").checked=true
	}
	if(player.automation.auto1){
		g("auto1row").style.display="none"
	}
	if(player.automation.auto2){
		g("auto2row").style.display="none"
	}
	if(player.automation.auto3){
		g("auto3row").style.display="none"
		g("gainMaxH").style.display="block"
	}
	if(player.automation.auto4){
		g("auto4row").style.display="none"
		g("happinessConvertBox").style.display="block"
	}
	g("upgrade1bought").innerText=player.upgrades.one.level+"/5"
	g("upgrade1price").innerText=Math.ceil(player.upgrades.one.price)+" dopamine"
	g("upgrade2bought").innerText=player.upgrades.two.level+"/5"
	g("upgrade2price").innerText=Math.ceil(player.upgrades.two.price)+" happiness"
	g("upgrade3bought").innerText=player.upgrades.three.level+"/5"
	g("upgrade3price").innerText=Math.ceil(player.upgrades.three.price)+" serotonin"

	if(player.upgrades.one.level===5){
		g("upgrade1row").style.display="none"
	}
	if(player.upgrades.two.level===5){
		g("upgrade2row").style.display="none"
	}
	if(player.upgrades.three.level===5){
		g("upgrade3row").style.display="none"
	}
	if(player.upgrades.four.bought){
		g("upgrade4row").style.display="none"
	}
}
function automation(){
	if(player.automation.auto1){
		g("gainDopamine").click()
	}
	if(player.automation.auto2){
		setTimeout(function(){
			g("gainDopamine").click()
		}, 250)
	}
	if(player.automation.auto4){
		if(player.options.autoConvertH){
			g("gainHbtn").click()
		}
	}
}