import createElement from "../js/vdom/createElement.js";

const onclick_event = e => {
  e.preventDefault();
  alert("test");
};

const App = count => {
  return createElement("div", {
    className: "foo",
    id: "bar",
    dataCount: count
  }, createElement("p", {
    className: "text"
  }, "Lorem, ipsum dolor.", createElement("br", null), createElement("b", null, "test")), createElement("i", {
    onClick: onclick_event
  }, "Lorem, ipsum."));
};

export default App;
// const	Test = () => <strong>Lorem, ipsum. TEST</strong>
