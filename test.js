const fs = require('fs');
const path = require('path');
const enn = require('./test2');

// function loadDirectory(dir, filetype, callback) {
// 	const dirfiles = fs.readdirSync(dir);
// 	for (const file of dirfiles) {
// 		const filepath = path.join(dir, file);
// 		const filestat = fs.statSync(filepath);
// 		if (filestat.isDirectory()) {
// 			loadDirectory(filepath, filetype, callback);
// 		}
// 		else if (filepath.endsWith(filetype)) {
// 			callback(filepath);
// 		}
// 	}
// }

// loadDirectory(path.join(__dirname, 'commands'), '.js', console.log);

console.log(enn(10));