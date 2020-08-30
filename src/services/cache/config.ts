export enum DBTables {
    REPOSITORY_DATA = 'repositoryData',
    FILES = 'files',
}

export enum RepositoryDataKeys {
    SHA = 'sha',
}

export const Schema = {
    [DBTables.REPOSITORY_DATA]: {
        key: 'key',
        value: 'value',
    },
    [DBTables.FILES]: {
        path: 'path',
        content: 'content',
    },
} as const;

export const cacheConfig = {
    schema: {
        [DBTables.REPOSITORY_DATA]: [
            Schema.repositoryData.key,
            Schema.repositoryData.value,
        ].join(','),
        [DBTables.FILES]: [Schema.files.path, Schema.files.content].join(','),
    },
    dbVersion: 1,
};
