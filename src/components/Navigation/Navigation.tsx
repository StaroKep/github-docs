import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import cn from 'classnames/bind';

import { TreeMenu } from 'src/components/TreeMenu';

import { NavigationProps } from './Navigation.types';

import * as styles from './Navigation.pcss';
import { getRepoFiles } from 'src/dataProvider/repos/git/trees';
import { getLastCommitSHA } from 'src/dataProvider/repos/commits';
import prepareFilesTree from 'src/utils/prepareFilesTree';

const cx = cn.bind(styles);

export const Navigation: FunctionComponent<NavigationProps> = props => {
    const { state, user, repo } = props;

    const [files, setFiles] = useState<object>({});

    useEffect(() => {
        if (!user || !repo) {
            return;
        }
        getLastCommitSHA({
            user,
            repo,
            state,
            onSuccess: (sha: string) =>
                getRepoFiles({
                    sha,
                    user,
                    repo,
                    state,
                    onSuccess: files => {
                        setFiles(
                            prepareFilesTree({ filesList: files, user, repo })
                        );
                    },
                }),
        });
    }, [user, repo, state]);

    return (
        <div className={cx('root')}>
            <div className={cx('title-wrapper')}>
                <div className={cx('repo-name')}>
                    {user}/{repo}
                </div>
                <h3 className={cx('title')}>NAVIGATION PANEL</h3>
                <TreeMenu files={files} />
            </div>
            <div className={cx('footer')}>
                <a href='/'>Home</a>
                <a className={cx('link-about')} href='https://docs.selectapp.net/?githubDomain=https://github.com&githubAPIDomain=https://api.github.com/#StaroKep/github-docs'>About</a>
                <a href='https://github.com/StaroKep/github-docs'>GitHub</a>
                <a className={cx('version')} href='https://github.com/StaroKep/github-docs/tree/master/Documentation/Change log/MVP.md'>Version 0.1</a>
            </div> 
        </div>
    );
};

export default Navigation;
