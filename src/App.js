import create_element from "../js/vdom/create_element.js";


const	onclick_event = (e) => {
	e.preventDefault();
	alert("test");
}

// const	useSate = (state) => {
// 	const	setState = () => {

// 	};
// };

const	App = (count) => {
	// const	[state, setState] = useState(0);

	return (
		<div className="foo" id="bar">
			<p className="text">
				Lorem, ipsum dolor.
				<br />
				<b>test</b>
			</p>
			<i onClick={onclick_event}>Lorem, ipsum.</i>
			<Test dataCount={count}>
				<div>
					Hello world ! {count.toString()}
				</div>
			</Test>
		</div>
	);
};


export default App;
