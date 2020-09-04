import React, { FunctionComponent } from 'react';
import cn from 'classnames/bind';

import { DetailsProps } from './Details.types';

import * as styles from './Details.pcss';

const cx = cn.bind(styles);

export const Details: FunctionComponent<DetailsProps> = props => {
    const { title, elementsList, children } = props;

    let content = children;
    if (elementsList) {
        content = elementsList.map(element => <a className={cx('link')} href={element.path}><li>{element.title}</li></a>)
    }

    return (
        <details>
            <summary>
                <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 4.2C0 3.16907 0.811857 2.33333 1.81333 2.33333H15.1867C16.1881 2.33333 17 3.16907 17 4.2V12.1333C17 13.1643 16.1881 14 15.1867 14H1.81333C0.811857 14 0 13.1643 0 12.1333V4.2Z" fill="#282828"/>
                    <path d="M1.81333 0C0.811857 0 0 0.835735 0 1.86667V12.1333C0 13.1643 0.811857 14 1.81333 14H7.25333C8.25481 14 9.06667 13.1643 9.06667 12.1333V2.33333L6.8 0H1.81333Z" fill="#282828"/>
                </svg> {title}
            </summary>
            {content}
        </details>
    );
};

export default Details;
