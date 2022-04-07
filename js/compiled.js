import create_element from "../js/vdom/create_element.js";

const onclick_event = e => {
  e.preventDefault();
  alert("test");
}; // const	useSate = (state) => {
// 	const	setState = () => {
// 	};
// };


const App = count => {
  // const	[state, setState] = useState(0);
  return create_element("div", {
    className: "foo",
    id: "bar"
  }, create_element("p", {
    className: "text"
  }, "Lorem, ipsum dolor.", create_element("br", null), create_element("b", null, "test")), create_element("i", {
    onClick: onclick_event
  }, "Lorem, ipsum."), create_element(Test, {
    dataCount: count
  }, create_element("div", null, "Hello world ! ", count.toString())));
};

export default App;
const myEvent = () => {
  alert("hello world");
};

const Test = () => {
  return create_element("div", null, "Lorem, ipsum. TEST", create_element("br", null), create_element("ul", {
    onClick: myEvent
  }, create_element("li", null, "1"), create_element("li", null, "2"), create_element("li", null, "3")));
};
