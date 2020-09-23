import {AnyAction, ofType} from 'deox';
import { ActionsObservable } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';

import { setSelectedRepository, SetSelectedRepositoryAction } from './actions';

const setSelectedRepositoryEpic = (
    action$: ActionsObservable<AnyAction>
) =>
    action$.pipe(
        ofType(setSelectedRepository),
        tap(({ payload }) => {
            console.log(payload);
        }),
        ignoreElements()
    );

export default [setSelectedRepositoryEpic];
