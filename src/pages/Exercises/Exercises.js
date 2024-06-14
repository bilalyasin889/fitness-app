import React from 'react';
import {Box} from '@mui/material';

import {LoadingSpinner} from "../../components/LoadingSpinner";
import ExerciseFilter from "../../components/Exercise/Filter/ExerciseFilter";
import ExerciseList from "../../components/Exercise/ExerciseList/ExerciseList";

import './Exercises.css';

const Exercises = () => (
    <Box className="page-wrapper" role="main" aria-labelledby="exercises-heading">
        <Box className="page-tile">
            <h1 id="exercises-heading">Exercises</h1>
        </Box>
        <React.Suspense fallback={<LoadingSpinner role="status" aria-label="Loading Exercise Filter"/>}>
            <ExerciseFilter/>
        </React.Suspense>

        <Box id="exercises" mt="40px" aria-live="polite">
            <h2 className="result-title">Showing Results</h2>
            <React.Suspense fallback={<LoadingSpinner role="status" aria-label="Loading Exercise List"/>}>
                <ExerciseList/>
            </React.Suspense>
        </Box>
    </Box>
);

export default Exercises;