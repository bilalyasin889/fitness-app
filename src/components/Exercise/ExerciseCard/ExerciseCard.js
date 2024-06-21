import {Link} from "react-router-dom";
import {Box, Divider, Stack} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

import InfoPill from "../InfoPill/InfoPill";
import CustomTooltip from "../../Tooltip/CustomTooltip";

import icon from './../../../assets/images/gym.png'
import './ExerciseCard.css';

const useIsOverflowing = () => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const {current} = ref;
        if (current) {
            setIsOverflowing(current.scrollWidth > current.clientWidth);
        }
    }, []);

    return [isOverflowing, ref];
};

const ExerciseCard = ({exercise}) => {
    const [isOverflowing, nameRef] = useIsOverflowing();

    return (
        <Link className="exercise-card-link" to={`/exercise/${exercise.id}`} aria-label={exercise.name}>
            <Box className="exercise-card">
                <img
                    src={icon}
                    alt={exercise.name}
                    loading="lazy"
                    className="exercise-img"
                />
                <Divider orientation="vertical" variant="middle" flexItem aria-hidden="true"/>
                <Stack className="card-info-section">
                    {isOverflowing ? (
                        <CustomTooltip title={exercise.name}>
                            <h3 className="exercise-name" ref={nameRef}>{exercise.name}</h3>
                        </CustomTooltip>
                    ) : (
                        <h3 className="exercise-name" ref={nameRef}>{exercise.name}</h3>
                    )}
                    <Box mb="15px">
                        <InfoPill tooltipTitle="Body Part" buttonText={exercise.bodyPart}/>
                        <InfoPill tooltipTitle="Target Muscle" buttonText={exercise.targetMuscle}/>
                        <InfoPill tooltipTitle="Equipment" buttonText={exercise.equipment}/>
                    </Box>
                </Stack>
            </Box>
        </Link>
    );
};

ExerciseCard.propTypes = {
    exercise: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        gifUrl: PropTypes.string.isRequired,
        bodyPart: PropTypes.string.isRequired,
        equipment: PropTypes.string.isRequired,
        targetMuscle: PropTypes.string.isRequired,
    }).isRequired
};

export default ExerciseCard;