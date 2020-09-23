export interface Repository {
    username: string;
    repositoryName: string;
    apiKey: string;
    githubDomain: string;
    githubAPIDomain: string;
}

export interface RepositoryStoreData {
    selectedRepository?: Repository;
}