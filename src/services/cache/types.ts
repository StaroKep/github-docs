import {ApplicationState} from "src/state/types";

export interface CacheParams {
    user: string;
    repo: string;
    files: string[];
    state: ApplicationState;
}