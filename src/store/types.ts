import { RouterState } from 'connected-react-router';

import { RepositoryStoreData } from 'src/entities/repository/types';

export interface Store {
    repository: RepositoryStoreData;
}

export type ExtendedStore = Store & {
    router: RouterState;
};

export type ExtendedWindow = Window & {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
};