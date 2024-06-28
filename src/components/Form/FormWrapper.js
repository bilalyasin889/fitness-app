import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {CircularProgress} from '@mui/material';
import {FormError} from "../Login/FormError";

import './FormWrapper.css';

const FormWrapper = ({
                         children,
                         title,
                         btnText,
                         navigateUrl,
                         onSubmit,
                         footer,
                         successMessage,
                         dataFetchFailure
                     }) => {
    const methods = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setLoading(true);
        setError(null);
        setShowSuccessMessage(false);

        try {
            const response = await onSubmit(data);
            if (response.success) {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    navigate(navigateUrl);
                }, 2000);
            } else {
                setError(response.error);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            if (!showSuccessMessage) {
                methods.reset({
                    'password': '',
                    'confirm-password': ''
                });
            }
            setLoading(false);
        }
    };

    return (
        <div className="form-page-wrapper">
            <div className="form" role="main">
                <h1 className="title">{title}</h1>
                {dataFetchFailure ?
                    (
                        <div className="form-error">
                            <FormError message={dataFetchFailure}/>
                        </div>
                    )
                    : (
                        <FormProvider {...methods}>
                            <form
                                onSubmit={methods.handleSubmit(handleSubmit)}
                                noValidate
                                autoComplete="off"
                            >
                                {children}

                                {error && (
                                    <div className="form-error">
                                        <FormError message={error}/>
                                    </div>
                                )}

                                {showSuccessMessage && successMessage && (
                                    <div className="form-success">
                                        <p>{successMessage}</p>
                                    </div>
                                )}

                                <div className="form-btn-wrapper">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="submit-btn"
                                    >
                                        {loading ? (
                                            <CircularProgress size={24}/>
                                        ) : (
                                            btnText
                                        )}
                                    </button>
                                </div>
                                {footer && (
                                    <div className="account-footer">
                                        {footer}
                                    </div>
                                )}
                            </form>
                        </FormProvider>
                    )
                }
            </div>
        </div>
    );
};

export default FormWrapper;
