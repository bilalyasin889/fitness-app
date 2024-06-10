import React from 'react';
import {Stack} from '@mui/material';
import BodyPartSelection from "./BodyPartSelection";
import ExerciseSearch from "./ExerciseSearch";

const ExerciseFiltering = () => {
    return (
        <Stack alignItems="center" justifyContent="center">
            <ExerciseSearch/>
            <BodyPartSelection/>
        </Stack>
    );
};

export default ExerciseFiltering;