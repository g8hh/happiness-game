// html.js v1 - AnteSocial
// creates html elements

text=c("div")
text.innerHTML="Ante's Incremental"
text.id="title"
a(text)

container=c("div")
container.id="container"
a(container)

title=c("title")
title.innerHTML="Ante's Incremental"
a2(document.head,title)

main=c("div")
main.id="main"
a2(container,main)

text=c("div")
text.innerHTML="you have 0 serotonin"
text.id="serotonin"
a2(main,text)

text=c("div")
text.innerHTML="you have 0 happiness"
text.id="happiness"
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
text.id="title"
text.innerHTML="upgrades"
a2(upgrades,text)

text=c("div")
text.id="upgrade1"
text.className="upgrade"
text.onclick=function(){upgrade(1)}
text.innerHTML="double serotonin gain: 5 happiness [0/5]"
a2(upgrades, text)

