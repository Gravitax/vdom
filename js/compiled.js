import { React } from "../js/react.js";

function App() {
  const [state, setState] = React.useState(1);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Hello ByteConf!"), /*#__PURE__*/React.createElement("p", null, "1111"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("p", null, "22222"), /*#__PURE__*/React.createElement("p", null, "33333")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setState(state + 1)
  }, state));
}

export default App;
