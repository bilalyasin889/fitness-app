import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {bodyPartFilterChanged, getBodyPartFilter} from "../../../store/exercises";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {getBodyParts} from "../../../utils/http/exerciseData";

const BodyPartSelection = () => {
    const dispatch = useDispatch();
    const bodyPartFilter = useSelector(getBodyPartFilter);
    const [bodyParts, setBodyParts] = useState([]);

    useEffect(() => {
        const fetchBodyParts = async () => {
            console.debug("Fetching list of body parts");
            setBodyParts(await getBodyParts());
        };

        fetchBodyParts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box position="relative" mr="40px" ml="40px">
            <Typography variant="h5" sx={{fontSize: '20px'}} mb="15px">
                Filter by body part:
            </Typography>
            <ToggleButtonGroup
                value={bodyPartFilter}
                exclusive
                onChange={(e) => dispatch(bodyPartFilterChanged(e.target.value))}
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
                {bodyParts.map((option) => (
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
                ))}
            </ToggleButtonGroup>
        </Box>
    );
};

export default BodyPartSelection;