import React, {useState} from 'react';
import './Login.css';
import {Input} from "../../components/Login/Input";
import {email_validation, password_validation} from "../../utils/validation/inputValidations";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {useAuth} from '../../utils/authentication/AuthProvider';
import {login} from "../../utils/http/Auth";
import {FormError} from "../../components/Login/FormError";
import {CircularProgress} from "@mui/material";

const Login = () => {
    const methods = useForm()
    const {storeTokens} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = methods.handleSubmit(async data => {
        setLoading(true);
        setError(null);
        console.log(data);
        methods.reset();

        const response = await login(data.email, data.password);
        if (response.success) {
            storeTokens(response.accessToken, response.refreshToken);
            navigate('/dashboard');
            setLoading(false);
        } else {
            setError(response.error);
            setLoading(false);
        }
    })

    return (
        <div className="login-page-wrapper">
            <div className="login-form">
                <h4>Login</h4>
                <FormProvider {...methods}>
                    <form
                        onSubmit={e => e.preventDefault()}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="login-input-wrapper">
                            <Input {...email_validation} />
                            <Input {...password_validation} />
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
                                {loading ? <CircularProgress size={24}/> : 'Login'}
                            </Button>
                        </div>
                        <div className="create-account-link">
                            <p>Don't have an account? <Link to="/create-account">Create Account</Link></p>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default Login;