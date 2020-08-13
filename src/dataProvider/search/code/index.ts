import { SearchParams } from './types';

import { githubAPI } from 'src/utils/githubDomains';
import { GitHubAPI } from 'src/enums/github';

export function searchCode(params: SearchParams) {
    const {
        user,
        repo,
        state,
        request,
        onSuccess = () => {},
        onError = () => {},
    } = params;

    const requestURL = `${githubAPI(state)}${GitHubAPI.SEARCH_CODE}?q=repo:${user}/${repo} ${request}`;

    fetch(requestURL)
        .then(result => result.json(), onError)
        .then(onSuccess);
}
