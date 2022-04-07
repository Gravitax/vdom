const	set_attr = ($target, name, value) => {
	if (name === "className")
		name = "class";
	if (name === "onClick")
		return ($target.addEventListener("click", value));
	if (name === "onSubmit")
		return ($target.addEventListener("submit", value));
	$target.setAttribute(name, value);
};

const	set_attrs = ($target, attrs) => {
	attrs && Object.keys(attrs).forEach((name) => {
		set_attr($target, name, attrs[name]);
	});
};

const	create_element = ({ tagName, attrs, children = [] }) => {
	//	create the element
	//		e.g. <div></div>
	const	$elt = document.createElement(tagName);

	//	add all attributs as specified in vNode.attrs
  	//		e.g. <div id="app"></div>
	set_attrs($elt, attrs);
	//	append all children as specified in vNode.children
  	//		e.g. <div id="app"><img /></div>
	for (const child of children)
		$elt.appendChild(create(child));
	return ($elt);
};

const	create = (vNode) => {
	if (typeof(vNode) === "string") {
		return (document.createTextNode(vNode));
	}
	return (create_element(vNode));
};


export default create;
