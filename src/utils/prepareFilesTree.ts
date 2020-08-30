import get from 'lodash/get';
import set from 'lodash/set';

export interface PrepareFilesTreeParams {
    filesList: string[];
    user: string;
    repo: string;
}

export default function(params: PrepareFilesTreeParams) {
    const result = {};
    const { filesList, repo, user } = params;

    filesList.forEach(filePath => {
        const pathElementsList = filePath.replace('.md', '').split('/');
        const value = pathElementsList.pop();

        if (pathElementsList.length) {
            const p = get(result, pathElementsList.join('.'));

            if (!p) {
                set(result, pathElementsList.join('.'), []);
            }

            get(result, pathElementsList.join('.')).push({
                title: value,
                path: `#${user}/${repo}/${filePath}`,
            });
        } else {
            result[value] = [
                { title: value, path: `#${user}/${repo}/${filePath}` },
            ];
        }
    });

    return result;
}
