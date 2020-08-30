import {ApplicationState} from "src/state/types";

export interface NavigationProps {
    user: string,
    repo: string,
    state: ApplicationState;
}
