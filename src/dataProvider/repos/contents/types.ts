import { ApplicationState } from 'src/state/types';

export interface ContentsParams {
    user: string;
    repo: string;
    filePath: string;
    state: ApplicationState;

    onSuccess?: (data?: any) => any;
    onError?: (data?: any) => any;
}
