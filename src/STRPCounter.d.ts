import "./styles/react-strp-counter.css";
import React from "react";
interface STRPCounterProps {
    value: number | string;
    fontSize?: string;
    minLength?: number;
    rollingMode?: boolean;
    delimiter?: string | false;
    decimalSeparator?: string | false;
    unitLabel?: string | React.ReactNode;
    unitLabelPosition?: 'left' | 'right';
    stepDuration?: number;
    easing?: string | false,
}
declare function STRPCounter({ value, fontSize, delimiter, decimalSeparator, minLength, unitLabel, unitLabelPosition, rollingMode, stepDuration, easing }: STRPCounterProps): import("react/jsx-runtime").JSX.Element;
export default STRPCounter;
