import React, {useState} from 'react';
import './Login.css';
import {Input} from "../../components/Login/Input";
import {
    confirm_password_validation,
    create_password_validation,
    email_validation,
    height_validation,
    name_validation,
    weight_validation
} from "../../utils/validation/inputValidations";
import Button from "@mui/material/Button";
import {FormProvider, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAuthApi} from "../../utils/http/AuthApi";
import {FormError} from "../../components/Login/FormError";
import {CircularProgress} from "@mui/material";

const CreateAccount = () => {
    const methods = useForm()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {register} = useAuthApi();
    const navigate = useNavigate();

    const onSubmit = methods.handleSubmit(async data => {
        setLoading(true);
        setError(null);
        methods.reset();

        const response = await register(data);
        if (response.success) {
            navigate('/login');
            setLoading(false);
        } else {
            setError(response.error);
            setLoading(false);
        }
    })

    return (
        <div className="account-page-wrapper">
            <div className="account-form">
                <h4>Create Account</h4>
                <FormProvider {...methods}>
                    <form
                        onSubmit={e => e.preventDefault()}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="account-input-wrapper">
                            <Input {...name_validation} />
                            <Input {...email_validation} />
                            <Input {...create_password_validation} />
                            <Input {...confirm_password_validation} />
                            <div className="account-input-wrapper row">
                                <Input {...weight_validation} />
                                <Input {...height_validation} />
                            </div>
                        </div>
                        {error && (
                            <div className="request-error">
                                <FormError message={error}/>
                            </div>
                        )}
                        <div className="account-btn-wrapper">
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