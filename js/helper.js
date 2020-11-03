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