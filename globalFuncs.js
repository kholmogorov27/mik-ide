function throwError(msg) {
	throw msg;
}
function internalError(msg) {
	Swal.fire({
		icon: 'error',
		title: 'Error: ' + msg,
		showConfirmButton: false,
		timer: 3000
	})
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
function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}
function download(data, filename, type) {
	Swal.fire({
		html: `<input type="text" class="file-name" value="${chromeTabs.activeTabEl.querySelector('.chrome-tab-title').textContent}">
		<span style="font-family: system-ui;font-weight: bold;margin: -8px;">.</span>
		<select class="type-selector">
			<option selected="selected">miku</option>
			<option>mik</option>
			<option>asm</option>
			<option>txt</option>
	    </select>`,
		confirmButtonText: 'Загрузить'
	}).then((result) => {
		if (result.isConfirmed) {
			let type = $('.type-selector').val();
			let filename = $('.file-name').val() + '.' + type;
			console.log(filename);
			switch (type) {
				case 'mik':
					data = data.toString().replaceAll(',', '');
					break;
				default:

			}
		    let file = new Blob([data.toString().replaceAll(',', '')]);
		    if (window.navigator.msSaveOrOpenBlob)
		        window.navigator.msSaveOrOpenBlob(file, filename);
		    else {
		        var a = document.createElement("a"),
		                url = URL.createObjectURL(file);
		        a.href = url;
		        a.download = filename;
		        document.body.appendChild(a);
		        a.click();
		        setTimeout(function() {
		            document.body.removeChild(a);
		            window.URL.revokeObjectURL(url);
		        }, 0);
		    }
		}
	});
}
