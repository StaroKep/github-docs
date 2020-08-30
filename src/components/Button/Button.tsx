import React, { FunctionComponent } from 'react';
import cn from 'classnames/bind';

import { Text, TextType } from 'src/components/Text';

import { ButtonProps } from './Button.types';
import { ButtonType } from './Button.enum';

import * as styles from './Button.pcss';

const cx = cn.bind(styles);

export const Button: FunctionComponent<ButtonProps> = props => {
    const {
        children,
        onClick,
        type = ButtonType.DEFAULT,
        className,
        title = 'Button',
    } = props;

    const rootClassName = cx('root', `root_${type}`, className);

    let buttonContent;
    if (type === ButtonType.CIRCLE) {
        buttonContent = children;
    } else {
        buttonContent = <Text type={TextType.BUTTON}>{children}</Text>;
    }

    return (
        <button className={rootClassName} onClick={onClick} title={title}>
            {buttonContent}
        </button>
    );
};

export default Button;
