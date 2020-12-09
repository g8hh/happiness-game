window.onload=function(){
	if(localStorage.getItem("save")!==null){
		splayer=JSON.parse(atob(localStorage.getItem("save")))
		player={...bplayer,...splayer}
	} else {
		save()
	}
	theme(player.options.theme)
	update()
	render()
	loop()

	if(player.automation.auto1 || player.automation.auto4){
		window.setInterval(automation,500)
	}
	if(player.friends.bought){
		friendBar()
		window.setInterval(friendBar,20)
	}

	g("reset").style.display="none"
	g("html").style.display="block"
}

window.onunload=function(){
	save()
}