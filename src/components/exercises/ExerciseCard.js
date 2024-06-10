import {Link} from "react-router-dom";
import {Box, Divider, Stack, styled} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";

const ExerciseCard = ({exercise}) => {
    const TruncatedTypography = styled(Typography)({
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
        maxWidth: '100%',
    });

    return (
        <Link className="exercise-card-link" to={`/exercise/${exercise.id}`}>
            <Box
                className="exercise-card"
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    height: '40%',
                    maxHeight: '220px',
                    width: '100%',
                    maxWidth: {xs: '440px', md: '440px'},
                    overflow: 'hidden',
                }}
            >
                <Avatar
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    loading="lazy"
                    sx={{
                        width: {xs: 100, lg: 150},
                        height: {xs: 100, lg: 150},
                        borderRadius: '50%',
                        marginRight: '16px',
                    }}
                />
                <Divider orientation="vertical" variant="middle" flexItem sx={{marginRight: '21px'}}/>
                <Stack direction="column" sx={{ flex: 1, overflow: 'hidden' }}>
                    <TruncatedTypography
                        color="#000"
                        fontWeight="bold"
                        sx={{ fontSize: '20px'}}
                        mt="11px"
                        pb="10px"
                        textTransform="capitalize"
                    >
                        {exercise.name}
                    </TruncatedTypography>
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