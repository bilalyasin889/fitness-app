import {Box, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import {useExerciseApi} from "../../../utils/http/ExerciseApi";

import './SimilarExercises.css';

const EquipmentExercises = ({exerciseId, equipment}) => {
    const [equipmentExercises, setEquipmentExercises] = useState(null);

    const {getExercisesByEquipment} = useExerciseApi();

    useEffect(() => {
        const fetchData = async () => {
            const exercises = await getExercisesByEquipment(exerciseId, equipment);
            setEquipmentExercises(exercises || []);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exerciseId, equipment]);

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
                    <ExerciseCard key={exercise.id} exercise={exercise} role="listitem"/>
                ))}
            </Stack>
        </Box>
    );
};

export default EquipmentExercises;