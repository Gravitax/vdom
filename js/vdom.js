import { React } from "./react.js";

import App from "./compiled.js";


const	container = document.getElementById("root");

React.createRoot(container).render(App());
