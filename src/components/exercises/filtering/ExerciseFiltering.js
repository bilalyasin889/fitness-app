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
            try {
                let result;
                if (bodyPartFilter.toLowerCase() === 'all') {
                    result = await getAllExercises();
                } else {
                    result = await getExercisesByBodyPart(bodyPartFilter);
                }

                const { error, data } = result;
                if (error) {
                    console.error("ExerciseFiltering.js - fetchExerciseData(): Error retrieving all exercises.", error);
                } else {
                    const searchedExercises = search ? data.filter(
                        (item) => item.name.toLowerCase().includes(search)
                            || item.target.toLowerCase().includes(search)
                            || item.equipment.toLowerCase().includes(search)
                            || item.bodyPart.toLowerCase().includes(search)
                    ) : data;

                    window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
                    dispatch(updateExercises(searchedExercises));
                }
            } catch (error) {
                console.error("Error fetching exercise data:", error);
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