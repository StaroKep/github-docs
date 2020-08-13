import {ApplicationState} from "src/components/Application.types";

export interface ContentProps {
    state: ApplicationState;
    filePath?: string;
}