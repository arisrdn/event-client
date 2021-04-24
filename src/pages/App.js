import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";

import Routing from "./Router";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvaider } from "../contexts/authContext";
import { Provider } from "react-redux";
import Store from "../_redux/Store";

const client = new QueryClient();

function App() {
	return (
		<>
			<Provider store={Store}>
				<AuthContextProvaider>
					<QueryClientProvider client={client}>
						<Router>
							<Routing />
						</Router>
					</QueryClientProvider>
				</AuthContextProvaider>
			</Provider>
		</>
	);
}

export default App;
