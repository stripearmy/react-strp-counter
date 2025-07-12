import React from 'react';
import './css/styles.css';
export interface STRPCounterProps {
    value: number | string;
    fontSize?: string;
    minLength?: number;
    rollingMode?: boolean;
    delimiter?: string | false;
    decimalSeparator?: string | false;
    unitLabel?: string | React.ReactNode;
    unitLabelPosition?: 'left' | 'right';
    stepDuration?: number;
    easing?: string | false;
}
declare const STRPCounter: React.FC<STRPCounterProps>;
export default STRPCounter;
