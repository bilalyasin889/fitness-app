import './App.css';
import {Box} from "@mui/material";
import Navbar from "./components/Navbar";
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import ExerciseInfo from "./pages/ExerciseInfo";

function App() {
    return (
        <Box m="auto">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercises" element={<Exercises />}/>
                <Route path="/exercise/:id" element={<ExerciseInfo />}/>
            </Routes>
        </Box>
    );
}

export default App;
