import { GITHUB, GITHUB_API } from 'src/constants/main';
import { ApplicationState } from 'src/state/types';

export function github(state: ApplicationState) {
    const { githubDomain } = state;

    if (githubDomain) {
        return githubDomain;
    }

    return GITHUB;
}

export function githubAPI(state: ApplicationState) {
    const { githubAPIDomain } = state;

    if (githubAPIDomain) {
        return githubAPIDomain;
    }

    return GITHUB_API;
}
