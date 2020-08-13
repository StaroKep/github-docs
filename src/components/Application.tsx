import queryString from 'query-string';
import React, { FunctionComponent, useState } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import cn from 'classnames/bind';

import { Search } from 'src/components/Search';
import { Content } from 'src/components/Content';

import * as styles from './Application.pcss';

const cx = cn.bind(styles);

export const Application: FunctionComponent = () => {
    return (
        <div className={cx('root')}>
            <HashRouter hashType="noslash">
                <Route  path="/:user/:repo">
                    <Search />
                    <Content />
                </Route>

                <Route exact path="/">Path must be like "userName/repoName"</Route>
            </HashRouter>
        </div>
    );
};

export default Application;
