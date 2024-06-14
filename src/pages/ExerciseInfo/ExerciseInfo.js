import {Box, Stack} from "@mui/material";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useRecoilValue, useSetRecoilState} from "recoil";

import {exerciseIdState, exerciseState} from "../../recoil/ExerciseInfoAtoms";
import TargetExercises from "../../components/Exercise/SimilarExercises/TargetExercises";
import EquipmentExercises from "../../components/Exercise/SimilarExercises/EquipmentExercises";
import {LoadingSpinner} from "../../components/LoadingSpinner";
import InfoPill from "../../components/Exercise/InfoPill/InfoPill";

import './ExerciseInfo.css';

const ExerciseInfo = () => {
    const {id} = useParams();
    const setExerciseId = useSetRecoilState(exerciseIdState);

    useEffect(() => {
        setExerciseId(id);
    }, [id, setExerciseId]);

    const exercise = useRecoilValue(exerciseState);
    if (!exercise) return null;

    return (
        <Box className="page-wrapper" role="main">
            <Box className="page-tile">
                <h1>{exercise.name}</h1>
                <Box aria-label="Exercise Information" role="region">
                    <InfoPill tooltipTitle="Body Part" buttonText={exercise.bodyPart} />
                    <InfoPill tooltipTitle="Target Muscle" buttonText={exercise.target} />
                    <InfoPill tooltipTitle="Equipment" buttonText={exercise.equipment} />
                </Box>
            </Box>

            <Stack mb="50px">
                <Stack className="exercise-img-wrapper">
                    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" className="detail-image"/>
                </Stack>
                <h2 className="instructions-heading">Instructions:</h2>
                <p>{exercise.instructions}</p>
            </Stack>

            <React.Suspense fallback={<LoadingSpinner role="status" aria-label="Loading Similar Target Exercises"/>}>
                <TargetExercises target={exercise.target}/>
            </React.Suspense>

            <React.Suspense fallback={<LoadingSpinner role="status" aria-label="Loading Similar Equipment Exercises"/>}>
                <EquipmentExercises equipment={exercise.equipment}/>
            </React.Suspense>
        </Box>
    );
};

export default ExerciseInfo;