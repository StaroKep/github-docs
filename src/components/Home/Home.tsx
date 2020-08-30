import React, { FunctionComponent } from 'react';
import cn from 'classnames/bind';

import { Repos } from 'src/components/Repos';

import { HomeProps } from './Home.types';

import * as styles from './Home.pcss';

const cx = cn.bind(styles);

export const Home: FunctionComponent<HomeProps> = props => {
    const { state, setState } = props;

    return (
        <div className={cx('root')}>
            <Repos state={state} setState={setState} />
        </div>
    );
};

export default Home;
