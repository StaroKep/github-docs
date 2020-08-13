export interface ContentsParams {
    user: string;
    repo: string;
    filePath: string;

    onSuccess?: (data?: any) => any;
    onError?: (data?: any) => any;
}