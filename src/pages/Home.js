import React from 'react';
import {Box, Stack} from '@mui/material';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

import BannerImage from "../assets/images/Banner.jpg"

const Home = () => {
    return (
        <Box>
            <Box sx={{mt: '30px'}} position="relative" p="20px">
                <img style={{objectFit: 'contain'}} src={BannerImage} alt="banner" className="banner-img"/>
            </Box>
            <Box position="relative" pl="25px" pr="25px" mt="25px">
                <Typography color="#FF2625" variation="h1" fontWeight={700} mb="20px" sx={{fontSize: {lg: '50px', xs: '30px'}}}>
                    Plan your next workout here
                </Typography>
                <Typography fontSize="22px" fontFamily="Alegreya" lineHeight="35px">
                    Explore a wide range of exercise to try out in the gym or at home. <br/>
                    Whether you're a newbie or a fitness buff, we have exercises for all levels, with easy step by step
                    guides.
                </Typography>
                <Stack>
                    <Button variant="contained" component={Link} to="/exercises" className="exercise-btn">Browse Exercises</Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default Home;