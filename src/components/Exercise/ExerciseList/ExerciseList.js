import './ExerciseList.css'
import {Box, Pagination, Stack} from "@mui/material";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import {useSafeSetState} from "../../../utils/SafeState";
import {filteredExercisesState} from "../../../recoil/ExerciseListAtoms";
import {useRecoilValue} from "recoil";
import React from "react";

const ExerciseList = () => {
    const [state, setState] = useSafeSetState({
        currentPage: 1,
        exercisesPerPage: 9
    });

    const exerciseList = useRecoilValue(filteredExercisesState);
    if (!exerciseList) {
        return null;
    } else if (exerciseList.length === 0) {
        return (
            <h5 className="no-exercise-found">
                No exercises found
            </h5>
        );
    }

    // Pagination
    const indexOfLastExercise = state.currentPage * state.exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - state.exercisesPerPage;
    const currentExercises = exerciseList.slice(indexOfFirstExercise, indexOfLastExercise);

    const paginate = (event, value) => {
        setState({currentPage: value});

        window.scrollTo({top: 450, behavior: 'smooth'});
    };

    if (!currentExercises.length) return null

    return (
        <Box>
            <Stack className="flex-grid exercises-flex-grid">
                {currentExercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise}/>
                ))}
            </Stack>
            <Stack sx={{mt: {lg: '50px', xs: '20px'}}} alignItems="center">
                {exerciseList.length > 9 && (
                    <Pagination
                        color="standard"
                        shape="rounded"
                        defaultPage={1}
                        count={Math.ceil(exerciseList.length / state.exercisesPerPage)}
                        page={state.currentPage}
                        onChange={paginate}
                        size="large"
                    />
                )}
            </Stack>
        </Box>
    );
};

export default ExerciseList;