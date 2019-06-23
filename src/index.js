import * as React from "react";
import { render } from "react-dom";

const isJson = str => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

const activateStream = () => {
	const sseSource = new EventSource("http://localhost:5000/event-stream");
	sseSource.onmessage = response => {
		const data = JSON.parse(response.data);
		const strValue = data.value;
		let value = strValue;
		if (isJson(strValue)) value = JSON.parse(strValue);
		console.log(value);
	};
	sseSource.onerror = e => console.log("error", JSON.stringify(e, null, 2));
	sseSource.addEventListener("ping", p => console.log("ping results:", p));
};

const App = () => {
	activateStream();
	return <p>Hello World</p>;
};

render(<App />, document.getElementById("app"));
