import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import execute from 'rollup-plugin-execute'

import json from 'rollup-plugin-json'


import copy from './src/plugins/rollup-copy'

const production = !process.env.ROLLUP_WATCH

export default [

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, usin
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		external: ['ms'],
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
			json({
				// All JSON files will be parsed by default,
				// but you can also specifically include/exclude files
				include: ['node_modules/**','package.json'],
				// for tree-shaking, properties will be declared as
				// variables, using either `var` or `const`
				preferConst: true, // Default: false

				// specify indentation for the generated default export —
				// defaults to '\t'
				indent: '  '
			}),
			copy({
				src: './node_modules/figlet/fonts/Standard.flf',
				targ: './fonts/Standard.flf'
			})

		],
		output: [{
				file: pkg.main,
				format: 'cjs',
				strict: false
			}
		],
		banner: '#!/usr/bin/env node',
		sourcemap: true,
		external: Object.keys(pkg.dependencies)
	}

]
