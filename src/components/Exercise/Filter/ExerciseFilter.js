import React from 'react';
import {Stack} from '@mui/material';
import BodyPartFilter from "./BodyPartFilter/BodyPartFilter";
import SearchExercise from "./SearchExercise/SearchExercise";

const ExerciseFilter = () => {
    return (
        <Stack alignItems="center" justifyContent="center">
            <SearchExercise/>
            <BodyPartFilter/>
        </Stack>
    );
};

export default ExerciseFilter;