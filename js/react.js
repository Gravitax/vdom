import { createElement, performUnitOfWork, commitWork } from "./utils.js";


let	wipRoot, currentRoot, nextUnitOfWork = null;
let	hookIndex = 0;

const	commitRoot = () => {
	commitWork(wipRoot.child);
	currentRoot	= wipRoot;
	wipRoot		= null;
	hookIndex	= 0;
};

const	performWork = (deadline) => {
	let	shouldYield = false;

	while (!shouldYield && nextUnitOfWork) {
		nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
		shouldYield = deadline.timeRemaining() < 1;
	}
	if (!nextUnitOfWork && wipRoot)
		commitRoot();
	requestIdleCallback(performWork);
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
	requestIdleCallback(performWork);
};

const	scheduleRerender = () => {
	wipRoot = {
		dom			: currentRoot.dom,
		props		: currentRoot.props,
		alternate	: currentRoot,
		hooks		: [],
	};
	nextUnitOfWork = wipRoot;
};

const	NONE = Symbol("__NONE__");

// HOOKS
const	useEffect = (callback, dependencies = []) => {
	// use effect hook actualise le component
	// si une dépendence est modifiée ou au refresh de la page

	// WIP

	if (typeof(callback) === "function")
		callback();
};

const	useState = (initial) => {
	const	oldHook			= wipRoot?.alternate.hooks[hookIndex++];
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


export const	React = {
	createElement,
	useState, useEffect,
	render
};
