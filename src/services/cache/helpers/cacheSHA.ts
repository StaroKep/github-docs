import Dexie from 'dexie';
import get from 'lodash/get';

import { CommonServiceParams } from 'src/services/cache/types';
import getDBName from 'src/services/cache/helpers/getDBName';
import { cacheConfig, DBTables } from 'src/services/cache/config';

const { schema, dbVersion } = cacheConfig;

export type CacheSHAParams = Omit<CommonServiceParams, 'state'> & {
    sha: string;
};

export default function(data: CacheSHAParams) {
    const { user, repo, sha } = data;

    const dbName = getDBName({ user, repo });
    const db = new Dexie(dbName);

    db.version(dbVersion).stores(schema);

    get(db, [DBTables.REPOSITORY_DATA])
        .put({
            key: 'sha',
            value: sha,
        })
        .then(() => {
            console.log('cacheSHA success');
        })
        .catch(() => {
            console.log('cacheSHA error');
        });
}
