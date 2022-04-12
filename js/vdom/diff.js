import create from "./create.js";


const	zip = (xs, ys) => {
	const	zipped = [];

	for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
		zipped.push([xs[i], ys[i]]);
	}
	return (zipped);
};

const	set_attr = ($node, k, v) => {
	if (k === "className") {
		$node.setAttribute("class", v);
	}
	else if (k === "onClick" || k === "onSubmit") {

	}
	else
		$node.setAttribute(k, v);
};

const	diff_attrs = (old_attrs, new_attrs) => {
	if (!old_attrs || !new_attrs)
		return (null);

	const	patches = [];

	//	setting new_attrs
	for (const [k, v] of Object.entries(new_attrs)) {
		patches.push(($node) => {
			set_attr($node, k, v);
			return ($node);
		});
	}
	//	removing attrs
	for (const k in old_attrs) {
		if (!(k in new_attrs)) {
			patches.push(($node) => {
				$node.removeAttribute(k);
				return ($node);
			});
		}
	}
	return (($node) => {
		for (const patch of patches) {
			patch($node);
		}
		return ($node);
	});
};

const	diff_children = (oldVChildren, newVChildren) => {
	if (!oldVChildren || !newVChildren)
		return (null);

	const	child_patches = [];

	oldVChildren.forEach((oldVChild, i) => {
		child_patches.push(diff(oldVChild, newVChildren[i]));
	});

	const	additional_patches = [];

  	for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    	additional_patches.push(($node) => {
    		$node.appendChild(create(additionalVChild));
    		return ($node);
    	});
	}

	return (($parent) => {
		//	since child_patches are expecting the $child, not $parent,
		//	we cannot just loop through them and call patch($parent)
    	for (const [patch, $child] of zip(child_patches, $parent.childNodes)) {
			patch($child);
		}
		for (const patch of additional_patches) {
			patch($parent);
		}
		return ($parent);
	});
};

const	diff = (oldVTree, newVTree) => {
	//	let's assume oldVTree is not undefined!
	if (newVTree === undefined) {
		return (($node) => {
			//	the patch should return the new root node.
			//	since there is none in this case,
			//	we will just return undefined.
			$node.remove();
			return (undefined);
		});
	}
	if (typeof(oldVTree) === "string" || typeof(newVTree) === "string") {
		if (oldVTree !== newVTree) {
			//	could be 2 cases:
			//	1. both trees are string and they have different values
			//	2. one of the trees is text node and
			//		the other one is elem node
			//	Either case, we will just create(newVTree)!
			return (($node) => {
				const	$newNode = create(newVTree);
				
				$node.replaceWith($newNode);
				return ($newNode);
			});
		} else {
			//	this means that both trees are string
      		//	and they have the same values
			return (($node) => $node);
		}
	}
	if (oldVTree.tagName !== newVTree.tagName) {
		//	we assume that they are totally different and 
    	//	will not attempt to find the differences.
    	//	simply create the newVTree and mount it.
		return (($node) => {
			const	$newNode = create(newVTree);

			$node.replaceWith($newNode);
			return ($newNode);
		});
	}

	const	patch_attrs		= diff_attrs(oldVTree.attrs, newVTree.attrs);
	const	patch_children	= diff_children(oldVTree.children, newVTree.children);

	return (($node) => {
		if (patch_attrs)	patch_attrs($node);
		if (patch_children)	patch_children($node);
		return ($node);
	});
};


export default diff;
