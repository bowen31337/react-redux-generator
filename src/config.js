import { read } from "./utils/files"


let userConfig = {}

try{
	const rrgrc = read(".rrgrc")
	userConfig = JSON.parse(rrgrc)
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
}


export default Object.assign({}, defaultConfig, userConfig)
