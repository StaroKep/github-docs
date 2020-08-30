import { CommonServiceParams } from './types';

import { getRepoFiles } from 'src/dataProvider/repos/git/trees';

import { prepare } from './actions';
import cacheAll from './helpers/cacheAll';

export function syncCacheWithRepo(params: CommonServiceParams) {
    const { user, state, repo } = params;

    const getRepoFilesSuccessCallback = (files: string[]) =>
        cacheAll({
            user,
            repo,
            state,
            files,
        });

    const prepareCallback = (sha: string) =>
        getRepoFiles({
            user,
            state,
            repo,
            sha,
            onSuccess: getRepoFilesSuccessCallback,
        });

    prepare({
        user,
        repo,
        state,
        callback: prepareCallback,
    });
}

export { default as findInFiles } from './helpers/findInFiles';
