import config from '../config.js'

import { getCurrentDirectoryBase, mkdir } from './files'

const fs = require('fs')

const resolveCurrentPath = folderName => `./${config.APP_SRC}/${folderName}`

const componentExists = async (comp) => {
	await mkdir(resolveCurrentPath('components'))
	const pageComponents = fs.readdirSync(resolveCurrentPath('components'))

	const components = pageComponents.map(component=>component.toLowerCase())

	return components.includes(comp.toLowerCase())
}

const containerExists = async (comp) => {
	await mkdir(resolveCurrentPath('containers'))
	const pageContainers = fs.readdirSync(resolveCurrentPath('containers'))

	const containers = pageContainers.map(c=>c.toLowerCase())

	return containers.includes(comp.toLowerCase())
}

const isFileExistInContainer = async (containerName,file) => {
	try {
		await mkdir(resolveCurrentPath('containers'))
		const pageContainers = fs.readdirSync(resolveCurrentPath(`containers/${containerName}`))

		const containers = pageContainers.map(c=>c.toLowerCase())

		return containers.includes(`${file}.js`)
	} catch (e){
		return false
	}

}
export { componentExists, containerExists, isFileExistInContainer }
