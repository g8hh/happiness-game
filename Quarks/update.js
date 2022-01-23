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
	e[46].checked = player.elements.elementUpgradeAutobuy;
};

function update() {
	e[0].innerText = formatInt(player.quarks);
	e[1].innerText = formatInt(player.quarks);
	e[2].innerText = timeFormat(player.stats.totalTime);
	e[3].innerText = timeFormat(player.stats.onlineTime);
	e[4].innerText = formatInt(player.elements.protons);
	e[5].innerText = formatInt(player.elements.neutrons);
	e[6].innerText = formatInt(player.elements.electrons);
	e[7].innerText = formatInt(Elements.quarksPerSecond());
	e[8].innerText = formatFloat(Elements.multiplier('proton'));
	e[9].innerText = formatFloat(Elements.multiplier('neutron'));
	e[10].innerText = formatFloat(Elements.multiplier('electron'));
	e[11].innerText = "Create " + formatInt(Elements.elementGain('proton')) + " protons out of 3 quarks";
	e[12].innerText = "Create " + formatInt(Elements.elementGain('neutron')) + " neutrons out of 3 quarks";
	e[13].innerText = "Create " + formatInt(Elements.elementGain('electron')) + " electrons out of 1 quark";
	e[14].innerText = formatInt(player.stats.totalQuarks);
	e[15].innerText = Elements.quarksPerSecond()>1 ? 's' : '';
	e[16].innerText = formatInt(elementUpgradeCosts[3]);
	e[17].innerText = formatInt(elementUpgradeCosts[3]);
	e[18].innerText = protonUpgrades.has(3) ? ' (+' + formatInt(Elements.elementPerSecond('proton')) + '/s)' : '';
	e[19].innerText = neutronUpgrades.has(3) ? ' (+' + formatInt(Elements.elementPerSecond('neutron')) + '/s)' : '';
	e[20].innerText = formatInt(elementUpgradeCosts[3]);
	e[21].innerText = electronUpgrades.has(3) ? ' (+' + formatInt(Elements.elementPerSecond('electron')) + '/s)' : '';
	e[22].innerText = formatInt(Elements.totalElements());
	e[23].innerText = formatInt(1e4);
	e[24].innerText = formatInt(Hydrogen.gainAmount());
	e[25].innerText = formatInt(player.elements.hydrogen);
	e[26].innerText = formatInt(Hydrogen.multiplier());
	e[28].innerText = formatInt(Hydrogen.gainMultiplier());
	e[29].innerText = formatInt(elementUpgradeCosts[2]);
	e[30].innerText = formatInt(elementUpgradeCosts[2]);
	e[31].innerText = formatInt(elementUpgradeCosts[2]);
	e[32].innerText = formatInt(hydrogenUpgrade(0).effect());
	e[33].innerText = formatInt(hydrogenUpgrade(0).nextEffect());
	e[34].innerText = formatWhole(hydrogenUpgrade(0).costFor(1))+" H";
	e[36].innerText = formatInt(hydrogenUpgrade(1).effect());
	e[37].innerText = formatInt(hydrogenUpgrade(1).nextEffect());
	e[38].innerText = formatWhole(hydrogenUpgrade(1).costFor(1))+" H";
	e[40].innerText = formatInt(hydrogenUpgrade(2).effect());
	e[41].innerText = formatInt(hydrogenUpgrade(2).nextEffect());
	e[42].innerText = formatWhole(hydrogenUpgrade(2).costFor(1))+" H";
	e[44].innerText = formatWhole(hydrogenUpgrade(3).costFor(1))+" H";
	e[45].innerText = formatWhole(hydrogenUpgrade(4).costFor(1))+" H";
	e[47].innerText = formatInt(Decimal.pow(2, 14))+" H";
	e[48].innerText = formatWhole(Achievements.unlocked());
	e[49].innerText = formatInt(Achievements.multiplier());
	e[50].innerText = formatInt(Decimal.pow(2,16));
	e[51].innerText = formatInt(Decimal.pow(2,16));
	e[52].innerText = formatInt(player.stats.totalProtons);
	e[53].innerText = formatInt(player.stats.totalNeutrons);
	e[54].innerText = formatInt(player.stats.totalElectrons);
	e[55].innerText = formatInt(hydrogenUpgrade(6).cost())+" H";
	e[56].innerText = formatInt(Hydrogen.perSecond());
	e[57].innerText = formatInt(2.5e5);

	e[11].style.backgroundColor = player.quarks.gte(3) ? '#aaa' : '#666';
	e[12].style.backgroundColor = player.quarks.gte(3) ? '#aaa' : '#666';
	e[13].style.backgroundColor = player.quarks.gte(1) ? '#aaa' : '#666';
	e[27].style.backgroundColor = Hydrogen.canGain() ? '#aaa' : '#666';
	e[34].style.backgroundColor = hydrogenUpgrade(0).canBuy(1) ? '#aaa' : '#666';
	e[35].style.backgroundColor = hydrogenUpgrade(0).canBuy(1) ? '#aaa' : '#666';
	e[38].style.backgroundColor = hydrogenUpgrade(1).canBuy(1) ? '#aaa' : '#666';
	e[39].style.backgroundColor = hydrogenUpgrade(1).canBuy(1) ? '#aaa' : '#666';
	e[42].style.backgroundColor = hydrogenUpgrade(2).canBuy(1) ? '#aaa' : '#666';
	e[43].style.backgroundColor = hydrogenUpgrade(2).canBuy(1) ? '#aaa' : '#666';
	e[44].style.backgroundColor = hydrogenUpgrade(3).canBuy(1) ? '#aaa' : '#666';
	e[45].style.backgroundColor = hydrogenUpgrade(4).canBuy(1) ? '#aaa' : '#666';
	e[47].style.backgroundColor = hydrogenUpgrade(5).canBuy(1) ? '#aaa' : '#666';
	e[55].style.backgroundColor = hydrogenUpgrade(6).canBuy(1) ? '#aaa' : '#666';
	b[0].style.backgroundColor = Elements.canUnlock() ? '#aaa' : '#666';
	b[2].style.backgroundColor = protonUpgrade(0).canBuy() ? '#aaa' : '#666';
	b[3].style.backgroundColor = protonUpgrade(1).canBuy() ? '#aaa' : '#666';
	b[4].style.backgroundColor = protonUpgrade(2).canBuy() ? '#aaa' : '#666';
	b[5].style.backgroundColor = neutronUpgrade(0).canBuy() ? '#aaa' : '#666';
	b[6].style.backgroundColor = neutronUpgrade(1).canBuy() ? '#aaa' : '#666';
	b[7].style.backgroundColor = neutronUpgrade(2).canBuy() ? '#aaa' : '#666';
	b[8].style.backgroundColor = protonUpgrade(3).canBuy() ? '#aaa' : '#666';
	b[9].style.backgroundColor = neutronUpgrade(3).canBuy() ? '#aaa' : '#666';
	b[10].style.backgroundColor = electronUpgrade(0).canBuy() ? '#aaa' : '#666';
	b[11].style.backgroundColor = electronUpgrade(1).canBuy() ? '#aaa' : '#666';
	b[12].style.backgroundColor = electronUpgrade(2).canBuy() ? '#aaa' : '#666';
	b[13].style.backgroundColor = electronUpgrade(3).canBuy() ? '#aaa' : '#666';
	b[14].style.backgroundColor = Elements.canUnlockParticles() ? '#aaa' : '#666';

	b[0].style.display = Elements.canSeeBtn() ? '' : 'none';
	b[1].style.display = Elements.unlocked() ? '' : 'none';
	b[2].style.display = protonUpgrade(0).canSee() ? '' : 'none';
	b[3].style.display = protonUpgrade(1).canSee() ? '' : 'none';
	b[4].style.display = protonUpgrade(2).canSee() ? '' : 'none';
	b[5].style.display = neutronUpgrade(0).canSee() ? '' : 'none';
	b[6].style.display = neutronUpgrade(1).canSee() ? '' : 'none';
	b[7].style.display = neutronUpgrade(2).canSee() ? '' : 'none';
	b[8].style.display = protonUpgrade(3).canSee() ? '' : 'none';
	b[9].style.display = neutronUpgrade(3).canSee() ? '' : 'none';
	b[10].style.display = electronUpgrade(0).canSee() ? '' : 'none';
	b[11].style.display = electronUpgrade(1).canSee() ? '' : 'none';
	b[12].style.display = electronUpgrade(2).canSee() ? '' : 'none';
	b[13].style.display = electronUpgrade(3).canSee() ? '' : 'none';
	b[14].style.display = Elements.canSeeParticleBtn() ? '' : 'none';
	b[15].style.display = Elements.particlesUnlocked() ? '' : 'none';
	b[16].style.display = hydrogenUpgrade(2).atMaxLevel() ? 'none' : '';
	b[17].style.display = hydrogenUpgrade(3).atMaxLevel() ? 'none' : '';
	b[18].style.display = hydrogenUpgrade(4).visible() ? '' : 'none';
	b[19].style.display = hydrogenUpgrade(3).atMaxLevel() ? '' : 'none';
	b[20].style.display = hydrogenUpgrade(5).visible() ? '' : 'none';
	b[21].style.display = hydrogenUpgrade(6).visible() ? '' : 'none';
	b[22].style.display = hydrogenUpgrade(6).atMaxLevel() ? '' : 'none';
	b[23].style.display = 'none';
}