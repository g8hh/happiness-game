let e = [];
let b = [];

function updateDisplayPageSetup() {
	let i = 0;
	while(document.getElementById("e"+i) != null) {
		e.push(document.getElementById("e"+i));
		i++;
	}
	i = 0;
	while(document.getElementById("b"+i) != null) {
		b.push(document.getElementById("b"+i));
		i++;
	}
};

function update() {
	e[0].innerText = formatInt(player.quarks);
	e[1].innerText = formatInt(player.quarks);
	e[2].innerText = timeFormat(player.stats.totalTime);
	e[3].innerText = timeFormat(player.stats.onlineTime);
	e[4].innerText = formatInt(Achievements.multiplier());
	e[5].innerText = timeFormat(player.options.autosaveTimer);
	e[6].innerText = Upgrade(1).level === 1 ? 'Bought' : 'Cost: 1 quark';
	e[7].innerText = formatInt(Quarks.perSecond());
	e[8].innerText = Upgrade(2).level === 1 ? 'Bought' : 'Cost: 50 quarks';
	e[11].innerText = Upgrade(3).level === 1 ? 'Bought' : 'Cost: 250 quarks';
	e[13].innerText = formatInt(player.protons);
	e[14].innerText = formatInt(Protons.perSecond());
	e[15].innerText = formatWhole(Upgrade(4).maxLevel);
	e[16].innerText = "Cost: "+formatWhole(Upgrade(4).cost())+" quarks";
	e[17].innerText = formatInt(Upgrade(4).nextEffect());
	e[18].innerText = formatInt(Upgrade(4).effect());
	e[19].innerText = formatWhole(Upgrade(4).level);
	e[20].innerText = formatInt(Upgrade(5).effect());
	e[21].innerText = formatInt(Upgrade(5).nextEffect());
	e[22].innerText = formatWhole(Upgrade(5).level);
	e[23].innerText = formatWhole(Upgrade(5).maxLevel);
	e[24].innerText = "Cost: "+formatWhole(Upgrade(5).cost())+" protons";

	b[0].style.display = Upgrade(1).level === 1 ? '' : 'none';
	b[1].style.display = Upgrade(1).level === 1 ? '' : 'none';
	b[2].style.display = Upgrade(3).level === 1 ? '' : 'none';
	b[3].style.display = Upgrade(3).level === 1 ? '' : 'none';

	Upgrade(1).level === 1 ? e[6].classList.add('disabled') : e[6].classList.remove('disabled');
	Upgrade(2).level === 1 ? e[8].classList.add('disabled') : e[8].classList.remove('disabled');
	Upgrade(3).level === 1 ? e[11].classList.add('disabled') : e[11].classList.remove('disabled');
	Upgrade(1).level === 1 ? e[9].classList.add('maxed') : e[9].classList.remove('maxed');
	Upgrade(2).level === 1 ? e[10].classList.add('maxed') : e[10].classList.remove('maxed');
	Upgrade(3).level === 1 ? e[12].classList.add('maxed') : e[12].classList.remove('maxed');
	Upgrade(4).canBuy(1) ? e[16].classList.remove('disabled') : e[16].classList.add("disabled");
	Upgrade(5).canBuy(1) ? e[24].classList.remove('disabled') : e[24].classList.add("disabled");
	Upgrade(4).atMaxLevel ? e[25].classList.add('maxed') : e[25].classList.remove('maxed');
	Upgrade(5).atMaxLevel ? e[26].classList.add('maxed') : e[26].classList.remove('maxed');
}