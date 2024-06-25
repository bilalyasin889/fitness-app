import {Box, Stack} from "@mui/material";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import React, {useEffect, useState} from "react";
import './SimilarExercises.css';
import {exerciseApi, getExercisesByTargetMuscle} from "../../../utils/http/exerciseData";
import {useAuth} from "../../../utils/authentication/AuthProvider";

const TargetExercises = ({target}) => {
    const [targetExercises, setTargetExercises] = useState([]);

    const {accessToken, storeToken, removeToken} = useAuth();
    const api = exerciseApi(accessToken, storeToken, removeToken);

    useEffect(() => {
        const fetchData = async () => {
            const exercises = await getExercisesByTargetMuscle(api, target);
            setTargetExercises(exercises || []);
        };

        fetchData();
    }, [target])

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