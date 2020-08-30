import { getLastCommitSHA } from 'src/dataProvider/repos/commits';

import getCachedSHA from './helpers/getCachedSHA';
import cacheSHA from './helpers/cacheSHA';

import { PrepareFunctionParams } from './types';

export function prepare(params: PrepareFunctionParams) {
    const { user, repo, state, callback } = params;

    const compareSHACallback = (sha: string) => (
        cachedSHA: string | undefined
    ) => {
        if (cachedSHA === sha) {
            return;
        }

        cacheSHA({
            user,
            repo,
            sha,
        });
        callback(sha);
    };

    const compareSHA = (SHA: string) => {
        getCachedSHA({
            user,
            repo,
            callback: compareSHACallback(SHA),
        });
    };

    getLastCommitSHA({
        user,
        repo,
        state,
        onSuccess: compareSHA,
    });
}
