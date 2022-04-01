import createElement from "./vdom/createElement.js";
import diff from "./vdom/diff.js";
import mount from "./vdom/mount.js";
import render from "./vdom/render.js";


const	createVApp = (count) => createElement("div", {
	attrs		: {
		id			: "app",
		dataCount	: count,
	},
	children	: [
		`Count : ${count}`,
		createElement("img", {
			attrs	: {
				src		: "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif",
			},
		}),
	],
});

let		count		= 0;
let		vApp		= createVApp(count);
const	$app		= render(vApp);
let		$rootElt	= mount($app, document.getElementById("app"));

setInterval(() => {
	const	vNewApp	= createVApp(++count);
	const	patch	= diff(vApp, vNewApp);

	$rootElt	= patch($rootElt);
	vApp		= vNewApp;
}, 1000);
