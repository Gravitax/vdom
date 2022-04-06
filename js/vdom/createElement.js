const	flatten = (arr) => {
	return ([].concat.apply([], arr));
};

export default (tagName, attrs, ...children) => {
	const	vElt = Object.create(null);
	
	Object.assign(vElt, {
		tagName,
		attrs,
		children: flatten(children),
	});
	return (vElt);
};
