import { Store } from './types';

const initialData = (): Omit<Store, 'router'> => {
    return {
        repository: {},
    };
};

export default initialData;
