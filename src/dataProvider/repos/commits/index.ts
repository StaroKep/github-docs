import { CommitsParams } from './types';

import { githubAPI } from 'src/utils/githubDomains';
import { GitHubAPI } from 'src/enums/github';

export function getLastCommitSHA(params: CommitsParams) {
    const {
        user,
        repo,
        state,
        onSuccess = () => {},
        onError = () => {},
    } = params;

    const requestURL = `${githubAPI(state)}${GitHubAPI.REPOS}/${user}/${repo}/${
        GitHubAPI.COMMITS
    }`;

    fetch(requestURL)
        .then(result => result.json())
        .then(data => {
            if (data) {
                const { sha } = data.shift();
                onSuccess(sha);
            } else {
                onError();
            }
        });
}
