import {Box, Stack} from "@mui/material";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import React, {useEffect, useState} from "react";
import {useExerciseApi} from "../../../utils/http/ExerciseApi";

import './SimilarExercises.css';

const TargetExercises = ({exerciseId, target}) => {
    const [targetExercises, setTargetExercises] = useState(null);

    const {getExercisesByTargetMuscle} = useExerciseApi();

    useEffect(() => {
        const fetchData = async () => {
            const exercises = await getExercisesByTargetMuscle(exerciseId, target);
            setTargetExercises(exercises || []);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exerciseId, target])

    if (!targetExercises) {
        return null;
    }

    return (
        <>
            <h2 id="similar-target-exercises-heading" className="heading-level-2 similar-exercises-heading">
                Other Exercises for <span>{target}</span>:
            </h2>
            {targetExercises.length === 0 ?
                (
                    <h3 className="result-not-found similar-exercises-not-found">No exercises found
                        for <span>{target}</span></h3>
                )
                :
                (
                    <Box component="section" aria-labelledby="similar-target-exercises-heading" mb="40px">
                        <Stack className="flex-grid similar-exercises-flex-grid" role="list">
                            {targetExercises.map((exercise) => (
                                <ExerciseCard key={exercise.id} exercise={exercise} role="listitem"/>
                            ))}
                        </Stack>
                    </Box>
                )
            }
        </>
    );
};

export default TargetExercises;