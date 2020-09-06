import React, { FunctionComponent } from 'react';
import { FaFolder } from 'react-icons/fa';
import { VscCircleFilled } from 'react-icons/vsc';
import cn from 'classnames/bind';

import { DetailsProps } from './Details.types';

import * as styles from './Details.pcss';

const cx = cn.bind(styles);

export const Details: FunctionComponent<DetailsProps> = props => {
    const { title, elementsList, children } = props;

    let content = children;
    if (elementsList) {
        content = elementsList.map(element => <a className={cx('link')} href={element.path}><VscCircleFilled />{element.title}</a>)
    }

    return (
        <details>
            <summary>
                <FaFolder/> {title}
            </summary>
            {content}
        </details>
    );
};

export default Details;
