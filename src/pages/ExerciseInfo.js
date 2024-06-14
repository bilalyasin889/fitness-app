import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ExerciseCard from "../components/exercises/ExerciseCard";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {
    equipmentExercisesState,
    exerciseIdState,
    exerciseState,
    targetExercisesState
} from "../recoil/ExerciseInfoAtoms";


const ExerciseInfo = () => {
    const {id} = useParams();
    const setExerciseId = useSetRecoilState(exerciseIdState);

    useEffect(() => {
        setExerciseId(id);
    }, [id, setExerciseId]);

    const exercise = useRecoilValue(exerciseState);
    const targetExercises = useRecoilValue(targetExercisesState);
    const equipmentExercises = useRecoilValue(equipmentExercisesState);

    if (!exercise) return null;

    return (
        <Box mb="72px" p="20px">
            <Box sx={{mt: '30px'}} position="relative" mb="20px">
                <Typography color="#FF2625" fontWeight={700}
                            sx={{fontSize: {lg: '50px', xs: '30px'}}} textTransform="capitalize">
                    {exercise.name}
                </Typography>
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

            <Stack alignItems="center" justifyContent="center" mb="50px">
                <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" className="detail-image"/>
                <Typography fontWeight={600} variant="h5" sx={{fontSize: {lg: '30px', xs: '20px'}}} mt="30px" mb="15px">
                    Instructions:
                </Typography>
                <Typography>{exercise.instructions}</Typography>
            </Stack>

            <Box mb="40px">
                <Typography color="#FF2625" fontWeight={600} variant="h5"
                            sx={{textTransform: 'capitalize', fontSize: {lg: '30px', xs: '20px'}}} mt="20px" mb="10px">
                    Other Exercises for {exercise.target}:
                </Typography>
                <Stack direction='row' pr="10px" pl="10px" alignItems="center" sx={{gap: {lg: '20px', xs: '15px'}}}
                       flexWrap="wrap">
                    {
                        targetExercises.length > 0
                            ? (targetExercises.map((exercise) => (
                                <ExerciseCard key={exercise.id} exercise={exercise}/>
                            )))
                            : (<CircularProgress/>)
                    }
                </Stack>
            </Box>

            <Box mb="20px">
                <Typography color="#FF2625" fontWeight={600} variant="h5"
                            sx={{textTransform: 'capitalize', fontSize: {lg: '30px', xs: '20px'}}} mt="20px" mb="10px">
                    Other {exercise.equipment} Exercises:
                </Typography>
                <Stack direction='row' pr="10px" pl="10px" alignItems="center" sx={{gap: {lg: '20px', xs: '15px'}}}
                       flexWrap="wrap">
                    {
                        equipmentExercises.length > 0
                            ? (equipmentExercises.map((exercise) => (
                                <ExerciseCard key={exercise.id} exercise={exercise}/>
                            )))
                            : (<CircularProgress/>)
                    }
                </Stack>
            </Box>
        </Box>
    );
};

export default ExerciseInfo;