const	flatten = (arr) => {
	return ([].concat.apply([], arr));
};

export default (tagName, attrs, ...children) => {
	const	vElt = Object.create(null);
	let		tmp;

	if (typeof(tagName) === "function") {
		tmp			= tagName();
		tagName		= tmp.tagName;
		attrs		= { ...tmp.attrs, ...attrs };
		children	= [...tmp.children, ...children];
	}
	Object.assign(vElt, {
		tagName,
		attrs,
		children	: flatten(children),
	});
	return (vElt);
};
