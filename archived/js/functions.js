function save(){
	localStorage.setItem("save",btoa(JSON.stringify(player)))
}
window.setInterval(save,15000)
function reset(){
	if(confirm("Are you sure?")){
		localStorage.clear()
		window.location.reload()
	}
}
function theme(x){
	if(x==="Dark"){
		player.options.theme=x
		g("theme").value="Dark"
		g("theme1").href=""
	} else if (x==="Light"){
		player.options.theme=x
		g("theme").value="Light"
		g("theme1").href="css/light.css"

	}
}
function floatText(elm,value){
	let float;
	float=document.createElement('span')
	float.className="float"
	float.innerText="+"+format(value)
	g(elm).appendChild(float)
	window.setTimeout(function(){g(elm).removeChild(g(elm).childNodes[1])},1000)
}
function floatTextDown(elm,value){
	let float;
	float=document.createElement('span')
	float.className="floatdown"
	float.innerText="-"+format(value)
	g(elm).appendChild(float)
	window.setTimeout(function(){g(elm).removeChild(g(elm).childNodes[1])},1000)
}
function floatMemory(elm,value){
	let float;
	float=document.createElement('span')
	float.className="float"
	float.innerText="+"+format(value)
	elm.appendChild(float)
	window.setTimeout(function(){elm.removeChild(elm.childNodes[1])},1000)
}
function floatDownMemory(elm,value){
	let float;
	float=document.createElement('span')
	float.className="floatdown"
	float.innerText="-"+format(value)
	elm.appendChild(float)
	window.setTimeout(function(){elm.removeChild(elm.childNodes[1])},1000)
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
function format(x){
	if(x<1000) return x.toFixed(2).replace(/[.,]00$/, "");
	if(x<1e21) {
		x=x.toFixed(0)
		x=x.toString()
		e=x.length-1
		m1=x[0]
		m2=x.substring(1,3)
		return m1+"."+m2+"e"+e
	}
	if(x>1e21) {
		x=x.toFixed(0)
		x=x.toString()
		e=x.substring(x.length-2,x.length)
		m=x.substring(0,3)
		console.log(parseFloat(m))
		if(x[3]>=5) m=(parseFloat(m)+0.1).toString()
		return m+"e"+e
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
	if(player.memories.amounts[0]>0){ mult*=Math.sqrt(player.memories.amounts[0]+1)}

	return mult
}
function getDopamineGain(){
	mult=player.chems.dGain
	if(player.memories.amounts[1]>0){ mult*=Math.sqrt(player.memories.amounts[1]+1)}

	return mult
}
function getHappinessGain(){
	mult=player.chems.hGain
	if(player.memories.amounts[2]>0){ mult*=Math.sqrt(player.memories.amounts[2]+1)}

	return mult
}

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
			let y = this;
			n=y.id.substring(y.id.length-1,y.id.length)-1
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
			let bg = setInterval(function(){
				n=y.id.substring(y.id.length-1,y.id.length)-1
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
			},100)
			this.onmouseout=function(){
				clearInterval(bg)
				g(this.id+"price").style.backgroundColor="transparent"
			}
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
			let y = this;
			var p = [player.upgrades.one.price,player.upgrades.two.price,player.upgrades.three.price,player.upgrades.four.price]
			n=y.id.substring(y.id.length-1,y.id.length)-1
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
			let bg=setInterval(function(){
				var p = [player.upgrades.one.price,player.upgrades.two.price,player.upgrades.three.price,player.upgrades.four.price]
				n=y.id.substring(y.id.length-1,y.id.length)-1
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
			},100)
			this.onmouseout=function(){
				g(this.id+"price").style.backgroundColor="transparent"
				clearInterval(bg)
			}
		}
		
	}
}
upgradeHover()

g("save").onclick=function(){
	localStorage.setItem("save",btoa(JSON.stringify(player)))
	this.innerText="saved!"
	window.setTimeout(function(){g("save").innerText="save"},1000)
}

