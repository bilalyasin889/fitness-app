import {Box, Pagination, Stack} from "@mui/material";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import {useSafeSetState} from "../../../utils/SafeState";
import {exercisesDataState, filteredExercisesState} from "../../../recoil/ExerciseListAtoms";
import {useRecoilValue, useSetRecoilState} from "recoil";
import React, {useEffect} from "react";
import {useExerciseApi} from "../../../utils/http/ExerciseApi";

import './ExerciseList.css'

const ExerciseList = () => {
    const setExerciseData = useSetRecoilState(exercisesDataState);
    const {getAllExercises} = useExerciseApi();

    useEffect(() => {
        const fetchData = async () => {
            let result = await getAllExercises()

            if (!result) setExerciseData([]);
            else setExerciseData(result)
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const [state, setState] = useSafeSetState({
        currentPage: 1,
        exercisesPerPage: 9
    });

    const exerciseList = useRecoilValue(filteredExercisesState);

    if (!exerciseList) {
        return null;
    } else if (exerciseList.length === 0) {
        return (
            <Box mb="40px">
                <h3 className="no-exercise-found">No exercises found</h3>
            </Box>
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
        <Box component="section" role="region" aria-label="Exercise List">
            {exerciseList.length > 9 && (
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
                {exerciseList.length > 9 && (
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
};

export default ExerciseList;