import { ContentsParams } from './types';

import { GITHUB_API } from 'src/constants/main';
import { GitHubAPI } from 'src/enums/github';
import { base64decode } from 'src/utils/base64decode';

export function getFileContent(params: ContentsParams) {
    const {
        user,
        repo,
        filePath,
        onSuccess = () => {},
        onError = () => {},
    } = params;

    const requestURL = `${GITHUB_API}${GitHubAPI.REPOS}/${user}/${repo}/${GitHubAPI.CONTENTS}/${filePath}`;

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
