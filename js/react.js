import { createElement, performUnitOfWork, commitWork } from "./utils.js";


let	wipRoot, currentRoot, nextUnitOfWork = null;
let	hookIndex = 0;

const	workLoop = (deadline) => {
	let	shouldYield = false;

	while (!shouldYield && nextUnitOfWork) {
		try {
			nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
		} catch (err) {
			if (err instanceof Promise) {
				nextUnitOfWork = null;
				// eslint-disable-next-line
				err.then(() => {
					wipRoot			= currentRoot;
					wipRoot.hooks	= [];
					nextUnitOfWork	= wipRoot;
				});
			}
		}
		shouldYield = deadline.timeRemaining() < 1;
	}
	if (!nextUnitOfWork && wipRoot) {
		commitWork(wipRoot.child);
		currentRoot	= wipRoot;
		wipRoot		= null;
		hookIndex	= 0;
	}
	requestIdleCallback(workLoop);
};

// fiber rendering
const	render = (node, container) => {
	wipRoot = {
		dom			: container,
		props		: {
			children	: [node],
		},
		hooks		: [],
		alternate	: {
			hooks		: [],
		},
	};
	nextUnitOfWork = wipRoot;
	requestIdleCallback(workLoop);
};

const	NONE = Symbol("__NONE__");

const	scheduleRerender = () => {
	wipRoot = {
		dom			: currentRoot.dom,
		props		: currentRoot.props,
		alternate	: currentRoot,
		hooks		: [],
	};
	nextUnitOfWork = wipRoot;
};

const	useState = (initial) => {
	const	oldHook			= wipRoot?.alternate?.hooks[hookIndex++];
	const	hasPendingState	= oldHook && oldHook.pendingState !== NONE;
	const	oldState		= oldHook ? oldHook.state : initial;
	const	hook = {
		state			: hasPendingState ? oldHook?.pendingState : oldState,
		pendingState	: NONE,
	};
	const	setState = (newState) => {
		hook.pendingState = newState;
		scheduleRerender();
	};
	wipRoot?.hooks.push(hook);
	return ([hook.state, setState]);
};

// recursive rendering
const	render_recursive = (element, container) => {
	if (typeof(element.type) === "function") element = element.type();

	console.log(element);
	const	dom = element.type === "TEXT_ELEMENT"
		? document.createTextNode("") : document.createElement(element.type);
	const	isProperty = (key) => key !== "children";

	Object.keys(element.props)
		.filter(isProperty)
		.forEach((name) => {
			dom[name] = element.props[name];
		});
	// eslint-disable-next-line
	element.props.children?.forEach((child) => render_recursive(child, dom));
	// recursion!                               👆
	container.appendChild(dom);
};


export const	React = { createElement, useState, render, render_recursive };
