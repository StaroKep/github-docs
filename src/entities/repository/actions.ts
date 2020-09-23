import { createAction } from 'deox';

import { getActionType } from 'src/entities/helpers';

import { Repository } from './types';

const SET_SELECTED_REPOSITORY = getActionType(
    'REPOSITORY/SET_SELECTED_REPOSITORY'
);

/** setSelectedRepository */
export interface SetSelectedRepositoryAction {
    type: typeof SET_SELECTED_REPOSITORY;
    payload: Repository;
}

export const setSelectedRepository = createAction(
    SET_SELECTED_REPOSITORY,
    resolve => (data?: SetSelectedRepositoryAction['payload']) =>
        resolve<SetSelectedRepositoryAction['payload']>(data)
);
