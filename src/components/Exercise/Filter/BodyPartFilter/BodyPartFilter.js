import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";

import {bodyPartFilterState} from "../../../../recoil/ExerciseListAtoms";
import {useExerciseApi} from "../../../../utils/http/ExerciseApi";

import './BodyPartFilter.css'

const BodyPartFilter = () => {
    const [bodyPartFilter, setBodyPartFilter] = useRecoilState(bodyPartFilterState);
    const [bodyParts, setBodyParts] = useState(null);

    const {getBodyParts} = useExerciseApi();

    useEffect(() => {
        const fetchData = async () => {
            const parts = await getBodyParts();
            setBodyParts(parts || []);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!bodyParts) return null;

    return (
        <Box component="div" role="region" aria-labelledby="filter-heading" position="relative" mr="40px" ml="40px"
             mb="35px">
            <h2 id="filter-heading" className="filter-heading">Filter by body part:</h2>
            <ToggleButtonGroup
                className="selection-container"
                value={bodyPartFilter}
                exclusive
                onChange={(e, newValue) => setBodyPartFilter(newValue || 'all')}
                aria-label="Body Parts button group"
            >
                {bodyParts.map((option) => (
                    <ToggleButton
                        className="selection-button"
                        key={option}
                        value={option}
                        aria-label={`Filter by ${option}`}
                    >
                        {option}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>
    );
};

export default BodyPartFilter;