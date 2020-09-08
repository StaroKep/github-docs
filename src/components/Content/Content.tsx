import React, { FunctionComponent, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { github } from 'src/utils/githubDomains';
import { getFileContent } from 'src/dataProvider/repos/contents';

import { ContentProps } from './Content.types';

import * as styles from './Content.pcss';
import { Navigation } from 'src/components/Navigation';

const cx = cn.bind(styles);

export const Content: FunctionComponent<ContentProps> = props => {
    const { state } = props;
    const { user, repo } = useParams();
    const { pathname } = useLocation();

    const filePath =
        pathname
            .slice(1)
            .split('/')
            .slice(2)
            .join('/') || 'README.md';

    const [content, onContent] = useState('');

    useEffect(() => {
        onContent('');

        getFileContent({
            user,
            repo,
            state,
            filePath,
            onSuccess: onContent,
            onError: () => onContent(`File ${filePath} doesn't exist`),
        });
    }, [filePath]);

    return (
        <>
            <Navigation user={user} repo={repo} state={state} />

            <div className={cx('root')}>
                <div className={cx('title')}>
                    File: {filePath.replace('.md', '').replace('/', ' / ')}
                    <a className={cx('close-button')} href="/">
                        ×
                    </a>
                </div>
                <div className={cx('content')}>
                    <ReactMarkdown linkTarget="_blank" escapeHtml={false}>
                        {content || Content}
                    </ReactMarkdown>
                </div>
                <Link
                    className={cx('edit-link')}
                    to={`/editor/${user}/${repo}/${filePath}`}
                >
                    Edit file
                </Link>
            </div>
        </>
    );
};

export default Content;
