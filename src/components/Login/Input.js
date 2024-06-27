import React, {useEffect, useRef} from 'react';
import {useFormContext} from 'react-hook-form';
import {FormError} from "./FormError";

import './Input.css';

function findInputError(errors, name) {
    return Object.keys(errors)
        .filter(key => key === name)
        .reduce((cur, key) => {
            return Object.assign(cur, {error: errors[key]})
        }, {})
}

export const Input = ({
                          name,
                          type,
                          id,
                          placeholder,
                          value,
                          validation,
                          autocomplete,
                          size = 'large'
                      }) => {
    const {
        register,
        formState: { errors },
        setValue,
        watch,
        trigger
    } = useFormContext();

    const inputErrors = findInputError(errors, name);
    const isInvalid = Object.keys(inputErrors).length > 0;

    const defaultValueRef = useRef(value);

    useEffect(() => {
        if (value !== undefined && value !== null && value !== watch(name)) {
            setValue(name, value);
            trigger(name);
        }
    }, [name, value, setValue, trigger, watch]);

    const wrapperClassName = `input-wrapper ${size}`;

    return (
        <div className={wrapperClassName}>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                defaultValue={value === undefined || value === null ? defaultValueRef.current : undefined}
                autoComplete={autocomplete}
                {...register(name, validation)}
                className={`input-field ${isInvalid ? 'invalid' : ''}`}
            />
            {isInvalid && (
                <FormError message={inputErrors.error.message}/>
            )}
        </div>
    );
};
