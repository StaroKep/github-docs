export interface GitHubDomains {
    githubDomain?: string;
    githubAPIDomain?: string;
    isGitHubQueryParams?: boolean;
}

export interface Repository {
    user: string;
    repo: string;
    githubDomain?: string;
    githubAPIDomain?: string;
}

export type ApplicationState = GitHubDomains & {
    files: string[],
    reposList: Repository[];
};

export interface ComponentWithApplicationState {
    state: ApplicationState;
    setState: Function;
}