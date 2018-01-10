#!/usr/bin/env node
function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var figlet = _interopDefault(require('figlet'));
var chalk = _interopDefault(require('chalk'));
var program = _interopDefault(require('commander'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var mkdirp = _interopDefault(require('mkdirp'));
var inquirer = _interopDefault(require('inquirer'));
var CLI = _interopDefault(require('clui'));
var pascalCase = _interopDefault(require('pascal-case'));
var handlebars = _interopDefault(require('handlebars'));
var camelCase = _interopDefault(require('camel-case'));

console.log(
  chalk.red(
    figlet.textSync('RRG', { horizontalLayout: 'full' })
  )
);

const MODE_0755 = parseInt('0755', 8);

const MODE_0666 = parseInt('0666', 8);


const directoryExists = filePath => {
	try {
		return fs.statSync(filePath).isDirectory()
	} catch (err) {
		return false
	}

};

const fileExists = filePath => {
	try {
		return fs.statSync(filePath).isFile()
	} catch (err) {
		return false
	}
};

const mkdir = (path$$1, fn = () => {}) => {
	return new Promise((res, rej) => {
		mkdirp(path$$1, MODE_0755, err => {
			if (err) {
				rej(error);
			} else {
				res(fn);
			}
		});
	})
};

const write = async (to, str, mode = MODE_0666) => {
	to = path.resolve(to);
	const targDir = path.dirname(to);
	await mkdir(targDir);
	fs.writeFileSync(to, str, {mode});
};

const read = from => fs.readFileSync(from, encode='utf-8');

const trimFile = path$$1 => fs.readFileSync(path$$1, 'utf8').replace(/\s*$/, '');

let userConfig = {};

try{
	const rrgrc = read(".rrgrc");
	userConfig = JSON.parse(rrgrc);
} catch (e){

}


const defaultConfig = {
	APP_SRC: "src",
	ELEMENTS: ["component", "container", "route"],
	COMPONENTS: [{
			type: "ES6 Class",
			templates: ["es6.js.hbs", "test.js.hbs"]
		},
		{
			type: "Stateless Function",
			templates: ["stateless.js.hbs", "test.js.hbs"]
		}
	],
	CONTAINERS: [{
			name: "name",
			templates: ["index.js.hbs", "test.js.hbs"]
		},
		{
			name: "wantActionsAndReducer",
			templates: [
				"actions.js.hbs",
				"actions.test.js.hbs",
				"reducer.js.hbs",
				"reducer.test.js.hbs",
				"selectors.js.hbs",
				"selectors.test.js.hbs",
				"constants.js.hbs"
			]
		},
		{
			name: "wantSagas",
			templates: ["sagas.js.hbs", "sagas.test.js.hbs"]
		}
	],
	ROUTES: [{
			name: "routeWithReducer",
			templates: ["routeWithReducer.hbs"]
		},
		{
			name: "route",
			templates: ["route.hbs"]
		}
	]
};


var config = Object.assign({}, defaultConfig, userConfig);

const name = "react-redux-generator";
const version = "1.0.1";
const description = "This is a generator to create react redux project";
const main = "dist/reactReduxGenerator.cjs.js";
const keywords = ["generator","rollup","react","redux"];
const author = {"name":"Bowen Li","email":"superdev@outlook.com.au"};
const dependencies = {"camel-case":"^3.0.0","chalk":"^2.3.0","clear":"^0.0.1","clui":"^0.3.6","commander":"^2.12.2","figlet":"^1.2.0","handlebars":"^4.0.11","inquirer":"^4.0.1","mkdirp":"^0.5.1","pascal-case":"^2.0.1"};
const devDependencies = {"babel-core":"^6.26.0","babel-plugin-external-helpers":"^6.22.0","babel-preset-env":"^1.6.1","faucet":"^0.0.1","husky":"^0.14.3","lint-staged":"^6.0.0","prettier":"1.9.2","rollup":"^0.50.0","rollup-plugin-babel":"^3.0.3","rollup-plugin-commonjs":"^8.2.6","rollup-plugin-execute":"^1.0.0","rollup-plugin-json":"^2.3.0","rollup-plugin-node-resolve":"^3.0.0","rollup-plugin-uglify":"^2.0.1"};
const preferGlobal = true;
const bin = {"RRG":"dist/reactReduxGenerator.cjs.js"};
const scripts = {"build":"rollup -c","dev":"rollup -c -w","test":"node test/test.js | faucet","RRG":"plop --plopfile dist/reactReduxGenerator.es.js","pretest":"npm run build","precommit":"lint-staged","format":"prettier --trailing-comma es5 --single-quote --no-semi --write 'src/**/*.js'"};
const repository = {"type":"git","url":"git@github.com:bowen31337/easyClassNames.git"};
const engines = {"node":">=8.4.0"};
var pkg = {
  name: name,
  version: version,
  description: description,
  main: main,
  keywords: keywords,
  author: author,
  dependencies: dependencies,
  devDependencies: devDependencies,
  preferGlobal: preferGlobal,
  bin: bin,
  scripts: scripts,
  repository: repository,
  engines: engines,
  "lint-staged": {"*.{js,json,css,md}":["prettier prettier --trailing-comma es5 --single-quote --no-semi --write","git add"],"yarn.lock":["git rm --cached","git add"]}
};

const fs$1 = require('fs');

const resolveCurrentPath = folderName => `./${config.APP_SRC}/${folderName}`;

const componentExists = async (comp) => {
	await mkdir(resolveCurrentPath('components'));
	const pageComponents = fs$1.readdirSync(resolveCurrentPath('components'));

	const components = pageComponents.map(component=>component.toLowerCase());

	return components.includes(comp.toLowerCase())
};

const containerExists = async (comp) => {
	await mkdir(resolveCurrentPath('containers'));
	const pageContainers = fs$1.readdirSync(resolveCurrentPath('containers'));

	const containers = pageContainers.map(c=>c.toLowerCase());

	return containers.includes(comp.toLowerCase())
};

const isFileExistInContainer = async (containerName,file) => {
	try {
		await mkdir(resolveCurrentPath('containers'));
		const pageContainers = fs$1.readdirSync(resolveCurrentPath(`containers/${containerName}`));

		const containers = pageContainers.map(c=>c.toLowerCase());

		return containers.includes(`${file}.js`)
	} catch (e){
		return false
	}

};

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
];

const delay = (ms=1000)=> new Promise( (res, rej) => setTimeout(res,ms));

const curly = (object, open) => (open ? '{' : '}');

const directory = comp => {
	const compExist = directoryExists(`${config.APP_SRC}/containers/${comp}`);
	return compExist?`./containers/${comp}`:`./components/${comp}`
};

var helpers = {
	pascalCase,
	camelCase,
	properCase:pascalCase,
	directory,
	curly
};

const renderTemplate = async (from, to, data) => {
	Object.keys(helpers).forEach(h => handlebars.registerHelper(h, helpers[h]));

	try {
		const template = read(from);

		const compliedString = handlebars.compile(template)(data);
		await write(to, compliedString);

		return "success: " + to
	} catch (e) {
		return e
	}
};

const renderRoute = async (from, to, data) => {
	Object.keys(helpers).forEach(h => handlebars.registerHelper(h, helpers[h]));

	try {
		const template = trimFile(from);

		const compliedString = handlebars.compile(template)(data);

		let destData = "";

		if (fileExists(to)) {
			destData = read(to);
		}
		destData = destData.replace(/(.*)/, compliedString);

		await write(to, destData);

		return "success: " + to
	} catch (e) {
		return e
	}
};

const Spinner = CLI.Spinner;

let logs = [];

const action = async questions => {
	const answers = await inquirer.prompt(questions);

	const status = new Spinner("Adding a new Component, please wait...");
	status.start();

	let { name, wantHeaders } = answers;

	name = pascalCase(name);


	const templates = config.COMPONENTS.find(
		component => component.type == answers.type
	).templates;

	templates.forEach(async template => {
		const from = path.join(
			__dirname,
			"..",
			"src",
			"templates",
			"component",
			template
		);
		let savedFile = "";
		if (template.includes("test")) {
			savedFile = await renderTemplate(
				from,
				`./${config.APP_SRC}/components/${name}/tests/test.js`,
				{ name, wantHeaders }
			);
		} else {
			savedFile = await renderTemplate(
				from,
				`./${config.APP_SRC}/components/${name}/index.js`,
				{ name, wantHeaders }
			);
		}

		logs.push(savedFile);
	});

	await delay(500);

	status.stop();

	console.log(chalk.green(logs.join("\n\r")));
};

const questions$1 = [
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
];

const Spinner$1 = CLI.Spinner;

let logs$1 = [];

const action$1 = async questions => {
	const answers = await inquirer.prompt(questions);

	const status = new Spinner$1("Adding a new container tupel, please wait...");
	status.start();

	let { name } = answers;

	name = pascalCase(name);

	let tupels = config.CONTAINERS.filter(c => answers[c.name]);

	tupels.forEach(tupel => {
		tupel.templates.forEach(async template => {
			const from = path.join(
				__dirname,
				"..",
				"src",
				"templates",
				"container",
				template
			);

			template = template.split(".");
			template.pop();
			template = template.join(".");

			let savedFile = "";

			if (template.includes("test")) {
				savedFile = await renderTemplate(
					from,
					`./${config.APP_SRC}/containers/${name}/tests/${template}`,
					{ name }
				);
			} else {
				savedFile = await renderTemplate(
					from,
					`./${config.APP_SRC}/containers/${name}/${template}`,
					{ name }
				);
			}
			logs$1.push(savedFile);
		});
	});

	await delay(500);

	status.stop();

	console.log(chalk.green(logs$1.join("\n\r")));
};

const questions$2 = [
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
];

const Spinner$2 = CLI.Spinner;

let logs$2 = [];


const action$2 = async questions => {
	const answers = await inquirer.prompt(questions);

	const status = new Spinner$2("Adding a new container tupel, please wait...");
	status.start();

	let { component, path: routePath } = answers;

	component = pascalCase(component);

	const hasReducer = await isFileExistInContainer(component, "reducer");

	let templates = config.ROUTES.find(
		r => (hasReducer ? r.name === "routeWithReducer" : r.name === "route")
	).templates;

	templates.forEach(async template => {
		const from = path.join(
			__dirname,
			"..",
			"src",
			"templates",
			"route",
			template
		);

		let savedFile = "";


		try {
			savedFile = await renderRoute(
				from,
				`./${config.APP_SRC}/route.js`,
				{
					component,
					path: routePath,
					useSagas: isFileExistInContainer(component, "sagas")
				}
			);
		} catch (e) {
			logs$2.push(e);
		}

		logs$2.push(savedFile);
	});

	await delay(500);

	status.stop();

	console.log(chalk.green(logs$2.join("\n\r")));
};

const questions$3 = [{
		type: 'list',
		name: 'element',
		message: 'which of the following elements is to be created?',
		default: config.ELEMENTS[0],
		choices: config.ELEMENTS
	}
];

const action$3 = async questions => {
	const answers = await inquirer.prompt(questions);
	return answers.element
};

const elementActionsMap = {
	'component':{
		'action':action,
		'questions':questions
	},
	'container':{
		'action':action$1,
		'questions':questions$1
	},
	'route':{
		'action':action$2,
		'questions':questions$2
	}
};



program
  .version(pkg.version)
  .option('-c, --component', 'Add new component')
  .option('-C, --container', 'Add new container')
  .option('-r, --route', 'Add new route')
  .parse(process.argv);


chooseActions(program);

function chooseActions(program$$1) {
	const elements = config.ELEMENTS.filter(e => program$$1[e]);
	if(0 === elements.length) return chooseElement()
		elements.forEach(e=> elementActionsMap[e].action(elementActionsMap[e].questions));
}

async function chooseElement() {
	const e = await action$3(questions$3);
	return elementActionsMap[e].action(elementActionsMap[e].questions)
}
//# sourceMappingURL=reactReduxGenerator.cjs.js.map
