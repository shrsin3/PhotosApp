/**
 * miniPaint - https://github.com/viliusle/miniPaint
 * author: Vilius L.
 */

//css
import './../css/reset.css';
import './../css/utility.css';
import './../css/component.css';
import './../css/layout.css';
import './../css/menu.css';
import './../css/print.css';
import './../../node_modules/alertifyjs/build/css/alertify.min.css';
//js
import app from './app.js';
import config from './config.js';
import './core/components/index.js';
import Base_gui_class from './core/base-gui.js';
import Base_layers_class from './core/base-layers.js';
import Base_tools_class from './core/base-tools.js';
import Base_state_class from './core/base-state.js';
import Base_search_class from './core/base-search.js';
import File_open_class from './modules/file/open.js';
import File_save_class from './modules/file/save.js';
import * as Actions from './actions/index.js';

window.addEventListener('load', function (e) {
	// Initiate app
	var Layers = new Base_layers_class();
	var Base_tools = new Base_tools_class(true);
	var GUI = new Base_gui_class();
	var Base_state = new Base_state_class();
	var File_open = new File_open_class();
	var File_save = new File_save_class();
	var Base_search = new Base_search_class();

	// Register singletons in app module
	app.Actions = Actions;
	app.Config = config;
	app.FileOpen = File_open;
	app.FileSave = File_save;
	app.GUI = GUI;
	app.Layers = Layers;
	app.State = Base_state;
	app.Tools = Base_tools;

	// Register as global for quick or external access
	window.Layers = Layers;
	window.AppConfig = config;
	window.State = Base_state;
	window.FileOpen = File_open;
	window.FileSave = File_save;

	// Render all
	GUI.init();
	Layers.init();
}, false);

let date = new Date();
date = date.toLocaleString("en-CA", {
	timeZone: "America/Vancouver",
	timeZoneName: "long",
});
const eventList = [{"appName": "Photo", "date": date}];

window.addEventListener("click", (event) => {
	let x = event.pageX;  // Horizontal
	let y = event.pageY;  // Vertical
	let time = event.timeStamp
	eventList.push({"x": x, "y": y, "timeStamp": time})
	console.log(x,y, time);
	console.log(eventList);
});

document.addEventListener("visibilitychange", ()=>{
	if (document.hidden) {
		const myValue = process.env.MY_VALUE
		fetch(myValue,{
			method: "post",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ eventList }),
			keepalive: true
		})

		localStorage.clear();

	}
})
