function options(){
	if(g("options").style.display==""){
		g("options").style.display="block"
	} else {
		g("options").style.display=""
	}
}

function save(){
	g("sub1").innerHTML="saved!"
	psave = JSON.stringify(player)
	localStorage.setItem("save", btoa(psave));
	window.setTimeout(function(){g("sub1").innerHTML="save"},1500)
}

function reset(){
	x = confirm("Are you sure?")
	if(x){
		localStorage.clear()
		window.location.reload()
	}
}

window.setInterval(save,10000)

window.onload = function(){
	g("body").style.backgroundColor="lightgrey"
	if(player.options.bg){
		g("body").style.backgroundImage="url(img/image2.png)"
	}
	g("body").style.backgroundSize="130px 93px"
	
	player=JSON.parse(atob(localStorage.getItem("save")))
	player={
		serotonin: {
			amount: new Decimal(player.serotonin.amount),
			gain: new Decimal(player.serotonin.gain)
		},
		dopamine: {
			amount: new Decimal(player.dopamine.amount),
			gain: new Decimal(player.dopamine.gain)
		},
		happiness: {
			amount: new Decimal(player.happiness.amount),
			gain: new Decimal(player.happiness.gain)
		},
		upgrades: {
			one: {
				level: new Decimal(player.upgrades.one.level),
				maxLevel: new Decimal(player.upgrades.one.maxLevel),
				cost: new Decimal(player.upgrades.one.cost)
			},
			two: {
				level: new Decimal(player.upgrades.two.level),
				maxLevel: new Decimal(player.upgrades.two.maxLevel),
				cost: new Decimal(player.upgrades.two.cost)
			},
			three: {
				level: new Decimal(player.upgrades.three.level),
				maxLevel: new Decimal(player.upgrades.three.maxLevel),
				cost: new Decimal(player.upgrades.three.cost)
			},
			four: {
				bought: player.upgrades.four.bought,
				cost: new Decimal(player.upgrades.four.cost),
				boost: new Decimal(1)
			},
			five: {
				bought: player.upgrades.five.bought,
				cost: new Decimal(player.upgrades.five.cost)
			}
		},
		friends: {
			amount: new Decimal(player.friends.amount),
			gain: new Decimal(player.friends.gain),
			cost: new Decimal(player.friends.cost)
		},
		memories: {
			amount: new Decimal(player.memories.amount),
			gain: new Decimal(player.memories.gain),
			upgrades: {
				one: {
					cost: new Decimal(player.memories.upgrades.one.cost),
					level: new Decimal(player.memories.upgrades.one.level),
					maxLevel: new Decimal(player.memories.upgrades.one.maxLevel)
				},
				two: {
					cost: new Decimal(player.memories.upgrades.two.cost),
					level: new Decimal(player.memories.upgrades.two.level),
					maxLevel: new Decimal(player.memories.upgrades.two.maxLevel)
				},
				three: {
					cost: new Decimal(player.memories.upgrades.three.cost),
					level: new Decimal(player.memories.upgrades.three.level),
					maxLevel: new Decimal(player.memories.upgrades.three.maxLevel)
				}
			}
		},
		options: {
			bg: player.options.bg
		}
	}
}
