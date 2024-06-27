import {Box, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TargetExercises from "../../components/Exercise/SimilarExercises/TargetExercises";
import EquipmentExercises from "../../components/Exercise/SimilarExercises/EquipmentExercises";
import {LoadingSpinner} from "../../components/LoadingSpinner";
import InfoPill from "../../components/Exercise/InfoPill/InfoPill";
import {useExerciseApi} from "../../utils/http/ExerciseApi";
import FavouriteButton from "../../components/Exercise/FavouriteButton/FavouriteButton";
import {useAuth} from "../../utils/authentication/AuthProvider";

import './ExerciseInfo.css';

const ExerciseInfo = () => {
    const {id} = useParams();
    const {isAuthenticated} = useAuth();
    const [exercise, setExercise] = useState(null);

    const {getExerciseById} = useExerciseApi();

    useEffect(() => {
        const fetchData = async () => {
            const exercises = await getExerciseById(id);
            setExercise(exercises);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!exercise) return null;

    return (
        <Box className="page-wrapper" role="main">
            <Box className="page-tile exercise-title">
                <h1 className="exercise-info-name">{exercise.name}</h1>
                {isAuthenticated && (
                    <FavouriteButton id={id} initialSelection={exercise.isFavorite}/>
                )}
                <Box aria-label="Exercise Information" role="region">
                    <InfoPill tooltipTitle="Body Part" buttonText={exercise.bodyPart}/>
                    <InfoPill tooltipTitle="Target Muscle" buttonText={exercise.targetMuscle}/>
                    <InfoPill tooltipTitle="Equipment" buttonText={exercise.equipment}/>
                    {exercise.secondaryMuscles.map((muscle, index) => (
                        <InfoPill key={`${index}-${muscle}`} tooltipTitle="Secondary Muscle" buttonText={muscle}/>
                    ))}
                </Box>
            </Box>

            <Stack mb="50px">
                {/*<Stack className="exercise-img-wrapper">*/}
                {/*    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" className="detail-image"/>*/}
                {/*</Stack>*/}
                <h2 className="instructions-heading">Instructions:</h2>
                <Box className="instructions-list">
                    {exercise.instructions.map((instruction, index) => (
                        <div key={index}>{instruction}</div>
                    ))}
                </Box>
            </Stack>

            <React.Suspense fallback={<LoadingSpinner role="status" aria-label="Loading Similar Target Exercises"/>}>
                <TargetExercises exerciseId={id} target={exercise.targetMuscle}/>
            </React.Suspense>

            <React.Suspense fallback={<LoadingSpinner role="status" aria-label="Loading Similar Equipment Exercises"/>}>
                <EquipmentExercises exerciseId={id} equipment={exercise.equipment}/>
            </React.Suspense>
        </Box>
    );
};

export default ExerciseInfo;