import React, { FunctionComponent, useCallback, useEffect } from 'react';
import cn from 'classnames/bind';

import { NavigationProps } from './Navigation.types';

import * as styles from './Navigation.pcss';

const cx = cn.bind(styles);

export const Navigation: FunctionComponent<NavigationProps> = props => {
    return (
        <div className={cx('root')}>
            <div className={cx('title-wrapper')}>
                <h3 className={cx('title')}>NAVIGATION PANEL</h3>
            </div>
        </div>
    );
};

export default Navigation;
