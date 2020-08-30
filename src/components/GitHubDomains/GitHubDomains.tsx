import React, { FunctionComponent } from 'react';
import cn from 'classnames/bind';

import { github, githubAPI } from 'src/utils/githubDomains';

import { GitHubDomainsProps } from './GitHubDomains.types';

import * as styles from './GitHubDomains.pcss';

const cx = cn.bind(styles);

export const GitHubDomains: FunctionComponent<GitHubDomainsProps> = props => {
    const { state } = props;

    return (
        <div className={cx('root')}>
            GitHub domains:
            <br />
            {github(state)}
            <br />
            {githubAPI(state)}
        </div>
    );
};

export default GitHubDomains;
