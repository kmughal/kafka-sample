import * as React from "react";
import { render } from "react-dom";

const startStream = () => {
	var sseSource = new EventSource("http://localhost:5000/event-stream");
	sseSource.onmessage = function(e) {
		var data = JSON.parse(e.data);
		const value = JSON.parse(data.value);
		console.log(value);
	};
	sseSource.onerror = function(e) {
		window.error = e;
		console.log("error", JSON.stringify(e, null, 2));
	};
	sseSource.addEventListener("ping", function(e) {
		console.log("ping results:", e);
	});
};

const App = () => {
	startStream();
	return <p>Hello World</p>;
};

render(<App />, document.getElementById("app"));
