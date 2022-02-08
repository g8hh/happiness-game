let Quarks = {
	perSecond() {
		let ps = Upgrade(1).level === 1 ? new Decimal(1) : new Decimal(0);
		if(Upgrade(2).level === 1) ps = ps.times(2);
		ps = ps.times(Upgrade(4).effect());
		return ps;
	},
};

let Protons = {
	perSecond() {
		let ps = Upgrade(3).level === 1 ? new Decimal(0.001) : new Decimal(0);
		ps = ps.times(Upgrade(5).effect());
		return ps;
	},
};