import handlebars from "handlebars"
import { write, read, trimFile, fileExists } from "./files"
import helpers from "./hbsHelpers"

const renderTemplate = async (from, to, data) => {
	Object.keys(helpers).forEach(h => handlebars.registerHelper(h, helpers[h]))

	try {
		const template = read(from)

		const compliedString = handlebars.compile(template)(data)
		await write(to, compliedString)

		return "success: " + to
	} catch (e) {
		return e
	}
}

const renderRoute = async (from, to, data) => {
	Object.keys(helpers).forEach(h => handlebars.registerHelper(h, helpers[h]))

	try {
		const template = trimFile(from)

		const compliedString = handlebars.compile(template)(data)

		let destData = ""

		if (fileExists(to)) {
			destData = read(to)
		}
		destData = destData.replace(/(.*)/, compliedString)

		await write(to, destData)

		return "success: " + to
	} catch (e) {
		return e
	}
}

export { renderRoute, renderTemplate }
