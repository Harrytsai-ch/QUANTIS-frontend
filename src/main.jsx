import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// 載入 SCSS 樣式 (包含 Bootstrap 和自定義樣式)
import "./assets/scss/all.scss";

import router from "./router/index.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ErrorBoundary>
			<RouterProvider router={router} />
		</ErrorBoundary>
	</React.StrictMode>
);
