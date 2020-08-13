import React, { FunctionComponent, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { ContentProps } from './Content.types';

import * as styles from './Content.pcss';
import { getFileContent } from 'src/dataProvider/repos/contents';
import {GITHUB} from "src/constants/main";

const cx = cn.bind(styles);

export const Content: FunctionComponent<ContentProps> = props => {
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
            filePath,
            onSuccess: onContent,
            onError: () => onContent(`File ${filePath} doesn't exist`),
        });
    }, [filePath]);

    return (
        <div className={cx('root')}>
            <div className={cx('title')}>File: {filePath.replace('.md', '').replace('/', ' / ')}</div>
            <div className={cx('content')}>
                <ReactMarkdown linkTarget="_blank" escapeHtml={false}>{content || Content}</ReactMarkdown>
            </div>
            <a target="_blank" className={cx('edit-link')} href={`${GITHUB}/${user}/${repo}/edit/master/${filePath}`}>Edit file</a>
        </div>
    );
};

export default Content;
