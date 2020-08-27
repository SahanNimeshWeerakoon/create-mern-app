import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

const initGit = async options => {
	const result = await execa('git', ['init'], {
		cwd: options.targetDirectory
	});

	if(result.failed) {
		return Promise.reject(new Error('Failed to initialise Git repo'));
	}

	return ;
}

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

	const tasks = new Listr([
		{
			title: 'Copy project files',
			task: () => copyTemplateFiles(options)
		},
		{
			title: 'Initialize git',
			task: () => initGit(options),
			enabled: () => options.git
		},
		{
			title: 'Install dependencies',
			task: () => projectInstall({
				cwd: options.targetDirectory
			}),
			skip: () => !options.runInstall ? 'Pass --isntall to automatically install dependencies' : undefined
		}
	]);

	await tasks.run();

	console.log('%s Project ready', chalk.green.bold('DONE'));
	return true;
}