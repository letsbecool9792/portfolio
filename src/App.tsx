import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

/**
 * The client entry's tree. `src/entry-server.tsx` renders `AppRoutes` directly
 * under a `StaticRouter` instead, which is why `<Analytics />` belongs here and
 * not in the routes: it should never end up in the prerendered HTML, and this way
 * it can't. It renders nothing visible and no-ops off Vercel, so `npm run dev`
 * and `npm run preview` are unaffected.
 */
function App() {
	return (
		<Router>
			<AppRoutes />
			<Analytics />
		</Router>
	);
}

export default App;
