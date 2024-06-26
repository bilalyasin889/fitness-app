import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import {Box} from "@mui/material";
import {useAuthApi} from "../../utils/http/AuthApi";

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState({});

    const {getUserInfo} = useAuthApi();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserInfo();
            if (response) {
                setUserInfo(response);
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (userInfo === null) {
        return null;
    }

    return (
        <Box className="page-wrapper" role="main" aria-labelledby="page-heading">
            <Box className="page-tile">
                <h1 id="page-heading">Dashboard</h1>
            </Box>
            <Box p="25px">
                <h2>{userInfo.email}</h2>
                <h2>{userInfo.name}</h2>
                <h2>{userInfo.weight}</h2>
                <h2>{userInfo.height}</h2>
            </Box>

        </Box>
    );
};

export default Dashboard;