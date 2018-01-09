import inquirer from "inquirer"
import chalk from "chalk"
import path from "path"
import config from "../config.js"
import delay from "../utils/delay"

import CLI from "clui"

import pascalCase from "pascal-case"
import {
	componentExists,
	isFileExistInContainer
} from "../utils/componentExists"

import { getCurrentDirectoryBase, read } from "../utils/files"
import {renderRoute} from "../utils/renderTemplate"

const Spinner = CLI.Spinner

let logs = []


const action = async questions => {
	const answers = await inquirer.prompt(questions)

	const status = new Spinner("Adding a new container tupel, please wait...")
	status.start()

	let { component, path: routePath } = answers

	component = pascalCase(component)

	const hasReducer = await isFileExistInContainer(component, "reducer")

	let templates = config.ROUTES.find(
		r => (hasReducer ? r.name === "routeWithReducer" : r.name === "route")
	).templates

	templates.forEach(async template => {
		const from = path.join(
			__dirname,
			"..",
			"src",
			"templates",
			"route",
			template
		)

		let savedFile = ""


		try {
			savedFile = await renderRoute(
				from,
				`./${config.APP_SRC}/route.js`,
				{
					component,
					path: routePath,
					useSagas: isFileExistInContainer(component, "sagas")
				}
			)
		} catch (e) {
			logs.push(e)
		}

		logs.push(savedFile)
	})

	await delay(500)

	status.stop()

	console.log(chalk.green(logs.join("\n\r")))
}

export default action
