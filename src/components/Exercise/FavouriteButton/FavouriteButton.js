import React, {useState} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {CircularProgress} from "@mui/material";
import {useExerciseApi} from '../../../utils/http/ExerciseApi';
import CustomTooltip from "../../Tooltip/CustomTooltip";

import './FavouriteButton.css';

const FavouriteButton = ({id, initialSelection}) => {
    const {updateFavouriteExercise} = useExerciseApi();
    const [isSelected, setIsSelected] = useState(initialSelection);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const handleFavouriteClick = async (event) => {
        event.preventDefault();

        setLoading(true);
        try {
            const response = await updateFavouriteExercise(id, isSelected);
            if (response.success) {
                setIsSelected(prevState => !prevState);
            } else {
                setError(response.error);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CustomTooltip title={isSelected ? "Remove from favourites" : "Add to favourites"}>
            <button
                className="favorite-button"
                onClick={handleFavouriteClick}
                disabled={loading || error !== null}
                aria-label={isSelected ? "Remove from favourites" : "Add to favourites"}>
                {loading ? (
                    <CircularProgress className="loading-spinner" size={24}/>
                ) : (
                    isSelected ? (
                        <FavoriteIcon/>
                    ) : (
                        <FavoriteBorderIcon/>
                    )
                )}
            </button>
        </CustomTooltip>
    );
};

export default FavouriteButton;