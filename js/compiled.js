import { React } from "../js/react.js";

function App() {
  const [state, setState] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    id: "foo",
    custom: "bar"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "1"), /*#__PURE__*/React.createElement("li", null, "2"), /*#__PURE__*/React.createElement("li", null, "3")), /*#__PURE__*/React.createElement(PrintStr, {
    className: "bar",
    str: "Je vais au bois"
  }), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "4"), /*#__PURE__*/React.createElement("li", null, "5"), /*#__PURE__*/React.createElement("li", null, "6")), /*#__PURE__*/React.createElement(PrintStr, {
    className: "bar",
    str: "Cueillir des cerises"
  }, /*#__PURE__*/React.createElement("p", null, "I'm a child")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "7"), /*#__PURE__*/React.createElement("li", null, "8"), /*#__PURE__*/React.createElement("li", null, "9")), /*#__PURE__*/React.createElement(PrintStr, {
    className: "bar",
    str: "Avec mon panier neuf"
  }, /*#__PURE__*/React.createElement("p", null, "Hey ! ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "I'm a nasted child ;)"))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setState(state + 1)
  }, "+"), "\xA0", /*#__PURE__*/React.createElement("button", {
    onClick: () => setState(state - 1)
  }, "-"), "\xA0\xA0", /*#__PURE__*/React.createElement("b", null, state)));
}

export default App;
const PrintStr = (...data) => {
  return /*#__PURE__*/React.createElement("b", {
    className: data[0]?.className
  }, data[0]?.str, data[0]?.children);
};
