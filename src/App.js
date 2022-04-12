import { React } from "../js/react.js";


function	App() {
	const	[state, setState] = React.useState(1);
	
	return (
		<div>
			<h1>Hello ByteConf!</h1>
			<p>1111</p>
			<p>
				<p>22222</p>
				<p>33333</p>
			</p>
			<button onClick={() => setState(state + 1)}>{state}</button>
			{/* <Test dataCount={count}>
 				<div>
 					Hello world ! {count.toString()}
 				</div>
 			</Test> */}
		</div>
	);
}


export default App;
