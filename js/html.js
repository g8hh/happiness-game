// html.js v1 - AnteSocial
// creates html elements

text=c("div")
text.innerHTML="Ante's Incremental"
text.id="title"
a(text)

text=c("div")
text.innerHTML="options"
text.id="title2"
a(text)

text=c("div")
text.innerHTML="save"
text.id="save"
text.onclick=function(){
	save() 
	saved()
}
a(text)

text=c("div")
text.innerHTML="reset"
text.id="title2"
text.onclick=function(){
	sure=confirm("Are you sure?")
	if(sure){
		localStorage.clear()
		window.location.reload()
	}
}
a(text)

a(c("br"))
a(c("br"))

container=c("div")
container.id="container"
a(container)

title=c("title")
title.innerHTML="Ante's Incremental"
a2(document.head,title)

//You Panel
main=c("div")
main.id="main"
a2(container,main)

text=c("div")
text.innerHTML="you"
text.id="subtitle"
a2(main,text)

text=c("div")
text.innerHTML="you have 0 serotonin"
text.id="serotonin"
a2(main,text)

text=c("div")
text.innerHTML="you have 0 happiness"
text.id="happiness"
text.style.display="none"
a2(main,text)

text=c("div")
text.innerHTML="you have 0 memories"
text.id="memories"
text.style.display="none"
a2(main,text)

text=c("button")
text.innerHTML="click to gain serotonin"
text.onclick=function(){increment()}
a2(main,text)

a2(main,c("br"))
a2(main,c("br"))

text=c("button")
text.innerHTML="convert 10 serotonin -> 1 happiness"
text.onclick=function(){convert()}
a2(main,text)
text=c("button")
text.innerHTML="convert all"
text.onclick=function(){convert(1)}
a2(main,text)

// Upgrades panel
upgrades=c("div")
upgrades.id="upgrades"
upgrades.style.display="none"
a2(container,upgrades)

text=c("div")
text.id="subtitle"
text.innerHTML="upgrades"
a2(upgrades,text)

text=c("div")
text.id="upgrade1"
text.className="upgrade"
text.onclick=function(){upgrade(1)}
text.innerHTML="serotonin gain -> x1.3: 5 happiness [0/5]"
a2(upgrades, text)

text=c("div")
text.id="upgrade2"
text.className="upgrade"
text.style.display="none"
text.onclick=function(){upgrade(2)}
text.innerHTML="auto convert serotonin -> happiness: 100 happiness"
a2(upgrades, text)

text=c("div")
text.id="upgrade3"
text.className="upgrade"
text.style.display="none"
text.onclick=function(){upgrade(3)}
text.innerHTML="unlock friends: 200 happiness"
a2(upgrades, text)

text=c("div")
text.id="upgrade4"
text.className="upgrade"
text.style.display="none"
text.onclick=function(){upgrade(4)}
text.innerHTML="memories boost power 2x: 500 happiness"
a2(upgrades, text)

text=c("div")
text.id="upgrade5"
text.className="upgrade"
text.style.display="none"
text.onclick=function(){upgrade(5)}
text.innerHTML="memories produce serotonin: 500 happiness"
a2(upgrades, text)

text=c("div")
text.id="upgrade6"
text.className="upgrade"
text.style.display="none"
text.onclick=function(){upgrade(6)}
text.innerHTML="unlock experiences: 10 friends & 5000 memories"
a2(upgrades, text)

//Friends Panel
friends=c("div")
friends.id="friends"
friends.style.display="none"
a2(container,friends)

text=c("div")
text.id="subtitle"
text.innerHTML="friends"
a2(friends,text)

text=c("div")
text.id="friend"
text.innerHTML="you have 0 friends"
a2(friends,text)

text=c("div")
text.id="friendBoost"
text.innerHTML="friends produce memories, which boost happiness gain (currently x1)"
a2(friends,text)

text=c("div")
text.id="addfriend"
text.className="upgrade"
text.onclick=function(){addFriend()}
text.innerHTML="+1 friend: 125 happiness"
a2(friends,text)