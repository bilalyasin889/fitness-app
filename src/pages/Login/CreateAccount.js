import React, {useState} from 'react';
import './Login.css';
import {Input} from "../../components/Login/Input";
import {
    confirm_password_validation,
    email_validation,
    create_password_validation
} from "../../utils/validation/inputValidations";
import Button from "@mui/material/Button";
import {FormProvider, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {register} from "../../utils/http/Auth";
import {FormError} from "../../components/Login/FormError";
import {CircularProgress} from "@mui/material";

const CreateAccount = () => {
    const methods = useForm()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = methods.handleSubmit(async data => {
        setLoading(true);
        setError(null);
        console.log(data);
        methods.reset();

        const response = await register(data.email, data.password);
        if (response.success) {
            navigate('/login');
            setLoading(false);
        } else {
            setError(response.error);
            setLoading(false);
        }
    })

    return (
        <div className="login-page-wrapper">
            <div className="login-form">
                <h4>Create Account</h4>
                <FormProvider {...methods}>
                    <form
                        onSubmit={e => e.preventDefault()}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="login-input-wrapper">
                            <Input {...email_validation} />
                            <Input {...create_password_validation} />
                            <Input {...confirm_password_validation} />
                        </div>
                        {error && (
                            <div className="request-error">
                                <FormError message={error}/>
                            </div>
                        )}
                        <div className="login-btn-wrapper">
                            <Button
                                disabled={loading}
                                onClick={onSubmit}
                                className="login-btn"
                            >
                                {loading ? <CircularProgress size={24}/> : 'Create Account'}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default CreateAccount;