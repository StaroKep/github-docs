import Dexie from 'dexie';
import get from 'lodash/get';

import {
    cacheConfig,
    DBTables,
    Schema,
    RepositoryDataKeys,
} from 'src/services/cache/config';

import getDBName from './getDBName';

const { schema, dbVersion } = cacheConfig;

export interface GetSHAParams {
    user: string;
    repo: string;
    callback?: (sha: string | undefined) => void;
}

export interface GetSHAResult {
    key: string;
    value: string;
}

export default function(params: GetSHAParams) {
    const { user, repo, callback = () => {} } = params;

    const dbName = getDBName({ user, repo });
    const db = new Dexie(dbName);

    db.version(dbVersion).stores(schema);

    get(db, [DBTables.REPOSITORY_DATA]).get(
        {
            [Schema.repositoryData.key]: RepositoryDataKeys.SHA,
        },
        (result: GetSHAResult | undefined) => {
            callback(get(result, [Schema.repositoryData.value]));
        }
    );
}
