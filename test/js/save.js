function save(){
	psave = JSON.stringify(player)
	localStorage.setItem("save", btoa(psave));
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
	hideTabs()
	tab('you','upgrades')

	s=JSON.parse(atob(localStorage.getItem("save")))
	
	player = {
		tab: s.tab,
		chemicals:{
			serotonin: new Decimal(s.chemicals.serotonin),
			dopamine: new Decimal(s.chemicals.dopamine),
			oxytocin: new Decimal(s.chemicals.oxytocin),
			endorphins: new Decimal(s.chemicals.endorphins),
			gain: [new Decimal(s.chemicals.gain[0]),new Decimal(s.chemicals.gain[1]),new Decimal(s.chemicals.gain[2]),new Decimal(s.chemicals.gain[3])]
		}
	}
}