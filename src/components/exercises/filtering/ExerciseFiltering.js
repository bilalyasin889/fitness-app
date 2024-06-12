import React, {useEffect} from 'react';
import {Stack} from '@mui/material';
import BodyPartSelection from "./BodyPartSelection";
import ExerciseSearch from "./ExerciseSearch";
import {useDispatch, useSelector} from "react-redux";
import {getBodyPartFilter, getSearchFilter, updateExercises} from "../../../store/exercises";
import {getAllExercises, getExercisesByBodyPart} from "../../../utils/http/exerciseData";

const ExerciseFiltering = () => {
    const dispatch = useDispatch();
    const search = useSelector(getSearchFilter);
    const bodyPartFilter = useSelector(getBodyPartFilter);

    useEffect(() => {
        const fetchExerciseData = async () => {
            console.debug("ExerciseFiltering.js - fetchExerciseData(): Fetching and filtering list of exercises");
            let result;
            result = bodyPartFilter.toLowerCase() === 'all' ?
                await getAllExercises() :
                await getExercisesByBodyPart(bodyPartFilter);

            if (result) {
                const searchedExercises = search ? result.filter(
                    (item) => item.name.toLowerCase().includes(search)
                        || item.target.toLowerCase().includes(search)
                        || item.equipment.toLowerCase().includes(search)
                        || item.bodyPart.toLowerCase().includes(search)
                ) : result;

                window.scrollTo({top: 1800, left: 100, behavior: 'smooth'});
                dispatch(updateExercises(searchedExercises));
            }
        };

        fetchExerciseData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, bodyPartFilter]);

    return (
        <Stack alignItems="center" justifyContent="center">
            <ExerciseSearch/>
            <BodyPartSelection/>
        </Stack>
    );
};

export default ExerciseFiltering;