export const	createTextElement = (text) => {
	return ({
		type	: "TEXT_ELEMENT",
		props	: {
			nodeValue	: text,
			children	: [],
		},
	});
};

export const	createElement = (type, props, ...children) => {
	return ({
		type,
		props	: {
			...props,
			children	: children.map((child) =>
				typeof(child) === "object" ? child : createTextElement(child)),
		},
	});
};

const	reconcileChildren = (wipFiber, elements) => {
	let	index		= 0;
	let	oldFiber	= wipFiber.alternate?.child;
	let	prevSibling	= null;
	let	newFiber	= null;

	while (index < elements.length || oldFiber != null) {
		const	element		= elements[index];
		const	sameType	= element?.type == oldFiber?.type;

		if (sameType) {
			newFiber = {
				type		: oldFiber.type,
				props		: element.props,
				dom			: oldFiber.dom,
				parent		: wipFiber,
				alternate	: oldFiber,
				effectTag	: "UPDATE",
			};
		}
		if (element && !sameType) {
			newFiber = {
				type		: element.type,
				props		: element.props,
				dom			: null,
				parent		: wipFiber,
				alternate	: null,
				effectTag	: "PLACEMENT",
			};
		}
		if (oldFiber && !sameType) {
			oldFiber.effectTag = "DELETION";
		}

		if (oldFiber)
			oldFiber = oldFiber.sibling;
		if (index === 0)
			wipFiber.child = newFiber;
		else if (element)
			prevSibling.sibling = newFiber;
		prevSibling = newFiber;
		++index;
	}
};

const	createDom = (fiber) => {
	const	dom = fiber.type === "TEXT_ELEMENT"
		? document.createTextNode("") : document.createElement(fiber.type);
	updateDom(dom, {}, fiber.props);
	return (dom);
};

const	noop = () => {};

const	updateFunctionComponent = (fiber, resetWipFiber = noop) => {
	resetWipFiber(fiber);
	const	children = [fiber.type(fiber.props)];

	reconcileChildren(fiber, children.flat());
}

const	updateHostComponent = (fiber) => {
	if (!fiber.dom) fiber.dom = createDom(fiber);
	reconcileChildren(fiber, fiber.props.children.flat());
}

export const	performUnitOfWork = (fiber, resetWipFiber = noop) => {
	if (fiber.type instanceof Function)
		updateFunctionComponent(fiber);
	else
		updateHostComponent(fiber);
	if (fiber.child) return (fiber.child);
	let	nextFiber = fiber;

	while (nextFiber) {
		if (nextFiber.sibling) return (nextFiber.sibling);
		nextFiber = nextFiber.parent;
	}
};

const	isGone		= (prev, next) => (key) => !(key in next);
const	isNew		= (prev, next) => (key) => prev[key] !== next[key];
const	isEvent		= (key) => key.startsWith("on") || key.startsWith("mouse");
const	isProperty	= (key) => key !== "children" && !isEvent(key);

const	eventType = (name) => {
	name = name.toLowerCase();
	if (name.startsWith("on"))
		name = name.substring(2);
	return (name);
};

const	set_attribute = (dom, nextProps, name) => {
	let	tmp = name;

	if (name !== "nodeValue") {
		if (name === "className")
			tmp = "class";
		dom.setAttribute(tmp, nextProps[name]);
	}
	dom[tmp] = nextProps[name];
};

const	updateDom = (dom, prevProps, nextProps) => {
	// Remove old or changed event listeners
	Object.keys(prevProps)
		.filter(isEvent)
		.filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
		.forEach((name) => {
			dom.removeEventListener(eventType(name), prevProps[name]);
		});
	// Remove old properties
	Object.keys(prevProps)
		.filter(isProperty)
		.filter(isGone(prevProps, nextProps))
		.forEach((name) => {
			dom[name] = "";
		});
	// Set new or changed properties
	Object.keys(nextProps)
		.filter(isProperty)
		.filter(isNew(prevProps, nextProps))
		.forEach((name) => {
			set_attribute(dom, nextProps, name);
		});
	// Add event listeners
	Object.keys(nextProps)
		.filter(isEvent)
		.filter(isNew(prevProps, nextProps))
		.forEach((name) => {
			dom.addEventListener(eventType(name), nextProps[name]);
		});
};

const	commitDeletion = (fiber, domParent) => {
	if (!fiber) return ;
	if (fiber.dom)
		domParent.removeChild(fiber.dom);
	else
		commitDeletion(fiber.child, domParent);
};

export const	commitWork = (fiber) => {
	if (!fiber) return ;
	let	domParentFiber = fiber.parent;

	while (!domParentFiber.dom)
		domParentFiber = domParentFiber.parent;

	const	domParent = domParentFiber.dom;

	if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
		domParent.appendChild(fiber.dom);
	} else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
		updateDom(fiber.dom, fiber.alternate.props, fiber.props);
	} else if (fiber.effectTag === "DELETION") {
		commitDeletion(fiber, domParent);
		return ;
	}
	commitWork(fiber.child);
	commitWork(fiber.sibling);
};
