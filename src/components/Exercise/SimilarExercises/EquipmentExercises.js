import {useRecoilValue} from "recoil";
import {equipmentExercisesState} from "../../../recoil/ExerciseInfoAtoms";
import {Box, Stack} from "@mui/material";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import React from "react";
import './SimilarExercises.css';

const EquipmentExercises = ({equipment}) => {
    const equipmentExercises = useRecoilValue(equipmentExercisesState);
    if (!equipmentExercises) return null;

    return (
        <Box mb="20px">
            <h3 className="similar-exercises-heading">
                Other <span>{equipment}</span> Exercises:
            </h3>
            <Stack className="flex-grid similar-exercises-flex-grid">
                {equipmentExercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise}/>
                ))}
            </Stack>
        </Box>
    );
};

export default EquipmentExercises;