robotCommand.connectToArena("GenericBot");

var scanDir = 0;
var arcSize = 90;
var swivelSpeed = 20.0;

robotCommand.status = function(data) {
	if (robotData.arenaCurrentTime - robotData.lastScanned > 100)
		robotCommand.checkScanner(deg2rad(scanDir), deg2rad(90));
	if (robotData.arenaCurrentTime - robotData.lastSetDrive > 3000)
		robotCommand.setDrive((Math.random() * Math.TAU), 100);
};

var lastTargetId = "";
robotCommand.robotScanInfoUpdated = function(data) {
	if (robotScanInfo.found) {
		if (robotScanInfo.target[0].socketId != lastTargetId) {
			swivelSpeed = 20.0;
			arcSize = 90;
		}
		
		if (robotScanInfo.target[0].distance > 100) { // Try not to shoot yourself.
			robotCommand.setDrive(robotScanInfo.angle, 100);
			robotCommand.fireCannon(robotScanInfo.angle, robotScanInfo.target[0].distance);
			
			scanDir += robotScanInfo.target[0].side * swivelSpeed;
			
			swivelSpeed -= 1.0;
			if (swivelSpeed < 0.1) swivelSpeed = 0.1;
			
			arcSize -= 1.0;
			if (arcSize < 5) arcSize = 5;

			lastTargetId = robotScanInfo.target[0].socketId;
		}
	} else {
		swivelSpeed = 20.0;
		arcSize = 90;
		scanDir += 45;
	}
	
	scanDir %= 360;
	robotCommand.checkScanner(deg2rad(scanDir), deg2rad(arcSize));
};

// function robotGo() {
// 	//console.log("robotGo");
// 	robotCommand.setDrive(null, 100);
// }

// function robotStop() {
// 	//console.log("robotStop");
// 	robotCommand.setDrive(null, 0);
// }

// function robotRandomDir() {
// 	//console.log("robotRandomDir");
// 	robotCommand.setDrive((Math.random() * Math.TAU), 100);
// }

// function robotFire() {
// 	//console.log("robotFire");
// 	robotCommand.fireCannon((Math.random() * Math.TAU), ((Math.random() * 650) + 100));
// }

// function robotScan() {
// 	//console.log("robotScan");
// 	scanDir = Math.random() * 360;
// 	robotCommand.checkScanner(deg2rad(scanDir), deg2rad(90));
// }

//setInterval(function(){ robotFire(); }, 500);
//setInterval(function(){ robotRandomDir(); }, 2000);

// var direction = -1;
// setInterval(function(){
// 	if (robotData.speed === 0) {
// 		direction++;
// 		direction %= 4;
// 		switch (direction) {
// 			case 0:
// 				robotCommand.setDrive((Math.PI * 0.0) + 0.02, 100);
// 				break;
// 			case 1:
// 				robotCommand.setDrive((Math.PI * 0.5) + 0.02, 100);
// 				break;
// 			case 2:
// 				robotCommand.setDrive((Math.PI * 1.0) + 0.02, 100);
// 				break;
// 			case 3:
// 				robotCommand.setDrive((Math.PI * 1.5) + 0.02, 100);
// 				break;
// 			default:
// 				robotCommand.setDrive((Math.random() * Math.TAU), 100);
// 		}
// 	}
// }, 200);