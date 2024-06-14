import {useRecoilValue} from "recoil";
import {targetExercisesState} from "../../../recoil/ExerciseInfoAtoms";
import {Box, Stack} from "@mui/material";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import React from "react";
import './SimilarExercises.css';

const TargetExercises = ({target}) => {
        const targetExercises = useRecoilValue(targetExercisesState);
        if (!targetExercises) return null;

        return (
            <Box mb="40px">
                <h3 className="similar-exercises-heading">
                    Other Exercises for <span>{target}</span>:
                </h3>
                <Stack className="flex-grid similar-exercises-flex-grid">
                    {targetExercises.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise}/>
                    ))}
                </Stack>
            </Box>
        );
    }
;

export default TargetExercises;