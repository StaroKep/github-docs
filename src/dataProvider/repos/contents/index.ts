import { ContentsParams } from './types';

import { githubAPI } from 'src/utils/githubDomains';
import { GitHubAPI } from 'src/enums/github';
import { base64decode } from 'src/utils/base64decode';

export function getFileContent(params: ContentsParams) {
    const {
        user,
        repo,
        state,
        filePath,
        onSuccess = () => {},
        onError = () => {},
    } = params;

    const requestURL = `${githubAPI(state)}${GitHubAPI.REPOS}/${user}/${repo}/${GitHubAPI.CONTENTS}/${filePath}`;

    fetch(requestURL)
        .then(result => result.json())
        .then(({ content }) => {
            if (content) {
                onSuccess(base64decode(content));
            } else {
                onError();
            }
        });
}
