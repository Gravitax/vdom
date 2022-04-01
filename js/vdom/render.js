const	renderElem = ({ tagName, attrs, children = [] }) => {
	//	create the element
  	//		e.g. <div></div>
	const	$elt = document.createElement(tagName);

	//	add all attributs as specified in vNode.attrs
  	//		e.g. <div id="app"></div>
	for (const [k, v] of Object.entries(attrs)) {
		$elt.setAttribute(k, v);
	}
	//	append all children as specified in vNode.children
  	//		e.g. <div id="app"><img></div>
	for (const child of children) {
		$elt.appendChild(render(child));
	}
	return ($elt);
};

const	render = (vNode) => {
	if (typeof(vNode) === "string") {
		return (document.createTextNode(vNode));
	}
	return (renderElem(vNode));
};


export default render;
