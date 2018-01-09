import { containerExists } from "../utils/componentExists"
import config from "../config.js"

const questions = [
	{
		type: "input",
		name: "name",
		message: "What should it be called?",
		default: "Header",
		validate: async value => {
			if (/^[A-Za-z]/.test(value)) {
				return (await containerExists(value))
					? "A container with this name already exists"
					: true
			}

			return "The name must begin with a word"
		}
	},
	{
		type: "confirm",
		name: "wantActionsAndReducer",
		default: true,
		message:
			"Do you want an actions/constants/selectors/reducer tupel for this container?"
	},
	{
		type: "confirm",
		name: "wantSagas",
		default: true,
		message: "Do you want sagas for asynchronous flows? (e.g. fetching data)"
	}
]

export default questions
