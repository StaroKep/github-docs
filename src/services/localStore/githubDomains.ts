import { GitHubDomains } from 'src/state/types';

const ITEM_NAME = 'githubDomains';

export function getLocalStoreGitHubDomains(): GitHubDomains {
    const githubDomains = window.localStorage.getItem(ITEM_NAME);

    if (githubDomains) {
        return JSON.parse(githubDomains);
    }

    return {};
}

export function setLocalStoreGitHubDomains(data: GitHubDomains) {
    const savedGitHubDomains = getLocalStoreGitHubDomains();
    const modifiedData = {
        ...savedGitHubDomains,
        ...data,
    };

    const githubDomainsString = JSON.stringify(modifiedData);

    window.localStorage.setItem(ITEM_NAME, githubDomainsString);
}
