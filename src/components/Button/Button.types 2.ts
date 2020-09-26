import { ButtonType } from './Button.enum';

export interface ButtonProps {
    onClick: () => void;

    title?: string;
    className?: string;
    type?: ButtonType;
}
