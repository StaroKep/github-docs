import {ApplicationState} from "src/state/types";

export interface TreesParams {
    user: string;
    repo: string;
    sha: string;
    state: ApplicationState;

    onSuccess?: (data?: any) => any;
    onError?: (data?: any) => any;
}