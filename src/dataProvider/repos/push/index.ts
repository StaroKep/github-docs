import { PushParams } from './types';
import { Octokit } from "@octokit/core";

import { githubAPI } from 'src/utils/githubDomains';
import { GitHubAPI } from 'src/enums/github';
import { base64encode } from 'src/utils/base64decode';

export function pushFileContent(params: PushParams) {
    const {
        user,
        repo,
        state,
        content,
        token,
        filePath,
        onSuccess = () => {},
        onError = () => {},
    } = params;

    const requestURL = `${githubAPI(state)}${GitHubAPI.REPOS}/${user}/${repo}/${
        GitHubAPI.CONTENTS
    }/${filePath}`;

    const octokit = new Octokit({ auth: token })

    fetch(requestURL)
    .then(result => result.json())
    .then(data => {
        if (data) {
          octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            sha: data.sha,
            owner: user,
            repo: repo,
            path: filePath,
            message: 'Initial commit.',
            content: base64encode(content)
          })
          onSuccess()
        }else{
          onError();
        }
    });
}
