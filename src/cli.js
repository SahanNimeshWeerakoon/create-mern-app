const { parseArgumentsIntoOptions, promptForMissingArgs } = require('./argvs');

export async function cli(args) {
	let options = parseArgumentsIntoOptions(args);
	options = await promptForMissingArgs(options);
	console.log(options);
}