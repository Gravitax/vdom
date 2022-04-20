import { React } from "../js/react.js";

function App() {
  const [state, setState] = React.useState(0);
  let count = Array.from(Array(90).keys());
  return /*#__PURE__*/React.createElement("div", {
    id: "foo",
    custom: "bar"
  }, count.map(() => /*#__PURE__*/React.createElement("span", {
    class: "mySpan",
    onClick: () => alert("click"),
    mouseOver: e => e.target.classList.toggle("active")
  })));
}

export default App;
const PrintStr = (...data) => {
  return /*#__PURE__*/React.createElement("b", {
    className: data[0]?.className
  }, data[0]?.str, data[0]?.children);
};
