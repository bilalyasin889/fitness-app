import React from 'react';
import {Box} from '@mui/material';

import {LoadingSpinner} from "../../components/LoadingSpinner";
import ExerciseFilter from "../../components/Exercise/Filter/ExerciseFilter";
import ExerciseList from "../../components/Exercise/ExerciseList/ExerciseList";

const Exercises = () => (
    <Box className="page-wrapper" role="main" aria-labelledby="exercises-heading">
        <Box className="page-tile">
            <h1 id="exercises-heading">Exercises</h1>
        </Box>
        <React.Suspense fallback={<LoadingSpinner role="status" aria-label="Loading Exercise Filter"/>}>
            <ExerciseFilter/>
        </React.Suspense>

        <React.Suspense fallback={<LoadingSpinner role="status" aria-label="Loading Exercise List"/>}>
            <ExerciseList/>
        </React.Suspense>
    </Box>
);

export default Exercises;