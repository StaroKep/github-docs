import Dexie from 'dexie';
import get from 'lodash/get';
import lowerCase from 'lodash/lowerCase';

import { CommonServiceParams } from 'src/services/cache/types';

import getDBName from './getDBName';

import { DBTables, cacheConfig } from 'src/services/cache/config';

export interface FindInFilesParams extends CommonServiceParams {
    text: string;
    callback: Function; // TODO: Fix type
}

const { schema, dbVersion } = cacheConfig;

export default function(params: FindInFilesParams) {
    const { user, repo, text, callback } = params;

    const dbName = getDBName({ user, repo });
    const db = new Dexie(dbName);
    db.version(dbVersion).stores(schema);

    let result = { items: [] };

    get(db, [DBTables.FILES])
        .each(({ path, content }) => {
            const inPath = lowerCase(path).includes(lowerCase(text));
            const inContent = lowerCase(content).includes(lowerCase(text));

            if (inPath || inContent) {
                result.items.push({ path });
            }
        })
        .then(() => {
            console.log(result);
            callback(result);
        })
        .catch(() => {
            console.log('error');
        });
}
