import {MdError} from "react-icons/md";
import React from "react";

import './FormError.css';

export const FormError = ({message}) => {
    return (
        <div className="error-message">
            <MdError className="error-icon"/>
            <span className="error-text">{message}</span>
        </div>
    );
};