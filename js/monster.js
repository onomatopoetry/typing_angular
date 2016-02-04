function Monster() {
	this.distance = 3;
	this.speed = 1000;
}

Monster.prototype.activate = function() {
	console.log("monster activating! distance = " + this.distance);
	this.getCloser = setInterval(function(){
		//move the monster closer each time the timer goes off.
		if(this.distance == 0) {
			console.log("gotcha!");
			clearInterval(this.getCloser);
		} else {
			this.distance--;
			console.log("monster at distance: " + this.distance);
		}
	}.bind(this), this.speed);
}

Monster.prototype.kill = function() {
	clearInterval(this.getCloser);
}