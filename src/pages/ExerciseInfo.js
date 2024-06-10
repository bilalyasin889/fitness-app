import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getExerciseById, getExercisesByEquipment, getExercisesByTargetMuscle} from "../http/exerciseData";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ExerciseCard from "../components/exercises/ExerciseCard";

const ExerciseInfo = () => {
    const {id} = useParams();
    const [exercise, setExercise] = useState({});
    const [targetExercises, setTargetExercises] = useState({});
    const [equipmentExercises, setEquipmentExercises] = useState({});

    useEffect(() => {
        const fetchExerciseData = async () => {
            try {
                const exerciseResponse = await getExerciseById(id);

                if (exerciseResponse.error) {
                    console.error("ExerciseInfo.js - fetchExerciseData(): Error retrieving exercise data.", exerciseResponse.error);
                    return;
                }

                setExercise(exerciseResponse.data);

                await fetchRelatedExercises(exerciseResponse.data);
            } catch (error) {
                console.error("ExerciseInfo.js - fetchExerciseData(): Unexpected error.", error);
            }
        };

        const fetchRelatedExercises = async (exerciseData) => {
            try {
                const [targetExercisesResponse, equipmentExercisesResponse] = await Promise.all([
                    getExercisesByTargetMuscle(exerciseData.target),
                    getExercisesByEquipment(exerciseData.equipment)
                ]);

                if (targetExercisesResponse.error) {
                    console.error("ExerciseInfo.js - fetchRelatedExercises(): Error retrieving target exercises.", targetExercisesResponse.error);
                } else {
                    setTargetExercises(
                        targetExercisesResponse.data
                            .sort(() => Math.random() - 0.5)
                            .slice(0, 3)
                    );
                }

                if (equipmentExercisesResponse.error) {
                    console.error("ExerciseInfo.js - fetchRelatedExercises(): Error retrieving equipment exercises.", equipmentExercisesResponse.error);
                } else {
                    setEquipmentExercises(
                        equipmentExercisesResponse.data
                            .sort(() => Math.random() - 0.5)
                            .slice(0, 3)
                    );
                }
            } catch (error) {
                console.error("ExerciseInfo.js - fetchRelatedExercises(): Unexpected error.", error);
            }
        };

        fetchExerciseData();
    }, [id]);


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
                    {targetExercises.length > 0 ? (
                        targetExercises.map((exercise) => (
                            <ExerciseCard key={exercise.id} exercise={exercise}/>
                        ))
                    ) : (
                        <CircularProgress/>
                    )}
                </Stack>
            </Box>

            <Box mb="20px">
                <Typography color="#FF2625" fontWeight={600} variant="h5"
                            sx={{textTransform: 'capitalize', fontSize: {lg: '30px', xs: '20px'}}} mt="20px" mb="10px">
                    Other {exercise.equipment} Exercises:
                </Typography>
                <Stack direction='row' pr="10px" pl="10px" alignItems="center" sx={{gap: {lg: '20px', xs: '15px'}}}
                       flexWrap="wrap">
                    {equipmentExercises.length > 0 ? (
                        equipmentExercises.map((exercise) => (
                            <ExerciseCard key={exercise.id} exercise={exercise}/>
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