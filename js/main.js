player = {
	chemicals:{
		serotonin: new Decimal(0),
		dopamine: new Decimal(0),
		oxytocin: new Decimal(0),
		endorphins: new Decimal(0),
		gain: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)]
	}
}
tabs = [
	g("upgrades"),
	g("hobbies"),
	g("friends"),
	g("experiences"),
	g("options")
]

function tab(thing){
	hideAll()
	tabs[thing].style.display="block"
}