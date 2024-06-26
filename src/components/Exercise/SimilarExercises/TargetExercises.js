import {useRecoilValue} from "recoil";
import {targetExercisesState} from "../../../recoil/ExerciseInfoAtoms";
import {Box, Stack} from "@mui/material";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import React from "react";
import './SimilarExercises.css';

const TargetExercises = ({target}) => {
    const targetExercises = useRecoilValue(targetExercisesState);

    if (!targetExercises) {
        return null;
    } else if (targetExercises.length === 0) {
        return (
            <Box mb="40px">
                <h3 className="no-exercise-found">No exercises found for {target}</h3>
            </Box>
        );
    }

    return (
        <Box component="section" aria-labelledby="similar-target-exercises-heading" mb="40px">
            <h2 id="similar-target-exercises-heading" className="similar-exercises-heading">
                Other Exercises for <span>{target}</span>:
            </h2>
            <Stack className="flex-grid similar-exercises-flex-grid" role="list">
                {targetExercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} role="listitem" />
                ))}
            </Stack>
        </Box>
    );
};

export default TargetExercises;