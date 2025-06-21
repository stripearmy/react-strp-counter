import { default as default_2 } from 'react';

export declare const STRPCounter: default_2.FC<STRPCounterProps>;

declare type STRPCounterProps = {
    value: number | string;
    fontSize?: string;
    minLength?: number;
    rollingMode?: boolean;
    delimiter?: string | false;
    decimalSeparator?: string | false;
    unitLabel?: string | default_2.ReactNode;
    unitLabelPosition?: 'left' | 'right';
    stepDuration?: number;
    easing?: string | false;
};

export { }
