player = {
	tab: "",
	chemicals:{
		serotonin: new Decimal(0),
		dopamine: new Decimal(0),
		oxytocin: new Decimal(0),
		endorphins: new Decimal(0),
		gain: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)]
	}
}

tabs = [
	g("you"),
	g("upgrades"),
	g("hobbies"),
	g("friends"),
	g("experiences"),
	g("options")
]

function tab(thing,thing2){
	hideTabs()
	g(thing).style.display="block"
	try{
		g(thing2).style.display="block"
		player.tab=thing2
	} catch {
		return;
	}
	
}