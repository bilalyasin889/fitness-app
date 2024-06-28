import React from 'react';
import {Input} from "../../components/Login/Input";
import {email_validation, password_validation} from "../../utils/validation/inputValidations";
import {Link} from "react-router-dom";
import {useAuthApi} from "../../utils/http/AuthApi";
import './accountStyles.css';
import FormWrapper from "../../components/Form/FormWrapper";

const Login = () => {
    const {login} = useAuthApi();

    const onSubmit = async (data) => {
        return await login(data.email, data.password);
    };

    const footer = (
        <div className="create-account-link">
            <p>Don't have an account? <Link to="/create-account">Create Account</Link></p>
        </div>
    );

    return (
        <FormWrapper
            title="Login"
            btnText="Login"
            navigateUrl="/dashboard"
            onSubmit={onSubmit}
            successMessage="Logged in successfully! Redirecting you to your dashboard..."
            footer={footer}>
            <div className="form-input-wrapper">
                <Input {...email_validation} />
                <Input {...password_validation} />
            </div>
        </FormWrapper>
    );
};

export default Login;