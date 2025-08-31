import { createHashRouter } from "react-router-dom";
import ReportIntegrate from "../pages/ReportIntegrate";

const router = createHashRouter([
	{
		path: "/",
		element: <ReportIntegrate />,
	},
]);

export default router;
