import { githubAPI } from 'src/utils/githubDomains';
import { GitHubAPI } from 'src/enums/github';

import { TreesParams } from './types';

export function getRepoFiles(params: TreesParams) {
    const {
        sha,
        user,
        repo,
        state,
        onSuccess = () => {},
        onError = () => {},
    } = params;

    const requestURL = `${githubAPI(state)}${GitHubAPI.REPOS}/${user}/${repo}/${
        GitHubAPI.GIT
    }/${GitHubAPI.TREES}/${sha}?recursive=true`;

    fetch(requestURL)
        .then(result => result.json())
        .then(({ tree }) => {
            const pathsList = tree.map((element: any) => element.path);
            const markdownPaths = pathsList.filter((element: string) => {
                return element.includes('.md');
            });

            console.log(markdownPaths);
            if (tree) {
                onSuccess(markdownPaths);
            } else {
                onError();
            }
        });
}
