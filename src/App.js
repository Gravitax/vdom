import { React } from "../js/react.js";


function	App() {
	const	[state, setState] = React.useState(0);

	let		count = Array.from(Array(900).keys());
	let		elt = [];

	const	test_mouse = (e) => {
		console.log(e);
		e.target.classList.toggle("active");
	};
	count.forEach((i) => {
		elt[i] = <span mouseover={test_mouse} class="mySpan"></span>;
	});

	return (
		<div id="foo" custom="bar">
			{/* <ul>
				<li>1</li>
				<li>2</li>
				<li>3</li>
			</ul>
			<PrintStr className="bar" str="Je vais au bois" />
			<ul>
				<li>4</li>
				<li>5</li>
				<li>6</li>
			</ul>
			<PrintStr className="bar" str="Cueillir des cerises">
				<p>I'm a child</p>
			</PrintStr>
			<ul>
				<li>7</li>
				<li>8</li>
				<li>9</li>
			</ul>
			<PrintStr className="bar" str="Avec mon panier neuf">
				<p>
					Hey ! <br />
					<b>I'm a nasted child ;)</b>
				</p>
			</PrintStr>
			<br />
			<p>
				<button onClick={() => setState(state + 1)}>+</button>&nbsp;
				<button onClick={() => setState(state - 1)}>-</button>&nbsp;&nbsp;
				<b>{state}</b>
			</p> */}
			{elt}
		 </div>
	);
}


export default App;
