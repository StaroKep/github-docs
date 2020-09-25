import React, {
    FormEvent,
    FunctionComponent,
    useCallback,
    useRef,
    useState,
} from 'react';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import remove from 'lodash/remove';
import cn from 'classnames/bind';
import { FaSync } from 'react-icons/fa';

import { GITHUB, GITHUB_API } from 'src/constants/main';

import { Button, ButtonType } from 'src/components/Button';

import { syncCacheWithRepo } from 'src/services/cache';
import { setLocalStoreRepository } from 'src/services/localStore/repositories';

import { Repository } from 'src/state/types';

import { ReposProps } from './Repos.types';

import * as styles from './Repos.pcss';

const cx = cn.bind(styles);

export const Repos: FunctionComponent<ReposProps> = props => {
    const { state, setState } = props;
    const { reposList } = state;

    const inputWrapperClassName = cx('input-wrapper');
    const inputClassName = cx('input');
    const buttonClassName = cx('button');
    const labelClassName = cx('label');

    const [repos, setRepos] = useState<Repository[]>(reposList);

    const formRef = useRef<HTMLFormElement>(null);

    const onFormSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            event.stopPropagation();

            if (formRef.current) {
                const data = new FormData(formRef.current);

                const user = data.get('user') as string;
                const repo = data.get('repo') as string;
                const token = data.get('token') as string;
                const githubDomain = data.get('github-domain');
                const githubAPIDomain = data.get('github-api-domain');
                
                if (!user || !repo || !token) {
                    return;
                }

                const newRepo: Repository = {
                    user,
                    repo,
                    token,
                    githubDomain:
                        typeof githubDomain === 'string'
                            ? githubDomain
                            : undefined,
                    githubAPIDomain:
                        typeof githubAPIDomain === 'string'
                            ? githubAPIDomain
                            : undefined,
                };

                const updatedRepositoriesList = uniqWith(
                    [...repos, newRepo],
                    isEqual
                );
                setRepos(updatedRepositoriesList);
                setLocalStoreRepository(updatedRepositoriesList);

                formRef.current.querySelectorAll('input').forEach(el => {
                    el.value = '';
                });
            }
        },
        [formRef, repos]
    );

    const onDeleteButtonClick = useCallback(
        (repo: Repository) => () => {
            const { user, repo: repoName } = repo;
            const agree = confirm(`Delete ${user}/${repoName}?`);

            if (!agree) {
                return;
            }

            const updatedRepositoriesList = remove(repos, el => {
                return !isEqual(el, repo);
            });

            setRepos(updatedRepositoriesList);
            setLocalStoreRepository(updatedRepositoriesList);
        },
        [repos]
    );

    return (
        <div className={cx('root')}>
            <h1 className={cx('title')}>REPOSITORIES</h1>
            <div className={cx('repos-list')}>
                {repos.map(repo => {
                    const {
                        user,
                        repo: repoName,
                        token,
                        githubDomain,
                        githubAPIDomain,
                    } = repo;

                    const repoKey = `${user}/${repoName}`;

                    const github = githubDomain || GITHUB;
                    const githubApi = githubAPIDomain || GITHUB_API;

                    const githubParam = `?githubDomain=${github}`;
                    const githubApiParam = `&githubAPIDomain=${githubApi}`;

                    const href = `${githubParam}${githubApiParam}#/${user}/${repoName}`;

                    return (
                        <div className={cx('repo')}>
                            <button
                                className={cx('remove-repo-button')}
                                onClick={onDeleteButtonClick(repo)}
                            >
                                ×
                            </button>
                            <a key={repoKey} href={href}>
                                <div
                                    className={cx('repo-caption')}
                                    title={repoKey}
                                >
                                    {repoKey}
                                </div>
                            </a>
                            <div className={cx('repo-github')}>
                                {github}
                                <br />
                                {githubApi}
                                <br />
                                {token}
                            </div>
                            <Button
                                type={ButtonType.CIRCLE}
                                onClick={() => {
                                    syncCacheWithRepo({
                                        user,
                                        repo: repoName,
                                        state
                                    });
                                }}
                            >
                                <FaSync />
                            </Button>
                        </div>
                    );
                })}
            </div>

            <form
                ref={formRef}
                onSubmit={onFormSubmit}
                className={cx('add-repo-form')}
            >
                <div className={cx('top-menu')}>
                    <button className={buttonClassName}>+</button>
                    <h3 className={cx('add-repo-caption')}>
                        Add new repository
                    </h3>
                </div>

                <div className={inputWrapperClassName}>
                    <label
                        className={labelClassName}
                        htmlFor="add-repos-form_field_user"
                    >
                        Username:
                    </label>
                    <input
                        id="add-repos-form_field_user"
                        required
                        className={inputClassName}
                        name="user"
                        type="text"
                        placeholder="Ivan"
                    />
                </div>

                <div className={inputWrapperClassName}>
                    <label
                        className={labelClassName}
                        htmlFor="add-repos-form_field_repos"
                    >
                        Repository name:
                    </label>
                    <input
                        id="add-repos-form_field_repo"
                        required
                        className={inputClassName}
                        name="repo"
                        type="text"
                        placeholder="github-docs"
                    />
                </div>

                <div className={inputWrapperClassName}>
                    <label
                        className={labelClassName}
                        htmlFor="add-repos-form_field_github-domain"
                    >
                        GitHub domain:
                    </label>
                    <input
                        id="add-repos-form_field_github-domain"
                        className={inputClassName}
                        name="github-domain"
                        type="url"
                        placeholder="https://my-corp.com/"
                    />
                </div>

                <div className={inputWrapperClassName}>
                    <label
                        className={labelClassName}
                        htmlFor="add-repos-form_field_github-api-domain"
                    >
                        GitHub API domain:
                    </label>
                    <input
                        id="add-repos-form_field_github-api-domain"
                        className={inputClassName}
                        name="github-api-domain"
                        type="url"
                        placeholder="https://api.my-corp.com/"
                    />
                </div>

                <div className={inputWrapperClassName}>
                    <label
                        className={labelClassName}
                        htmlFor="add-repos-form_field_github-token"
                    >
                        GitHub Auth token:
                    </label>
                    <input
                        id="add-repos-form_field_github-token"
                        className={inputClassName}
                        required
                        name="token"
                        type="text"
                        placeholder="aaa777aaa777aaa777aaa777aaa777aaa777aaa7"
                    />
                </div>
            </form>
        </div>
    );
};

export default Repos;
