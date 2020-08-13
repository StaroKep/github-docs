import { SearchParams } from './types';

import { GITHUB_API } from 'src/constants/main';
import { GitHubAPI } from 'src/enums/github';

export function searchCode(params: SearchParams) {
    const {
        user,
        repo,
        request,
        onSuccess = () => {},
        onError = () => {},
    } = params;

    const requestURL = `${GITHUB_API}${GitHubAPI.SEARCH_CODE}?q=repo:${user}/${repo} ${request}`;

    fetch(requestURL)
        .then(result => result.json(), onError)
        .then(onSuccess);
}
