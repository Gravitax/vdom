const	myEvent = () => {
	alert("hello world");
};

const	Test = () => {
	return (
		<div>
			Lorem, ipsum. TEST
			<br />
			<ul onClick={myEvent}>
				<li>1</li>
				<li>2</li>
				<li>3</li>
			</ul>
		</div>
	);
};
