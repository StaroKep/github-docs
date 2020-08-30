import { ApplicationState } from 'src/state/types';

export interface CommonServiceParams {
    user: string;
    repo: string;
    state: ApplicationState;
}

export interface CacheParams extends CommonServiceParams {
    files: string[];
}

export interface PrepareFunctionParams extends CommonServiceParams {
    callback: (sha: string) => void;
}
