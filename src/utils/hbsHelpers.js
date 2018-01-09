import pascalCase from 'pascal-case'
import camelCase from 'camel-case'

import config from '../config.js'


import {  directoryExists } from './files'

const curly = (object, open) => (open ? '{' : '}')

const directory = comp => {
	const compExist = directoryExists(`${config.APP_SRC}/containers/${comp}`)
	return compExist?`./containers/${comp}`:`./components/${comp}`
}

export default {
	pascalCase,
	camelCase,
	properCase:pascalCase,
	directory,
	curly
}
