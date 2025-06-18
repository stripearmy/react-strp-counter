import "./styles/react-strp-counter.css";
import React from "react";
interface STRPCounterProps {
    value?: number | string;
    fontSize?: string;
    delimiter?: string | boolean;
    decimalSeparator?: string | boolean;
    minLength?: number;
    unitLabel?: React.ReactNode;
    unitLabelPosition?: "left" | "right";
}
declare function STRPCounter({ value, fontSize, delimiter, decimalSeparator, minLength, unitLabel, unitLabelPosition }: STRPCounterProps): import("react/jsx-runtime").JSX.Element;
export default STRPCounter;
