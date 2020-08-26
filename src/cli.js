import { parseArgumentsIntoOptions, promptForMissingArgs } from './argvs';
import { createProject } from './handleTemplate';

export async function cli(args) {
	let options = parseArgumentsIntoOptions(args);
	options = await promptForMissingArgs(options);
	await createProject(options);
	// console.log(options);
}