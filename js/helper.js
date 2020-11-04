function u(id,text){
	document.getElementById(id).innerHTML=text
}
function g(id){
	return document.getElementById(id)
}
function toggleBackground(){
	if(player.options.bg){
		player.options.bg=false
		g("body").style.backgroundImage=""
	} else {
		player.options.bg=true
		g("body").style.backgroundImage="url(img/image2.png)"
	}
}
function floatText(target,text,timeout){
	float=document.createElement("div")
	float.id="floatingText"
	float.innerHTML="+"+text
	g(target).appendChild(float)
	window.setTimeout(function(){g(target).removeChild(g(target).childNodes[1])},timeout)
}
function checkGfUnlock(){
	if(player.upgrades.one.level.eq(player.upgrades.one.maxLevel) &&
	   player.upgrades.two.level.eq(player.upgrades.two.maxLevel) &&
	   player.upgrades.three.level.eq(player.upgrades.three.maxLevel) &&
	   player.upgrades.four.bought &&
	   player.upgrades.five.bought &&
	   player.memories.upgrades.one.level.eq(player.memories.upgrades.one.maxLevel) &&
	   player.memories.upgrades.two.level.eq(player.memories.upgrades.two.maxLevel) &&
	   player.memories.upgrades.three.level.eq(player.memories.upgrades.three.maxLevel)){
		return true
	}
}