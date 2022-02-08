let Notation = {
	init() {
		document.getElementById("notation-selection").value = player.format.notation;
		document.getElementById("norm-precision").value = player.format.normalPrecision;
		document.getElementById("high-precision").value = player.format.higherPrecision;
		document.getElementById('time-format-setting').value = player.format.timeFormat;
		document.getElementById('notations-on-time').checked = player.format.notationOnTime;
		document.getElementById('commas-on-exponents').checked = player.format.commasOnExponent;
	},
	notations: ['Scientific','Engineering','Logarithm', 'Brackets', 'Infinity'],
	timeFormats: ['D:H:M:S','Seconds','Largest unit'],
	set(name) {
		if(!this.notations.includes(name)) return;
		player.format.notation = name;
	},
	setNormalPrecision(value) {
		if(value < 0 || value > 10) return;
		player.format.normalPrecision = value;
	},
	setHigherPrecision(value) {
		if(value < 0 || value > 10) return;
		player.format.higherPrecision = value;
	},
	setTimeFormat(value) {
		if(!this.timeFormats.includes(value)) return;
		player.format.timeFormat = value;
	},
	setNotationOnTime(bool) {
		if(typeof bool !== 'boolean') return;
		player.format.notationOnTime = bool;
	},
	setCommasOnExponents(bool) {
		if(typeof bool !== 'boolean') return;
		player.format.commasOnExponent = bool;
	},
};

function timeFormat(time) {
	if(time instanceof Decimal) time = time.toNumber();
	if(player.format.timeFormat === "D:H:M:S") {
		let seconds = (time % 60).toFixed(0);
		let minutes = Math.floor((time/60) % 60);
		let hours = Math.floor((time/(60*60)) % 24);
		let days = Math.floor((time/(60*60*24)));

		if(seconds.length==1) seconds = "0" + seconds;
		if(minutes<10) minutes = "0" + minutes;
		if(hours<10) hours = "0" + hours;

		if(days>0) return days + ":" + hours + ":" + minutes + ":" + seconds
		if(hours>0) return hours + ":" + minutes + ":" + seconds; 
		return minutes + ":" + seconds;
	} else if (player.format.timeFormat === "Seconds") {
		if(player.format.notationOnTime) {
			return formatInt(time, player.format.normalPrecision) + " seconds";
		}
		if(time<1e3) return time.toFixed(player.format.normalPrecision) + " seconds";
		return getScientific(time, player.format.normalPrecision) + " seconds";
	} else if (player.format.timeFormat === 'Largest unit') {
		if(time > 24 * 3600) {
			return (time / 24*3600).toFixed(player.format.normalPrecision) + " days";
		} else if (time > 3600) {
			return (time / 3600).toFixed(player.format.normalPrecision) + " hours";
		} else if (time > 60) {
			return (time / 60).toFixed(player.format.normalPrecision) + " minutes";
		} else {
			return time.toFixed(player.format.normalPrecision) + " seconds";
		}
	} 
};

function formatInt(number) {
	if(number === '') return '';
	return format(number, player.format.normalPrecision);
};

function formatFloat(number) {
	return format(number, player.format.higherPrecision);
};

function formatWhole(number) {
	number = new Decimal(number)
	if(number.lt(1)) return formatInt(number);
	if(number.gt(1e3)) return formatInt(number);
	return format(number, 0);
};

function getScientific(value, places) {
	if(!(value instanceof Decimal)) value = new Decimal(value);
	let m = value.m;
	let e = value.e;
	if(e > 999999999) {
		e = new Decimal(e);
		return "e" + e.m.toFixed(places) + "e" + e.e.toFixed(0);
	}
	if(player.format.commasOnExponent) {
		if(e > 9999) return m.toFixed(places) + "e" + e.toLocaleString();
	}
	return m.toFixed(places) + "e" + e;
};

function format(value, places, placesUnder1000) {
	value = new Decimal(value);
	placesUnder1000 = placesUnder1000 ?? places;
	if(value.lt(1e3)) return value.toFixed(placesUnder1000);
	if(player.format.notation === "Scientific") {
		return getScientific(value,places);
	} else if (player.format.notation === "Engineering") {
		mantissa = value.m * Math.pow(10, value.e % 3);
		exponent = value.e - (value.e % 3);
		if(exponent>9999) {
			if(player.format.commasOnExponent) return mantissa.toFixed(places) + "e" + exponent.toLocaleString();
		}
		if(exponent>999999999) {
			value = new Decimal(exponent);
			mantissa = value.m * Math.pow(10, value.e % 3);
			exponent = value.e - (value.e % 3);
			return "e" + mantissa.toFixed(places) + "e" + exponent;
		}
		return mantissa.toFixed(places) + "e" + exponent;
	} else if (player.format.notation === "Logarithm") {
        var base = 10;
        var prefix = "e";
        var power = Decimal.log10(value)
        if (power > 9999) {
        	if(player.format.commasOnExponent) return prefix+power.toLocaleString(undefined, {minimumFractionDigits: places, maximumFractionDigits: places});
            return prefix+power.toFixed(places);
        }
        return prefix+power.toFixed(places);
    } else if (player.format.notation === "Brackets") {
		var table = [..."[{(<>)}]"];
		var log8 = Math.LN10 / Math.log(8) * Decimal.log10(value);
		var wholePartOfLog = Math.floor(log8);
		var decimalPartOfLog = log8 - wholePartOfLog;
		var decimalPartTimes64 = Math.floor(decimalPartOfLog * 64);
		var string = "";
		while (wholePartOfLog >= 8) {
			var remainder = wholePartOfLog % 8;
			wholePartOfLog -= remainder;
			wholePartOfLog /= 8;
			string = table[remainder] + string;
		}
		string = "e" + table[wholePartOfLog] + string + ".";
		string += table[Math.floor(decimalPartTimes64 / 8)];
		string += table[decimalPartTimes64 % 8];
		return string;
    } else if (player.format.notation === "Infinity") {
        const inflog = Math.log10(Number.MAX_VALUE)
        const pow = Decimal.log10(value)
        var reduced = pow / inflog
        if (reduced < 1000) var infPlaces = 4
        else var infPlaces = 3
        if(reduced>9999) {
        	if(player.format.commasOnExponent) return reduced.toLocaleString(undefined, {minimumFractionDigits: places, maximumFractionDigits: places})+"∞";
        	return reduced.toFixed(Math.max(infPlaces, places))+"∞";
        }
        return reduced.toFixed(Math.max(infPlaces, places))+"∞";
    }
    return 'you have somehow messed up my beautiful notation system... :('
};