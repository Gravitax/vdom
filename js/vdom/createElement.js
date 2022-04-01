export default (tagName, { attrs, children }) => {
	const	vElt = Object.create(null);
	
	Object.assign(vElt, {
		tagName,
		attrs,
		children,
	});
	return (vElt);
};
