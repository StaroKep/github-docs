import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
    CombinedState,
} from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import { repositoryReducer } from 'src/entities/repository/reducer';

import repositoryEpics from 'src/entities/repository/epics';

import { history } from './history';
import { Store, ExtendedWindow, ExtendedStore } from './types';
import initialData from './initial';

const extendedWindow = window as ExtendedWindow;

const epicMiddleware = createEpicMiddleware();
const epics = combineEpics(...repositoryEpics) as Epic;

const reducers = combineReducers<CombinedState<ExtendedStore>>({
    repository: repositoryReducer,
    router: connectRouter(history),
});

const initialState: Store = initialData();

const composeEnhancers =
    extendedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(history)))
);

epicMiddleware.run(epics);

export default store;
