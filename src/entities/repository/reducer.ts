import { createReducer } from 'deox';

import { RepositoryStoreData } from './types';
import { setSelectedRepository } from './actions';

export const initialState: RepositoryStoreData = {};

export const repositoryReducer = createReducer(initialState, handleAction => [
    handleAction(
        setSelectedRepository,
        (state, { payload: selectedRepository }) => ({
            ...state,
            selectedRepository,
        })
    ),
]);
