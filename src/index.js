import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./sass/main.scss";
// import ErrorBoundary from "./ErrorBoundary";

import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	rootElement
);
