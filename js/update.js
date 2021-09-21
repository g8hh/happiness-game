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
	g("e15").style.backgroundColor = Happiness.canGain() ? '#aaa' : '#444';
	g("e16").innerText = Upgrade(0).currentEffect().toFixed(2);
	g("e17").innerText = Upgrade(0).nextEffect().toFixed(2);
	g("e18").innerText = Upgrade(0).cost().toFixed(2);
	g("e19").innerText = Upgrade(1).currentEffect().toFixed(2);
	g("e20").innerText = Upgrade(1).nextEffect().toFixed(2);
	g("e21").innerText = Upgrade(1).cost().toFixed(2);
	g("e22").innerText = Upgrade(2).currentEffect().toFixed(2);
	g("e23").innerText = Upgrade(2).nextEffect().toFixed(2);
	g("e24").innerText = Upgrade(2).cost().toFixed(2);
	g("e25").style.backgroundColor = Upgrade(0).canBuy() ? '#aaa' : '#444';
	g("e26").style.backgroundColor = Upgrade(1).canBuy() ? '#aaa' : '#444';
	g("e27").style.backgroundColor = Upgrade(2).canBuy() ? '#aaa' : '#444';
	g("e28").innerText = Upgrade(0).buttonText();
	g("e29").innerText = Upgrade(1).buttonText();
	g("e30").innerText = Upgrade(2).buttonText();
	g("e31").style.backgroundColor = Upgrade(3).canBuy() ? '#aaa' : '#444';
	g("e32").innerText = Upgrade(3).currentEffect().toFixed(2);
	g("e33").innerText = Upgrade(3).nextEffect().toFixed(2);
	g("e34").innerText = Upgrade(3).cost().toFixed(2);
	g("e35").innerText = Upgrade(3).buttonText();
	g("e36").style.backgroundColor = Upgrade(4).canBuy() ? '#aaa' : '#444';
	g("e37").innerText = Upgrade(4).currentEffect().toFixed(2);
	g("e38").innerText = Upgrade(4).nextEffect().toFixed(2);
	g("e39").innerText = Upgrade(4).cost().toFixed(2);
	g("e40").innerText = Upgrade(4).buttonText();
	g("e41").style.backgroundColor = Upgrade(5).canBuy() ? '#aaa' : '#444';
	g("e42").innerText = Upgrade(5).currentEffect();
	g("e43").innerText = Upgrade(5).nextEffect();
	g("e44").innerText = new Decimal(Upgrade(5).cost()).format(true);
	g("e45").innerText = Upgrade(5).buttonText();

	g("e25").style.display = Upgrade(0).atMaxLevel() ? 'none' : 'inline-block';
	g("e26").style.display = Upgrade(1).atMaxLevel() ? 'none' : 'inline-block';
	g("e27").style.display = Upgrade(2).atMaxLevel() ? 'none' : 'inline-block';
	g("e31").style.display = Upgrade(3).atMaxLevel() ? 'none' : 'inline-block';
	g("e36").style.display = Upgrade(4).atMaxLevel() ? 'none' : 'inline-block';
};