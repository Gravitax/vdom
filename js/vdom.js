import { React } from "./react.js";

import App from "./compiled.js";


const	container	= document.getElementById("root");
const	vApp		= React.createElement(App, null);

// React.render_recursive(vApp, container);
React.render(vApp, container);
