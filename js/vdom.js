import diff from "./vdom/diff.js";
import mount from "./vdom/mount.js";
import render from "./vdom/render.js";

import App from "./compiled.js";


let		vApp		= App(0);
const	$app		= render(vApp);
let		$rootElt	= mount($app, document.getElementById("root"));

setInterval(() => {
	const	vNewApp	= App(Math.floor(Math.random() * 10));
	const	patch	= diff(vApp, vNewApp);

	$rootElt	= patch($rootElt);
	vApp		= vNewApp;
}, 1000);
