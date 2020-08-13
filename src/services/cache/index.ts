import Dexie from 'dexie';
import { lowerCase, upperCase } from 'lodash';

import { getFileContent } from 'src/dataProvider/repos/contents';
import config from 'src/config';

import { CacheParams } from './types';

export default function(data: CacheParams) {
    const { user, repo, state, files } = data;

    const db = new Dexie(config.appName);
    db.version(1).stores({
        files: 'path,content',
    });

    console.log(db);

    files.forEach(file => {
        getFileContent({
            user,
            repo,
            state,
            filePath: file,
            onSuccess: content => {
                db.files
                    .put({
                        path: file,
                        content,
                    })
                    .then(() => {
                        console.log('success');
                    })
                    .catch(() => {
                        console.log('error');
                    });
            },
        });
    });
}

export function findInFiles(text: string, callback: Function) {
    const db = new Dexie(config.appName);
    db.version(1).stores({
        files: 'path',
    });

    let result = {items: []};

    db.files.each(({path, content}) => {
        const inPath = lowerCase(path).includes(lowerCase(text));
        const inContent = lowerCase(content).includes(lowerCase(text));

        if (inPath || inContent) {
            result.items.push({path});
        }
    }).then(() => {
        console.log(result)
        callback(result);
    }).catch(() => {
        console.log('error');
    })

}