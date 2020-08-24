import arg from 'arg';
import { prompt } from 'inquirer';

export const parseArgumentsIntoOptions = (rawArgs) => {
	const args = arg(
		{
			'--git': Boolean,
			'--scss': Boolean,
			'--redux': Boolean,
			'--yes': Boolean,
			'-y': '--yes'
		}
	);

	return {
		skipPrompt: args['--yes'] || false,
		git: args['--git'] || false,
		scss: args['--scss'] || false,
		redux: args['--redux'] || false
	}
}

export const promptForMissingArgs = async (options) => {
	const questions = [];

	if(options.skipPrompt) {
		return {
			...options
		}
	}

	if(!options.git) {
		questions.push({
			type: 'confirm',
			name: 'git',
			message: 'Do you want to initialize a git repository?',
			default: false
		});
	}
	if(!options.scss) {
		questions.push({
			type: 'confirm',
			name: 'scss',
			message: 'Do you want to implement scss?',
			default: false
		});
	}
	if(!options.redux) {
		questions.push({
			type: 'confirm',
			name: 'redux',
			message: 'Do you want to implement redux?',
			default: false
		});
	}

	const answers = await prompt(questions);

	return {
		...options,
		git: options.git || answers.git,
		scss: options.scss || answers.scss,
		redux: options.redux || answers.redux
	}
}