import React from 'react';
import {useFormContext} from 'react-hook-form';

import './Input.css';
import {FormError} from "./FormError";

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
                          validation,
                          autocomplete
                      }) => {
    const {
        register,
        formState: {errors},
    } = useFormContext();

    const inputErrors = findInputError(errors, name);
    const isInvalid = Object.keys(inputErrors).length > 0;

    return (
        <div className="input-wrapper">
            <input
                id={id}
                type={type}
                placeholder={placeholder}
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
