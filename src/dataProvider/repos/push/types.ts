import { ApplicationState } from 'src/state/types';

export interface PushParams {
  user: string;
  repo: string;
  filePath: string;
  state: ApplicationState;
  content: string;

  onSuccess?: (data?: any) => any;
  onError?: (data?: any) => any;
}
