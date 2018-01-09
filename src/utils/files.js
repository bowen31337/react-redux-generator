import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'

const MODE_0755 = parseInt('0755', 8)

const MODE_0666 = parseInt('0666', 8)


const getCurrentDirectoryBase = () => path.basename(process.cwd())

const directoryExists = filePath => {
	try {
		return fs.statSync(filePath).isDirectory()
	} catch (err) {
		return false
	}

}

const fileExists = filePath => {
	try {
		return fs.statSync(filePath).isFile()
	} catch (err) {
		return false
	}
}

const mkdir = (path, fn = () => {}) => {
	return new Promise((res, rej) => {
		mkdirp(path, MODE_0755, err => {
			if (err) {
				rej(error)
			} else {
				res(fn)
			}
		})
	})
}

const write = async (to, str, mode = MODE_0666) => {
	to = path.resolve(to)
	const targDir = path.dirname(to)
	await mkdir(targDir)
	fs.writeFileSync(to, str, {mode})
}

const read = from => fs.readFileSync(from, encode='utf-8')

const trimFile = path => fs.readFileSync(path, 'utf8').replace(/\s*$/, '')

export { getCurrentDirectoryBase, directoryExists, mkdir, write, read, trimFile, fileExists}
