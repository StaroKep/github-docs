import React, { FunctionComponent, useEffect, useState } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import cn from 'classnames/bind';

import { Search } from 'src/components/Search';
import { Content } from 'src/components/Content';
import { GitHubDomains } from 'src/components/GitHubDomains';

import { parseQueryParams } from 'src/services/queryParams';

import { ApplicationState } from 'src/state/types';

import * as styles from './Application.pcss';

const cx = cn.bind(styles);

export const Application: FunctionComponent = () => {
    const [state, setState] = useState<ApplicationState>({
        ...parseQueryParams(),
    });

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <div className={cx('root')}>
            <HashRouter hashType="noslash">
                <Route path="/:user/:repo">
                    <Search state={state} />
                    <Content state={state} />
                </Route>

                <Route exact path="/">
                    Path must be like "userName/repoName"
                </Route>
            </HashRouter>
            <GitHubDomains state={state} />
        </div>
    );
};

export default Application;
