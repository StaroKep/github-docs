import React, {FunctionComponent} from 'react';
import cn from 'classnames/bind';

import { About } from "src/components/About";

import {NavigationProps} from './Navigation.types';

import * as styles from './Navigation.pcss';

const cx = cn.bind(styles);

export const Navigation: FunctionComponent<NavigationProps> = props => {
    return <div className={cx('root')}>
        <div className={cx('title')}>Navigation</div>
        <About />
    </div>;
};

export default Navigation;