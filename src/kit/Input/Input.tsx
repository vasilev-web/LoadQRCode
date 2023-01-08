import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';
import { Form } from 'react-bootstrap';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

import styles from './Input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    sizeInput?: 'xs' | 'sm' | 'md' | 'lg';
    label?: string;
    message?: string;
    button?: React.ReactNode;
    error?: string | boolean | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    success?: string | boolean;
    beforeElement?: React.ReactNode;
    afterElement?: React.ReactNode;
    muted?: string;
    name?: string;
    defaultValue?: string | number | string[];
}

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    const {
        label,
        defaultValue = '',
        message,
        button,
        error = '',
        success = '',
        beforeElement,
        afterElement,
        className,
        muted,
        ...other
    } = props;

    const errorMessage = typeof error === 'string' ? error : '';
    const successMessage = typeof success === 'string' ? success : '';

    const [value, setInputValue] = useState(defaultValue);

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className={clsx(styles['input-outer'], className)}>
            <div
                className={clsx(
                    styles['form-floating'],
                    styles[value && value != '' ? 'not-empty' : 'empty'],
                    [error && styles['error']],
                    [success && styles['success']]
                )}
                {...other}
            >
                {beforeElement && (
                    <span className={clsx(styles['input-before'])}>{beforeElement}</span>
                )}

                <Form.Group>
                    {label ? (
                        <Form.Label
                            htmlFor={other?.id ? other.id : null}
                            className={clsx(styles['form-label'])}
                        >
                            {label}
                        </Form.Label>
                    ) : (
                        ''
                    )}
                    <input
                        aria-invalid={error ? 'true' : 'false'}
                        className={clsx(
                            styles['input-field'],
                            styles['form-control'],
                            error && 'is-invalid',
                            success && 'is-valid'
                        )}
                        ref={ref}
                        defaultValue={value}
                        onChange={handleInput}
                        {...other}
                    />
                    {(error || success) && (
                        <Form.Text
                            className={clsx(
                                styles['text-muted'],
                                error && 'invalid-feedback',
                                success && 'valid-feedback'
                            )}
                        >
                            {error ? errorMessage : success ? successMessage : message}
                        </Form.Text>
                    )}
                </Form.Group>

                {afterElement && (
                    <span className={clsx(styles['input-after'])}>{afterElement}</span>
                )}
            </div>
        </div>
    );
});

export default Input;
