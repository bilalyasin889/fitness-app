import {Box, CircularProgress, Pagination, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExerciseCard from "./ExerciseCard";
import {useSafeSetState} from "../../utils/SafeState";
import {useSelector} from "react-redux";
import {getExercises} from "../../store/exercises";

const ExerciseList = () => {
    const exerciseList = useSelector(getExercises);

    // Pagination
    const [state, setState] = useSafeSetState({
        currentPage: 1,
        exercisesPerPage: 9
    });
    const indexOfLastExercise = state.currentPage * state.exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - state.exercisesPerPage;
    const currentExercises = exerciseList.slice(indexOfFirstExercise, indexOfLastExercise);

    const paginate = (event, value) => {
        setState({currentPage: value});

        window.scrollTo({top: 450, behavior: 'smooth'});
    };

    if (!currentExercises.length) return (
        <Box sx={{mt: {lg: '109px'}}} mt="50px" p="20px">
            <CircularProgress/>
        </Box>
    );

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