import config from 'src/config';

export interface GetDBNameParams {
    user: string;
    repo: string;
}

export default function(params: GetDBNameParams) {
    const { user, repo } = params;

    return `${config.appName}/${user}/${repo};`;
}
