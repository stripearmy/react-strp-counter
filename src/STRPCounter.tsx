// import "./styles/react-strp-counter.css";
import React, {useEffect, useRef} from 'react';

interface STRPCounterProps {
    value?: number | string;
    fontSize?: string;
    delimiter?: string | boolean;
    decimalSeparator?: string | boolean;
    minLength?: number;
    unitLabel?: React.ReactNode;
    unitLabelPosition?: "left" | "right";
}

declare module 'react' {
    interface CSSProperties {
        '--strp_fontsize'?: string;
    }
}

const formatNumber = (
    value: number | string,
    delimiter: string | boolean = ",",
    decimalSeparator: string | boolean = ".",
    minLength: number = 0
): string[] => {
    const [rawInt = "0", rawDecimal = ""] = value.toString().split(/[.,]/);
    const paddedInt = rawInt.padStart(minLength, "0");

    const useDelimiter = typeof delimiter === "string" ? delimiter : "";
    const useDecimalSeparator = typeof decimalSeparator === "string" ? decimalSeparator : "";

    const formattedInt = useDelimiter
        ? paddedInt
            .split("")
            .reverse()
            .reduce((acc, digit, idx) => {
                return digit + (idx && idx % 3 === 0 ? useDelimiter : "") + acc;
            }, "")
        : paddedInt;

    const decimals = useDecimalSeparator ? rawDecimal || "00" : "";

    return useDecimalSeparator && decimals
        ? [...formattedInt.split(""), useDecimalSeparator, ...decimals.split("")]
        : formattedInt.split("");
};

const STRPCounter: React.FC<STRPCounterProps> = ({
                                                     value = 0,
                                                     fontSize = "28px",
                                                     delimiter = ",",
                                                     decimalSeparator = ".",
                                                     minLength = 0,
                                                     unitLabel,
                                                     unitLabelPosition = "left",
                                                 }) => {
    import('./styles/styles.css');
    const formatted = formatNumber(value, delimiter, decimalSeparator, minLength);
    const ref = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let digitCount = 0;
        formatted.forEach((char, i) => {
            const el = ref.current[i];
            if (el && /\d/.test(char)) {
                el.style.setProperty("--index", char);
                el.style.setProperty("--count", digitCount.toString());
                digitCount++;
            }
        });
    }, [formatted.join("")]);

    return (
        <div className='strp_counter_wrap' style={{'--strp_fontsize': fontSize}}>
            {unitLabel && (
                <div className={`strp_counter_unitLabel_holder strp_counter_unitLabel_holder--${unitLabelPosition}`}>
                    {unitLabel}
                </div>
            )}

            {formatted.map((char, idx) => (
                /\d/.test(char) ? (
                    <div
                        key={idx}
                        className='strp_counter_num'
                        ref={(el: HTMLDivElement | null) => {
                            ref.current[idx] = el;
                        }}
                    >
                        <div className='strp_counter_num_in'/>
                    </div>
                ) : (
                    <span
                        className='strp_counter_num strp_counter_num--delimeter'
                        key={idx}
                    >{char}</span>
                )
            ))}
        </div>
    );
};

export default STRPCounter;
