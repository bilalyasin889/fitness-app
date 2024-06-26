import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {CircularProgress} from '@mui/material';
import {FormError} from "../Login/FormError";
import './FormWrapper.css';

const FormWrapper = ({children, title, btnText, navigateUrl, onSubmit, footer, dataFetchFailure}) => {
    const methods = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setLoading(true);
        setError(null);
        methods.reset({
            password: '',
            confirmPassword: ''
        });

        try {
            const response = await onSubmit(data);
            if (response.success) {
                navigate(navigateUrl);
            } else {
                setError(response.error);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page-wrapper">
            <div className="form">
                <h4 className="title">{title}</h4>
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
