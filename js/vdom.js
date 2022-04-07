import diff from "./vdom/diff.js";
import mount from "./vdom/mount.js";
import create from "./vdom/create.js";

import App from "./compiled.js";


const	render = (vNode, $target) => {
	let		vApp	= vNode(0);
	const	$app	= create(vApp);
	let		$root	= mount($app, $target);

	setInterval(() => {
		const	vNewApp	= vNode(Math.floor(Math.random() * 10));
		const	patch	= diff(vApp, vNewApp);
	
		if (patch)
			$root = patch($root);
		vApp = vNewApp;
	}, 1000);
};

render(App, document.getElementById("root"));
