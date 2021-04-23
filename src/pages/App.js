import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";

import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { AuthContextProvaider } from "../contexts/authContexts";

import Routing from "./Router";
import Store from "../_redux/Store";

const client = new QueryClient();

function App() {
	return (
		<>
			{/* <AuthContextProvaider> */}
			<Provider store={Store}>
				<QueryClientProvider client={client}>
					<Router>
						<Routing />
					</Router>
				</QueryClientProvider>
			</Provider>
			{/* </AuthContextProvaider> */}
		</>
	);
}

export default App;
