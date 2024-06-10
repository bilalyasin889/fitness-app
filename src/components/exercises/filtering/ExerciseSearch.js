import React from 'react';
import {Box, Button, TextField} from '@mui/material';
import {getAllExercises, getExercisesByBodyPart} from "../../../http/exerciseData";
import {useDispatch, useSelector} from "react-redux";
import {getBodyPartFilter, getSearchFilter, searchChanged, updateExercises} from "../../../store/exercises";

const ExerciseSearch = () => {
    const dispatch = useDispatch();
    const search = useSelector(getSearchFilter);
    const bodyPartFilter = useSelector(getBodyPartFilter);

    const handleSearch = async () => {
        if (search) {
            console.debug("Fetching and filtering search for list of exercises");
            const result = bodyPartFilter === 'all' ?
                await getAllExercises() :
                await getExercisesByBodyPart(bodyPartFilter);

            if (result.error) {
                console.error("Exercises.js - handleSearch(): Error retrieving all exercises.", result.error)
            } else {
                const searchedExercises = result.data.filter(
                    (item) => item.name.toLowerCase().includes(search)
                        || item.target.toLowerCase().includes(search)
                        || item.equipment.toLowerCase().includes(search)
                        || item.bodyPart.toLowerCase().includes(search)
                );
                window.scrollTo({top: 1800, left: 100, behavior: 'smooth'});
                dispatch(searchChanged(''))
                dispatch(updateExercises(searchedExercises));
            }
        }
    };

    return (
        <Box position="relative" mb="40px">
            <TextField
                height="76px"
                sx={{
                    input: {fontWeight: '700', border: 'none', borderRadius: '4px'},
                    width: {lg: '1170px', xs: '450px'},
                    backgroundColor: '#fff',
                    borderRadius: '40px'
                }}
                value={search}
                onChange={(e) => dispatch(searchChanged(e.target.value.toLowerCase()))}
                placeholder="Search Exercises"
                type="text"
            />
            <Button className="search-btn" sx={{
                backgroundColor: 'blue',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'dodgerblue',
                },
                textTransform: 'none',
                width: {lg: '173px', xs: '90px'},
                height: '56px',
                position: 'absolute',
                right: '0px',
                fontSize: {lg: '20px', xs: '14px'}
            }} onClick={handleSearch}>
                Search
            </Button>
        </Box>
    );
};

export default ExerciseSearch;