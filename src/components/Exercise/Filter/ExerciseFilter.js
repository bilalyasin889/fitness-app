import React from 'react';

import BodyPartFilter from "./BodyPartFilter/BodyPartFilter";
import SearchExercise from "./SearchExercise/SearchExercise";

const ExerciseFilter = () => {
    return (
        <>
            <SearchExercise/>
            <BodyPartFilter/>
        </>
    );
};

export default ExerciseFilter;