import { ParsedQuery } from 'query-string';

import { GitHubDomains } from 'src/state/types';
import {
    getLocalStoreGitHubDomains,
    setLocalStoreGitHubDomains,
} from 'src/services/localStore';

export function parseGitHubDomainsQueryParams(
    queryParams: ParsedQuery
): GitHubDomains & { isGitHubQueryParams?: boolean } {
    const { githubDomain, githubAPIDomain } = queryParams;

    const result: GitHubDomains = {};

    if (typeof githubDomain === 'string') {
        result.githubDomain = githubDomain;
    }

    if (typeof githubAPIDomain === 'string') {
        result.githubAPIDomain = githubAPIDomain;
    }

    if (!Object.keys(result).length) {
        return {
            ...getLocalStoreGitHubDomains(),
        };
    }

    setLocalStoreGitHubDomains(result);

    return { ...result, isGitHubQueryParams: true };
}
