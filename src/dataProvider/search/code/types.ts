export interface SearchParams {
    user: string;
    repo: string;
    request: string;

    onSuccess?: (data?: any) => any;
    onError?: (data?: any) => any;
}