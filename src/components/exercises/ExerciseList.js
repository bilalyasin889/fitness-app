import {useDispatch, useSelector} from "react-redux";
import {
    currentPageChanged,
    getBodyPartFilter,
    getCurrentPage,
    getExercises,
    getExercisesPerPage,
    updateExercises
} from "../../store/exercises";
import {useEffect} from "react";
import {getAllExercises, getExercisesByBodyPart} from "../../http/exerciseData";
import {Box, CircularProgress, Pagination, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExerciseCard from "./ExerciseCard";

const ExerciseList = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(getCurrentPage);
    const exercisesPerPage = useSelector(getExercisesPerPage);

    const bodyPartFilter = useSelector(getBodyPartFilter);
    const exerciseList = useSelector(getExercises);

    useEffect(() => {
        const fetchExercises = async () => {
            console.debug("Fetching list of exercises");
            const result = bodyPartFilter === 'all' ?
                await getAllExercises() :
                await getExercisesByBodyPart(bodyPartFilter);

            if (result.error) {
                console.error("ExerciseList.js - fetchExercises(): Error retrieving exercises.", result.error);
            } else {
                dispatch(updateExercises(result.data));
            }
        };

        fetchExercises();
    }, [bodyPartFilter, dispatch]);

    // Pagination
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exerciseList.slice(indexOfFirstExercise, indexOfLastExercise);

    const paginate = (event, value) => {
        dispatch(currentPageChanged(value));

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
                        count={Math.ceil(exerciseList.length / exercisesPerPage)}
                        page={currentPage}
                        onChange={paginate}
                        size="large"
                    />
                )}
            </Stack>
        </Box>
    );
};

export default ExerciseList;