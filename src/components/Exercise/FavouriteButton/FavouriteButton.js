import React, {useEffect, useState} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {CircularProgress} from "@mui/material";
import {useExerciseApi} from '../../../utils/http/ExerciseApi';
import CustomTooltip from "../../Tooltip/CustomTooltip";

import './FavouriteButton.css';

const FavouriteButton = ({id}) => {
    const {isFavouriteExercise, addFavouriteExercise, removeFavouriteExercise} = useExerciseApi();
    const [isSelected, setIsSelected] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await isFavouriteExercise(id);
                if (response.success) {
                    setIsSelected(response.data);
                } else {
                    setError(response.error);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleFavouriteClick = async (event) => {
        event.preventDefault();

        setLoading(true);
        try {
            const response = isSelected
                ? await removeFavouriteExercise(id)
                : await addFavouriteExercise(id);
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
        <button
            className="favorite-button"
            onClick={handleFavouriteClick}
            disabled={loading || error !== null}>
            {loading ? (
                <CircularProgress className="loading-spinner" size={24}/>
            ) : (
                isSelected ? (
                    <CustomTooltip title="Remove from favourites">
                        <FavoriteIcon/>
                    </CustomTooltip>
                ) : (
                    <CustomTooltip title="Add to favourites">
                        <FavoriteBorderIcon/>
                    </CustomTooltip>
                )
            )}
        </button>
    );
};

export default FavouriteButton;