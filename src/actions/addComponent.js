import inquirer from "inquirer"
import path from "path"
import chalk from "chalk"

import config from "../config.js"
import delay from "../utils/delay"

import CLI from "clui"

import pascalCase from "pascal-case"

import { getCurrentDirectoryBase } from "../utils/files"
import { renderTemplate } from "../utils/renderTemplate"

const Spinner = CLI.Spinner

let logs = []

const action = async questions => {
	const answers = await inquirer.prompt(questions)

	const status = new Spinner("Adding a new Component, please wait...")
	status.start()

	let { name, wantHeaders } = answers

	name = pascalCase(name)


	const templates = config.COMPONENTS.find(
		component => component.type == answers.type
	).templates

	templates.forEach(async template => {
		const from = path.join(
			__dirname,
			"..",
			"src",
			"templates",
			"component",
			template
		)
		let savedFile = ""
		if (template.includes("test")) {
			savedFile = await renderTemplate(
				from,
				`./${config.APP_SRC}/components/${name}/tests/test.js`,
				{ name, wantHeaders }
			)
		} else {
			savedFile = await renderTemplate(
				from,
				`./${config.APP_SRC}/components/${name}/index.js`,
				{ name, wantHeaders }
			)
		}

		logs.push(savedFile)
	})

	await delay(500)

	status.stop()

	console.log(chalk.green(logs.join("\n\r")))
}

export default action
