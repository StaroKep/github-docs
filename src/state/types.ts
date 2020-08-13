export interface GitHubDomains {
    githubDomain?: string;
    githubAPIDomain?: string;
    isGitHubQueryParams?: boolean;
}

export type ApplicationState = GitHubDomains & {
    files: string[],
};
