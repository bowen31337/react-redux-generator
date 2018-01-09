import inquirer from 'inquirer'

import config from '../config.js'


const action = async questions => {
	const answers = await inquirer.prompt(questions)
	return answers.element
}

export default action
