import './utils/banner'

import program from 'commander'

import config from './config'
import pkg from '../package.json'

import questionsComponent from './questions/addComponent'
import actionsComponent from './actions/addComponent'

import questionsContainer from './questions/addContainer'
import actionsContainer from './actions/addContainer'

import questionsRoute from './questions/addRoute'
import actionsRoute from './actions/addRoute'

import questionsChooseElement from './questions/chooseElement'
import actonsChooseElement from './actions/chooseElement'


const elementActionsMap = {
	'component':{
		'action':actionsComponent,
		'questions':questionsComponent
	},
	'container':{
		'action':actionsContainer,
		'questions':questionsContainer
	},
	'route':{
		'action':actionsRoute,
		'questions':questionsRoute
	}
}



program
  .version(pkg.version)
  .option('-c, --component', 'Add new component')
  .option('-C, --container', 'Add new container')
  .option('-r, --route', 'Add new route')
  .parse(process.argv)


chooseActions(program)

function chooseActions(program) {
	const elements = config.ELEMENTS.filter(e => program[e])
	if(0 === elements.length) return chooseElement()
		elements.forEach(e=> elementActionsMap[e].action(elementActionsMap[e].questions))
}

async function chooseElement() {
	const e = await actonsChooseElement(questionsChooseElement)
	return elementActionsMap[e].action(elementActionsMap[e].questions)
}


