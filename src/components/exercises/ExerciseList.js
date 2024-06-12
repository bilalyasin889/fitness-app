import {Box, Pagination, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExerciseCard from "./ExerciseCard";
import {useSafeSetState} from "../../utils/SafeState";
import {filteredExercisesState} from "../../recoil/ExerciseListAtoms";
import {useRecoilValue} from "recoil";

const ExerciseList = () => {
    const [state, setState] = useSafeSetState({
        currentPage: 1,
        exercisesPerPage: 9
    });
    const exerciseList = useRecoilValue(filteredExercisesState);

    if (!exerciseList) return null;

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
        <Box id="exercises" mt="40px" p="20px">
            <Typography variant="h4" fontWeight="bold" sx={{fontSize: {lg: '45px', xs: '25px'}}} mb="46px">
                Showing Results
            </Typography>
            <Stack direction={{xs: 'column', lg: 'row'}} pr="30px" pl="30px" alignItems="center"
                   sx={{gap: {lg: '50px', xs: '25px'}}} flexWrap="wrap" justifyContent="center">
                {currentExercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise}/>
                ))}
            </Stack>
            <Stack sx={{mt: {lg: '114px', xs: '70px'}}} alignItems="center">
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