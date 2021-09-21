
let update = function(){
	g("e1").innerText = Serotonin.amount().format(true);
	g("e2").innerText = Dopamine.amount().format(true);
	g("e3").innerText = Happiness.amount().format(true);
	g("e4").innerText = Serotonin.amount().format(true);
	g("e5").innerText = Serotonin.gainAmount().format(true);
	g("e6").innerText = Dopamine.amount().format(true);
	g("e7").innerText = Dopamine.gainAmount().format(true);
	g("e8").innerText = Happiness.amount().format(true);
	g("e9").innerText = Happiness.gainAmount().format(true);
	g("e10").innerText = Happiness.serotoninRequirement().format(true);
	g("e11").innerText = Happiness.dopamineRequirement().format(true);
	g("e12").innerText = Happiness.gainAmount().format(true);
	g("e13").innerText = Dopamine.gainAmount().format(true);
	g("e14").innerText = Happiness.buttonAmount().format(true);
	g("e15").style.backgroundColor = Happiness.canGain() ? '#ddd' : '#444';
};