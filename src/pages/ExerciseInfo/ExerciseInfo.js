import './ExerciseInfo.css';
import {Box, Stack} from "@mui/material";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {exerciseIdState, exerciseState} from "../../recoil/ExerciseInfoAtoms";
import TargetExercises from "../../components/Exercise/SimilarExercises/TargetExercises";
import EquipmentExercises from "../../components/Exercise/SimilarExercises/EquipmentExercises";
import {LoadingSpinner} from "../../components/LoadingSpinner";


const ExerciseInfo = () => {
    const {id} = useParams();
    const setExerciseId = useSetRecoilState(exerciseIdState);

    useEffect(() => {
        setExerciseId(id);
    }, [id, setExerciseId]);

    const exercise = useRecoilValue(exerciseState);
    if (!exercise) return null;

    return (
        <Box mb="72px" p="20px">
            <Box sx={{mt: '30px'}} position="relative" mb="20px">
                <h1 className="page-tile">
                    {exercise.name}
                </h1>
                <Box>
                    <Tooltip title="Body Part" enterDelay={500}>
                        <Button className="pill body-part-btn">{exercise.bodyPart}</Button>
                    </Tooltip>
                    <Tooltip title="Target Muscle" enterDelay={500}>
                        <Button className="pill target-muscle-btn">{exercise.target}</Button>
                    </Tooltip>
                    <Tooltip title="Equipment" enterDelay={500}>
                        <Button className="pill equipment-btn">{exercise.equipment}</Button>
                    </Tooltip>
                </Box>
            </Box>

            <Stack mb="50px">
                <Stack className="exercise-img-wrapper">
                    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" className="detail-image"/>
                </Stack>
                <h5 className="instructions-heading">Instructions:</h5>
                <p>{exercise.instructions}</p>
            </Stack>

            <React.Suspense fallback={<LoadingSpinner/>}>
                <TargetExercises target={exercise.target}/>
            </React.Suspense>

            <React.Suspense fallback={<LoadingSpinner/>}>
                <EquipmentExercises equipment={exercise.equipment}/>
            </React.Suspense>
        </Box>
    );
};

export default ExerciseInfo;