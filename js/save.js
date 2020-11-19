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
	if(window.location.host=="antesocial.github.io"){
		if(confirm("Do you want the original game?")){
			window.location.href="https://antesocial.github.io/classic/index.html"
		} else {
			alert("This version is very bad, subject to many change and your save will almost definitely break. discretion advised.")
		}
	}
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