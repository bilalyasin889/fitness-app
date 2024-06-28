import React from 'react';
import {Box, Stack} from '@mui/material';
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

import './Home.css'
import BannerImage from "../../assets/images/Banner.jpg"

const Home = () => {
    return (
        <Box className="page-wrapper" role="main" aria-labelledby="page-heading">
            <Box className="page-tile">
                <h1 id="page-heading">Plan your next workout here</h1>
            </Box>
            <Box position="relative">
                <img className="banner" style={{objectFit: 'contain'}} src={BannerImage} alt="Weight lifting workout banner"/>
            </Box>
            <Box p="25px">
                <p>
                    Explore a wide range of exercises to try out in the gym or at home. <br/>
                    Whether you're a newbie or a fitness buff, we have exercises for all levels, with easy step-by-step guides.
                </p>
                <Stack>
                    <Button variant="contained" component={Link} to="/exercises" className="browse-exercise-btn">Browse Exercises</Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default Home;