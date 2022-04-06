import createElement from "../js/vdom/createElement.js";


const	onclick_event = (e) => {
	e.preventDefault();
	alert("test");
}

const	App = (count) => {
	return (
		<div className="foo" id="bar" dataCount={count}>
			<p className="text">
				Lorem, ipsum dolor.
				<br />
				<b>test</b>
			</p>
			<i onClick={onclick_event}>Lorem, ipsum.</i>
		</div>
	);
};


export default App;
