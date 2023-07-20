const timer = async function(sectime) {
	const start = Date.now();
	const stop = start + (sectime * 1000);
	// eslint-disable-next-line no-constant-condition
	while (true) {
		if (stop < Date.now()) {
			return 0;
		}
	}
};

async function main() {
	console.log('timer_start');
	await timer(10);
	console.log('timer_stop');
}

console.log('start');
main();
console.log('stop');