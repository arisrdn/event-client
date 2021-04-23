import { combineReducers, createStore } from "redux";

// Reducers.
import EventReducer from "./reducers/EventReducer";

const RootReducer = combineReducers({
	event: EventReducer,
});

const Store = createStore(RootReducer);

export default Store;
