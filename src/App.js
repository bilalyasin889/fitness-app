import './App.css';
import {Box} from "@mui/material";
import Navbar from "./components/Navbar";
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import ExerciseInfo from "./pages/ExerciseInfo";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <Box m="auto">
            <ScrollToTop />
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercise" element={<Exercises />}/>
                <Route path="/exercise/:id" element={<ExerciseInfo />}/>
            </Routes>
        </Box>
    );
}

export default App;
