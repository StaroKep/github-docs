import { parse } from 'query-string';

import { parseGitHubDomainsQueryParams } from './githubDomains';

export function parseQueryParams() {
    const query = window.location.search;
    const queryParams = parse(query);

    const gitHubDomainsQueryParams = parseGitHubDomainsQueryParams(queryParams);

    return {
        ...gitHubDomainsQueryParams,
    };
}
