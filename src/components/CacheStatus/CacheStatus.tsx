import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import cn from 'classnames/bind';
import { useParams } from 'react-router-dom';

import { getLastCommitSHA } from 'src/dataProvider/repos/commits';
import { getRepoFiles } from 'src/dataProvider/repos/git/trees';
import cacheData, { findInFiles } from 'src/services/cache';

import { CacheStatusProps } from './CacheStatus.types';

import * as styles from './CacheStatus.pcss';

const cx = cn.bind(styles);

export const CacheStatus: FunctionComponent<CacheStatusProps> = props => {
    const { state, setState } = props;
    const { user, repo } = useParams();
    const { files } = state;

    const [commitSHA, setCommitSHA] = useState('');

    useEffect(() => {
        getLastCommitSHA({
            user,
            repo,
            state,
            onSuccess: setCommitSHA,
            onError: () => {},
        });
    }, []);

    useEffect(() => {
        if (commitSHA) {
            getRepoFiles({
                user,
                repo,
                state,
                sha: commitSHA,
                onSuccess: (files: string[]) => {
                    setState({ ...state, files });
                },
                onError: () => {},
            });
        }
    }, [commitSHA]);

    const onCacheButtonClick = useCallback(() => {
        cacheData({ repo, user, state, files });
    }, [files]);

    const qwe = useCallback(() => {
        findInFiles('поддерживаемые');
    }, []);

    return (
        <div className={cx('root')}>
            <div>{files.length} repository files</div>
            <button onClick={onCacheButtonClick}>Cache</button>
            <button onClick={qwe}>test</button>
        </div>
    );
};

export default CacheStatus;
