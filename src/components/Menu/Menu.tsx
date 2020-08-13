import React, {FunctionComponent} from 'react';
import cn from 'classnames/bind';

import {MenuProps} from './Menu.types';

import * as styles from './Menu.pcss';

const cx = cn.bind(styles);

export const Menu: FunctionComponent<MenuProps> = props => {
    return <div className={cx('root')}>

    </div>;
};

export default Menu;