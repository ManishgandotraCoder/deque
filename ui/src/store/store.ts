import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from ".";
import { watchgetBooksApiSagas } from "../redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)) // Apply saga middleware
);

// Run all auth-related sagas
sagaMiddleware.run(watchgetBooksApiSagas);

export default store;
