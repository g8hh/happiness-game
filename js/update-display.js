let quark_gen_table = (() => document.querySelectorAll("#quark-generators tr"))();
let neutron_gen_table = (() => document.querySelectorAll('#neutron-generators tr'))();
let achievements = (() => document.querySelectorAll("#achievements tr td"))();
let ach_name = (() => document.getElementsByClassName("ach-name"))();
let ach_status = (() => document.getElementsByClassName("ach-status"))();
let autobuyers = (() => document.getElementsByClassName("autobuyer"))();

let Update = function() {
	g("e1").innerText = Quarks.amount.format(true);
	g("e2").innerText = quarkGenerator(1).perSecond().format(true);
	g("e3").innerText = Quarks.amount.format(true);
	g("e4").innerText = quarkGenerator(1).perSecond().format(true);
	g("e5").innerText = player.stats.totalQuarks.format(true);
	g("e6").innerText = timeFormat(player.stats.timeInProtonic);
	g("e7").innerText = timeFormat(player.stats.totalTime);
	g("e8").innerText = Achievements.totalUnlocked();
	g("e9").innerText = Baryons.multiplier().format(true);
	g("e10").innerText = Achievements.multiplier().format(true);
	g("e11").innerText = Bosons.bought();
	g("e12").innerText = Bosons.multiplier().format(true);
	g("e13").innerText = Bosons.multPer().format(true);
	g("e14").innerText = "Cost: " + Bosons.cost().format(true);
	g("e16").style.display = Autobuyer(9).has() ? 'inline-block' : 'none';
	g("e16").innerText = "Auto: " + (Autobuyer(9).active() ? "On" : "Off") + (Autobuyer(9).slow() ? ' (Slow)' : '');
	g("e18").innerText = timeFormat(player.stats.totalTimeWithOffline);
	g("e19").innerText = timeFormat(player.stats.timeInBaryonic);
	g("e20").innerText = timeFormat(player.stats.timeInFermionic);
	g("e21").innerText = player.stats.totalBosons;
	g("e22").innerText = Autobuyers.amount();
	g("e23").innerText = timeFormat(player.slowautobuytimer);
	g("e24").style.display = Autobuyers.hasAny() ? 'block' : 'none';
	g("e25").innerText = Baryons.gainText();
	g("e26").style.display = Baryons.canGain() ? 'none' : 'block';
	g("e27").style.display = Baryons.canGain() ? 'block' : 'none';
	g("e28").innerText = Baryons.amount().format(true);
	g("e29").innerText = Baryons.totalGain().format(true);
	g("e30").innerText = Baryons.newGain().format(true);
	g("e31").innerText = Baryons.gainMultiplier().format(true);
	g("e32").style.display = player.progress.bosonic ? 'block' : 'none';
	g("e33").style.display = player.progress.bosonic ? 'block' : 'none';
	g("e34").style.display = player.progress.baryonic ? 'block' : 'none';
	g("e35").style.display = player.progress.fermionic ? 'block' : 'none';
	g("e36").innerText = Fermions.amount().format(true);
	g("e37").style.display = Fermions.canGain() ? 'none' : 'block';
	g("e38").innerText = Fermions.requirement().format(true) + " quarks";
	g("e39").style.display = Fermions.canGain() ? 'block' : 'none';
	g("e40").innerText = Fermions.amount().format(true);
	g("e41").innerText = Fermions.totalGain().format(true);
	g("e42").innerText = Fermions.newGain().format(true);
	g("e43").innerText = Fermions.multGain().format(true);
	g("e44").innerText = Baryons.extraText();
	g("e45").innerText = Fermions.extraText();
	g("e46").style.display = player.progress.baryonic ? 'block' : 'none';
	g("e47").style.display = Quarks.cannotSeeGens() ? 'none' : 'block';
	g("e48").style.display = Quarks.atLimit() ? 'block' : 'none';
	g("e49").style.display = Protonic.canGain() ? 'inline-block' : 'none';
	g("e50").innerText = Protonic.gain().format(true);
	g("e51").innerText = Protonic.gainMultiplier().format(true);
	g("e52").innerText = Protons.amount().format(true);
	g("e53").innerText = Protonic.newAmount().format(true);
	g("e54").innerText = timeFormat(Protonic.time());
	g("e55").innerText = Protonic.protonsPerSecond();
	g("e56").innerText = Protonic.peakProtonsPerSecond();
	g("e57").style.display = Protonic.canSee() ? 'block' : 'none';
	g("e58").style.display = Quarks.atLimit() ? 'inline' : 'none';
	g("e59").innerText = Protons.amount().format(true);
	g("e60").innerText = Protons.total().format(true);
	g("e61").innerText = Protonic.amount() == 1 ? '' : 's';
	g("e62").innerText = Protons.multiplier().format(true);
	g("e63").innerText = Protonic.amount();
	g("e64").innerText = new Decimal(Protonic.multiplier()).format(true);

	g("e68").innerText = timeFormat(16);

	if(Protonic.canGain()) Protonic.updatePeakProtonsPerSecond();

	g("t1").style.display = player.progress.protonic ? 'inline' : 'none';
	g("t2").style.display = player.progress.protonic ? 'inline' : 'none';
 
	for(let i=0;i<8;i++){
		quark_gen_table[i].style.display = (player.highestQuarkGenerator>=i) ? 'table-row' : 'none';
		quark_gen_table[i].children[1].innerText = quarkGenerator(i+1).amount().format(true);
		quark_gen_table[i].children[2].innerText = (i<7) ? quarkGenerator(i+2).perSecond().format(true) + '/s' : '0.000/s';
		quark_gen_table[i].children[3].innerText = quarkGenerator(i+1).multiplier().format(true) + "x";
		quark_gen_table[i].children[4].children[0].innerText = "Cost: " + quarkGenerator(i+1).cost().format();
		quarkGenerator(i+1).canBuy() ? quark_gen_table[i].children[4].children[0].classList.remove('disabled') : quark_gen_table[i].children[4].children[0].classList.add('disabled');
		quarkGenerator(i+1).canBuy() ? quark_gen_table[i].children[5].children[0].classList.remove('disabled') : quark_gen_table[i].children[5].children[0].classList.add('disabled');
		quark_gen_table[i].children[6].children[0].style.display = Autobuyer(i+1).has() ? "block" : "none";
		quark_gen_table[i].children[6].children[0].innerText = "Auto: " + (Autobuyer(i+1).active() ? 'On' : 'Off') + (Autobuyer(i+1).slow() ? ' (Slow)' : '');

		neutron_gen_table[i].style.display = (player.highestNeutronGenerator>=i) ? 'table-row' : 'none';
		neutron_gen_table[i].children[1].innerText = neutronGenerator(i+1).amount().format(true);
		neutron_gen_table[i].children[2].innerText = (i<7) ? neutronGenerator(i+2).perSecond().format(true) + '/s' : '0.000/s';
		neutron_gen_table[i].children[3].innerText = neutronGenerator(i+1).multiplier().format(true) + "x";
		neutron_gen_table[i].children[4].children[0].innerText = "Cost: " + neutronGenerator(i+1).cost().format() + " P";
		neutronGenerator(i+1).canBuy() ? neutron_gen_table[i].children[4].children[0].classList.remove('disabled') : neutron_gen_table[i].children[4].children[0].classList.add('disabled');
		neutronGenerator(i+1).canBuy() ? neutron_gen_table[i].children[5].children[0].classList.remove('disabled') : neutron_gen_table[i].children[5].children[0].classList.add('disabled');
		neutron_gen_table[i].children[6].style.display = "none";

	};

	for(let i=0;i<autobuyers.length;i++){
		Autobuyer(i+1).canBuy() ? autobuyers[i].children[1].classList.remove("disabled") : autobuyers[i].children[1].classList.add("disabled");
	}

	Bosons.canBuy() ? g("e14").classList.remove("disabled") : g("e14").classList.add("disabled");
	Bosons.canBuy() ? g("e15").classList.remove("disabled") : g("e15").classList.add("disabled");
	quarkGenerators.anyBuyable() ? g("e17").classList.remove("disabled") : g("e17").classList.add("disabled");
};

let updateOccasional = function() {
	for(let i=0;i<achievements.length;i++){
		Achievements.has(i) ? achievements[i].classList.remove("locked") : achievements[i].classList.add('locked');
		Achievements.isVisible(i) ? achievements[i].children[1].classList.remove('hidden') : achievements[i].children[1].classList.add('hidden');
	};

	for(let i=0;i<ach_status.length;i++){
		ach_status[i].innerText = Achievements.has(i) ? '(Unlocked)' : '(Locked)';
	};

	for(let i=0;i<ach_name.length;i++){
		ach_name[i].innerText = Achievements.getName(i);
	};

	for(let i=0;i<autobuyers.length;i++){
		autobuyers[i].children[1].style.display = Autobuyer(i+1).has() ? 'none' : 'inline-block';
		autobuyers[i].children[2].style.display = Autobuyer(i+1).has() ? 'inline-block' : 'none';
		autobuyers[i].children[1].innerText = "Unlock: " + Autobuyer(i+1).cost().format(true) + " Quarks";
		autobuyers[i].children[2].children[0].checked = Autobuyer(i+1).active();
		autobuyers[i].children[2].children[2].innerText = Autobuyer(i+1).mode()==1 ? 'Single' : 'Max';
	};
};