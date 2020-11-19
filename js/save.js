function save(){
	psave = JSON.stringify(player)
	localStorage.setItem("save", btoa(psave));

	g("save").innerText="saved!"
	window.setTimeout(function(){g("save").innerText="save"},1000)
}

window.setInterval(save,30000)

function reset(){
	x = confirm("Are you sure?")
	if(x){
		localStorage.clear()
		window.location.reload()
	}
}

window.onload=function(){
	s=JSON.parse(atob(localStorage.getItem("save")))
	
	player = {
	chemicals:{
		serotonin: new Decimal(s.chemicals.serotonin),
		dopamine: new Decimal(s.chemicals.dopamine),
		oxytocin: new Decimal(s.chemicals.oxytocin),
		endorphins: new Decimal(s.chemicals.endorphins),
		gain: [new Decimal(s.chemicals.gain[0]),new Decimal(s.chemicals.gain[1]),new Decimal(s.chemicals.gain[2]),new Decimal(s.chemicals.gain[3])]
	},
	upgrades:{
		one: {
			level: s.upgrades.one.level,
			price: new Decimal(s.upgrades.one.price)
		}
	}
}
}