import {useRecoilValue} from "recoil";
import {Box, Stack} from "@mui/material";
import React from "react";

import {equipmentExercisesState} from "../../../recoil/ExerciseInfoAtoms";
import ExerciseCard from "../ExerciseCard/ExerciseCard";

import './SimilarExercises.css';

const EquipmentExercises = ({equipment}) => {
    const equipmentExercises = useRecoilValue(equipmentExercisesState);

    if (!equipmentExercises) {
        return null;
    } else if (equipmentExercises.length === 0) {
        return (
            <Box mb="40px">
                <h3 className="no-exercise-found">No exercises found for {equipment}</h3>
            </Box>
        );
    }

    return (
        <Box component="section" aria-labelledby="similar-equipment-exercises-heading" mb="20px">
            <h3 id="similar-equipment-exercises-heading" className="similar-exercises-heading">
                Other <span>{equipment}</span> Exercises:
            </h3>
            <Stack className="flex-grid similar-exercises-flex-grid" role="list">
                {equipmentExercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} role="listitem" />
                ))}
            </Stack>
        </Box>
    );
};

export default EquipmentExercises;