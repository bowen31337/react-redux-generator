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

	const status = new Spinner("Adding a new container tupel, please wait...")
	status.start()

	let { name } = answers

	name = pascalCase(name)

	let tupels = config.CONTAINERS.filter(c => answers[c.name])

	tupels.forEach(tupel => {
		tupel.templates.forEach(async template => {
			const from = path.join(
				__dirname,
				"..",
				"src",
				"templates",
				"container",
				template
			)

			template = template.split(".")
			template.pop()
			template = template.join(".")

			let savedFile = ""

			if (template.includes("test")) {
				savedFile = await renderTemplate(
					from,
					`./${config.APP_SRC}/containers/${name}/tests/${template}`,
					{ name }
				)
			} else {
				savedFile = await renderTemplate(
					from,
					`./${config.APP_SRC}/containers/${name}/${template}`,
					{ name }
				)
			}
			logs.push(savedFile)
		})
	})

	await delay(500)

	status.stop()

	console.log(chalk.green(logs.join("\n\r")))
}

export default action
