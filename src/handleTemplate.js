import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);


const copyTemplateFiles = async options => {
	return copy(options.templateDirectory, options.targetDirectory, { clobber: false });
}

export const createProject = async options => {
	options = {
		...options,
		targetDirectory: options.targetDirectory || process.cwd()
	}

	const templateDirectory = path.resolve(
		__filename,
		'../../templates',
		options.template.toLowercase()
	);

	options.templateDirectory = templateDirectory;

	try {
		await access(templateDirectory, fs.constants.R_OK);
	} catch(err) {
		console.err('%s Invalid template name.', chalk.red.bold('ERROR'));
		process.exit(1);
	}

	console.log('Copy project files');
	await copyTemplateFiles(options);

	console.log('%s Project ready', chalk.green.bold('DONE'));
}