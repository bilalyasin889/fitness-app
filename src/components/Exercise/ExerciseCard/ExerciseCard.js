import './ExerciseCard.css';
import {Link} from "react-router-dom";
import {Box, Divider, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import PropTypes from "prop-types";

const ExerciseCard = ({exercise}) => {

    return (
        <Link className="exercise-card-link" to={`/exercise/${exercise.id}`}>
            <Box className="exercise-card">
                <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    loading="lazy"
                    className="exercise-img"
                />
                <Divider orientation="vertical" variant="middle" flexItem/>
                <Stack className="card-info-section">
                    <h4 className="exercise-name">{exercise.name}</h4>
                    <Box mb="15px">
                        <Button className="pill body-part-btn">{exercise.bodyPart}</Button>
                        <Button className="pill target-muscle-btn">{exercise.target}</Button>
                        <Button className="pill equipment-btn">{exercise.equipment}</Button>
                    </Box>
                </Stack>
            </Box>
        </Link>
    );
};

ExerciseCard.propTypes = {
    exercise: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        gifUrl: PropTypes.string.isRequired,
        bodyPart: PropTypes.string.isRequired,
        equipment: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
    }).isRequired
};

export default ExerciseCard;