// scriptLoader.js v1 - AnteSocial
// loads scripts onto page

css=document.createElement("link")

//Load CSS File
css.rel="stylesheet"
css.type="text/css"
css.href="css/style.css"
document.head.appendChild(css)

//Helpers
function c(x){
	return document.createElement(x)
}
function a(x){
	document.body.appendChild(x)
}
function a2(x,y){
	x.appendChild(y)
}
function g(x){
	return document.getElementById(x)
}
function u(x,y){
	x.innerHTML=y
}

//Load JS Files
script = c("script")
script.src="js/main.js"
a(script)

script = c("script")
script.src="js/html.js"
a(script)

script = c("script")
script.src="js/update.js"
a(script)
