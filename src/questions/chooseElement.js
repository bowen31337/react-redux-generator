import config from '../config.js'


const questions = [{
		type: 'list',
		name: 'element',
		message: 'which of the following elements is to be created?',
		default: config.ELEMENTS[0],
		choices: config.ELEMENTS
	}
]


export default questions
