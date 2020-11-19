function g(x){
	return document.getElementById(x)
}
function u(x,y){
	g(x).innerHTML=y
}
function float(a,b){
	c=document.createElement("div")
	c.id="float"
	c.innerHTML="+"+b
	g(a).appendChild(c)
	window.setTimeout(function(){g(a).removeChild(g(a).childNodes[0])},1000)
}
function floatdown(a,b){
	c=document.createElement("div")
	c.id="floatred"
	c.innerHTML="-"+b
	g(a).appendChild(c)
	window.setTimeout(function(){g(a).removeChild(g(a).childNodes[0])},1000)
}
function rng(a,b) {
  return Math.floor(Math.random()*(b-a+1))+a;
}
function hideAll(){
	console.log(tabs)
	for(x=0;x<tabs.length;x++){
		tabs[x].style.display="none"
	}
}