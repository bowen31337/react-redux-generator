import {
	componentExists
} from "../utils/componentExists"

import pascalCase from "pascal-case"

const questions = [
	{
		type: "input",
		name: "component",
		message: "Which component should the route show?",
		validate: async value => {
			if (/^[A-Za-z]/.test(value)) {
				return (await componentExists(value))
					? true
					: `A container with this ${pascalCase(value)} doesn't exists`
			}

			return "The name must begin with a word"
		}
	},
	{
		type: "input",
		name: "path",
		message: "Enter the path of the route.",
		default: "/about",
		validate: value => {
			if (/.+/.test(value)) {
				return true
			}

			return "path is required"
		}
	}
]

export default questions
