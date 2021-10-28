let timeFormat = function(time) {
	if(player.options.timeFormat=="Seconds") {
		return new Decimal(time).format(true) + " seconds";
	}
	else if(player.options.timeFormat=="Largest unit") {
		if (time / 60 >= 1) {
			if(time / (60*60) >= 1) {
				if(time / (60*60*24) >= 1) {
					time = time / (24*60*60)
					return time.toFixed(3) + " days";
				}
				time = time / (60*60)
				return time.toFixed(3) + " hours";
			}
			time = time / 60
			return time.toFixed(3) + " minutes";
		}
		return new Decimal(time).format(true) + " seconds";
	}
	else if(player.options.timeFormat=="D:H:M:S") {
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
	}
};