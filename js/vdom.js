import { React } from "./react.js";

import App from "./compiled.js";


const	container	= document.getElementById("root");
const	vApp		= React.createElement(App, null);

React.render(vApp, container);
