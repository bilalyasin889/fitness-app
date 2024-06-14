import React from 'react';
import {Box, Typography} from '@mui/material';
import ExerciseFiltering from "../components/exercises/filtering/ExerciseFiltering";
import ExerciseList from "../components/exercises/ExerciseList";
import {LoadingSpinner} from "../components/LoadingSpinner";

const Exercises = () => (
    <Box mb="72px">
        <Box sx={{mt: '30px'}} position="relative" p="20px" mb="20px">
            <Typography color="#FF2625" fontWeight={700}
                        sx={{fontSize: {lg: '50px', xs: '30px'}}}>
                Exercises
            </Typography>
        </Box>
        <React.Suspense fallback={<LoadingSpinner/>}>
            <ExerciseFiltering/>
        </React.Suspense>

        <Box id="exercises" mt="40px" p="20px">
            <Typography variant="h4" fontWeight="bold" sx={{fontSize: {lg: '45px', xs: '25px'}}} mb="46px">
                Showing Results
            </Typography>
            <React.Suspense fallback={<LoadingSpinner/>}>
                <ExerciseList/>
            </React.Suspense>
        </Box>
    </Box>
);

export default Exercises;