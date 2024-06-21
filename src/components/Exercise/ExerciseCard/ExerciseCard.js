import {Link} from "react-router-dom";
import {Box, Divider, Stack} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

import InfoPill from "../InfoPill/InfoPill";

import icon from './../../../assets/images/gym.png'
import './ExerciseCard.css';

const ExerciseCard = ({exercise}) => {
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
                    <h3 className="exercise-name">{exercise.name}</h3>
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