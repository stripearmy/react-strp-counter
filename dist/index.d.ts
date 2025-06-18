import { default as default_2 } from 'react';

export declare const STRPCounter: default_2.FC<STRPCounterProps>;

declare interface STRPCounterProps {
    value?: number | string;
    fontSize?: string;
    delimiter?: string | boolean;
    decimalSeparator?: string | boolean;
    minLength?: number;
    unitLabel?: default_2.ReactNode;
    unitLabelPosition?: "left" | "right";
}

export { }


declare module 'react' {
    interface CSSProperties {
        '--strp_fontsize'?: string;
    }
}
