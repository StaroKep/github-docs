import { ApplicationState } from 'src/state/types';

export interface SearchParams {
    user: string;
    repo: string;
    request: string;
    state: ApplicationState;

    onSuccess?: (data?: any) => any;
    onError?: (data?: any) => any;
}
