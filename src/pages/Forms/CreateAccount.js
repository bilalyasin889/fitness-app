import React from 'react';
import {Input} from "../../components/Login/Input";
import {
    confirm_password_validation,
    create_password_validation,
    email_validation,
    height_validation,
    name_validation,
    weight_validation
} from "../../utils/validation/inputValidations";
import {useAuthApi} from "../../utils/http/AuthApi";
import './accountStyles.css';
import FormWrapper from "../../components/Form/FormWrapper";

const CreateAccount = () => {
    const {register} = useAuthApi();

    const onSubmit = async (data) => {
        return await register(data);
    };

    return (
        <FormWrapper
            title="Create Account"
            btnText="Create"
            navigateUrl="/login"
            onSubmit={onSubmit}>
            <div className="form-input-wrapper">
                <Input {...name_validation} />
                <Input {...email_validation} />
                <Input {...create_password_validation} />
                <Input {...confirm_password_validation} />
                <div className="form-input-wrapper row">
                    <Input {...weight_validation} />
                    <Input {...height_validation} />
                </div>
            </div>
        </FormWrapper>
    );
};

export default CreateAccount;