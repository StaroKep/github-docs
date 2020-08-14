import React, {FunctionComponent} from 'react';
import cn from 'classnames/bind';

import {AboutProps} from './About.types';

import * as styles from './About.pcss';

const cx = cn.bind(styles);

export const About: FunctionComponent<AboutProps> = props => {
    return <div className={cx('root')}>
        About
    </div>;
};

export default About;