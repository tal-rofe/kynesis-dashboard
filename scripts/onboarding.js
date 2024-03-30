import chalk from 'chalk';
import figlet from 'figlet';

figlet('Kynesis.io', (err, figletText) => {
	if (err) {
		return;
	}

	console.log(chalk.bold(figletText));

	console.log(chalk.bold.blue('Welcome to Kynesis.io repository!!'));

	console.log('🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨\n');

	console.log(chalk.bold('Please follow these rules:'));
	console.log(chalk.bold('Please follow these rules:'));

	console.log(chalk.bold.blue('- 📦️ Use "git cmt" instead of "git commit" in order to commit your changes'));
	console.log(chalk.bold.blue('- 🛂 Follow the code conventions (our linters will enforce you..)'));
	console.log(chalk.bold.blue('- 🚀 Make sure GitHub actions are passed before asking for PR'));
});
