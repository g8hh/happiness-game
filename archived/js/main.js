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
		autoClickDopamine: true,
		autoConvertH: true,
		theme: "Dark"
	},
	friends: {
		bought: false,
		amount: 0,
		price: 2e5
	},
	friend: {
		timer:0,
		time:30,
	},
	memories: {
		amounts: [0,0,0]
	},
	experiences: {
		amount: 0,
		rare: 0,
		upgrades: {
			one: false,
			two: false,
			three: false
		}
	}
}

let g = x => document.getElementById(x)

var bplayer = player;
var tooltips = document.getElementsByClassName("tooltip")

var memoryDisplays = document.getElementsByClassName("mdisplay")
var mfloats = document.getElementsByClassName("memory")
var memoryFloats = Array.from(mfloats)
var memoryBoosts = document.getElementsByClassName("mboost")

// Gain Buttons
g("gainDopamine").onclick=function(){
	player.chems.dopamine+=getDopamineGain()
	floatText("gainDopamine",getDopamineGain())
	render()
}
g("gainHbtn").onclick=function(){
	if(player.chems.dopamine>=5 && player.chems.serotonin>=5){
		player.chems.dopamine-=5
		player.chems.serotonin-=5
		player.chems.happiness+=getHappinessGain()
		floatText("gainH",getHappinessGain())
		floatTextDown("s",5)
		floatTextDown("d",5)
	}
}
g("gainMaxH").onclick=function(){
	if(player.chems.dopamine>=5 && player.chems.serotonin>=5){
		let gained;
		gained=Math.floor(Math.min(player.chems.dopamine,player.chems.serotonin)/5)*getHappinessGain()
		player.chems.dopamine-=gained*5/getHappinessGain()
		player.chems.serotonin-=gained*5/getHappinessGain()
		floatTextDown("s",gained*5/getHappinessGain())
		floatTextDown("d",gained*5/getHappinessGain())
		player.chems.happiness+=gained
		floatText("convertMax",gained)
	}
}
g("experiencegain").onclick=function(){
	if(player.memories.amounts.every(x => x>0)){
		for(n=0;n<player.memories.amounts.length;n++) player.memories.amounts[n]-=1
		player.experiences.amount+=1
		update()
        memoryFloats.forEach(elm => floatDownMemory(elm, 1))
        floatText("experiencefloat",1)
	}
	n=Math.random()
	if(n>0.995){
		player.experiences.rare+=1
		update()
	}
}
g("makefriend").onclick=function(){

}


// Automation Upgrades
g("auto1").onclick=function(){
	if(player.chems.serotonin>=100){
		player.chems.serotonin-=100
		floatTextDown("s",100)
		g("auto1row").style.display="none"
		player.automation.auto1=true
		window.setInterval(automation,500)
		update()
	}
}
g("auto2").onclick=function(){
	if(player.chems.happiness>=100){
		player.chems.happiness-=100
		floatTextDown("h",100)
		g("auto2row").style.display="none"
		player.automation.auto2=true
		update()
	}
}
g("auto3").onclick=function(){
	if(player.chems.happiness>=1000){
		player.chems.happiness-=1000
		floatTextDown("h",1000)
		g("auto3row").style.display="none"
		g("gainMaxH").style.display="block"
		player.automation.auto3=true
		update()
	}
}
g("auto4").onclick=function(){
	if(player.chems.serotonin>=10000){
		player.chems.serotonin-=10000
		floatTextDown("s","10k")
		g("auto4row").style.display="none"
		player.automation.auto4=true
		update()
	}
}

// Regular Upgrades
g("upgrade1").onclick=function(){
	if(player.chems.dopamine>=player.upgrades.one.price && player.upgrades.one.level<5){
		player.chems.dopamine-=player.upgrades.one.price
		floatTextDown("d",player.upgrades.one.price)
		player.upgrades.one.price=Math.ceil(player.upgrades.one.price*2.5)
		player.upgrades.one.level+=1
		player.chems.sGainMult*=2
		update()
	}
}
g("upgrade2").onclick=function(){
	if(player.chems.happiness>=player.upgrades.two.price && player.upgrades.two.level<5){
		player.chems.happiness-=player.upgrades.two.price
		floatTextDown("h",player.upgrades.two.price)
		player.upgrades.two.price=Math.ceil(player.upgrades.two.price*2.5)
		player.upgrades.two.level+=1
		player.chems.dGain*=2
		update()
	}
}
g("upgrade3").onclick=function(){
	if(player.chems.serotonin>=player.upgrades.three.price && player.upgrades.three.level<5){
		player.chems.serotonin-=player.upgrades.three.price
		floatTextDown("s",player.upgrades.three.price)
		player.upgrades.three.price=Math.ceil(player.upgrades.three.price*2.5)
		player.upgrades.three.level+=1
		player.chems.hGain*=2
		update()
	}
}
g("upgrade4").onclick=function(){
	if(player.chems.happiness>=player.upgrades.four.price && !player.upgrades.four.bought){
		player.chems.happiness-=player.upgrades.four.price
		floatTextDown("h",player.upgrades.four.price)
		player.upgrades.four.bought=true
		update()
	}
}
g("friendsUnlock").onclick=function(){
	if(player.chems.happiness>=100000){
		player.chems.happiness-=100000
		player.friends.bought=true
		floatTextDown("h",100000)
		setInterval(friendBar,20)
		update()
	}
}