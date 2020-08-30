import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';

import { Repository } from 'src/state/types';

const ITEM_NAME = 'repositoriesList';

export function getLocalStoreRepositories(): Repository[] {
    const repositories = window.localStorage.getItem(ITEM_NAME);

    if (repositories) {
        return JSON.parse(repositories);
    }

    return [];
}

export function addLocalStoreRepository(data: Repository) {
    const repositories = getLocalStoreRepositories();

    const uniqRepositories = uniqWith([...repositories, data], isEqual);
    const uniqRepositoriesString = JSON.stringify(uniqRepositories);

    window.localStorage.setItem(ITEM_NAME, uniqRepositoriesString);
}

export function setLocalStoreRepository(data: Repository[]) {
    const repositoriesString = JSON.stringify(data);

    window.localStorage.setItem(ITEM_NAME, repositoriesString);
}
