import { ApplicationState } from 'src/state/types';

export interface CommitsParams {
    user: string;
    repo: string;
    state: ApplicationState;

    onSuccess?: (data?: any) => any;
    onError?: (data?: any) => any;
}
