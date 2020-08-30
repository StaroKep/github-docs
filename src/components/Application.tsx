import React, { FunctionComponent, useEffect, useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import cn from 'classnames/bind';

import { Search } from 'src/components/Search';
import { Content } from 'src/components/Content';
import { GitHubDomains } from 'src/components/GitHubDomains';
import { CacheStatus } from 'src/components/CacheStatus';
import { Navigation } from 'src/components/Navigation';
import { Home } from 'src/components/Home';
import { Editor } from 'src/components/Editor';

import { parseQueryParams } from 'src/services/queryParams';
import { getLocalStoreRepositories } from 'src/services/localStore/repositories';

import { ApplicationState } from 'src/state/types';

import * as styles from './Application.pcss';
import { About } from 'src/components/About';

const cx = cn.bind(styles);

export const Application: FunctionComponent = () => {
    const [state, setState] = useState<ApplicationState>({
        files: [],
        reposList: getLocalStoreRepositories(),
        ...parseQueryParams(),
    });

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <div className={cx('root')}>
            <HashRouter hashType="noslash">

                <Switch>
                    <Route path="/editor/:user/:repo">
                        <Search state={state}>
                            {/*<CacheStatus state={state} setState={setState} />*/}
                        </Search>
                        <Editor state={state} />
                    </Route>

                    <Route path="/:user/:repo">
                        <Search state={state}>
                            {/*<CacheStatus state={state} setState={setState} />*/}
                        </Search>
                        <Content state={state} />
                    </Route>
                </Switch>

                <Route exact path="/">
                    <Home state={state} setState={setState} />
                </Route>

                {/*<About />*/}
            </HashRouter>
            {/*<GitHubDomains state={state} />*/}
        </div>
    );
};

export default Application;
