import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {getExerciseById, getExercisesByEquipment, getExercisesByTargetMuscle} from "../utils/http/exerciseData";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ExerciseCard from "../components/exercises/ExerciseCard";
import {useSafeSetState} from "../utils/SafeState";

const ExerciseInfo = () => {
    const {id} = useParams();
    const [state, setState] = useSafeSetState({
        exercise: {},
        targetExercises: [],
        equipmentExercises: [],
    });

    useEffect(() => {
        const fetchExerciseData = async () => {
            try {
                const exerciseResponse = await getExerciseById(id);

                if (exerciseResponse.error) {
                    console.error("ExerciseInfo.js - fetchExerciseData(): Error retrieving exercise data.", exerciseResponse.error);
                    return;
                }

                const exerciseData = exerciseResponse.data;
                const [targetExercisesResponse, equipmentExercisesResponse] = await Promise.all([
                    getExercisesByTargetMuscle(exerciseData.target),
                    getExercisesByEquipment(exerciseData.equipment)
                ]);

                const targetExercises = targetExercisesResponse.error ? [] : targetExercisesResponse.data.sort(() => Math.random() - 0.5).slice(0, 3);
                const equipmentExercises = equipmentExercisesResponse.error ? [] : equipmentExercisesResponse.data.sort(() => Math.random() - 0.5).slice(0, 3);

                setState({
                    exercise: exerciseData,
                    targetExercises,
                    equipmentExercises
                });
            } catch (error) {
                console.error("ExerciseInfo.js - fetchExerciseData(): Unexpected error.", error);
            }
        };

        fetchExerciseData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    return (
        <Box mb="72px" p="20px">
            <Box sx={{mt: '30px'}} position="relative" mb="20px">
                <Typography color="#FF2625" fontWeight={700}
                            sx={{fontSize: {lg: '50px', xs: '30px'}}} textTransform="capitalize">
                    {state.exercise.name}
                </Typography>
                <Box>
                    <Tooltip title="Body Part" enterDelay={500}>
                        <Button className="pill body-part-btn">{state.exercise.bodyPart}</Button>
                    </Tooltip>
                    <Tooltip title="Target Muscle" enterDelay={500}>
                        <Button className="pill target-muscle-btn">{state.exercise.target}</Button>
                    </Tooltip>
                    <Tooltip title="Equipment" enterDelay={500}>
                        <Button className="pill equipment-btn">{state.exercise.equipment}</Button>
                    </Tooltip>
                </Box>
            </Box>

            <Stack alignItems="center" justifyContent="center" mb="50px">
                <img src={state.exercise.gifUrl} alt={state.exercise.name} loading="lazy" className="detail-image"/>
                <Typography fontWeight={600} variant="h5" sx={{fontSize: {lg: '30px', xs: '20px'}}} mt="30px" mb="15px">
                    Instructions:
                </Typography>
                <Typography>{state.exercise.instructions}</Typography>
            </Stack>

            <Box mb="40px">
                <Typography color="#FF2625" fontWeight={600} variant="h5"
                            sx={{textTransform: 'capitalize', fontSize: {lg: '30px', xs: '20px'}}} mt="20px" mb="10px">
                    Other Exercises for {state.exercise.target}:
                </Typography>
                <Stack direction='row' pr="10px" pl="10px" alignItems="center" sx={{gap: {lg: '20px', xs: '15px'}}}
                       flexWrap="wrap">
                    {state.targetExercises.length > 0 ? (
                        state.targetExercises.map((exercise) => (
                            <ExerciseCard key={state.exercise.id} exercise={exercise}/>
                        ))
                    ) : (
                        <CircularProgress/>
                    )}
                </Stack>
            </Box>

            <Box mb="20px">
                <Typography color="#FF2625" fontWeight={600} variant="h5"
                            sx={{textTransform: 'capitalize', fontSize: {lg: '30px', xs: '20px'}}} mt="20px" mb="10px">
                    Other {state.exercise.equipment} Exercises:
                </Typography>
                <Stack direction='row' pr="10px" pl="10px" alignItems="center" sx={{gap: {lg: '20px', xs: '15px'}}}
                       flexWrap="wrap">
                    {state.equipmentExercises.length > 0 ? (
                        state.equipmentExercises.map((exercise) => (
                            <ExerciseCard key={state.exercise.id} exercise={exercise}/>
                        ))
                    ) : (
                        <CircularProgress/>
                    )}
                </Stack>
            </Box>
        </Box>
    );
};

export default ExerciseInfo;