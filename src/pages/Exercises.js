import React from 'react';
import {Box, Typography} from '@mui/material';
import ExerciseFiltering from "../components/exercises/filtering/ExerciseFiltering";
import ExerciseList from "../components/exercises/ExerciseList";

const Exercises = () => (
    <Box mb="72px">
        <Box sx={{mt: '30px'}} position="relative" p="20px" mb="20px">
            <Typography color="#FF2625" fontWeight={700}
                        sx={{fontSize: {lg: '50px', xs: '30px'}}}>
                Exercises
            </Typography>
        </Box>
        <ExerciseFiltering/>
        <ExerciseList/>
    </Box>
);

export default Exercises;