import { Store } from 'src/store/types';

import { RepositoryStoreData } from './types';

function getRepositoryStoreData(store: Store): RepositoryStoreData {
    return store.repository;
}

function getSelectedRepository(
    store: Store
): RepositoryStoreData['selectedRepository'] {
    return getRepositoryStoreData(store).selectedRepository;
}
