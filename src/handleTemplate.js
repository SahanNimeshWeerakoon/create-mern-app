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

const setTemplateDir = async options => {
	let templateName = 'MERN_boilerplate';
	if(options.redux) {
		templateName = 'MERN_redux_boilerplate';
	}

	return templateName;
}

export const createProject = async options => {
	const template = await setTemplateDir(options);
	options = {
		...options,
		targetDirectory: options.targetDirectory || process.cwd(),
		template
	}

	const templateDirectory = path.resolve(
		__filename,
		'../../templates',
		options.template
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
	return true;
}