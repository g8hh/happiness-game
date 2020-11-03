function u(id,text){
	document.getElementById(id).innerHTML=text
}
function g(id){
	return document.getElementById(id)
}
function toggleBackground(){
	if(g("body").style.backgroundImage=="url(\"img/image2.png\")"){
		g("body").style.backgroundImage=""
	} else {
		g("body").style.backgroundImage="url(img/image2.png)"
	}
}