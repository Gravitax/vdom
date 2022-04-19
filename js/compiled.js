import { React } from "../js/react.js";

function App() {
  const [state, setState] = React.useState(0);
  let count = Array.from(Array(900).keys());
  let elt = [];

  const test_mouse = e => {
    console.log(e);
    e.target.classList.toggle("active");
  };

  count.forEach(i => {
    elt[i] = /*#__PURE__*/React.createElement("span", {
      mouseover: test_mouse,
      class: "mySpan"
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "foo",
    custom: "bar"
  }, elt);
}

export default App;
const PrintStr = (...data) => {
  return /*#__PURE__*/React.createElement("b", {
    className: data[0]?.className
  }, data[0]?.str, data[0]?.children);
};
