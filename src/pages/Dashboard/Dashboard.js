import React from 'react';
import './Dashboard.css';
import {Box} from "@mui/material";
import UserCard from "../../components/Dashboard/UserCard";

const Dashboard = () => {
    return (
        <Box className="page-wrapper" role="main" aria-labelledby="page-heading">
            <Box className="page-tile">
                <h1 id="page-heading">Dashboard</h1>
            </Box>
            <UserCard/>

        </Box>
    );
};

export default Dashboard;