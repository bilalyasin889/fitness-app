import React from 'react';
import {Box} from '@mui/material';
import {LoadingSpinner} from "../../components/LoadingSpinner";
import './Exercises.css';
import ExerciseFilter from "../../components/Exercise/Filter/ExerciseFilter";
import ExerciseList from "../../components/Exercise/ExerciseList/ExerciseList";

const Exercises = () => (
    <Box mb="72px">
        <Box sx={{mt: '30px'}} position="relative" p="20px" mb="20px">
            <h1 className="page-tile">
                Exercises
            </h1>
        </Box>
        <React.Suspense fallback={<LoadingSpinner/>}>
            <ExerciseFilter/>
        </React.Suspense>

        <Box id="exercises" mt="40px" p="20px">
            <h2 className="result-title">
                Showing Results
            </h2>
            <React.Suspense fallback={<LoadingSpinner/>}>
                <ExerciseList/>
            </React.Suspense>
        </Box>
    </Box>
);

export default Exercises;