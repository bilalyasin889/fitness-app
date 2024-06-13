import React from 'react';
import {Box, Stack} from '@mui/material';
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

import './Home.css'
import BannerImage from "../../assets/images/Banner.jpg"

const Home = () => {
    return (
        <Box mb="50px" className="home-wrapper">
            <Box sx={{mt: '30px'}} position="relative" p="20px">
                <div className="image-container">
                    <img style={{objectFit: 'contain'}} src={BannerImage} alt="banner"/>
                    <h1 className="image-text">
                        Plan your next workout here
                    </h1>
                </div>
            </Box>
            <Box position="relative" pl="25px" pr="25px" mt="25px">
                <p>
                Explore a wide range of exercise to try out in the gym or at home. <br/>
                    Whether you're a newbie or a fitness buff, we have exercises for all levels, with easy step by step
                    guides.
                </p>
                <Stack>
                    <Button variant="contained" component={Link} to="/exercises" className="exercise-btn">Browse Exercises</Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default Home;