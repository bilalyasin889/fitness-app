import {useSafeSetState} from "../../../utils/SafeState";
import {Box, Pagination, Stack} from "@mui/material";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import React from "react";

import './PaginatedExercises.css';

const PaginatedExercises = ({exerciseList, pageSize = 9}) => {
    const [state, setState] = useSafeSetState({
        currentPage: 1,
        exercisesPerPage: pageSize
    });

    // Pagination
    const indexOfLastExercise = state.currentPage * state.exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - state.exercisesPerPage;
    const currentExercises = exerciseList.slice(indexOfFirstExercise, indexOfLastExercise);

    const paginate = (event, value) => {
        setState({currentPage: value});

        window.scrollTo({top: 450, behavior: 'smooth'});
    };

    return (
        <Box component="section" role="region" aria-label="Exercise List">
            {exerciseList.length > state.exercisesPerPage && (
                <Stack className="pagination-top" sx={{mb: '30px'}} alignItems="center">
                    <Pagination
                        color="standard"
                        shape="rounded"
                        defaultPage={1}
                        count={Math.ceil(exerciseList.length / state.exercisesPerPage)}
                        page={state.currentPage}
                        onChange={paginate}
                        size="large"
                        aria-label="Exercise pagination"
                    />
                </Stack>
            )}

            <Stack className="flex-grid exercises-flex-grid" role="list">
                {currentExercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} role="listitem"/>
                ))}
            </Stack>

            <Stack sx={{mt: '50px'}} alignItems="center">
                {exerciseList.length > state.exercisesPerPage && (
                    <Pagination
                        color="standard"
                        shape="rounded"
                        defaultPage={1}
                        count={Math.ceil(exerciseList.length / state.exercisesPerPage)}
                        page={state.currentPage}
                        onChange={paginate}
                        size="large"
                        aria-label="Exercise pagination"
                    />
                )}
            </Stack>
        </Box>
    );
}

export default PaginatedExercises;