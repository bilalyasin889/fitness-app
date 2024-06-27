import React from 'react';
import {Box} from "@mui/material";
import UserCard from "../../components/Dashboard/UserCard";
import {LoadingSpinner} from "../../components/LoadingSpinner";
import UserFavourites from "../../components/Dashboard/UserFavourites";

const Dashboard = () => {
    return (
        <Box className="page-wrapper" role="main" aria-labelledby="page-heading">
            <Box className="page-tile">
                <h1 id="page-heading">Dashboard</h1>
            </Box>


            <React.Suspense fallback={<LoadingSpinner role="status" aria-label="Loading User Info"/>}>
                <UserCard/>
            </React.Suspense>

            <React.Suspense fallback={<LoadingSpinner role="status" aria-label="Loading Exercise List"/>}>
                <UserFavourites/>
            </React.Suspense>
        </Box>
    );
};

export default Dashboard;