g("experiencegain").onmouseover=function(){
	let y = this;
	if(player.memories.amounts.every(x => x>0)){
		this.setAttribute("style","background-color:lightgreen !important;")
	} else {
		this.setAttribute("style","background-color:lightcoral !important;")
	}
	let bg = setInterval(function(){
		if(player.memories.amounts.every(x => x>0)){
			y.setAttribute("style","background-color:lightgreen !important;")
		} else {
			y.setAttribute("style","background-color:lightcoral !important;")
		}
	},100)
	this.onmouseout=function(){
		this.removeAttribute("style")
		clearInterval(bg)
	}
}

function loop(){
	render()
	player.chems.serotonin+=getSerotoninGain()/20
	player.chems.serotonin+=0.01

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
	if(g("autoClickDopamine").checked){
		player.options.autoClickDopamine=false
	} else {
		player.options.autoClickDopamine=true
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
	g("serotonin").innerText="serotonin: "+format(player.chems.serotonin)+" (+"+format(getSerotoninGain())+"/s)"
	g("dopamine").innerText="dopamine: "+format(player.chems.dopamine)+" (+"+format(getDopamineGain())+"/c)"
	g("happiness").innerText="happiness: "+format(player.chems.happiness)+" (+"+format(getHappinessGain())+"/c)"
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
	if(player.options.autoClickDopamine===false){
		g("autoClickDopamine").checked=true
	}
	if(player.automation.auto1){
		g("auto1row").style.display="none"
		g("dopamineClickBox").style.display="block"
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
	if(player.experiences.rare>0){
		g("rareexperience").style.display="block"
		g("rareexperience").innerText="rare experiences: "+player.experiences.rare
	} else {
		g("rareexperience").style.display="none"
	}
	if(player.upgrades.one.level>0){
		g("htooltip").style.visibility="hidden"
	}

	g("upgrade1bought").innerText=player.upgrades.one.level+"/5"
	g("upgrade1price").innerText=format(player.upgrades.one.price)+" dopamine"
	g("upgrade2bought").innerText=player.upgrades.two.level+"/5"
	g("upgrade2price").innerText=format(player.upgrades.two.price)+" happiness"
	g("upgrade3bought").innerText=player.upgrades.three.level+"/5"
	g("upgrade3price").innerText=format(player.upgrades.three.price)+" serotonin"
	g("upgrade4price").innerText="5e4 happiness"

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
	if(player.friends.bought){
		g("friendsContent").style.display="block"
		g("friendsUnlock").style.display="none"
	}
	for(x=0;x<memoryDisplays.length;x++){memoryDisplays[x].innerText=player.memories.amounts[x]}
	for(x=0;x<memoryBoosts.length;x++){memoryBoosts[x].innerText="boost: "+format(Math.sqrt(player.memories.amounts[x]+1))+"x"}

	g("experienceamount").innerText="experiences: "+player.experiences.amount

	if(player.experiences.upgrades.one){
		g("mrow1").style.display="none"
	}
}
function automation(){
	if(player.options.autoClickDopamine){
		if(player.automation.auto1){
			g("gainDopamine").click()
		}
		if(player.automation.auto2){
			setTimeout(function(){
				g("gainDopamine").click()
			}, 250)
		}
	}
	if(player.automation.auto4){
		if(player.options.autoConvertH){
			g("gainHbtn").click()
		}
	}
}
function friendBar(){
	player.friend.timer+=(1/50)*(100/getFriendTimer())
	g("friendBar").style.background="linear-gradient(90deg, #888,#888a "+ player.friend.timer +"%,white 0%,white 100%)"
	g("friendBar").innerText=((player.friend.timer/100)*30).toFixed(1)+" / 30 (+"+(player.friend.time/getFriendTimer()).toFixed(2)+"/s)"
	if(player.friend.timer>=100) {player.friend.timer=0; gainMemory()}
}
function gainMemory(){
	let gain = Math.floor(Math.random()*3)
	player.memories.amounts[gain]+=1
	floatMemory(memoryFloats[gain],1)
	update()
}