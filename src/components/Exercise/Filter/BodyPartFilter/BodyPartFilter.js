import './BodyPartFilter.css'
import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import React from "react";
import {selector, useRecoilState, useRecoilValue} from "recoil";
import {bodyPartFilterState} from "../../../../recoil/ExerciseListAtoms";
import {getBodyParts} from "../../../../utils/http/exerciseData";

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
        <Box position="relative" mr="40px" ml="40px">
            <h3 className="filter-heading">
                Filter by body part:
            </h3>
            <ToggleButtonGroup
                className="selection-container"
                value={bodyPartFilter}
                exclusive
                onChange={(e) => setBodyPartFilter(e.target.value)}
                aria-label="Body Parts button group"
            >
                {bodyParts.map((option) => (
                    <ToggleButton
                        className="selection-button"
                        key={option} value={option}
                        aria-label={option}>
                        {option}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>
    );
};

export default BodyPartFilter;