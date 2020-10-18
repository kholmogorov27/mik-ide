function throwError(msg) {
	throw msg;
}
function internalError(msg) {
	alertify.error('Error:' + msg);
	console.log('Error:', msg);
}
function debug(msg) {
	if (debuging) {
		console.log(msg);
	}
}
function say(environment, msg) {
	console.log(SayText + msg);
}
function sign(num) {
	if (num > 0) {
		return 1;
	}else if (num < 0) {
		return -1;
	}else {
		return 0;
	}
}
function WordToNum(word) {
	if (word.indexOf('-') != -1) {
		word = '-' + word.replace('-', '');
	}
	return Number(word);
}
function preAddress(currentAddress, command) {
	if (f0Commands.hasOwnProperty(command) || f1Commands.hasOwnProperty(command)) {
		if (f0Commands.hasOwnProperty(command)) {
			return currentAddress-1;
		}else {
			return currentAddress-3;
		}
	}else {
		return currentAddress;
	}
}
