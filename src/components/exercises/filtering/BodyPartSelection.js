import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import {selector, useRecoilState, useRecoilValue} from "recoil";
import {bodyPartFilterState} from "../../../recoil/ExerciseListAtoms";
import {getBodyParts} from "../../../utils/http/exerciseData";

const bodyPartsQuery = selector({
    key: 'bodyPartsQuery',
    get: async () => {
        return await getBodyParts();
    },
});

const BodyPartSelection = () => {
    const [bodyPartFilter, setBodyPartFilter] = useRecoilState(bodyPartFilterState);
    const bodyParts = useRecoilValue(bodyPartsQuery);

    if (!bodyParts) return null;

    return (
        <Box position="relative" mr="40px" ml="40px">
            <Typography variant="h5" sx={{fontSize: '20px'}} mb="15px">
                Filter by body part:
            </Typography>
            <ToggleButtonGroup
                value={bodyPartFilter}
                exclusive
                onChange={(e) => setBodyPartFilter(e.target.value)}
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