import React, {useLayoutEffect, useState} from 'react';
import {Input} from "../../components/Login/Input";
import {height_validation, name_validation, weight_validation} from "../../utils/validation/inputValidations";
import {useAuthApi} from "../../utils/http/AuthApi";
import './ProfileForm.css';
import FormWrapper from "../../components/Form/FormWrapper";

const ProfileForm = () => {
    const {getUserInfo, updateUserInfo} = useAuthApi();
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        name: '',
        email: '',
        weight: '',
        height: ''
    });

    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserInfo();
                if (response) {
                    setUser({
                        name: response.name,
                        email: response.email,
                        weight: response.weight,
                        height: response.height
                    });
                }
            } catch (error) {
                console.error("Error retrieving profile data: " + error.message)
                setError("Error retrieving profile data, please refresh page. " +
                    "If error persists, please contact support.");
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async (data) => {
        return await updateUserInfo(user.email, data);
    };

    return (
        <FormWrapper
            title="Edit Profile"
            btnText="Update"
            navigateUrl="/dashboard"
            onSubmit={onSubmit}
            dataFetchFailure={error}>
            <div className="form-input-wrapper">
                <Input {...name_validation} value={user.name}/>
                <div className="form-input-wrapper row">
                    <Input {...weight_validation} value={user.weight}/>
                    <Input {...height_validation} value={user.height}/>
                </div>
            </div>
        </FormWrapper>
    );
};

export default ProfileForm;
