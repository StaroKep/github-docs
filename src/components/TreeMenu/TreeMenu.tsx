import React, {FunctionComponent} from 'react';
import cn from 'classnames/bind';

import {TreeMenuProps} from './TreeMenu.types';

import * as styles from './TreeMenu.pcss';
import {Details} from "./parts/Details";

const cx = cn.bind(styles);

// TODO: refactor this
function flattenValues(obj) {
    let result = [];

    const keys = Object.keys(obj);

    keys.forEach((key, index) => {
        const nextEl = obj[key];
        const isNextArray = Array.isArray(nextEl);

        if (!isNextArray) {
            result = [...result, <Details title={key}>{...flattenValues(nextEl)}</Details>];
            return;
        }

        result.push(<Details title={key} elementsList={nextEl}/>);
    });

    return result;
}

export const TreeMenu: FunctionComponent<TreeMenuProps> = props => {
    const { files } = props;

    return <div className={cx('root')}>
        {flattenValues(files)}
    </div>;
};

export default TreeMenu;