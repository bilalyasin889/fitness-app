import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import React from "react";
import {selector, useRecoilState, useRecoilValue} from "recoil";

import {bodyPartFilterState} from "../../../../recoil/ExerciseListAtoms";
import {getBodyParts} from "../../../../utils/http/exerciseData";

import './BodyPartFilter.css'

const bodyPartsQuery = selector({
    key: 'bodyPartsQuery',
    get: async () => {
        return await getBodyParts();
    },
});

const BodyPartFilter = () => {
    const [bodyPartFilter, setBodyPartFilter] = useRecoilState(bodyPartFilterState);
    const bodyParts = useRecoilValue(bodyPartsQuery);

    if (!bodyParts) return null;

    return (
        <Box component="div" role="region" aria-labelledby="filter-heading" position="relative" mr="40px" ml="40px"
             mb="10px">
            <h2 id="filter-heading" className="filter-heading">Filter by body part:</h2>
            <ToggleButtonGroup
                className="selection-container"
                value={bodyPartFilter}
                exclusive
                onChange={(e, newValue) => newValue && setBodyPartFilter(newValue)}
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