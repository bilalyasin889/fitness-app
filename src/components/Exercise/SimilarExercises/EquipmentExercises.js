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
    }

    return (
        <>
            <h2 id="similar-target-exercises-heading" className="heading-level-2 similar-exercises-heading">
                Other <span>{equipment}</span> Exercises:
            </h2>
            {equipmentExercises.length === 0 ?
                (
                    <h3 className="result-not-found similar-exercises-not-found">No exercises found
                    for <span>{equipment}</span></h3>
                )
                :
                (
                    <Box component="section" aria-labelledby="similar-equipment-exercises-heading" mb="20px">
                        <Stack className="flex-grid similar-exercises-flex-grid" role="list">
                            {equipmentExercises.map((exercise) => (
                                <ExerciseCard key={exercise.id} exercise={exercise} role="listitem"/>
                            ))}
                        </Stack>
                    </Box>
                )
            }
        </>
    );
};

export default EquipmentExercises;