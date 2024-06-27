import {useExerciseApi} from "../../utils/http/ExerciseApi";
import React, {useEffect, useState} from "react";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import PaginatedExercises from "../Exercise/PaginatedExercises/PaginatedExercises";

const UserFavourites = () => {
    const {getFavourites} = useExerciseApi();
    const [favourites, setFavourites] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFavourites();
                if (response.success) {
                    setFavourites(response.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!favourites) {
        return null;
    }

    return (
        <>
            <h2 className="heading-level-2">Your Favourite Exercises</h2>
            {favourites.length === 0 ?
                (
                    <>
                        <h3 className="result-not-found">No favourite exercises</h3>
                        <Stack>
                            <Button variant="contained" component={Link} to="/exercises" className="browse-exercise-btn">Browse
                                Exercises</Button>
                        </Stack>
                    </>
                )
                :
                (<PaginatedExercises exerciseList={favourites} pageSize={4}/>)
            }
        </>
    );
};

export default UserFavourites;