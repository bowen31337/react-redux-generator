import { componentExists } from '../utils/componentExists'
import config from '../config.js'


const questions = [{
		type: 'list',
		name: 'type',
		message: 'Select the type of component',
		default: config.COMPONENTS.map(component => component.type)[0],
		choices: config.COMPONENTS.map(component => component.type)
	},
	{
		type: 'input',
		name: 'name',
		message: 'What should it be called?',
		default: 'Button',
		validate: async(value) => {
			if (/^[A-Za-z]/.test(value)) {
				return await componentExists(value) ?
					'A component with this name already exists' :
					true
			}

			return 'The name must begin with a word'
		}
	},
	{
		type: "confirm",
		name: "wantHeaders",
		default: false,
		message: "Do you want headers?"

	}
]


export default questions
