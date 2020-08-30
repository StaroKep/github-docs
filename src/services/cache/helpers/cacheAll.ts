import Dexie from 'dexie';
import get from 'lodash/get';

import { cacheConfig, DBTables } from 'src/services/cache/config';
import { CacheParams } from 'src/services/cache/types';

import { getFileContent } from 'src/dataProvider/repos/contents';

import getDBName from './getDBName';

const { schema, dbVersion } = cacheConfig;

export default function(data: CacheParams) {
    const { user, repo, state, files } = data;

    const dbName = getDBName({ user, repo });
    const db = new Dexie(dbName);

    db.version(dbVersion).stores(schema);

    files.forEach(file => {
        getFileContent({
            user,
            repo,
            state,
            filePath: file,
            onSuccess: content => {
                get(db, [DBTables.FILES])
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
