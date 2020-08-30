import React, { FunctionComponent } from 'react';
import cn from 'classnames/bind';

import { TextProps } from './Text.types';
import { TextType } from './Text.enums';

import * as styles from './Text.pcss';

const cx = cn.bind(styles);

export const Text: FunctionComponent<TextProps> = props => {
    const { type = TextType.DEFAULT, children } = props;

    const rootClassName = cx('root', `root_${type}`);

    return <span className={rootClassName}>{children}</span>;
};

export default Text;
