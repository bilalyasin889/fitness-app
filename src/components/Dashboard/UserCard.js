import {Avatar, Box, Divider, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAuthApi} from "../../utils/http/AuthApi";
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";

import './UserCard.css'

export default function UserCard() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const {getUserInfo} = useAuthApi();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserInfo();
            if (response.success) {
                setUserInfo(response.data);
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditClick = () => {
        navigate('/edit-profile');
    }

    const calculateBMI = (weight, height) => {
        const heightInMeters = height / 100;
        return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    };

    const getBMIStatus = (bmi) => {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal weight";
        if (bmi < 30) return "Overweight";
        return "Obese";
    };

    const renderBMIInfo = () => {
        if (!userInfo) return null;
        const bmi = calculateBMI(userInfo.weight, userInfo.height);
        const bmiStatus = getBMIStatus(bmi);
        const bmiClass = bmi < 18.5 ? 'bad-bmi' : 'good-bmi';

        return (
            <div className="bmi-info">
                <h3 className="bmi">
                    <span className="label">BMI:</span>
                    <span className={`${bmiClass}`}>{bmi} - {bmiStatus}</span>
                </h3>
            </div>
        );
    };

    if (userInfo === null) {
        return null;
    }

    return (
        <Box className="info-card">
            <Avatar className="profile-avatar">
                <PersonIcon />
            </Avatar>
            <Divider orientation="vertical" variant="middle" flexItem aria-hidden="true"/>
            <Stack className="user-info-section">
                <h1 className="user-name">{userInfo.name}</h1>
                <Box className="user-attributes">
                    <h2><span className="label">Email:</span> {userInfo.email}</h2>
                    <div className="row">
                        <h2><span className="label">Weight:</span> {userInfo.weight} kg</h2>
                        <h3><span className="label">Height:</span> {userInfo.height} cm</h3>
                        {renderBMIInfo()}
                    </div>
                </Box>
            </Stack>
            <button className="edit-btn" onClick={handleEditClick}>
                <EditIcon style={{ marginRight: 5 }} />
                <span className="edit-btn-text">Edit</span>
            </button>
        </Box>
    );
};