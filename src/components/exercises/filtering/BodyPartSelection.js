import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {bodyPartFilterChanged, getBodyPartFilter, getBodyPartsList, updateBodyParts} from "../../../store/exercises";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {getBodyParts} from "../../../http/exerciseData";

const BodyPartSelection = () => {
    const dispatch = useDispatch();
    const bodyPartFilter = useSelector(getBodyPartFilter);
    const bodyParts = useSelector(getBodyPartsList);

    useEffect(() => {
        const fetchBodyParts = async () => {
            console.debug("Fetching list of body parts");
            const result = await getBodyParts();

            if (result.error) {
                console.error("Exercises.js - fetchBodyParts(): Error retrieving body parts.", result.error)
            } else {
                dispatch(updateBodyParts(['all', ...result.data]));
            }
        };

        fetchBodyParts();
    }, [dispatch]);

    const handleBodyPartChange = (event, newValue) => {
        console.debug("Updating body part filter");

        dispatch(bodyPartFilterChanged(newValue || 'all'));
    };

    return (
        <Box position="relative" mr="40px" ml="40px">
            <Typography variant="h5" sx={{fontSize: '20px'}} mb="15px">
                Filter by body part:
            </Typography>
            <ToggleButtonGroup
                value={bodyPartFilter}
                exclusive
                onChange={handleBodyPartChange}
                aria-label="Body Parts button group"
                size="medium"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    width: '100%',
                    '& .MuiToggleButton-root': {
                        borderRadius: '20px',
                    },
                }}
            >
                {
                    bodyParts.map((option) => (
                        <ToggleButton
                            key={option} value={option}
                            aria-label={option}
                            sx={{
                                borderRadius: '8px',
                                minWidth: '60px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0 16px',
                                border: '2px solid',
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                                '&:not(:first-of-type)': {
                                    borderLeft: '1px solid rgba(0, 0, 0, 0.23)',
                                },
                                '&:hover': {
                                    backgroundColor: 'lightblue',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'dodgerblue',
                                    }
                                }
                            }}>
                            {option}
                        </ToggleButton>
                    ))
                }
            </ToggleButtonGroup>
        </Box>
    );
};

export default BodyPartSelection;