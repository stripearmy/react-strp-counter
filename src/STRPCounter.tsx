import React, {useEffect, useRef} from 'react';
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
    easing?: string | false,
}

const formatNumber = (
    value: number | string,
    minLength: number | undefined,
    delimiter: string | false,
    decimalSeparator: string | false
): string[] => {
    if (decimalSeparator === '') {
        decimalSeparator = false;
    }
    const valStr = typeof value === 'number' ? value.toString() : value;
    const [integerRaw, decimalRaw] = valStr.split('.');

    const integer = minLength
        ? integerRaw.padStart(minLength, '0')
        : integerRaw;

    const intChars: string[] = [];
    for (let i = 0; i < integer.length; i++) {
        const digit = integer[integer.length - 1 - i];
        intChars.unshift(digit);

        if (
            delimiter &&
            i % 3 === 2 &&
            i !== integer.length - 1
        ) {
            intChars.unshift(delimiter);
        }
    }

    const result = intChars;

    if (decimalSeparator !== false) {
        result.push(decimalSeparator || '.');
        result.push(decimalRaw?.[0] || '0');
        result.push(decimalRaw?.[1] || '0');
    }

    return result;
};

const STRPCounter: React.FC<STRPCounterProps> = ({
                                                     value,
                                                     fontSize = '28px',
                                                     minLength,
                                                     rollingMode = false,
                                                     delimiter = false,
                                                     decimalSeparator = false,
                                                     unitLabel,
                                                     unitLabelPosition = 'left',
                                                     stepDuration = 0.05,
                                                     easing = 'cubic-bezier(0.33,0.81,0.1,1.02)',
                                                 }) => {

    const formatted = formatNumber(value, minLength, delimiter, decimalSeparator);
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const timeoutRefs = useRef<(ReturnType<typeof setTimeout> | null)[]>([]);
    const prevFormattedRef = useRef<string[]>([]);
    const hasMounted = useRef(false);

    useEffect(() => {
        return () => {
            timeoutRefs.current.forEach((t) => t && clearTimeout(t));
        };
    }, []);

    useEffect(() => {
        timeoutRefs.current.forEach((t) => t && clearTimeout(t));
        timeoutRefs.current = [];

        let firstChangedDigitIdx = -1;
        if (hasMounted.current) {
            for (let i = 0; i < formatted.length; i++) {
                if (
                    /\d/.test(formatted[i]) &&
                    formatted[i] !== prevFormattedRef.current?.[i]
                ) {
                    firstChangedDigitIdx = i;
                    break;
                }
            }
        }

        formatted.forEach((char, idx) => {
            const el = refs.current[idx];
            if (!el) return;

            if (/\d/.test(char)) {
                const digit = Number(char);
                const prevChar = prevFormattedRef.current[idx];
                const prevDigit = /\d/.test(prevChar) ? Number(prevChar) : null;
                const changed = prevDigit !== digit;

                const shouldAnimate =
                    rollingMode && changed && hasMounted.current;

                if (shouldAnimate) {
                    const partOfRipple = idx > firstChangedDigitIdx;

                    el.style.setProperty(
                        '--strp_transition',
                        `transform ${stepDuration * 10}s var(--strp_easing)`
                    );
                    el.style.setProperty(
                        '--strp_index',
                        partOfRipple ? (digit + 10).toString() : digit.toString()
                    );

                    void el.offsetHeight;

                    const timeout = setTimeout(() => {
                        el.style.setProperty('--strp_transition', 'none');
                        el.style.setProperty('--strp_index', digit.toString());
                        el.style.removeProperty('--strp_transition');
                    }, stepDuration * 10000);

                    timeoutRefs.current[idx] = timeout;
                } else {
                    el.style.setProperty('--strp_index', digit.toString());
                }

                el.style.setProperty('--strp_count', idx.toString());
            } else {
                el.style.removeProperty('--strp_index');
                el.style.removeProperty('--strp_count');
                el.style.removeProperty('--strp_transition');
            }
        });

        hasMounted.current = true;
        prevFormattedRef.current = formatted;
    }, [formatted, rollingMode, stepDuration]);

    return (
        <div
            className={`strp_counter_wrap${rollingMode ? ' strp_counter_wrap--rolling' : ''}`}
            style={{['--strp_fontsize' as any]: fontSize, ['--strp_easing' as any]: easing}}
        >
            {unitLabel && (
                <div
                    className={`strp_counter_unitLabel_holder strp_counter_unitLabel_holder--${unitLabelPosition}`}
                >
                    {unitLabel}
                </div>
            )}

            {formatted.map((char, idx) =>
                /\d/.test(char) ? (
                    <div
                        key={idx}
                        className='strp_counter_num'
                        ref={(el: HTMLDivElement | null) => {
                            refs.current[idx] = el;
                        }}
                    >
                        <div className='strp_counter_num_in'/>
                    </div>
                ) : (
                    <div
                        key={idx}
                        className='strp_counter_num strp_counter_num--delimeter'
                        aria-hidden='true'
                    >
                        {char}
                    </div>
                )
            )}
        </div>
    );
};

export default STRPCounter;
